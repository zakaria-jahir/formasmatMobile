import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

export default function SessionsScreen() {
  const [sessions, setSessions] = useState([]);
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get('http://192.168.0.75:8000/api/sessions/'),
      axios.get('http://192.168.0.75:8000/api/formations/')
    ])
      .then(([sessionsRes, formationsRes]) => {
        setSessions(sessionsRes.data);
        setFormations(formationsRes.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const getFormationName = (formationId) => {
    const formation = formations.find(f => f.id === formationId);
    return formation ? formation.name : 'Formation inconnue';
  };

  const getGradientByStatus = (status) => {
    switch (status) {
      case 'OUVERTE': return ['#a8e063', '#56ab2f'];
      case 'TERMINEE': return ['#bdc3c7', '#2c3e50'];
      case 'COMPLETE': return ['#89f7fe', '#66a6ff'];
      case 'NON_OUVERTE': return ['#fceabb', '#f8b500'];
      default: return ['#74ebd5', '#ACB6E5'];
    }
  };

  const getTextColorByStatus = (status) => {
    return status === 'NON_OUVERTE' ? '#000' : '#fff';
  };

  const renderItem = ({ item, index }) => {
    const formationName = getFormationName(item.formation);
    const start = item.start_date || '??';
    const end = item.end_date || '??';
    const city = item.city || 'Non définie';
    const address = item.address || '';
    const gradientColors = getGradientByStatus(item.status);
    const textColor = getTextColorByStatus(item.status);

    return (
      <Animatable.View
        animation="fadeInUp"
        duration={600}
        delay={index * 100}
      >
        <LinearGradient
          colors={gradientColors}
          style={styles.card}
        >
          <Text style={[styles.formationTitle, { color: textColor }]}>🏷️ {formationName}</Text>
          <Text style={[styles.date, { color: textColor }]}>📅 Du {start} au {end}</Text>
          <Text style={[styles.address, { color: textColor }]}>📍 {address}, {city}</Text>
          <View style={[styles.statusBadge, {
            backgroundColor: textColor === '#fff'
              ? 'rgba(255,255,255,0.2)'
              : 'rgba(0,0,0,0.2)'
          }]}>
            <Text style={[styles.statusText, { color: textColor }]}>
              {item.status.replaceAll('_', ' ')}
            </Text>
          </View>
        </LinearGradient>
      </Animatable.View>
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>📚 Sessions de formation</Text>
      <FlatList
        data={sessions}
        keyExtractor={(item, index) => (item.id || index).toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginTop: 30,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
  },
  card: {
    width: width - 30,
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 6,
  },
  formationTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 8,
  },
  date: {
    fontSize: 16,
    marginBottom: 4,
  },
  address: {
    fontSize: 15,
    marginBottom: 12,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontWeight: 'bold',
    fontSize: 13,
    textTransform: 'capitalize',
  },
});
