import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from "react-native";
import axios from "axios";
import MapView, { Marker } from "react-native-maps";

const screenWidth = Dimensions.get("window").width;

export default function SalleDetail() {
  const { id } = useLocalSearchParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://192.168.0.75:8000/api/training-rooms/${id}/`)
      .then((res) => {
        setRoom(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur chargement salle :", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f9b72a" />
        <Text>Chargement...</Text>
      </View>
    );
  }

  if (!room) {
    return (
      <View style={styles.center}>
        <Text>❌ Salle introuvable</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{room.name}</Text>
      <Text style={styles.label}>📍 Adresse :</Text>
      <Text>{room.address}, {room.postal_code} {room.city}</Text>
      <Text style={styles.label}>👥 Capacité :</Text>
      <Text>{room.capacity} personnes</Text>
      {room.equipment && (
        <>
          <Text style={styles.label}>🛠️ Équipement :</Text>
          <Text>{room.equipment}</Text>
        </>
      )}

      {/* MAP */}
      {room.latitude && room.longitude && (
        <>
          <Text style={styles.label}>🗺️ Localisation :</Text>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: room.latitude,
              longitude: room.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: room.latitude,
                longitude: room.longitude,
              }}
              title={room.name}
              description={room.address}
            />
          </MapView>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  label: { fontWeight: "bold", marginTop: 15 },
  map: {
    width: screenWidth - 40,
    height: 250,
    marginTop: 15,
    borderRadius: 10,
  },
});
