import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";

export default function NouveauFormateur() {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [bio, setBio] = useState("");
  const [specialites, setSpecialites] = useState<string[]>([]);
  const [photo, setPhoto] = useState(null); // simulation, sans image picker

  const toggleSpecialite = (spec: string) => {
    setSpecialites((prev) =>
      prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Nouveau formateur</Text>

      <TextInput
        placeholder="Prénom"
        placeholderTextColor="#000"
        value={prenom}
        onChangeText={setPrenom}
        style={styles.input}
      />
      <TextInput
        placeholder="Nom"
        placeholderTextColor="#000"
        value={nom}
        onChangeText={setNom}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor="#000"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Téléphone"
        placeholderTextColor="#000"
        keyboardType="phone-pad"
        value={telephone}
        onChangeText={setTelephone}
        style={styles.input}
      />

      <Text style={styles.label}>Spécialités :</Text>
      {["Formation 1 (MIPA21)", "Formation 2 (MIPA213)"].map((s) => (
        <TouchableOpacity
          key={s}
          onPress={() => toggleSpecialite(s)}
          style={[
            styles.chip,
            specialites.includes(s) && styles.chipSelected,
          ]}
        >
          <Text>{s}</Text>
        </TouchableOpacity>
      ))}

      <TextInput
        placeholder="Biographie"
        value={bio}
        onChangeText={setBio}
        multiline
        numberOfLines={4}
        style={[styles.input, { height: 100 }]}
      />

      <Text style={styles.label}>Photo :</Text>
      <TouchableOpacity style={styles.fakeUploadBtn}>
        <Text>Choisir un fichier (simulation)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveBtn}>
        <Text style={styles.saveBtnText}>Enregistrer</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelBtn}>
        <Text style={styles.cancelBtnText}>Annuler</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 15 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  label: { fontWeight: "bold", marginTop: 10, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  chip: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 6,
    marginBottom: 5,
  },
  chipSelected: {
    backgroundColor: "#f9b72a",
    borderColor: "#f9b72a",
  },
  fakeUploadBtn: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
    alignItems: "center",
  },
  saveBtn: {
    backgroundColor: "#fff",
    borderColor: "#f0a500",
    borderWidth: 1,
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  saveBtnText: {
    color: "#f0a500",
    fontWeight: "bold",
  },
  cancelBtn: {
    backgroundColor: "#fff",
    borderColor: "#f0a500",
    borderWidth: 1,
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  cancelBtnText: {
    color: "#f0a500",
    fontWeight: "bold",
  },
});
