import React, { useState } from "react";
import { StyleSheet, SafeAreaView, Platform, StatusBar, Text } from "react-native";
import { profileData } from "../../types";
import { FollowRequest } from "../../Components/ConnectedPeople/FollowRequest";
import firestore from "@react-native-firebase/firestore"
import { Follower } from "../../Components/ConnectedPeople/Follower";

interface connectedPeopleProps {
    userDetails: profileData
    setUserDetails: Function
}

export const ConnectedPeople: React.FC<connectedPeopleProps> = ({userDetails, setUserDetails}) => {
    console.log(userDetails)
    return (
        <SafeAreaView style={styles.page}>
            <Text style={styles.heading}>Following</Text>
            {userDetails.connections.map((email: string) => {
                return <Follower key={email} email={email} userDetails={userDetails} setUserDetails={setUserDetails} />
            })}
            <Text style={styles.heading}>Follow Requests</Text>
            {userDetails.connectionRequests.map((email: string) => {
                return <FollowRequest key={email} email={email} userDetails={userDetails} setUserDetails={setUserDetails} />
            })}
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
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
    },
})
