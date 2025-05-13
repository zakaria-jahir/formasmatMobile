import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // ✅ Import du router

const formateurs = [
  {
    id: 1,
    name: "Abdellah chafik",
    email: "abdellah.chafik@etudiant.univ-lr.fr",
    phone: "0774738029",
  },
];

export default function FormateursScreen() {
  const router = useRouter(); // ✅ Initialisation du router

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Formateurs</Text>
        <TouchableOpacity
          style={styles.newBtn}
          onPress={() => router.push("/nouveau-formateur")} // ✅ Navigation ici
        >
          <Text style={styles.newBtnText}>+ Nouveau formateur</Text>
        </TouchableOpacity>
      </View>

      {/* Liste des formateurs */}
      {formateurs.map((f) => (
        <View key={f.id} style={styles.card}>
          <Text style={styles.name}>{f.name}</Text>

          <View style={styles.infoRow}>
            <Ionicons name="mail-outline" size={16} />
            <Text style={styles.infoText}>{f.email}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={16} />
            <Text style={styles.infoText}>{f.phone}</Text>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionBtn}>
              <Text>Détails</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Text>Modifier</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Text>Supprimer</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 15 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  title: { fontSize: 22, fontWeight: "bold" },
  newBtn: {
    backgroundColor: "#fff",
    borderColor: "#f0a500",
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  newBtnText: {
    color: "#f0a500",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff8e1",
    borderColor: "#f0a500",
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  infoText: {
    fontSize: 14,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  actionBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderColor: "#f0a500",
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
});
