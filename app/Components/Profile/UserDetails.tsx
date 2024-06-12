import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import useAuthStateChange from '../Firebase/authStateChange';
import firestore from "@react-native-firebase/firestore"
import { profileData } from '../../types';

interface userProfileProps {
  userDetails: any,
  setUserDetails: Function
}

export const UserDetails: React.FC<userProfileProps> = ({userDetails}) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.profileCard}>
                <View style={styles.image}>
                    <Image source={require("../../Assets/Logo/logo_white_background.jpg")} style={styles.image} />
                </View>
                <View style={styles.data}>
                    <Text style={styles.name}>{userDetails.name}</Text>
                    <Text style={styles.subtitle}>{userDetails.email}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: Dimensions.get("window").width
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '90%',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
    marginBottom: 20,
  },
  profilePic: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  data: {
    alignItems: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  }
});
