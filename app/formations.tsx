import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function FormationsScreen() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [selectedModes, setSelectedModes] = useState<string[]>([]);
  const [minDuration, setMinDuration] = useState("");
  const [maxDuration, setMaxDuration] = useState("");
  const [allFormations, setAllFormations] = useState([]);
  const [userWishes, setUserWishes] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get("http://192.168.0.75:8000/api/formations/")
      .then((res) => {
        setAllFormations(res.data);
        return axios.get("http://192.168.0.75:8000/api/my-wishes/", {
          withCredentials: true,
        });
      })
      .then((res) => {
        setUserWishes(res.data.wished_ids);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Erreur de chargement :", err);
        setLoading(false);
      });
  }, []);

  const toggleWish = (formationId: number) => {
    const isWished = userWishes.includes(formationId);
    const url = isWished
      ? "http://192.168.0.75:8000/api/remove-wish/"
      : "http://192.168.0.75:8000/api/add-wish/";

    axios
      .post(url, { formation_id: formationId }, { withCredentials: true })
      .then(() => {
        setUserWishes((prev) =>
          isWished
            ? prev.filter((id) => id !== formationId)
            : [...prev, formationId]
        );
      })
      .catch((err) => {
        console.error("❌ Erreur toggle souhait :", err);
      });
  };

  const toggleMode = (mode: string) => {
    setSelectedModes((prev) =>
      prev.includes(mode) ? prev.filter((m) => m !== mode) : [...prev, mode]
    );
  };

  const filteredFormations = useMemo(() => {
    return allFormations.filter((f) => {
      const matchSearch = f.name?.toLowerCase().includes(search.toLowerCase());
      const matchType = type ? f.type?.toLowerCase().includes(type.toLowerCase()) : true;

      const dbModes = [];
      if (f.is_presentiel) dbModes.push("Présentiel");
      if (f.is_distanciel) dbModes.push("Distanciel");
      if (f.is_asynchrone) dbModes.push("Asynchrone");

      const matchMode = selectedModes.length
        ? selectedModes.some((mode) => dbModes.includes(mode))
        : true;

      const matchMin = minDuration ? f.duration >= parseInt(minDuration) : true;
      const matchMax = maxDuration ? f.duration <= parseInt(maxDuration) : true;

      return matchSearch && matchType && matchMode && matchMin && matchMax;
    });
  }, [search, type, selectedModes, minDuration, maxDuration, allFormations]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📚 Formations</Text>

      <TextInput
        placeholder="Recherche"
        placeholderTextColor="#000"
        value={search}
        onChangeText={setSearch}
        style={styles.input}
      />
      <TextInput
        placeholder="Type"
        placeholderTextColor="#000"
        value={type}
        onChangeText={setType}
        style={styles.input}
      />

      <Text style={styles.label}>Modalités :</Text>
      <View style={styles.modes}>
        {["Présentiel", "Distanciel", "Asynchrone"].map((mode) => (
          <TouchableOpacity
            key={mode}
            style={[styles.modeBtn, selectedModes.includes(mode) && styles.modeSelected]}
            onPress={() => toggleMode(mode)}
          >
            <Text>{mode}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Durée (heures) :</Text>
      <View style={styles.row}>
        <TextInput
          placeholder="Min"
          placeholderTextColor="#000"
          keyboardType="numeric"
          value={minDuration}
          onChangeText={setMinDuration}
          style={styles.halfInput}
        />
        <TextInput
          placeholder="Max"
          placeholderTextColor="#000"
          keyboardType="numeric"
          value={maxDuration}
          onChangeText={setMaxDuration}
          style={styles.halfInput}
        />
      </View>

      <Text style={styles.label}>Résultats :</Text>
      {filteredFormations.map((f, index) => (
        <Animated.View
          entering={FadeInUp.delay(index * 100).duration(500)}
          key={f.id}
          style={styles.card}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={styles.cardTitle}>{f.name}</Text>
            <TouchableOpacity onPress={() => toggleWish(f.id)} style={styles.wishButton}>
              <Ionicons
                name={userWishes.includes(f.id) ? "heart" : "heart-outline"}
                size={20}
                color="red"
              />
              <Text style={styles.wishText}>Souhait de formation</Text>
            </TouchableOpacity>
          </View>
          <Text>⏱ {f.duration} heures</Text>
          <Text>📘 Type : {f.type}</Text>
          <Text>📍 Ville : {f.city || "non définie"}</Text>
          <TouchableOpacity
            style={styles.detailButton}
            onPress={() => navigation.navigate("FormationDetail", { formation: f })}
          >
            <Text style={styles.detailButtonText}>➡️ Voir les détails</Text>
          </TouchableOpacity>
        </Animated.View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 15 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  label: { fontWeight: "bold", marginTop: 10, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modes: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  modeBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 6,
    marginRight: 10,
    marginBottom: 8,
  },
  modeSelected: {
    backgroundColor: "#f9b72a",
    borderColor: "#f9b72a",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: "#fefefe",
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 15,
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 4,
    color: "#333",
  },
  wishButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  wishText: {
    fontSize: 13,
    color: "red",
  },
  detailButton: {
    marginTop: 10,
    backgroundColor: '#4facfe',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  detailButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});