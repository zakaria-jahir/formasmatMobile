import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";

export default function TrainingRoomsScreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("http://192.168.0.76:5000/api/training-rooms/") // 🔁 adapte l'IP si besoin
      .then((res) => {
        setRooms(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur API salles :", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f9b72a" />
        <Text>Chargement des salles...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏫 Salles de formation</Text>
      <FlatList
        data={rooms}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/salles/${item.id}`)}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text>📍 {item.address}, {item.postal_code} {item.city}</Text>
            <Text>👥 Capacité : {item.capacity}</Text>
            {item.equipment ? <Text>🛠️ {item.equipment}</Text> : null}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  card: {
    backgroundColor: "#fff8e1",
    padding: 15,
    borderRadius: 10,
    borderColor: "#f9b72a",
    borderWidth: 1,
    marginBottom: 15,
  },
  name: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
});
