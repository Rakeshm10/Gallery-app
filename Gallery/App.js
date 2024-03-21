import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen'; // Import the HomeScreen component

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Image Gallery' }}
        />
        {/* Add more screens as needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
