import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const StartPage = ({ navigation }) => {
  const handlePlayPress = () => {
    // Navigate to GamePage
    navigation.navigate('Game');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>SHARK CHASE</Text>
        <TouchableOpacity style={styles.playButton} onPress={handlePlayPress}>
          <Ionicons name="play-circle" size={64} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => console.log('Volume pressed')}>
          <Ionicons name="volume-high" size={32} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Settings pressed')}>
          <Ionicons name="settings" size={32} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 54,
    marginBottom: 20,
  },
  playButton: {
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 20,
  },
});

export default StartPage;
