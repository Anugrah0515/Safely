import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { profileData } from '../../types';
import firestore from '@react-native-firebase/firestore'
import { generateChatRef } from '../Wrappers/GenerateChatReference';

interface requestProps {
  email: string;
  userDetails: profileData,
  setUserDetails: Function
}

export const Follower: React.FC<requestProps> = ({email, userDetails, setUserDetails}) => {
  const handleUnconnect = async () => {
    const senderSnapshot = await firestore()
        .collection("Users")
        .where("email", "==", email)
        .get();
      const receiverSnapshot = await firestore()
        .collection("Users")
        .where("email", "==", userDetails.email)
        .get();

      if (senderSnapshot.empty || receiverSnapshot.empty) {
        console.log("User not found");
        return;
      }

      const senderId = senderSnapshot.docs[0].id;
      const receiverId = receiverSnapshot.docs[0].id;

      const senderConnections: string[] = senderSnapshot.docs[0].data().connections
      let arr: string[] = [];
      senderConnections.map(item => {
        if (item !== userDetails.email) 
          arr.push(item);
      })
      firestore()
        .collection("Users")
        .doc(senderId)
        .update({
          connections: arr
        })
      const receiverConnections: string[] = receiverSnapshot.docs[0].data().connectionRequests
      arr = [];
      receiverConnections.map(item => {
        if (item !== email) 
          arr.push(item);
      })
      await firestore()
        .collection("Users")
        .doc(receiverId)
        .update({
          connections: arr
        })
      await firestore()
        .collection("Chats")
        .doc(generateChatRef(email, userDetails.email))
        .delete()
      setUserDetails({
        ...userDetails,
        connections: arr
      })
  }
  return (
    <View style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.nameText}>{email}</Text>
          <View style={styles.buttonContainer}>
            <Button title="Unconnect" onPress={handleUnconnect} />
          </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#bfd200',
    margin:20
  },
  innerContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  nameText: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

