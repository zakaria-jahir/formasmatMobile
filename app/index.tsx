import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useUser } from "../contexts/UserContext";

export default function Index() {
  const router = useRouter();
  const { user } = useUser();

  if (!user) {
    // Page de bienvenue pour les utilisateurs non connectés
    return (
      <View style={styles.container}>
        <Ionicons name="school-outline" size={60} color="#f9b72a" style={styles.icon} />
        <Text style={styles.title}>Formation AssMat</Text>
        <Text style={styles.subtitle}>
          📚 La plateforme dédiée à la formation des assistantes maternelles. Organisez, suivez et participez facilement aux sessions !
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/formations")}>
          <Text style={styles.buttonText}>Découvrir les formations</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.outlined]} onPress={() => router.push("/login")}>
          <Text style={styles.outlinedText}>Se connecter</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Dashboard utilisateur connecté
  return (
    <ScrollView contentContainerStyle={styles.dashboard}>
      <Text style={styles.welcome}>👋 Bonjour, {user.first_name || "Utilisateur"} !</Text>

      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card} onPress={() => router.push("/formations")}>
          <Ionicons name="book-outline" size={32} color="#f9b72a" />
          <Text style={styles.cardText}>Formations</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push("/calendrier")}>
          <Ionicons name="calendar-outline" size={32} color="#f9b72a" />
          <Text style={styles.cardText}>Prochaines sessions</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push("/profile")}>
          <Ionicons name="person-outline" size={32} color="#f9b72a" />
          <Text style={styles.cardText}>Mon profil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push("/TrainingRoomsScreen")}>
          <Ionicons name="business-outline" size={32} color="#f9b72a" />
          <Text style={styles.cardText}>Salles</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push("/sessions")}>
          <Ionicons name="time-outline" size={32} color="#f9b72a" />
          <Text style={styles.cardText}>Toutes les sessions</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#f9b72a",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginBottom: 15,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  outlined: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#f9b72a",
  },
  outlinedText: {
    color: "#f9b72a",
    fontWeight: "bold",
  },
  dashboard: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  welcome: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    gap: 15,
  },
  card: {
    backgroundColor: "#fef7e5",
    borderRadius: 12,
    padding: 20,
    width: "45%",
    alignItems: "center",
    marginVertical: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  cardText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    color: "#333",
  },
});
