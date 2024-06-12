import React, {useEffect, useState} from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { EditProfileModal } from '../Modals/EditProfileModal';
import { profileData } from '../../types';
import { OTPVerificationForEditProfileModal } from '../Modals/OtpVerificationForEditProfile';

interface editProfileProps {
	userDetails: profileData,
	setUserDetails: Function
}

export const EditProfile: React.FC<editProfileProps> = ({userDetails, setUserDetails}) => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [profileDetails, setProfileDetails] = useState<profileData>({
		email: userDetails.email,
		name: "",
		phoneNumber: "",
		connectionRequests: [""],
		connections: [""]
	});
	const [otpVerification, setOtpVerification] = useState<boolean>(false);
    const handlePress = () => {
        setIsModalVisible(true);
    };
    return (
		<View>
			<TouchableOpacity style={styles.button} onPress={handlePress}>
				<Text style={styles.buttonText}>Edit Profile</Text>
			</TouchableOpacity>
			{isModalVisible && <EditProfileModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} profileDetails={profileDetails} setProfileDetails={setProfileDetails} setOtpVerification={setOtpVerification} />}
			{otpVerification && <OTPVerificationForEditProfileModal showModal={otpVerification} setShowModal={setOtpVerification} profileDetails={profileDetails} userDetails={userDetails} setUserDetails={setUserDetails} />}
		</View>
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

