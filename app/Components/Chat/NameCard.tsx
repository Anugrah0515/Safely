import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { profileData } from '../../types';
import { ChatModal } from '../Modals/ChatModal';
import { generateChatRef } from '../Wrappers/GenerateChatReference';
import firestore from "@react-native-firebase/firestore";

interface NameCardProps {
  email: string;
  userDetails: profileData
}

export const NameCard: React.FC<NameCardProps> = ({ email, userDetails }) => {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <TouchableOpacity style={styles.outerContainer} onPress={() => setVisible(true)}>
      <View style={styles.innerContainer}>
        <Text style={styles.nameText}>{email}</Text>
      </View>
      {visible && <ChatModal isVisible={visible} onClose={() => setVisible(false)} email={email} userDetails={userDetails} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#bfd200',
    margin: 20,
  },
  innerContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  nameText: {
    fontSize: 20,
    textAlign: 'center',
  },
});

