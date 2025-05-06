import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";

export default function Register() {
    const router = useRouter();
    const [form, setForm] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        city: "",
        postalCode: "",
        address: "",
        password1: "",
        password2: "",
      });
    
      const handleInputChange = (field, value) => {
        setForm({ ...form, [field]: value });
      };
    
      const handleRegister = () => {
        const { username, firstName, lastName, email, phone, city, postalCode, address, password1, password2 } = form;
    
        if (!username || !firstName || !lastName || !email || !phone || !city || !postalCode || !address || !password1 || !password2) {
          Alert.alert("Erreur", "Veuillez remplir tous les champs.");
          return;
        }
    
        if (password1 !== password2) {
          Alert.alert("Erreur", "Les mots de passe ne correspondent pas.");
          return;
        }
    
        // Add API call for registration here
        Alert.alert("Inscription réussie", `Bienvenue, ${username}!`);
      };
    
      return (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Inscription</Text>
    
          <TextInput
            placeholder="Nom d'utilisateur"
            placeholderTextColor="#000"
            style={styles.input}
            value={form.username}
            onChangeText={(value) => handleInputChange("username", value)}
          />
          <TextInput
            placeholder="Prénom"
            placeholderTextColor="#000"
            style={styles.input}
            value={form.firstName}
            onChangeText={(value) => handleInputChange("firstName", value)}
          />
          <TextInput
            placeholder="Nom"
            placeholderTextColor="#000"
            style={styles.input}
            value={form.lastName}
            onChangeText={(value) => handleInputChange("lastName", value)}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#000"
            style={styles.input}
            keyboardType="email-address"
            value={form.email}
            onChangeText={(value) => handleInputChange("email", value)}
          />
          <TextInput
            placeholder="Téléphone"
            placeholderTextColor="#000"
            style={styles.input}
            keyboardType="phone-pad"
            value={form.phone}
            onChangeText={(value) => handleInputChange("phone", value)}
          />
          <TextInput
            placeholder="Ville"
            placeholderTextColor="#000"
            style={styles.input}
            value={form.city}
            onChangeText={(value) => handleInputChange("city", value)}
          />
          <TextInput
            placeholder="Code postal"
            placeholderTextColor="#000"
            style={styles.input}
            keyboardType="numeric"
            value={form.postalCode}
            onChangeText={(value) => handleInputChange("postalCode", value)}
          />
          <TextInput
            placeholder="Adresse"
            placeholderTextColor="#000"
            style={styles.input}
            value={form.address}
            onChangeText={(value) => handleInputChange("address", value)}
          />
          <TextInput
            placeholder="Mot de passe"
            placeholderTextColor="#000"
            style={styles.input}
            secureTextEntry
            value={form.password1}
            onChangeText={(value) => handleInputChange("password1", value)}
          />
          <TextInput
            placeholder="Confirmer le mot de passe"
            placeholderTextColor="#000"
            style={styles.input}
            secureTextEntry
            value={form.password2}
            onChangeText={(value) => handleInputChange("password2", value)}
          />
    
          <TouchableOpacity style={[styles.button, styles.outlined]} onPress={handleRegister}>
            <Text style={styles.buttonText}>S'inscrire</Text>
          </TouchableOpacity>
    
          <Text style={styles.footerText}>
            Déjà inscrit ?{" "}
            <Text style={styles.link} onPress={() => router.push("/login")}>
              Connectez-vous
            </Text>
          </Text>
          <Text style={styles.footerText}>
            Retour à{" "}
            <Text style={styles.link} onPress={() => router.push("/")}>
              Acceuil ?
            </Text>
          </Text>
        </ScrollView>
      );
    }
    
    const styles = StyleSheet.create({
      container: { flexGrow: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
      title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 30 },
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
      outlined: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#f9b72a" },
      footerText: { textAlign: "center", marginTop: 20, fontSize: 14 },
      link: { color: "#007bff", fontWeight: "bold" },
    });