import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { formations as allFormations } from "./formations.data";


export default function FormationsScreen() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [selectedModes, setSelectedModes] = useState<string[]>([]);
  const [minDuration, setMinDuration] = useState("");
  const [maxDuration, setMaxDuration] = useState("");

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
      const matchSearch = f.title.toLowerCase().includes(search.toLowerCase());
      const matchType = type ? f.type.toLowerCase().includes(type.toLowerCase()) : true;
      const matchMode = selectedModes.length ? selectedModes.includes(f.mode) : true;
      const matchMin = minDuration ? f.duration >= parseInt(minDuration) : true;
      const matchMax = maxDuration ? f.duration <= parseInt(maxDuration) : true;
      return matchSearch && matchType && matchMode && matchMin && matchMax;
    });
  }, [search, type, selectedModes, minDuration, maxDuration]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Formations</Text>

      {/* 🔍 Barre de recherche */}
      <TextInput
        placeholder="Recherche (ex : langage, alimentation...)"
        value={search}
        onChangeText={setSearch}
        style={styles.input}
      />

      {/* 🔎 Type de formation */}
      <TextInput
        placeholder="Type (ex : Initiale / Continue)"
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
            <Text style={styles.cardTitle}>{f.title}</Text>
            <Text>⏱ {f.duration} heures</Text>
            <Text>📘 {f.type}</Text>
            <Text>💻 {f.mode}</Text>
          </View>
        ))
      )}
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
