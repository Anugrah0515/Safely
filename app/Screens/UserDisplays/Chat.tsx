import React from "react";
import { StyleSheet, SafeAreaView, Platform, StatusBar, Text } from "react-native";
import { profileData } from "../../types";
import { NameCard } from "../../Components/Chat/NameCard";

interface chatProps {
    userDetails: profileData
}

export const Chat: React.FC<chatProps> = ({userDetails}) => {
    return (
        <SafeAreaView style={styles.page}>
            {userDetails.connections.map((email: string) => {
                return <NameCard key={email} email={email} userDetails={userDetails} />
            })}
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    page: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#bfd200"
    },
})
