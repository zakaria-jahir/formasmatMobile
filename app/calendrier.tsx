import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const Calendrier = () => {
  return (
    <View style={styles.container}>
      <Calendar
        // Marquer la date du jour
        markedDates={{
          [new Date().toISOString().split('T')[0]]: {
            selected: true,
            marked: true,
            selectedColor: '#00adf5',
          },
        }}
        // Gérer le clic sur une date
        onDayPress={(day) => {
          console.log('Date sélectionnée :', day.dateString);
        }}
      />
    </View>
  );
};

export default Calendrier;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#fff',
  },
});
