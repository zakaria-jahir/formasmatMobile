import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function SessionsScreen() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://192.168.0.76:5000/api/sessions/')
      .then(response => {
        console.log('✅ Sessions reçues :', response.data);
        setSessions(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('❌ Erreur lors du chargement des sessions :', error);
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }) => {
    const id = item.id || item.pk || item.session_id || Math.random();
    const title = item.title || 'Titre inconnu';
    const start = item.start_date || '???';
    const end = item.end_date || '???';
    const city = item.city || 'non définie';
    const address = item.address || '';

    return (
      <View style={styles.card}>
        <Text style={styles.sessionTitle}>{title}</Text>
        <Text>📆 Du {start} au {end}</Text>
        <Text>📍 {address}, {city}</Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Chargement des sessions...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📅 Liste des sessions</Text>
      <FlatList
        data={sessions}
        keyExtractor={(item, index) =>
          (item.id || item.pk || item.session_id || index).toString()
        }
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 30,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  card: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  sessionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
