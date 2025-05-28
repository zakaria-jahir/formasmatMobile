import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const [state, setState] = useState({
    formData: {
      firstName: "",
      lastName: "",
      email: "",
      rpe: "",
      otherRpe: "",
    },
    errors: {},
    upcomingSessions: [],
    trainingWishes: [],
    completedTrainings: [],
  });

  const { formData, errors, upcomingSessions, trainingWishes, completedTrainings } = state;

  // Fetch user profile data and populate the form
  useEffect(() => {
    axios
      .get("http://192.168.0.75:8000/api/users/profile/")
      .then((response) => {
        const { first_name, last_name, email, rpe, other_rpe, sessions, wishes, completed } =
          response.data;

        setState((prevState) => ({
          ...prevState,
          formData: {
            firstName: first_name || "",
            lastName: last_name || "",
            email: email || "",
            rpe: rpe || "",
            otherRpe: other_rpe || "",
          },
          upcomingSessions: sessions || [],
          trainingWishes: wishes || [],
          completedTrainings: completed || [],
        }));
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
        Alert.alert("Error", "Failed to load profile data. Please try again.");
      });
  }, []);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setState((prevState) => ({
      ...prevState,
      formData: { ...prevState.formData, [field]: value },
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    axios
      .post("http://192.168.0.76:5000/api/update-profile/", formData)
      .then(() => {
        Alert.alert("Success", "Profile updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        setState((prevState) => ({
          ...prevState,
          errors: error.response?.data?.errors || { general: "An error occurred." },
        }));
      });
  };

  // Render a list with a fallback message for empty data
  const renderList = (data, renderItem, emptyMessage) => {
    return data.length > 0 ? (
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    ) : (
      <Text style={styles.noData}>{emptyMessage}</Text>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Personal Information */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Informations personnelles</Text>
        <TextInput
          style={styles.input}
          placeholder="Prénom"
          value={formData.firstName}
          onChangeText={(value) => handleInputChange("firstName", value)}
        />
        {errors.firstName && <Text style={styles.error}>{errors.firstName}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Nom"
          value={formData.lastName}
          onChangeText={(value) => handleInputChange("lastName", value)}
        />
        {errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={formData.email}
          onChangeText={(value) => handleInputChange("email", value)}
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}

        <TextInput
          style={styles.input}
          placeholder="RPE"
          value={formData.rpe}
          onChangeText={(value) => handleInputChange("rpe", value)}
        />
        {errors.rpe && <Text style={styles.error}>{errors.rpe}</Text>}

        {formData.rpe === "" && (
          <TextInput
            style={styles.input}
            placeholder="Autre RPE"
            value={formData.otherRpe}
            onChangeText={(value) => handleInputChange("otherRpe", value)}
          />
        )}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Enregistrer</Text>
        </TouchableOpacity>
      </View>

      {/* Upcoming Sessions */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Mes Formations</Text>
        {renderList(
          upcomingSessions,
          ({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.listTitle}>{item.formation.name}</Text>
              <Text style={styles.listSubtitle}>
                {item.dates.map((date) => date.date).join(", ")}
              </Text>
            </View>
          ),
          "Aucune formation à venir"
        )}
      </View>

      {/* Training Wishes */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Souhaits de formation</Text>
        {renderList(
          trainingWishes,
          ({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.listTitle}>{item.formation.name}</Text>
              <Text style={styles.listSubtitle}>
                {item.status === "assigned"
                  ? "Assigné à une session"
                  : "En attente"}
              </Text>
            </View>
          ),
          "Aucun souhait de formation"
        )}
      </View>

      {/* Completed Trainings */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Formations complétées</Text>
        {renderList(
          completedTrainings,
          ({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.listTitle}>{item.formation.name}</Text>
              <Text style={styles.listSubtitle}>
                Complété le {item.completion_date}
              </Text>
            </View>
          ),
          "Aucune formation complétée"
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9", padding: 15 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#f9b72a",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  listItem: { marginBottom: 10 },
  listTitle: { fontSize: 16, fontWeight: "bold" },
  listSubtitle: { fontSize: 14, color: "#555" },
  noData: { textAlign: "center", color: "#aaa", fontStyle: "italic" },
  error: { color: "red", fontSize: 12, marginBottom: 5 },
});