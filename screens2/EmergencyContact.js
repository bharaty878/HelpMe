import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Linking } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const EmergencyContact = () => {
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [contacts, setContacts] = useState([]);

  // Load contacts from AsyncStorage when the component mounts
  useEffect(() => {
    const loadContacts = async () => {
      try {
        const storedContacts = await AsyncStorage.getItem('contacts');
        if (storedContacts) {
          setContacts(JSON.parse(storedContacts));
        }
      } catch (error) {
        console.error('Failed to load contacts from AsyncStorage', error);
      }
    };

    loadContacts();
  }, []);

  // Function to save contacts to AsyncStorage
  const saveContacts = async (contactsList) => {
    try {
      await AsyncStorage.setItem('contacts', JSON.stringify(contactsList));
    } catch (error) {
      console.error('Failed to save contacts to AsyncStorage', error);
    }
  };

  // Function to handle adding a new contact
  const addContact = () => {
    if (name && contactNumber) {
      const newContact = { id: Date.now().toString(), name, contactNumber };
      const updatedContacts = [...contacts, newContact];
      setContacts(updatedContacts);
      saveContacts(updatedContacts); // Save updated contacts to AsyncStorage
      setName('');
      setContactNumber('');
    }
  };

  // Function to handle editing a contact
  const editContact = (id, newName, newContactNumber) => {
    const updatedContacts = contacts.map(contact =>
      contact.id === id ? { ...contact, name: newName, contactNumber: newContactNumber } : contact
    );
    setContacts(updatedContacts);
    saveContacts(updatedContacts); // Save updated contacts to AsyncStorage
  };

  // Function to initiate a phone call
  const makeCall = (phoneNumber) => {
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url).catch(err => console.error('Error:', err));
  };

  // Render each contact item
  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.cardText}>Name: {item.name}</Text>
        <Text style={styles.cardText}>Contact: {item.contactNumber}</Text>

        <View style={styles.contactActions}>
          {/* Call icon */}
          <TouchableOpacity onPress={() => makeCall(item.contactNumber)}>
            <Icon name="phone" size={25} color="#28a745" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => {
              setName(item.name);
              setContactNumber(item.contactNumber);
              setContacts(contacts.filter(contact => contact.id !== item.id)); // Temporarily remove item
            }}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Emergency Contacts</Text>

      {/* Input fields for name and contact number */}
      <TextInput
        style={styles.input}
        placeholder="Enter name"
        placeholderTextColor={"red"}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter contact number"
        placeholderTextColor={"red"}

        value={contactNumber}
        keyboardType="phone-pad"
        onChangeText={setContactNumber}
      />

      {/* Button to add a new contact */}
      <TouchableOpacity style={styles.button} onPress={addContact}>
        <Text style={styles.buttonText}>Add Contact</Text>
      </TouchableOpacity>

      {/* FlatList to display contacts */}
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default EmergencyContact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  card: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 10,
  },
  cardText: {
    fontSize: 18,
    marginBottom: 10,
  },
  contactActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#007bff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});
