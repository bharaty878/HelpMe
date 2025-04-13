import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

const FindMechanic = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch users data from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersSnapshot = await firestore().collection('Users').get();
        const usersList = usersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (usersList.length > 0) {
          setUsers(usersList); // Set fetched data into state
          setFilteredUsers(usersList); // Initialize filtered list as all users
        } else {
          setUsers([]); // If no data found, set empty array
          setFilteredUsers([]);
        }
      } catch (error) {
        console.error('Error fetching users from Firestore:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search query
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = users.filter(user => 
      user.city.toLowerCase().includes(query.toLowerCase()) ||
      user.pincode.toString().includes(query)
    );
    setFilteredUsers(filtered); // Update filtered users based on the search query
  };

  // Render each user in the FlatList
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>User Info</Text>
      <View style={styles.cardContent}>
        <Text style={styles.cardText}>Name: <Text style={styles.cardValue}>{item.name}</Text></Text>
        <Text style={styles.cardText}>Age: <Text style={styles.cardValue}>{item.age}</Text></Text>
        <Text style={styles.cardText}>Address: <Text style={styles.cardValue}>{item.address}</Text></Text>
        <Text style={styles.cardText}>Pincode: <Text style={styles.cardValue}>{item.pincode}</Text></Text>
        <Text style={styles.cardText}>State: <Text style={styles.cardValue}>{item.state}</Text></Text>
        <Text style={styles.cardText}>City: <Text style={styles.cardValue}>{item.city}</Text></Text>
        <Text style={styles.cardText}>Contact: <Text style={styles.cardValue}>{item.contact_number}</Text></Text>
        <View style={styles.logoview}>
          <Image
            source={require('../images/tow3.png')} 
            style={styles.logo}
          />
        </View>
      </View>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />; // Display loading indicator while fetching data
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by city or pincode"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      {filteredUsers.length > 0 ? (
        <FlatList
          data={filteredUsers} // Display filtered data in FlatList
          renderItem={renderItem} // Render each item as a card
          keyExtractor={(item) => item.id} // Unique key for each item
        />
      ) : (
        <Text style={styles.noDataText}>No user data found matching the search query.</Text> // If no filtered data found
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
    fontSize: 16,
  },
  logoview: {
    position: "absolute",
    top: "-5%",
    left: "50%",
  },
  logo: {
    width: 200, // Adjust the size of the logo
    height: 150, // Adjust the size of the logo
    resizeMode: 'contain', // Ensures the image fits well
  },
  card: {
    height: 200,
    backgroundColor: 'black',
    padding: 20,
    marginBottom: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'red',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 20,
  },
  cardTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 10,
  },
  cardContent: {
    marginTop: 10,
  },
  cardText: {
    fontSize: 10,
    color: 'white',
    marginBottom: 6,
  },
  cardValue: {
    fontWeight: '600',
    color: '#007bff',
  },
  noDataText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default FindMechanic;

// import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import firestore from '@react-native-firebase/firestore';

// const FindMechanic = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch users data from Firestore
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const usersSnapshot = await firestore().collection('Users').get();
//         const usersList = usersSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }));

//         if (usersList.length > 0) {
//           setUsers(usersList); // Set fetched data into state
//         } else {
//           setUsers([]); // If no data found, set empty array
//         }
//       } catch (error) {
//         console.error('Error fetching users from Firestore:', error);
//       } finally {
//         setLoading(false); // Set loading to false after data is fetched
//       }
//     };

//     fetchUsers();
//   }, []);

//   // Render each user in the FlatList
//   const renderItem = ({ item }) => (
//     <View style={styles.card}>
//       <Text style={styles.cardTitle}>User Info</Text>
//       <View style={styles.cardContent}>
//         <Text style={styles.cardText}>Name: <Text style={styles.cardValue}>{item.name}</Text></Text>
//         <Text style={styles.cardText}>Age: <Text style={styles.cardValue}>{item.age}</Text></Text>
//         <Text style={styles.cardText}>Address: <Text style={styles.cardValue}>{item.address}</Text></Text>
//         <Text style={styles.cardText}>Pincode: <Text style={styles.cardValue}>{item.pincode}</Text></Text>
//         <Text style={styles.cardText}>State: <Text style={styles.cardValue}>{item.state}</Text></Text>
//         <Text style={styles.cardText}>City: <Text style={styles.cardValue}>{item.city}</Text></Text>
//         <Text style={styles.cardText}>Contact: <Text style={styles.cardValue}>{item.contact_number}</Text></Text>
//         <View style={styles.logoview}>
//           <Image
//             source={require('../images/tow3.png')} 
//             style={styles.logo}
//           />
//         </View>
//       </View>
//     </View>
//   );

//   if (loading) {
//     return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />; // Display loading indicator while fetching data
//   }

//   return (
//     <View style={styles.container}>
//       {users.length > 0 ? (
//         <FlatList
//           data={users} // Display data in FlatList
//           renderItem={renderItem} // Render each item as a card
//           keyExtractor={(item) => item.id} // Unique key for each item
//         />
//       ) : (
//         <Text style={styles.noDataText}>No user data found. Please add some users.</Text> // If no user data found
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f7f7f7',
//   },
//   loading: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   logoview: {
//     position: "absolute",
//     top: "-5%",
//     left: "50%",
//   },
//   logo: {
//     width: 200, // Adjust the size of the logo
//     height: 150, // Adjust the size of the logo
//     resizeMode: 'contain', // Ensures the image fits well
//   },
//   card: {
//     height: 200,
//     backgroundColor: 'black',
//     padding: 20,
//     marginBottom: 5,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: 'red',
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 20,
//   },
//   cardTitle: {
//     fontSize: 10,
//     fontWeight: 'bold',
//     color: 'red',
//     marginBottom: 10,
//   },
//   cardContent: {
//     marginTop: 10,
//   },
//   cardText: {
//     fontSize: 10,
//     color: 'white',
//     marginBottom: 6,
//   },
//   cardValue: {
//     fontWeight: '600',
//     color: '#007bff',
//   },
//   noDataText: {
//     fontSize: 18,
//     color: '#888',
//     textAlign: 'center',
//     marginTop: 20,
//   },
// });

// export default FindMechanic;
