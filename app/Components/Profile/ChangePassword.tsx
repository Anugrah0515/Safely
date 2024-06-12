import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { PasswordChangeModal } from '../Modals/PasswordChangeModal';
import { OtpVerificationPasswordUpdate } from '../Modals/OtpVerificationPasswordUpdate';


interface changePasswordProps {
    userDetails: any,
    setUserDetails: Function
  }

export const ChangePassword: React.FC<changePasswordProps> = ({userDetails, setUserDetails}) => {
    const [updatedPassword, setUpdatedPassword] = useState<string>("");
    const [oldPassword, setOldPassword] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [otpVerification, setOtpVerification] = useState<boolean>(false);

  return (
    <View>
            <TouchableOpacity style={styles.button} onPress={() => setShowModal(true)}>
        <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
        {showModal && <PasswordChangeModal isModalVisible={showModal} setIsModalVisible={setShowModal} userDetails={userDetails} setOtpVerification={setOtpVerification} updatedPassword={updatedPassword} setUpdatedPassword={setUpdatedPassword} oldPassword={oldPassword} setOldPassword={setOldPassword} />}
        {otpVerification && <OtpVerificationPasswordUpdate showModal={otpVerification} setShowModal={setOtpVerification} userDetails={userDetails} password={updatedPassword} oldPassword={oldPassword} />}
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

