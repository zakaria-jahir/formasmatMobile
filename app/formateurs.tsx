import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function FormateursScreen() {
  const router = useRouter();
  const [formateurs, setFormateurs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://172.20.10.11:5000/api/trainers/")
      .then((response) => {
        setFormateurs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des formateurs :", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#f0a500" />
        <Text>Chargement des formateurs...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Formateurs</Text>
        <TouchableOpacity
          style={styles.newBtn}
          onPress={() => router.push("/nouveau-formateur")}
        >
          <Text style={styles.newBtnText}>+ Nouveau formateur</Text>
        </TouchableOpacity>
      </View>

      {/* Liste des formateurs */}
      {formateurs.map((f) => (
        <View key={f.id} style={styles.card}>
          {f.photo && (
            <Image
              source={{ uri: f.photo }}
              style={styles.photo}
              resizeMode="cover"
            />
          )}

          <Text style={styles.name}>
            {f.first_name} {f.last_name}
          </Text>

          <View style={styles.infoRow}>
            <Ionicons name="mail-outline" size={16} />
            <Text style={styles.infoText}>{f.email || "Non renseigné"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={16} />
            <Text style={styles.infoText}>{f.phone || "Non renseigné"}</Text>
          </View>

          {f.specialties?.length > 0 && (
            <View style={styles.specialtiesContainer}>
              <Text style={styles.label}>Spécialités :</Text>
              <View style={styles.specialties}>
                {f.specialties.map((spec, i) => (
                  <Text key={i} style={styles.specTag}>
                    {spec}
                  </Text>
                ))}
              </View>
            </View>
          )}

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
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 40,
  },
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
  photo: {
    width: "100%",
    height: 180,
    borderRadius: 8,
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
  specialtiesContainer: {
    marginTop: 10,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  specialties: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  specTag: {
    backgroundColor: "#f0a500",
    color: "white",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    marginRight: 6,
    marginBottom: 4,
    fontSize: 12,
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
