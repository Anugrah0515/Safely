import "react-native-gesture-handler";
import { StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LoginScreen } from "./app/Screens/Authentication/LoginScreen";
import { SignupScreen } from "./app/Screens/Authentication/SignUpScreen";
import { Ionicons } from '@expo/vector-icons';
import useAuthStateChange from "./app/Components/Firebase/authStateChange";
import firestore from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
import { Profile } from "./app/Screens/UserDisplays/Profile";
import { Maps } from "./app/Screens/UserDisplays/Maps";
import { ConnectedPeople } from "./app/Screens/UserDisplays/ConnectedPeople";
import { Chat } from "./app/Screens/UserDisplays/Chat";
import { profileData } from "./app/types";
import withUserDetails from "./app/Components/Wrappers/UserDetailWrapper";

const Tab = createBottomTabNavigator();

export default function App() {
  const { user, loading } = useAuthStateChange();
  const [userDetails, setUserDetails] = useState<profileData>({
    email: "",
    name: "",
    phoneNumber: "",
    connectionRequests: [""],
    connections: [""]
  });

  useEffect(() => {
    if (user && user.email) {
      const fetchData = async () => {
        const userSnapshot = await firestore()
          .collection("Users")
          .where("email", "==", user.email)
          .get();
        setUserDetails({
          email: userSnapshot.docs[0].data().email,
          name: userSnapshot.docs[0].data().name,
          phoneNumber: userSnapshot.docs[0].data().phoneNumber,
          connectionRequests: userSnapshot.docs[0].data().connectionRequests,
          connections: userSnapshot.docs[0].data().connections
        });
      };
      fetchData();
    }
  }, [user]);

  return (
    <NavigationContainer>
      {
        !user ? 
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: any = "";

              if (route.name === 'Login') {
                iconName = focused ? 'log-in' : 'log-in-outline';
              } else if (route.name === 'Signup') {
                iconName = focused ? 'person-add' : 'person-add-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#d4d700',
            tabBarInactiveTintColor: '#d4d700',
            tabBarStyle: {
              backgroundColor: '#55a630',
            },
            headerShown: false,
          })}
        >
          <Tab.Screen name="Login" component={LoginScreen} />
          <Tab.Screen name="Signup" component={SignupScreen} />
        </Tab.Navigator>
        : <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: any = "";

              if (route.name === 'Maps') {
                iconName = focused ? 'map' : 'map-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
              } else if (route.name === 'People') {
                iconName = focused ? 'people' : 'people-outline';
              } else if (route.name === 'Chat') {
                iconName = focused ? 'chatbox' : 'chatbox-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#d4d700',
            tabBarInactiveTintColor: '#d4d700',
            tabBarStyle: {
              backgroundColor: '#55a630',
            },
            headerShown: false,
          })}
        >
          <Tab.Screen name="Maps" component={withUserDetails(Maps, userDetails, setUserDetails)} />
          <Tab.Screen name="People" component={withUserDetails(ConnectedPeople, userDetails, setUserDetails)} />
          <Tab.Screen name="Chat" component={withUserDetails(Chat, userDetails, setUserDetails)} />
          <Tab.Screen name="Profile" component={withUserDetails(Profile, userDetails, setUserDetails)} />
        </Tab.Navigator>
      }
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
