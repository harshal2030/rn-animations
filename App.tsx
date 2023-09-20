import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import {Examples} from './src/Examples';
import { PanGesture } from './src/PanGesture';
import { Transitions } from './src/Transitions';
import { Animations } from './src/Animations/Animations';
import { CircularSlider } from './src/CircularSlider/CircularSlider';
import { Graph } from './src/Graph/Graph';
import { Swiping } from './src/Swiping/Swiping';
import {DynamicSpring} from './src/DynamicSpring/DynamicSpring';
import { DragToSort } from './src/DragToSort';
import { Bezier } from './src/Bezier';
import { ShapeMorphing } from './src/ShapeMorphing';

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
        <Stack.Screen
          name="Animations"
          component={Animations}
          options={{
            title: "Animations",
          }}
        />
        <Stack.Screen name="Transitions" component={Transitions} options={{title: "Transitions"}} />
        <Stack.Screen name="CircularSlider" component={CircularSlider} options={{title: "Circular Slider"}} />
        <Stack.Screen name="Graph" component={Graph} options={{title: "Graph"}} />
        <Stack.Screen name="Swiping" component={Swiping} options={{title: "Swiping"}} />
        <Stack.Screen name="DynamicSpring" component={DynamicSpring} options={{title: "Dynamic Spring"}} />
        <Stack.Screen name="DragToSort" component={DragToSort} options={{title: "Drag To Sort"}} />
        <Stack.Screen name="Bezier" component={Bezier} options={{title: "Bezier Curves"}} />
        <Stack.Screen name="ShapeMorphing" component={ShapeMorphing} options={{title: "Shape Morphing"}} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
