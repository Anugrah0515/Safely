// App.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity, Alert } from 'react-native';
import { profileData } from '../../types';

interface passwordChangeModalProps {
    isModalVisible: boolean
    setIsModalVisible: Function
    userDetails: profileData
    updatedPassword: string,
    setUpdatedPassword: Function,
    oldPassword: string,
    setOldPassword: Function
    setOtpVerification: Function
}

export const PasswordChangeModal: React.FC<passwordChangeModalProps> = ({isModalVisible, setIsModalVisible, userDetails, updatedPassword, setUpdatedPassword, oldPassword, setOldPassword, setOtpVerification}) => {
   
    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };
    return (
        <Modal
		visible={isModalVisible}
		transparent={true}
		animationType="slide"
		onRequestClose={toggleModal}
		>
		<View style={styles.modalOverlay}>
			<View style={styles.modalContent}>
			<Text style={styles.modalTitle}>Enter Details</Text>
			<TextInput
				style={styles.input}
				placeholder="Email"
				value={userDetails.email}
				keyboardType="email-address"
			/>
			<TextInput
                style={styles.input}
                placeholder="Password"
                value={updatedPassword}
                onChangeText={(text) => setUpdatedPassword(text)}
                secureTextEntry={true}
            />
            <TextInput
                style={styles.input}
                placeholder="Old Password"
                value={oldPassword}
                onChangeText={(text) => setOldPassword(text)}
                secureTextEntry={true}
            />
			<View style={styles.buttonContainer}>
				<Button title="Submit" onPress={() => updatedPassword !== oldPassword ? setOtpVerification(true) : Alert.alert("The passwords are same")} />
				<TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
				<Text style={styles.closeButtonText}>Cancel</Text>
				</TouchableOpacity>
			</View>
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
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});