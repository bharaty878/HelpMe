import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RoleSelectionScreen from './screens/RoleSelectionScreen';
import VehicleOwnerScreen from './screens/VehicleOwnerScreen';
import MechanicScreen from './screens/MechanicScreen';
import TowingVanScreen from './screens/TowingVanScreen';
import EmergencyContact from './screens2/EmergencyContact';
import FindMechanic from './screens2/FindMechanic';
import FindTowingVan from './screens2/FindTowingVan';
import RepairYourself from './screens2/RepairYourself';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="RoleSelection">
        <Stack.Screen
          name="RoleSelection"
          component={RoleSelectionScreen}
          options={{ headerShown: false }} // No header for RoleSelectionScreen
        />
        <Stack.Screen
          name="VehicleOwner"
          component={VehicleOwnerScreen}
          options={{ headerShown: false }} // Hide back button
        />
        <Stack.Screen
          name="Mechanic"
          component={MechanicScreen}
          options={{ headerShown: false }} // Hide back button
        />
        <Stack.Screen
          name="TowingVan"
          component={TowingVanScreen}
          options={{ headerShown: false }} // Hide back button
        />
        <Stack.Screen
          name="EmergencyContact"
          component={EmergencyContact}
        />
        <Stack.Screen
          name="FindMechanic"
          component={FindMechanic}
        />
        <Stack.Screen
          name="FindTowingVan"
          component={FindTowingVan}
        />
        <Stack.Screen
          name="RepairYourself"
          component={RepairYourself}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
