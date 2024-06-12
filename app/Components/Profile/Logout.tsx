import React from 'react';
import { TouchableOpacity, Alert, Text, StyleSheet } from 'react-native';
import auth from "@react-native-firebase/auth"

export const Logout: React.FC = () => {
    const handlePress = () => {
        auth()
        .signOut()
        .then(() => {
            Alert.alert('Logged Out', 'You have been logged out successfully.');
            console.log('User signed out!');
        }).catch((error) => {
            Alert.alert('Logout Failed', error.message);
            console.error('Error signing out: ', error);
        });
    }

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.buttonText}>Logout</Text>
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