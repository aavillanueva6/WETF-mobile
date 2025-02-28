import { Drawer } from 'expo-router/drawer';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Image } from 'react-native';

export default function DrawerLayout() {
  const colorScheme = useColorScheme();

  return (
    <Drawer
      screenOptions={{
        headerTintColor: Colors[colorScheme ?? 'light'].primary,
        drawerActiveTintColor: Colors[colorScheme ?? 'light'].primary,
      }}
    >
      <Drawer.Screen
        name='index'
        options={{
          drawerLabel: 'Home',
          title: 'WETF Radio',
          drawerIcon: ({ color }) => (
            <Image
              source={require('@/assets/images/WETFLogo.png')}
              style={{ width: 24, height: 24 }}
              resizeMode='contain'
            />
          ),
        }}
      />
      <Drawer.Screen
        name='schedule'
        options={{
          title: 'Schedule',
          drawerIcon: ({ color }) => (
            <IconSymbol size={24} name='calendar' color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name='settings'
        options={{
          title: 'Settings',
          drawerIcon: ({ color }) => (
            <IconSymbol size={24} name='gear' color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
