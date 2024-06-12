import React, { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet, TextInput, View, Text, SafeAreaView, Platform, StatusBar, Image, Keyboard } from "react-native";
import { signupDetails } from "../../types";
import { OTPVerificationModal } from "../../Components/Modals/OtpVerificationModal";

interface signupProps {
    
}

export const SignupScreen: React.FC<signupProps> = () => {
    const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);
    const [userDetails, setUserDetails] = useState<signupDetails>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            handleKeyboardDidShow
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            handleKeyboardDidHide
        );
    
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const handleKeyboardDidShow = () => {
        setKeyboardVisible(true);
    };
  
    const handleKeyboardDidHide = () => {
        setKeyboardVisible(false);
    };

    function isStringNumeric(str: string): boolean {
        return /^\d+$/.test(str) && str.length === 10;
    }

    const handleChange = (name: any, event: any) => {
        const { text } = event.nativeEvent
        setUserDetails({
            ...userDetails,
            [name]: text
        })
    }

    const handleSubmit = () => {
        if(userDetails?.email?.length === 0 || userDetails?.password?.length === 0 || !isStringNumeric(userDetails?.phoneNumber as string)) return;
        else setShowModal(true);
    }

    return (
        <SafeAreaView style={styles.loginPage}>
            <View style={styles.upperDiv}>
                {!isKeyboardVisible && <Image style={styles.image} source={require("../../Assets/Logo/logo_no_background.png")} />}
                <View style={styles.details}>
                    <TextInput
                        style={styles.inputs}
                        placeholder="Name"
                        value={userDetails?.name}
                        autoCorrect={false}
                        autoComplete="off"
                        onChange={(text) => handleChange('name', text)}
                    />
                    <TextInput 
                        style={styles.inputs}
                        placeholder="Email"
                        value={userDetails?.email}
                        autoCorrect={false}
                        autoComplete="off"
                        onChange={(text) => handleChange('email', text)}
                    />
                    <TextInput 
                        style={styles.inputs}
                        placeholder="Phone Number"
                        value={userDetails?.phoneNumber}
                        autoCorrect={false}
                        autoComplete="off"
                        onChange={(text) => handleChange('phoneNumber', text)}
                    />
                    <TextInput 
                        style={styles.inputs}
                        placeholder="Password"
                        secureTextEntry={true}
                        autoCorrect={false}
                        autoComplete="off"
                        value={userDetails?.password}
                        onChange={(text) => handleChange('password', text)}
                    />
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText} onPress={handleSubmit}>Submit</Text>
                    </TouchableOpacity>
                </View>
                {showModal && <OTPVerificationModal showModal={showModal} setShowModal={setShowModal} userDetails={userDetails} />}
            </View>
            {/* <View style={styles.googleLogin}>
                <TouchableOpacity style={styles.googleButton} onPress={() => console.log("Google Signin")}>
                    <AntDesign name="google" size={20} color="#fff" style={styles.icon} />
                    <Text style={styles.googleButtonText} onPress={() => console.log("Google Login")}>Continue with Google</Text>
                </TouchableOpacity>
            </View> */}
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    loginPage: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#bfd200"
    },
    upperDiv: {
        flex: 15,
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        flex: 3,
        marginTop: "10%"
    },
    details: {
        width: "75%",
        flex: 4,
        justifyContent: "flex-end",
        paddingBottom: "10%",
        // borderBottomColor: "#000",
        // borderBottomWidth: 1,
        alignItems: "center"
    },
    inputs: {
        borderWidth: 1, 
        borderColor: '#007f5f', 
        borderRadius: 4, 
        padding: 8,
        width: 200,
        margin: 3,
        backgroundColor: "#aacc00",
    },
    button: {
        backgroundColor: '#55a630',
        borderRadius: 8,
        paddingVertical: 7,
        paddingHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: 10
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    googleLogin: {
        width: "50%",
        flex: 2,
        justifyContent: "flex-start",
        paddingTop: "10%"
    },
    googleButton: {
        flexDirection: 'row',
        backgroundColor: '#55a630',
        borderRadius: 8,
        paddingVertical: 7,
        paddingHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignItems: 'center',
    },
    googleButtonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: "auto"
    },
    icon: {
        marginRight: 10,
    },
})