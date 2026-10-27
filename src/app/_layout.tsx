import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { theme } from '@/config/theme';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.faint,
          tabBarStyle: {
            backgroundColor: theme.colors.surface,
            borderTopColor: theme.colors.border,
          },
          tabBarLabelStyle: { fontSize: 11, fontWeight: '700' },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Início',
            tabBarIcon: ({ focused, size }) => <Ionicons name="home-outline" color={focused ? theme.colors.primary : theme.colors.faint} size={size} />,
          }}
        />
        <Tabs.Screen
          name="camera"
          options={{
            title: 'Câmera',
            tabBarIcon: ({ focused, size }) => <Ionicons name="camera-outline" color={focused ? theme.colors.primary : theme.colors.faint} size={size} />,
          }}
        />
        <Tabs.Screen
          name="gallery"
          options={{
            title: 'Galeria',
            tabBarIcon: ({ focused, size }) => <Ionicons name="images-outline" color={focused ? theme.colors.primary : theme.colors.faint} size={size} />,
          }}
        />
      </Tabs>
    </>
  );
}
