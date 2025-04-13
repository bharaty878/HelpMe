import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importing Ionicons

const VehicleOwnerScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Icon
        name="directions-car"
        size={100} // Make the icon large
        color="#fff"
        style={styles.carIcon}
      />

      {/* Buttons for navigation */}
      <View style={styles.buttonContainer}>
      <TouchableOpacity
          style={styles.button2}
          onPress={() => navigation.navigate('EmergencyContact')}
        >
          <Text style={styles.buttonText}>Emergency Contact</Text>
          <Icon name="connect-without-contact" size={24} color="#fff" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('FindMechanic')}
        >
          <Text style={styles.buttonText}>Find Mechanic</Text>
          <Icon name="person-pin" size={24} color="#fff" style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('FindTowingVan')}
        >
          <Text style={styles.buttonText}>Find Towing Van</Text>
          <Icon name="fire-truck" size={24} color="#fff" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('RepairYourself')}
        >
          <Text style={styles.buttonText}>Common Problems</Text>
          <Icon name="home-repair-service" size={24} color="#fff" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222222', // Darker background for contrast
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#f1f1f1', // Lighter title color
    marginBottom: 40, // Space between the title and buttons
  },
  buttonContainer: {
    width: '100%', // Make buttons span the full width
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007BFF', // Modern blue color
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 30, // Increase radius for a more modern look
    marginBottom: 15,
    width: '80%', // Buttons take up 80% of the screen width
    flexDirection: 'row', // Icons on the right side of the text
    alignItems: 'center',
    justifyContent: 'space-between', // Pushes the text to the left and icon to the right
    shadowColor: '#007BFF',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4, // Elevation for Android shadow effect
    transform: [{ scale: 1.05 }], // Subtle scale effect on press
  },
  button2: {
    backgroundColor: 'red', // Modern blue color
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 30, // Increase radius for a more modern look
    marginBottom: 15,
    width: '80%', // Buttons take up 80% of the screen width
    flexDirection: 'row', // Icons on the right side of the text
    alignItems: 'center',
    justifyContent: 'space-between', // Pushes the text to the left and icon to the right
    shadowColor: '#007BFF',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4, // Elevation for Android shadow effect
    transform: [{ scale: 1.05 }], // Subtle scale effect on press
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700', // Bolder text
    color: '#fff', // White text on buttons
    textAlign: 'left', // Align text to the left
    letterSpacing: 0.5, // Slight letter spacing for better readability
  },
  icon: {
    marginLeft: 15, // Space between the text and the icon
  },
  carIcon: {
    marginBottom: 30, // Space between the car icon and buttons
  },
});

export default VehicleOwnerScreen;
