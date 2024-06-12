import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { Modal, View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import bcrypt from 'react-native-bcrypt';
import { profileData } from '../../types';

interface OtpVerificationPasswordUpdateProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  userDetails: profileData;
  password: string;
  oldPassword: string;
}

export const OtpVerificationPasswordUpdate: React.FC<OtpVerificationPasswordUpdateProps> = ({
  showModal,
  setShowModal,
  password,
  oldPassword,
  userDetails,
}) => {
  const [confirm, setConfirm] = useState<any>(null);
  const [otp, setOtp] = useState<string>('');

  useEffect(() => {
    const sendOtp = async () => {
      if (showModal) {
        try {
          const confirmation = await auth().signInWithPhoneNumber('+91' + userDetails.phoneNumber);
          setConfirm(confirmation);
          Alert.alert('OTP sent to your phone number.');
        } catch (error) {
          console.error(error);
          Alert.alert('Failed to send OTP.');
        }
      }
    };
    if (showModal) {
      sendOtp();
    }
  }, [showModal, userDetails.phoneNumber]);

  const handleVerifyOtp = async () => {
    if (confirm && otp) {
      try {
        await confirm.confirm(otp);
        const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        const user = auth().currentUser;
        console.log(user);  

        if (user) {
          const credential = auth.EmailAuthProvider.credential(userDetails.email, oldPassword);

          try {
            // Re-authenticate the user
            await user.reauthenticateWithCredential(credential);

            // Update the password
            await user.updatePassword(password);
            const userDoc = await firestore()
              .collection('Users')
              .where('email', '==', userDetails.email)
              .get();

            if (!userDoc.empty) {
              const userDocId = userDoc.docs[0].id;
              await firestore()
                .collection('Users')
                .doc(userDocId)
                .update({
                  password: hash,
                });

              console.log('User details updated in Firestore.');
              Alert.alert('Success', 'Password updated successfully!');
            }
            setShowModal(false);
          } catch (error: any) {
            console.error('Error updating password:', error);
            Alert.alert('Error', error.message);
          }
        } else {
          Alert.alert('Error', 'No user is signed in.');
        }
      } catch (error) {
        console.log(error);
        Alert.alert('Invalid OTP. Please try again.');
      }
    } else {
      Alert.alert('Please enter the OTP sent to your phone number.');
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        setShowModal(false);
        setOtp('');
      }}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Enter the OTP sent to your phone number</Text>
          <TextInput
            style={styles.input}
            onChangeText={setOtp}
            value={otp}
            placeholder="Enter OTP"
            keyboardType="numeric"
          />
          <Button title="Verify OTP" onPress={handleVerifyOtp} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
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
  title: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});
