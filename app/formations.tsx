import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

export default function FormationsScreen() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [selectedModes, setSelectedModes] = useState<string[]>([]);
  const [minDuration, setMinDuration] = useState("");
  const [maxDuration, setMaxDuration] = useState("");
  const [allFormations, setAllFormations] = useState([]);
  const [userWishes, setUserWishes] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://192.168.0.75:8000/api/formations/")
      .then((res) => {
        setAllFormations(res.data);
        return axios.get("http://192.168.0.75:8000/api/my-wishes/", { withCredentials: true });
      })
      .then((res) => {
        setUserWishes(res.data.wished_ids);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Erreur :", err);
        setLoading(false);
      });
  }, []);

  const toggleWish = (formationId: number) => {
    const isWished = userWishes.includes(formationId);
    const url = isWished
      ? "http://192.168.0.75:8000/api/remove-wish/"
      : "http://192.168.0.75:8000/api/add-wish/";

    axios.post(url, { formation_id: formationId }, { withCredentials: true })
      .then(() => {
        setUserWishes(prev => isWished
          ? prev.filter(id => id !== formationId)
          : [...prev, formationId]
        );
      })
      .catch(err => {
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

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Chargement des formations...</Text>
        </View>
      ) : (
        <>
          <TextInput
            placeholder="Recherche"
            value={search}
            onChangeText={setSearch}
            style={styles.input}
          />
          <TextInput
            placeholder="Type"
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
              keyboardType="numeric"
              value={minDuration}
              onChangeText={setMinDuration}
              style={styles.halfInput}
            />
            <TextInput
              placeholder="Max"
              keyboardType="numeric"
              value={maxDuration}
              onChangeText={setMaxDuration}
              style={styles.halfInput}
            />
          </View>

          <Text style={styles.label}>Résultats :</Text>
          {filteredFormations.map((f) => (
            <View key={f.id} style={styles.card}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={styles.cardTitle}>{f.name}</Text>
                <TouchableOpacity onPress={() => toggleWish(f.id)}>
                  <Ionicons
                    name={userWishes.includes(f.id) ? "heart" : "heart-outline"}
                    size={20}
                    color="red"
                  />
                </TouchableOpacity>
              </View>
              <Text>⏱ {f.duration} heures</Text>
              <Text>📘 Type : {f.type}</Text>
              <Text>📍 Ville : {f.city || "non définie"}</Text>
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 15 },
  loadingContainer: { flex: 1, alignItems: "center", marginTop: 30 },
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
    marginBottom: 10,
  },
  halfInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  card: {
    backgroundColor: "#fff8e1",
    borderWidth: 1,
    borderColor: "#f0a500",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  noResult: {
    textAlign: "center",
    color: "gray",
    marginTop: 20,
    fontStyle: "italic",
  },
});
