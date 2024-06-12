import React, { useEffect, useState } from 'react';
import auth from "@react-native-firebase/auth";
import { Modal, View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { profileData } from '../../types';
import firestore from "@react-native-firebase/firestore";

interface otpVerificationForEditProfileProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  userDetails: profileData;
  profileDetails: profileData;
  setUserDetails: Function
}

export const OTPVerificationForEditProfileModal: React.FC<otpVerificationForEditProfileProps> = ({ showModal, setShowModal, profileDetails, userDetails, setUserDetails }) => {
    // console.log(userDetails)
  const [confirm, setConfirm] = useState<any>(null);
  const [otp, setOtp] = useState<string>('');

  useEffect(() => {
    const sendOtp = async () => {
      if (showModal) {
        try {
          const confirmation = await auth().signInWithPhoneNumber("+91" + userDetails.phoneNumber);
          setConfirm(confirmation);
          Alert.alert("OTP sent to your phone number.");
        } catch (error) {
          console.error(error);
          Alert.alert("Failed to send OTP.");
        }
      } else {
        Alert.alert("Please enter a valid phone number.");
      }
    }
    sendOtp();
  }, [showModal]);

  const handleVerifyOtp = async () => {
    if (confirm && otp) {
      try {
        await confirm.confirm(otp);
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
              name: profileDetails.name,
              phoneNumber: profileDetails.phoneNumber,
              // Add any other fields you need to update here
            }).then(() => {
                setUserDetails({
                    ...userDetails,
                    phoneNumber: profileDetails.phoneNumber,
                    name: profileDetails.name
                })
            });

          console.log("User details updated in Firestore.");
          Alert.alert("Profile updated successfully.");
        } else {
          console.log("User document not found.");
          Alert.alert("User document not found.");
        }
        setShowModal(false);
      } catch (error) {
        console.log(error);
        Alert.alert("Invalid OTP. Please try again.");
      }
    } else {
      Alert.alert("Please enter the OTP sent to your phone number.");
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        setShowModal(false);
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
