import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MeditationListScreen} from '../screens/MeditationListScreen';
import {MeditationPlayerScreen} from '../screens/MeditationPlayerScreen';
import {MeditateStackParamList} from '../types';

const Stack = createNativeStackNavigator<MeditateStackParamList>();

export function MeditateStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MeditationList" component={MeditationListScreen} />
      <Stack.Screen
        name="MeditationPlayer"
        component={MeditationPlayerScreen}
        options={{presentation: 'modal', animation: 'slide_from_bottom'}}
      />
    </Stack.Navigator>
  );
}
