import React from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { View, Text, StatusBar } from 'react-native';
import { AudioProvider } from '../contexts/AudioContext';
import PlayerBar from '../components/PlayerBar';
import { Colors } from '../constants/Colors';

export default function RootLayout() {
  var fontsLoaded = useFonts({
    'Amiri-Regular': require('../assets/fonts/Amiri-Regular.ttf'),
    'Amiri-Bold': require('../assets/fonts/Amiri-Bold.ttf'),
    'Kufam-Regular': require('../assets/fonts/Kufam-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.dark.background }}>
        <StatusBar barStyle="light-content" backgroundColor={Colors.dark.background} />
        <Text style={{ color: Colors.dark.gold, fontSize: 16, fontFamily: 'Kufam-Regular' }}>جاري التحميل...</Text>
      </View>
    );
  }

  return (
    <AudioProvider>
      <StatusBar barStyle="light-content" backgroundColor={Colors.dark.background} />
      <View style={{ flex: 1, backgroundColor: Colors.dark.background }}>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.dark.background,
            },
            headerTintColor: Colors.dark.gold,
            headerTitleStyle: {
              fontFamily: 'Kufam-Regular',
            },
            contentStyle: {
              backgroundColor: Colors.dark.background,
            },
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: 'Atlas of Islam',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="quran/index"
            options={{
              title: 'المصحف',
              headerShown: true,
            }}
          />
        </Stack>
        <PlayerBar />
      </View>
    </AudioProvider>
  );
}
