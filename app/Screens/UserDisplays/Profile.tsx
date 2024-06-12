import React from "react";
import { StyleSheet, SafeAreaView, Platform, StatusBar, Text, View } from "react-native";
import { UserDetails } from "../../Components/Profile/UserDetails";
import { Logout } from "../../Components/Profile/Logout";
import { AddContacts } from "../../Components/Profile/AddContacts";
import { EditProfile } from "../../Components/Profile/EditProfile";
import { SosButton } from "../../Components/Profile/SosButton";
import { profileData } from "../../types";
import { ChangePassword } from "../../Components/Profile/ChangePassword";

interface profileProps {
    userDetails: profileData
    setUserDetails: Function
}

export const Profile: React.FC<profileProps> = ({userDetails, setUserDetails}) => {
    return (
        <SafeAreaView style={styles.page}>
            <View>
                <UserDetails userDetails={userDetails} setUserDetails={setUserDetails} />
                <SosButton />
                {/* <ChangePassword userDetails={userDetails} setUserDetails={setUserDetails} /> */}
                <AddContacts userDetails={userDetails} setUserDetails={setUserDetails} />
                <EditProfile userDetails={userDetails} setUserDetails={setUserDetails} />
                <Logout />
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    page: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#bfd200"
    },
})
