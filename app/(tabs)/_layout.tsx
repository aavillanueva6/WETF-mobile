import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from 'react-native';

const handleActionPress = () => {
  console.log('Action button pressed!');
  // Add your custom functionality here
};

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        //@ts-ignore
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name='house.fill' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='action'
        listeners={{
          tabPress: (e) => {
            // Prevent default action
            e.preventDefault();
            handleActionPress();
          },
        }}
        options={{
          title: 'Listen Live',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name='plus.circle.fill' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='schedule'
        options={{
          title: 'WETF Schedule',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name='paperplane.fill' color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
