import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {EssayListScreen} from '../screens/EssayListScreen';
import {EssayPlayerScreen} from '../screens/EssayPlayerScreen';
import {LearnStackParamList} from '../types';

const Stack = createNativeStackNavigator<LearnStackParamList>();

export function LearnStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="EssayList" component={EssayListScreen} />
      <Stack.Screen
        name="EssayPlayer"
        component={EssayPlayerScreen}
        options={{presentation: 'modal', animation: 'slide_from_bottom'}}
      />
    </Stack.Navigator>
  );
}
