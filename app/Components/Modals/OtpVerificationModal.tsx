import React, { useEffect, useState } from 'react';
import auth from "@react-native-firebase/auth"
import { Modal, View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { signupDetails } from '../../types';
import useAuthStateChange from '../Firebase/authStateChange';
import firestore from "@react-native-firebase/firestore";
import bcrypt from "react-native-bcrypt";

interface otpVerificationProps {
    showModal: boolean,
    setShowModal: any,
    userDetails: signupDetails
}

export const OTPVerificationModal: React.FC<otpVerificationProps> = ({showModal, setShowModal, userDetails}) => {
    const [modalVisible, setModalVisible] = useState<boolean>(true);
    const [confirm, setConfirm] = useState<any>(null);
    const [otp, setOtp] = useState<string>('');
    

    useEffect(() => {
        const sendOtp = async () => {
            if (showModal && userDetails?.phoneNumber) {
                try {
                    const confirmation = await auth().signInWithPhoneNumber("+91 " + userDetails.phoneNumber);
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
    }, [showModal])

    const handleVerifyOtp = async () => {
        if (confirm && otp) {
            try {
				await confirm.confirm(otp);
				Alert.alert("OTP verified successfully!");
				auth()
				.createUserWithEmailAndPassword(userDetails?.email || "email", userDetails?.password || "password")
				.then(async (credential) => {
					const user = credential.user;
					console.log("User signed up...", user);
					const hash = bcrypt.hashSync(userDetails?.password || "password", bcrypt.genSaltSync(10));
					await firestore()
					.collection("Users").add({
						name: userDetails?.name,
						email: userDetails?.email,
						phoneNumber: userDetails?.phoneNumber,
						password: hash,
                        connectionRequests: [],
                        connections: []
					}).then(() => {
						// Alert.alert("User added!!!");
					})
				useAuthStateChange();
			}).catch(error => {
				if (error.code === 'auth/email-already-in-use') {
					Alert.alert('That email address is already in use!');
				}
				if (error.code === 'auth/invalid-email') {
					Alert.alert('That email address is invalid!');
				}
			})
              	setShowModal(false);
            } catch (error) {
				console.error(error);
				Alert.alert("Invalid OTP. Please try again.");
            }
        } else {
            Alert.alert("Please enter the OTP sent to your phone number.");
        }
    };

    return (
        <View style={styles.container}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={showModal}
            onRequestClose={() => {
            setModalVisible(!modalVisible);
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
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
