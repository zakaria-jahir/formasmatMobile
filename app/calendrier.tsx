import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔁 Charger les sessions depuis l'API
  useEffect(() => {
    axios.get("http://172.20.10.11/api/sessions/")
      .then((response) => {
        setSessions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des sessions :", error);
        setLoading(false);
      });
  }, []);

  // 📅 Générer les dates marquées
  const markedDates = useMemo(() => {
    const marks: { [key: string]: any } = {};

    sessions.forEach(session => {
      const date = session.start_date;
      marks[date] = {
        marked: true,
        dotColor: '#00BFFF',
        ...(date === selectedDate && {
          selected: true,
          selectedColor: '#00BFFF',
        }),
      };
    });

    if (selectedDate && !marks[selectedDate]) {
      marks[selectedDate] = {
        selected: true,
        selectedColor: '#00BFFF',
      };
    }

    return marks;
  }, [selectedDate, sessions]);

  // 🔍 Sessions du jour sélectionné
  const filteredSessions = sessions.filter(session => session.start_date === selectedDate);

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={markedDates}
        theme={{
          selectedDayBackgroundColor: '#00BFFF',
          todayTextColor: '#00BFFF',
          arrowColor: '#00BFFF',
        }}
      />

      <ScrollView style={styles.scrollContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#00BFFF" />
        ) : filteredSessions.length === 0 ? (
          <Text style={styles.noEvent}>Aucune session ce jour.</Text>
        ) : (
          filteredSessions.map((session, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.title}>{session.title || `Session ${session.id}`}</Text>
              <Text style={styles.time}>
                Du {session.start_date} au {session.end_date}
              </Text>
              <Text style={styles.location}>
                📍 {session.city || "Ville inconnue"}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  scrollContainer: {
    padding: 10,
  },
  card: {
    backgroundColor: '#FFEFD5',
    marginBottom: 12,
    padding: 15,
    borderRadius: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  time: {
    fontSize: 14,
    marginBottom: 2,
  },
  location: {
    fontSize: 13,
    color: 'gray',
  },
  noEvent: {
    textAlign: 'center',
    padding: 20,
    color: 'gray',
    fontStyle: 'italic',
  },
});
