import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {LearnStack} from './LearnStack';
import {MeditateStack} from './MeditateStack';
import {ProfileScreen} from '../screens/ProfileScreen';
import {colors} from '../utils/theme';
import {RootTabParamList} from '../types';
import {Text, StyleSheet} from 'react-native';

const Tab = createBottomTabNavigator<RootTabParamList>();

function TabIcon({label, focused}: {label: string; focused: boolean}) {
  const icons: Record<string, string> = {
    Learn: '📖',
    Meditate: '🧘',
    Profile: '👤',
  };
  return (
    <Text style={[styles.icon, focused && styles.iconFocused]}>
      {icons[label] || '•'}
    </Text>
  );
}

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused}) => (
          <TabIcon label={route.name} focused={focused} />
        ),
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
      })}>
      <Tab.Screen name="Learn" component={LearnStack} />
      <Tab.Screen name="Meditate" component={MeditateStack} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.surface,
    borderTopColor: '#E8E0D6',
    borderTopWidth: 1,
    paddingTop: 8,
    height: 88,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  icon: {
    fontSize: 24,
  },
  iconFocused: {
    transform: [{scale: 1.1}],
  },
});
