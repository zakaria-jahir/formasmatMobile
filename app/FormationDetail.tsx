import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function FormationDetail() {
  const { params } = useRoute();
  const { formation } = params;

  return (
    <ScrollView style={styles.container}>
      {/* Bloc principal animé */}
      <Animated.View entering={FadeInUp.duration(500)} style={styles.card}>
        <Text style={styles.title}>{formation.name}</Text>
        <Text style={styles.code}>Code IPERIA : {formation.code_iperia}</Text>

        <View style={styles.infoGroup}>
          <Text style={styles.label}>📍 Ville :</Text>
          <Text style={styles.value}>{formation.city} ({formation.code_postal})</Text>
        </View>

        <View style={styles.infoGroup}>
          <Text style={styles.label}>🕓 Durée :</Text>
          <Text style={styles.value}>{formation.duration} jour(s)</Text>
        </View>

        <View style={styles.infoGroup}>
          <Text style={styles.label}>📄 Type :</Text>
          <Text style={styles.value}>{formation.type}</Text>
        </View>

        <View style={styles.infoGroup}>
          <Text style={styles.label}>💡 Modes :</Text>
          <Text style={styles.value}>
            {formation.is_presentiel && 'Présentiel '}
            {formation.is_distanciel && 'Distanciel '}
            {formation.is_asynchrone && 'Asynchrone'}
          </Text>
        </View>

        <View style={styles.infoGroup}>
          <Text style={styles.label}>✅ Statut :</Text>
          <Text style={styles.value}>{formation.is_active ? 'Active' : 'Invalide'}</Text>
        </View>

        <View style={styles.infoGroup}>
          <Text style={styles.label}>📝 Description :</Text>
          <Text style={styles.value}>{formation.description}</Text>
        </View>

        <View style={styles.infoGroup}>
          <Text style={styles.label}>📅 Créée le :</Text>
          <Text style={styles.value}>{new Date(formation.created_at).toLocaleDateString()}</Text>
        </View>

        <View style={styles.infoGroup}>
          <Text style={styles.label}>🔄 Mise à jour :</Text>
          <Text style={styles.value}>{new Date(formation.updated_at).toLocaleDateString()}</Text>
        </View>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f4f8',
    paddingTop: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    margin: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  code: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#7f8c8d',
    marginBottom: 15,
  },
  infoGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495e',
  },
  value: {
    fontSize: 16,
    color: '#555',
    marginTop: 2,
  },
});
