import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [users, setUsers] = useState([]);

  // Add User to Firestore
  const addUser = async () => {
    if (name && age && address && state && city && pincode && contactNumber) {
      try {
        await firestore().collection('Users2').add({
          name,
          age: parseInt(age), // Ensure age is an integer
          address,
          state,
          city,
          pincode,
          contact_number: contactNumber,
          createdAt: firestore.FieldValue.serverTimestamp(), // Timestamp when the user is added
        });
        console.log('User added!');
        setName('');
        setAge('');
        setAddress('');
        setState('');
        setCity('');
        setPincode('');
        setContactNumber('');
      } catch (error) {
        console.error('Error adding user: ', error);
      }
    }
  };

  // Update User in Firestore
  const updateUser = async (userId) => {
    try {
      await firestore()
        .collection('Users2')
        .doc(userId)
        .update({
          age: 31, // Example: Update age to 31
        });
      console.log('User updated!');
    } catch (error) {
      console.error('Error updating user: ', error);
    }
  };

  // Fetch Users from Firestore
  const fetchUsers = async () => {
    try {
      const usersSnapshot = await firestore().collection('Users2').get();
      const usersList = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersList);
    } catch (error) {
      console.error('Error fetching users: ', error);
    }
  };

  // Delete User from Firestore
  const deleteUser = async (userId) => {
    try {
      await firestore().collection('Users2').doc(userId).delete();
      console.log('User deleted!');
      fetchUsers(); // Refresh the users list after deleting
    } catch (error) {
      console.error('Error deleting user: ', error);
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch users on app load
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Add Towing Trucks </Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter State"
        value={state}
        onChangeText={setState}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter City"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Pincode"
        keyboardType="numeric"
        value={pincode}
        onChangeText={setPincode}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Contact Number"
        keyboardType="numeric"
        value={contactNumber}
        onChangeText={setContactNumber}
      />

      {/* Add User Button */}
      <Button title="Add New Driver" onPress={addUser} color="#3b5998" />
      <Text style={styles.header}>For Assistance: 98 10 70 13 12</Text>
      <Text style={{alignSelf:"center"}}>You will get call if anyone needs you</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop:20,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  userItem: {
    padding: 15,
    backgroundColor: '#fff',
    marginVertical: 8,
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  userText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
});
// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const TowingVanScreen = () => {
//   const [name, setName] = useState('');
//   const [age, setAge] = useState('');
//   const [address, setAddress] = useState('');
//   const [pincode, setPincode] = useState('');
//   const [state, setState] = useState('');
//   const [specialization, setSpecialization] = useState('');
//   const [contact, setContact] = useState('');
//   const [submitted, setSubmitted] = useState(false);

//   // Load saved data from AsyncStorage when component mounts
//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const savedName = await AsyncStorage.getItem('name2');
//         const savedAge = await AsyncStorage.getItem('age2');
//         const savedAddress = await AsyncStorage.getItem('address2');
//         const savedPincode = await AsyncStorage.getItem('pincode2');
//         const savedState = await AsyncStorage.getItem('state2');
//         const savedSpecialization = await AsyncStorage.getItem('specialization2');
//         const savedContact = await AsyncStorage.getItem('contact2');

//         if (savedName) setName(savedName);
//         if (savedAge) setAge(savedAge);
//         if (savedAddress) setAddress(savedAddress);
//         if (savedPincode) setPincode(savedPincode);
//         if (savedState) setState(savedState);
//         if (savedSpecialization) setSpecialization(savedSpecialization);
//         if (savedContact) setContact(savedContact);

//         // If we have all details, mark as submitted
//         if (savedName && savedAge && savedAddress && savedPincode && savedState && savedSpecialization && savedContact) {
//           setSubmitted(true);
//         }
//       } catch (error) {
//         console.error('Error loading data from AsyncStorage:', error);
//       }
//     };

//     loadData();
//   }, []);

//   const handleSubmit = async () => {
//     try {
//       // Save the form data in AsyncStorage
//       await AsyncStorage.setItem('name2', name);
//       await AsyncStorage.setItem('age2', age);
//       await AsyncStorage.setItem('address2', address);
//       await AsyncStorage.setItem('pincode2', pincode);
//       await AsyncStorage.setItem('state2', state);
//       await AsyncStorage.setItem('specialization2', specialization);
//       await AsyncStorage.setItem('contact2', contact);

//       setSubmitted(true);
//     } catch (error) {
//       console.error('Error saving data to AsyncStorage:', error);
//     }
//   };

//   const handleEdit = () => {
//     setSubmitted(false);
//   };

//   return (
//     <View style={styles.container}>
//       {!submitted ? (
//         <View style={styles.formContainer}>
//           <Text style={styles.text}>Towing Truck Registration Form</Text>

//           <TextInput
//             style={styles.input}
//             placeholder="Name"
//             value={name}
//             onChangeText={setName}
//             placeholderTextColor="#888"
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Age"
//             value={age}
//             onChangeText={setAge}
//             keyboardType="numeric"
//             placeholderTextColor="#888"
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Address"
//             value={address}
//             onChangeText={setAddress}
//             placeholderTextColor="#888"
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Pincode"
//             value={pincode}
//             onChangeText={setPincode}
//             keyboardType="numeric"
//             placeholderTextColor="#888"
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="State"
//             value={state}
//             onChangeText={setState}
//             placeholderTextColor="#888"
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Specialization"
//             value={specialization}
//             onChangeText={setSpecialization}
//             placeholderTextColor="#888"
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Contact number"
//             value={contact}
//             onChangeText={setContact}
//             placeholderTextColor="#888"
//           />

//           <Button title="Submit" onPress={handleSubmit} />
//         </View>
//       ) : (
//         <View style={styles.cardContainer}>
//           <Text style={styles.text}>Mechanic Details</Text>
//           <View style={styles.card}>
//             <Text>Name: {name}</Text>
//             <Text>Age: {age}</Text>
//             <Text>Address: {address}</Text>
//             <Text>Pincode: {pincode}</Text>
//             <Text>State: {state}</Text>
//             <Text>Specialization: {specialization}</Text>
//             <Text>Contact: {contact}</Text>
//           </View>
//           <Text></Text>
//           <Text style={{ fontWeight: "800" }}>
//             You Have Successfully Submitted your Details, now you will get customer calls when they need you
//           </Text>
//           <Button title="Edit" onPress={handleEdit} />
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   formContainer: {
//     width: '100%',
//     maxWidth: 400,
//   },
//   text: {
//     fontSize: 24,
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   input: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 15,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//   },
//   cardContainer: {
//     width: '100%',
//     maxWidth: 400,
//     padding: 20,
//   },
//   card: {
//     padding: 20,
//     borderRadius: 8,
//     backgroundColor: '#f9f9f9',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
// });

// export default TowingVanScreen;
