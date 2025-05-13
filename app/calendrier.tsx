import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { events } from '../app/events'; // ✅ Adapter le chemin selon ton projet

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // 🔁 Marquer toutes les dates avec un événement
  const markedDates = useMemo(() => {
    const marks: { [key: string]: any } = {};

    // Ajouter une couleur à toutes les dates avec événements
    events.forEach(event => {
      marks[event.date] = {
        marked: true,
        dotColor: '#00BFFF',
        ...(event.date === selectedDate && {
          selected: true,
          selectedColor: '#00BFFF',
        }),
      };
    });

    // Ajouter aussi la date sélectionnée (si pas déjà marquée)
    if (selectedDate && !marks[selectedDate]) {
      marks[selectedDate] = {
        selected: true,
        selectedColor: '#00BFFF',
      };
    }

    return marks;
  }, [selectedDate]);

  // 🔍 Filtrer les événements du jour
  const filteredEvents = events.filter(event => event.date === selectedDate);

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

      {/* Affichage des événements */}
      <ScrollView style={styles.scrollContainer}>
        {filteredEvents.length === 0 ? (
          <Text style={styles.noEvent}>Aucun événement ce jour.</Text>
        ) : (
          filteredEvents.map((event, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.title}>{event.title}</Text>
              <Text style={styles.time}>{event.time}</Text>
              <Text style={styles.location}>{event.location}</Text>
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
