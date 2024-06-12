import React from "react";
import { StyleSheet, SafeAreaView, Platform, StatusBar, Text } from "react-native";

interface mapProps {

}

export const Maps: React.FC<mapProps> = () => {
    return (
        <SafeAreaView style={styles.page}>
            <Text>Maps</Text>
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
