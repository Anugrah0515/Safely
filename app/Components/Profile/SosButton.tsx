import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const SosButton: React.FC = () => {
  const handlePress = () => {
    console.log('SOS button pressed');
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.buttonText}>SOS Button</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginVertical: 10,
    margin: 20,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
  },
});

