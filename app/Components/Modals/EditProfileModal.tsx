// App.tsx
import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity, Alert } from 'react-native';
import { profileData } from '../../types';

interface editProfileModalProps {
    isModalVisible: boolean,
    setIsModalVisible: Function,
	profileDetails: profileData,
	setProfileDetails: Function,
	setOtpVerification: Function,
}

export const EditProfileModal: React.FC<editProfileModalProps> = ({isModalVisible, setIsModalVisible, profileDetails, setProfileDetails, setOtpVerification}) => {
    function isStringNumeric(str: string): boolean {
        return /^\d+$/.test(str) && str.length === 10;
    }

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const handleChange = (name: string, value: string) => {
        setProfileDetails({
            ...profileDetails,
            [name]: value
        })
    }

    const handleSubmit = () => {
        if (profileDetails.name.length != 0 && profileDetails.email.length != 0 && isStringNumeric(profileDetails.phoneNumber)) {
            // console.log(profileDetails);
			      setOtpVerification(true)
            setIsModalVisible(false);
        } else {
            Alert.alert("Enter details correctly")
        }
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
				placeholder="Name"
				value={profileDetails.name}
				onChangeText={(text) => handleChange("name", text)}
			/>
			<TextInput
				style={styles.input}
				placeholder={profileDetails.email}
				value={profileDetails.email}
				onChangeText={() => {}}
				keyboardType="email-address"
			/>
			<TextInput
				style={styles.input}
				placeholder="Phone Number"
				value={profileDetails.phoneNumber}
				onChangeText={(text) => handleChange("phoneNumber", text)}
				keyboardType="phone-pad"
			/>
			<View style={styles.buttonContainer}>
				<Button title="Submit" onPress={handleSubmit} />
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