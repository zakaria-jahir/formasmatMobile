import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

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
});
