import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EndPage = ({ navigation, route }) => {
  // Retrieve the final score passed via navigation params
  const finalScore = route.params ? route.params.score : 'N/A';

  return (
    <View style={styles.container}>
      <Text style={styles.finalScoreText}>Final Score</Text>
      <Text style={styles.score}>{finalScore}</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Game')}>
          <Ionicons name="refresh" size={50} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Start')}>
          <Ionicons name="home" size={50} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  finalScoreText: {
    fontSize: 32,
    marginBottom: 10,
  },
  score: {
    fontSize: 48,
    marginBottom: 30,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: 300,
  },
  // Add any additional styles you may need
});

export default EndPage;
