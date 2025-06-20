import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useUser } from "../contexts/UserContext"; // 👈 important

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { setUser } = useUser(); // 👈 pour stocker l'utilisateur connecté

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }

    try {
      const response = await fetch("http://172.20.10.11:5000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Stocker l'utilisateur dans le contexte
        setUser({ email: email }); // ou data.user si renvoyé
        Alert.alert("Connexion réussie", `Bienvenue ${email} !`);
        router.push("/");
      } else {
        Alert.alert("Erreur", data.message || "Identifiants incorrects");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur", "Connexion impossible.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>

      <TextInput
        placeholderTextColor="#000"
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholderTextColor="#000"
        placeholder="Mot de passe"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={[styles.button, styles.outlined]}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Pas encore de compte ?{" "}
        <Text style={styles.link} onPress={() => router.push("/register")}>
          Inscrivez-vous
        </Text>
      </Text>
      <Text style={styles.footerText}>
        Retour à{" "}
        <Text style={styles.link} onPress={() => router.push("/")}>
          l’accueil
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#f9b72a", fontSize: 16 },
  outlined: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#f9b72a",
  },
  footerText: { textAlign: "center", marginTop: 20, fontSize: 14 },
  link: { color: "#007bff", fontWeight: "bold" },
});
