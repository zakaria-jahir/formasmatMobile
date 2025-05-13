import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  Pressable,
  Image
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; // 👈 à installer si ce n'est pas fait

export default function Layout() {
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();

  const menuItems = [
    { id: "1", title: "Accueil", route: "/" },
    { id: "2", title: "Formations", route: "/formations" },
    { id: "3", title: "Formateurs", route: "/formateurs" },
    { id: "4", title: "Calendrier", route: "/calendrier" },
    { id: "5", title: "À propos", route: "/apropos" },
    { id: "6", title: "Connexion", route: "/login" },
    { id: "7", title: "Inscription", route: "/register" },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* NAVBAR EN HAUT */}
      <View style={styles.navbar}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
        />
        <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.menuButton}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* ROUTEUR STACK */}
      <Stack screenOptions={{ headerShown: false }} />

      {/* MODAL MENU */}
      <Modal visible={menuVisible} transparent animationType="slide">
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  navbar: {
    height: 60,
    backgroundColor: "#f9b72a",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  menuButton: {
    padding: 10,
  },
  menuIcon: {
    fontSize: 24,
    color: "#fff",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
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
  menuText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#f9b72a",
    padding: 10,
    borderRadius: 8,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  }
});
