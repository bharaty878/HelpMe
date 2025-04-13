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
        await firestore().collection('Users').add({
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
        .collection('Users')
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
      const usersSnapshot = await firestore().collection('Users').get();
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
      await firestore().collection('Users').doc(userId).delete();
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
      <Text style={styles.header}>Add Mechanics </Text>

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
      <Button title="Add New Mechanic" onPress={addUser} color="#3b5998" />
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
// import { View, Text, Button, TextInput, FlatList } from 'react-native';
// import firestore from '@react-native-firebase/firestore';

// export default function App() {
//   const [name, setName] = useState('');
//   const [age, setAge] = useState('');
//   const [address, setAddress] = useState('');
//   const [state, setState] = useState('');
//   const [city, setCity] = useState('');
//   const [pincode, setPincode] = useState('');
//   const [contactNumber, setContactNumber] = useState('');
//   const [users, setUsers] = useState([]);

//   // Add User to Firestore
//   const addUser = async () => {
//     if (name && age && address && state && city && pincode && contactNumber) {
//       try {
//         await firestore().collection('Users').add({
//           name,
//           age: parseInt(age), // Ensure age is an integer
//           address,
//           state,
//           city,
//           pincode,
//           contact_number: contactNumber,
//           createdAt: firestore.FieldValue.serverTimestamp(), // Timestamp when the user is added
//         });
//         console.log('User added!');
//         setName('');
//         setAge('');
//         setAddress('');
//         setState('');
//         setCity('');
//         setPincode('');
//         setContactNumber('');
//       } catch (error) {
//         console.error('Error adding user: ', error);
//       }
//     }
//   };

//   // Update User in Firestore
//   const updateUser = async (userId) => {
//     try {
//       await firestore()
//         .collection('Users')
//         .doc(userId)
//         .update({
//           age: 31, // Example: Update age to 31
//         });
//       console.log('User updated!');
//     } catch (error) {
//       console.error('Error updating user: ', error);
//     }
//   };

//   // Fetch Users from Firestore
//   const fetchUsers = async () => {
//     try {
//       const usersSnapshot = await firestore().collection('Users').get();
//       const usersList = usersSnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setUsers(usersList);
//     } catch (error) {
//       console.error('Error fetching users: ', error);
//     }
//   };

//   // Delete User from Firestore
//   const deleteUser = async (userId) => {
//     try {
//       await firestore().collection('Users').doc(userId).delete();
//       console.log('User deleted!');
//       fetchUsers(); // Refresh the users list after deleting
//     } catch (error) {
//       console.error('Error deleting user: ', error);
//     }
//   };

//   useEffect(() => {
//     fetchUsers(); // Fetch users on app load
//   }, []);

//   return (
//     <View style={{ flex: 1, padding: 20 }}>
//       <Text style={{ fontSize: 24, marginBottom: 20 }}>Firebase Firestore Example</Text>

//       {/* Input for Name */}
//       <TextInput
//         style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
//         placeholder="Enter name"
//         value={name}
//         onChangeText={setName}
//       />

//       {/* Input for Age */}
//       <TextInput
//         style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
//         placeholder="Enter age"
//         keyboardType="numeric"
//         value={age}
//         onChangeText={setAge}
//       />

//       {/* Input for Address */}
//       <TextInput
//         style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
//         placeholder="Enter address"
//         value={address}
//         onChangeText={setAddress}
//       />

//       {/* Input for State */}
//       <TextInput
//         style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
//         placeholder="Enter state"
//         value={state}
//         onChangeText={setState}
//       />

//       {/* Input for City */}
//       <TextInput
//         style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
//         placeholder="Enter city"
//         value={city}
//         onChangeText={setCity}
//       />

//       {/* Input for Pincode */}
//       <TextInput
//         style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
//         placeholder="Enter pincode"
//         value={pincode}
//         onChangeText={setPincode}
//       />

//       {/* Input for Contact Number */}
//       <TextInput
//         style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
//         placeholder="Enter contact number"
//         keyboardType="numeric"
//         value={contactNumber}
//         onChangeText={setContactNumber}
//       />

//       {/* Button to Add User */}
//       <Button title="Add User" onPress={addUser} />

//       {/* Button to Update User */}
//       <Button title="Update First User" onPress={() => updateUser(users[0]?.id)} disabled={users.length === 0} />

//       {/* Users List */}
//       <FlatList
//         data={users}
//         renderItem={({ item }) => (
//           <View style={{ padding: 10, borderBottomWidth: 1 }}>
//             <Text>Name: {item.name}</Text>
//             <Text>Age: {item.age}</Text>
//             <Text>Address: {item.address}</Text>
//             <Text>State: {item.state}</Text>
//             <Text>City: {item.city}</Text>
//             <Text>Pincode: {item.pincode}</Text>
//             <Text>Contact Number: {item.contact_number}</Text>

//             {/* Delete Button */}
//             <Button title="Delete User" onPress={() => deleteUser(item.id)} />
//           </View>
//         )}
//         keyExtractor={(item) => item.id}
//       />
//     </View>
//   );
// }
