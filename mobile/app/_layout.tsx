import { ClerkProvider } from '@clerk/clerk-expo'
import { Slot } from 'expo-router'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@/constants/colors';
import SafeScreen from '@/components/SafeScreen';


export default function RootLayout() {
  return (
    <ClerkProvider publishableKey="pk_test_bW92ZWQtd2FsbGFieS02OC5jbGVyay5hY2NvdW50cy5kZXYk" tokenCache={tokenCache}>
      <SafeScreen >
      <Slot />
      </SafeScreen>
      </ClerkProvider>
  );
}
