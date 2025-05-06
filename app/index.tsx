import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function Index() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formation AssMat</Text>
      <Text style={styles.subtitle}>
        Bienvenue sur la plateforme de gestion des formations pour les assistantes maternelles.
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.outlined]} onPress={() => router.push("/login")}>
          <Text style={[styles.buttonText, styles.outlinedText]}>Connexion</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.outlined]} onPress={() => router.push("/register")}>
          <Text style={[styles.buttonText, styles.outlinedText]}>Inscription</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
} 

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  subtitle: { fontSize: 16, textAlign: "center", marginBottom: 30 },
  buttonContainer: { width: "100%", gap: 10 },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16 },
  outlined: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#f9b72a" },
  outlinedText: { color: "#f9b72a" },
});