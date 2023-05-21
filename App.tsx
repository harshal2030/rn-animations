import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import {Examples} from './src/Examples';
import { PanGesture } from './src/PanGesture';
import { Transitions } from './src/Transitions';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator>
          <Stack.Screen
            name="Examples"
            component={Examples}
            options={{
              title: "Learn Reanimated 2",
            }}
          />
          <Stack.Screen
          name="PanGesture"
          component={PanGesture}
          options={{
            title: "PanGesture",
          }}
        />
        <Stack.Screen name="Transitions" component={Transitions} options={{title: "Transitions"}} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
