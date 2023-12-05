// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from "react-native-gesture-handler";

import StartPage from './components/StartPage';
import GamePage from './components/GamePage'
import EndPage from './components/EndPage';

const Stack = createStackNavigator();

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Start">
          <Stack.Screen name="Start" component={StartPage} />
          <Stack.Screen name="Game" component={GamePage} />
          <Stack.Screen name="End" component={EndPage} />
        </Stack.Navigator>
      </NavigationContainer>
      
    </GestureHandlerRootView>
  );
}

export default App;
