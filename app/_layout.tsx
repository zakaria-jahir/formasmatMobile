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
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useUser, UserProvider } from "../contexts/UserContext"; // Assurez-vous que ce chemin est correct

function InnerLayout() {
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();
  const { user, logout } = useUser();

  const menuItems = [
    { id: "1", title: "Accueil", route: "/" },
    { id: "2", title: "Formations", route: "/formations" },
    { id: "3", title: "Formateurs", route: "/formateurs" },
    { id: "4", title: "Calendrier", route: "/calendrier" },
    { id: "5", title: "À propos", route: "/apropos" },
    { id: "6", title: "Sessions", route: "/sessions" },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* NAVBAR EN HAUT */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.menuButton}>
          <Ionicons name="menu" size={24} color="#fff" />
        </TouchableOpacity>

        <Image source={require("../assets/images/logo.png")} style={styles.logo} />

        <View style={styles.rightIcons}>
          {user ? (
            <>
              <View style={styles.iconWrapper}>
                <Ionicons name="person-circle-outline" size={20} color="#fff" />
                <Text style={styles.iconText}>
                  {user.first_name || user.email || "Utilisateur"}
                </Text>
              </View>
              <TouchableOpacity onPress={logout}>
                <Ionicons name="log-out-outline" size={24} color="#fff" />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity style={styles.iconWrapper} onPress={() => router.push("/login")}> 
                <Ionicons name="log-in-outline" size={20} color="#fff" />
                <Text style={styles.iconText}>Connexion</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconWrapper} onPress={() => router.push("/register")}> 
                <Ionicons name="person-add-outline" size={20} color="#fff" />
                <Text style={styles.iconText}>Inscription</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      <Stack screenOptions={{ headerShown: false }} />

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

export default function Layout() {
  return (
    <UserProvider>
      <InnerLayout />
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  navbar: {
    height: 60,
    backgroundColor: "#f9b72a",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  menuButton: {
    padding: 8,
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 5,
  },
  iconText: {
    color: "#fff",
    fontSize: 14,
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
    fontWeight: "bold",
  },
});