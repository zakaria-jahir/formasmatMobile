import React from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function AproposScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.pageTitle}>À propos de Sylvan Formations</Text>

      {/* INTRO */}
      <View style={styles.section}>
        <Ionicons name="business" size={24} color="#f0a500" />
        <Text style={styles.sectionTitle}>Une aventure humaine à La Rochelle</Text>
        <Text style={styles.text}>
          Depuis 2005, Sylvan Formations accompagne des apprenants de tous horizons au cœur de La Rochelle. Située au 60 rue Albert 1er, notre structure à taille humaine place la pédagogie individualisée au centre de son engagement.
        </Text>
      </View>

      {/* MISSION */}
      <View style={styles.section}>
        <Ionicons name="target-outline" size={24} color="#f0a500" />
        <Text style={styles.sectionTitle}>Notre mission</Text>
        <Text style={styles.text}>
          Offrir à chacun l’opportunité d’évoluer professionnellement grâce à des formations de qualité, pensées pour s’adapter à votre rythme, vos objectifs et votre contexte.
        </Text>
      </View>

      {/* DOMAINES */}
      <View style={styles.section}>
        <Ionicons name="school-outline" size={24} color="#f0a500" />
        <Text style={styles.sectionTitle}>Nos domaines d’expertise</Text>
        <Text style={styles.bullet}>• Informatique & bureautique : Office, modélisation 3D</Text>
        <Text style={styles.bullet}>• Langues vivantes : anglais, espagnol, allemand, chinois</Text>
        <Text style={styles.bullet}>• Petite enfance : formations IPERIA agréées</Text>
        <Text style={styles.bullet}>• Développement personnel, webmarketing, gestion, environnement</Text>
      </View>

      {/* MÉTHODE */}
      <View style={styles.section}>
        <MaterialIcons name="auto-stories" size={24} color="#f0a500" />
        <Text style={styles.sectionTitle}>Notre approche</Text>
        <Text style={styles.bullet}>1. 🎯 Analyse personnalisée du besoin</Text>
        <Text style={styles.bullet}>2. 🛠️ Création du parcours de formation</Text>
        <Text style={styles.bullet}>3. 🚀 Mise en œuvre interactive & pratique</Text>
        <Text style={styles.bullet}>4. 🏅 Évaluation & certification (TOSA, Voltaire...)</Text>
      </View>

      {/* CERTIF */}
      <View style={styles.section}>
        <Ionicons name="ribbon-outline" size={24} color="#f0a500" />
        <Text style={styles.sectionTitle}>Qualité reconnue</Text>
        <Text style={styles.text}>
          Sylvan Formations est certifié Qualiopi au titre des actions de formation. Une reconnaissance de notre exigence, au service de votre réussite.
        </Text>
      </View>

      {/* CONTACT */}
      <View style={styles.section}>
        <Ionicons name="chatbubbles-outline" size={24} color="#f0a500" />
        <Text style={styles.sectionTitle}>On en parle ?</Text>
        <Text style={styles.text}>
          Vous avez un projet, une idée ou une reconversion en tête ? Nous serons ravis d’en discuter avec vous et de construire ensemble votre parcours.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: 25,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 8,
    marginBottom: 10,
    color: "#222",
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
    color: "#444",
    textAlign: "justify",
  },
  bullet: {
    fontSize: 15,
    marginLeft: 8,
    marginBottom: 6,
    color: "#333",
  },
});
