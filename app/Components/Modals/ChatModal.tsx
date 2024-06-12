import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet, ScrollView } from 'react-native';
import { message, profileData } from '../../types';
import { generateChatRef } from '../Wrappers/GenerateChatReference';
import firestore from "@react-native-firebase/firestore";

interface ChatModalProps {
  isVisible: boolean;
  onClose: () => void;
  email: string;
  userDetails: profileData
}

export const ChatModal: React.FC<ChatModalProps> = ({ isVisible, onClose, email, userDetails }) => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<[message]>([{
    text: "Please wait chats are loading",
    sentBy: userDetails.email
  }]);

  const fetchMessages = async () => {
    const chatRef: string = generateChatRef(userDetails.email, email);
    const chatSnapshot: any = await firestore()
      .collection("Chats")
      .doc(chatRef)
      .get()
    setMessages(chatSnapshot.data().messages);
  }

  const addMessage = async () => {
    const chatRef: string = generateChatRef(userDetails.email, email);
    const chatSnapshot: any = await firestore()
      .collection("Chats")
      .doc(chatRef)
      .update({
        messages: messages
      })
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages(() => {
        const arr = messages;
        arr.push({
          text: newMessage,
          sentBy: userDetails.email
        });
        return arr;
      });
      addMessage();
      setNewMessage('');
    } 
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.emailText} numberOfLines={1} ellipsizeMode="tail">{email}</Text>
            <Button title="Close" onPress={onClose} />
          </View>
          <ScrollView style={styles.messageContainer}>
            {messages.map((message, index) => (
              <View
                key={index}
                style={[
                  styles.messageBubble,
                  message.sentBy == userDetails.email ? styles.myMessage : styles.theirMessage,
                ]}
              >
                <Text style={styles.messageText}>{message.text}</Text>
              </View>
            ))}
          </ScrollView>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={newMessage}
              onChangeText={setNewMessage}
              placeholder="Type your message..."
            />
            <Button title="Send" onPress={handleSend} />
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
  modalContainer: {
    height: '85%',
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  emailText: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  messageContainer: {
    flex: 1,
    marginBottom: 10,
  },
  messageBubble: {
    maxWidth: '70%',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  myMessage: {
    backgroundColor: '#daf8cb',
    alignSelf: 'flex-end',
  },
  theirMessage: {
    backgroundColor: '#f1f1f1',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
});
