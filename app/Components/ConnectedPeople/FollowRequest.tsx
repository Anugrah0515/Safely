import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { profileData } from '../../types';
import firestore from "@react-native-firebase/firestore";
import { generateChatRef } from '../Wrappers/GenerateChatReference';

interface requestProps {
  email: string;
  userDetails: profileData;
  setUserDetails: Function;
}

export const FollowRequest: React.FC<requestProps> = ({ email, userDetails, setUserDetails }) => {
  const handleAccept = async () => {
    try {
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

      let senderConnections = senderSnapshot.docs[0].data().connections || [];
      senderConnections.push(userDetails.email);

      let receiverConnections = receiverSnapshot.docs[0].data().connections || [];
      receiverConnections.push(email);
      const chatRef = generateChatRef(userDetails.email, email);
      firestore()
        .collection("Chats")
        .doc(chatRef)
        .set({
          messages:[{
            text: "Hey!! I accepted your connection request!!",
            sentBy: userDetails.email
          }]
        })

      const updatedRequests = userDetails.connectionRequests.filter((entry: string) => entry !== email);

      await firestore()
        .collection("Users")
        .doc(senderId)
        .update({
          connections: senderConnections
        });

      await firestore()
        .collection("Users")
        .doc(receiverId)
        .update({
          connections: receiverConnections,
          connectionRequests: updatedRequests
        });

      setUserDetails({
        ...userDetails,
        connections: receiverConnections,
        connectionRequests: updatedRequests
      });

    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async () => {
    try {
      const updatedRequests = userDetails.connectionRequests.filter((entry: string) => entry !== email);

      const receiverSnapshot = await firestore()
        .collection("Users")
        .where("email", "==", userDetails.email)
        .get();

      if (receiverSnapshot.empty) {
        console.log("User not found");
        return;
      }

      const receiverId = receiverSnapshot.docs[0].id;

      await firestore()
        .collection("Users")
        .doc(receiverId)
        .update({
          connectionRequests: updatedRequests
        });

      setUserDetails({
        ...userDetails,
        connectionRequests: updatedRequests
      });

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.nameText}>{email}</Text>
        <View style={styles.buttonContainer}>
          <Button title="Accept" onPress={handleAccept} />
          <Button title="Reject" onPress={handleReject} />
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
    margin: 20,
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
