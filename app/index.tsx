import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function Index() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);

  const menuItems = [
    { id: "1", title: "Formations", route: "/formations" },
    { id: "2", title: "Formateurs", route: "/formateurs" },
    { id: "3", title: "Calendrier des formations", route: "/calendrier" },
    { id: "4", title: "A propos", route: "/apropos" },
    { id: "5", title: "Connexion", route: "/login" },
    { id: "6", title: "Inscription", route: "/register" },
  ];

  return (
    <View style={styles.container}>
      {/* Burger Menu Button */}
      <TouchableOpacity style={styles.burgerButton} onPress={() => setMenuVisible(true)}>
        <Text style={styles.burgerText}>☰</Text>
      </TouchableOpacity>

      {/* Title and Subtitle */}
      <Text style={styles.title}>Formation AssMat</Text>
      <Text style={styles.subtitle}>
        Bienvenue sur la plateforme de gestion des formations pour les assistantes maternelles.
      </Text>

      {/* Modal for Burger Menu */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FlatList
              data={menuItems}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.menuItem}
                  onPress={() => {
                    setMenuVisible(false);
                    router.push(item.route);
                  }}
                >
                  <Text style={styles.menuText}>{item.title}</Text>
                </Pressable>
              )}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setMenuVisible(false)}>
              <Text style={styles.closeButtonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  subtitle: { fontSize: 16, textAlign: "center", marginBottom: 30 },
  burgerButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "#f9b72a",
    padding: 10,
    borderRadius: 20,
    zIndex: 10,
  },
  burgerText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
    alignItems: "center",
  },
  menuText: { fontSize: 16, color: "#000", fontWeight: "bold" },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#f9b72a",
    padding: 10,
    borderRadius: 8,
  },
  closeButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
}); 