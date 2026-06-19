import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { View, Text } from 'react-native';
import { Colors } from '../constants/Colors';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Amiri-Regular': require('../assets/fonts/Amiri-Regular.ttf'),
    'Amiri-Bold': require('../assets/fonts/Amiri-Bold.ttf'),
    'Kufam-Regular': require('../assets/fonts/Kufam-Regular.ttf'),
  });
  
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.dark.background }}>
        <Text style={{ color: Colors.dark.gold, fontSize: 16 }}>جاري التحميل...</Text>
      </View>
    );
  }
  
  return (
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
        name="quran/index" 
        options={{ 
          title: 'المصحف',
          headerShown: true,
        }} 
      />
    </Stack>
  );
}