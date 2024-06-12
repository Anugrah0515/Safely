import React, {useState} from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FollowModal } from '../Modals/FollowModal';

interface addContactsProps {
  userDetails: any,
  setUserDetails: Function
}

export const AddContacts: React.FC<addContactsProps> = ({userDetails, setUserDetails}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  

  return (
    <TouchableOpacity style={styles.button} onPress={() => setShowModal(true)}>
      <Text style={styles.buttonText}>Add Contacts</Text>
      {showModal && <FollowModal visible={showModal} onClose={() => setShowModal(false)} userDetails={userDetails} setUserDetails={setUserDetails} />}
    </TouchableOpacity>
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

