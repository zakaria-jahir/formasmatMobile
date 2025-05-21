import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity, ActivityIndicator } from "react-native";
import { useUser } from "../contexts/UserContext";
import { useColorScheme } from "react-native";
import axios from "axios";

export default function ProfileScreen() {
  const { user, setUser, logout } = useUser();
  const systemTheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemTheme === "dark");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://192.168.0.75:8000/api/me/", {
        withCredentials: true, // si tu utilises les sessions
        headers: {
          // Authorization: `Bearer ${token}` si tu utilises JWT
        },
      })
      .then((res) => {
        setUser(res.data); // met à jour le contexte
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur profil :", err);
        setLoading(false);
      });
  }, []);

  const handleToggleTheme = () => setIsDarkMode((prev) => !prev);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f9b72a" />
        <Text>Chargement du profil...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.title, isDarkMode && styles.darkText]}>👤 Mon Profil</Text>

      <View style={styles.section}>
        <Text style={[styles.label, isDarkMode && styles.darkText]}>Nom :</Text>
        <Text style={isDarkMode && styles.darkText}>
          {user?.first_name} {user?.last_name}
        </Text>

        <Text style={[styles.label, isDarkMode && styles.darkText]}>Email :</Text>
        <Text style={isDarkMode && styles.darkText}>{user?.email}</Text>

        <Text style={[styles.label, isDarkMode && styles.darkText]}>Téléphone :</Text>
        <Text style={isDarkMode && styles.darkText}>{user?.phone || "Non renseigné"}</Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.label, isDarkMode && styles.darkText]}>🌙 Thème sombre</Text>
        <Switch value={isDarkMode} onValueChange={handleToggleTheme} />
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutText}>Se déconnecter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  darkContainer: { backgroundColor: "#1a1a1a" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  darkText: { color: "#fff" },
  section: { marginBottom: 20 },
  label: { fontWeight: "bold", marginTop: 10 },
  logoutBtn: {
    marginTop: 20,
    backgroundColor: "#f44336",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutText: { color: "#fff", fontWeight: "bold" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
