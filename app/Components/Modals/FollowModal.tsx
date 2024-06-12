import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { profileData } from '../../types';
import firestore from "@react-native-firebase/firestore"

interface FollowModalProps {
  visible: boolean;
  onClose: () => void;
  userDetails: profileData,
  setUserDetails: Function
}

export const FollowModal: React.FC<FollowModalProps> = ({ visible, onClose, userDetails, setUserDetails }) => {
    const [email, setEmail] = useState<string>('');

    const handleSubmit = async () => {
        const reciever = await firestore()
            .collection("Users")
            .where("email", '==', email)
            .get();
        let recieverConnectionRequests: [string] = reciever.docs[0].data().connectionRequests;
        if (!recieverConnectionRequests.includes(userDetails.email) && email !== userDetails.email && !userDetails.connections.includes(email)) {
            recieverConnectionRequests.push(userDetails.email);
            console.log(recieverConnectionRequests)
            const recieverId = reciever.docs[0].id;
            await firestore()
                .collection("Users")
                .doc(recieverId)
                .update({
                    connectionRequests: recieverConnectionRequests
                })
            onClose();
        } else Alert.alert("Request already exists");
    };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Enter the email of the user you want to connect</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <View style={styles.buttonContainer}>
            <Button title="Connect" onPress={handleSubmit} />
            <Button title="Close" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});