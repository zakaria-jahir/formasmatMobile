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

export default function FormationsScreen() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [selectedModes, setSelectedModes] = useState<string[]>([]);
  const [minDuration, setMinDuration] = useState("");
  const [maxDuration, setMaxDuration] = useState("");

  const [allFormations, setAllFormations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Chargement des données depuis l'API
  useEffect(() => {
    axios.get("http://192.168.0.75:8000/api/formations/")
      .then((response) => {
        setAllFormations(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des formations :", error);
        setLoading(false);
      });
  }, []);

  // ➕ Sélectionner ou désélectionner un mode
  const toggleMode = (mode: string) => {
    setSelectedModes((prev) =>
      prev.includes(mode)
        ? prev.filter((m) => m !== mode)
        : [...prev, mode]
    );
  };

  // 🔍 Appliquer les filtres
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
      <Text style={styles.title}>Formations</Text>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Chargement des formations...</Text>
        </View>
      ) : (
        <>
          {/* 🔍 Barre de recherche */}
          <TextInput
            placeholder="Recherche (ex : langage, alimentation...)"
            value={search}
            onChangeText={setSearch}
            style={styles.input}
          />

          {/* 🔎 Type de formation */}
          <TextInput
            placeholder="Type (ex : initial / continue)"
            value={type}
            onChangeText={setType}
            style={styles.input}
          />

          {/* ✅ Modalités */}
          <Text style={styles.label}>Modalités :</Text>
          <View style={styles.modes}>
            {["Présentiel", "Distanciel", "Asynchrone"].map((mode) => (
              <TouchableOpacity
                key={mode}
                style={[
                  styles.modeBtn,
                  selectedModes.includes(mode) && styles.modeSelected,
                ]}
                onPress={() => toggleMode(mode)}
              >
                <Text>{mode}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* ⏱ Durée */}
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

          {/* 📋 Résultats */}
          <Text style={styles.label}>Résultats :</Text>
          {filteredFormations.length === 0 ? (
            <Text style={styles.noResult}>Aucune formation trouvée.</Text>
          ) : (
            filteredFormations.map((f) => (
              <View key={f.id} style={styles.card}>
                <Text style={styles.cardTitle}>{f.name}</Text>
                <Text>⏱ {f.duration} heures</Text>
                <Text>📘 Type : {f.type}</Text>
                <Text>
                  💻 Modalités :{" "}
                  {[f.is_presentiel && "Présentiel", f.is_distanciel && "Distanciel", f.is_asynchrone && "Asynchrone"]
                    .filter(Boolean)
                    .join(", ")}
                </Text>
                <Text>📍 Ville : {f.city || "non définie"}</Text>
              </View>
            ))
          )}
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
    gap: 10,
    marginBottom: 10,
  },
  halfInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
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
