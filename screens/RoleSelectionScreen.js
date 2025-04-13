import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons

const RoleSelectionScreen = ({ navigation }) => {
  return (
    <View style={styles.overlay}>
      <Text style={styles.title0}>Help Me</Text>
      <Text style={styles.title}>Vehicle Breakdown Expert</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace('VehicleOwner')}
      >
        <Icon name="car" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Vehicle Owner</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace('Mechanic')}
      >
        <Icon name="wrench" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Mechanic</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace('TowingVan')}
      >
        <Icon name="truck" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Towing Truck Owner</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  title0: {
    fontSize: 50,
    fontFamily: "cursive",
    color: 'red',
    fontWeight: '700',
    marginBottom: 2,
  },
  title: {
    fontSize: 30,
    color: '#fff',
    fontWeight: "100",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: "500",
    marginBottom: 40,
  },
  button: {
    flexDirection: 'row', // Align icon and text horizontally
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    width: '100%',
    marginBottom: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10, // Space between icon and text
  },
  icon: {
    marginRight: 10, // Space between icon and text
  }
});

export default RoleSelectionScreen;
