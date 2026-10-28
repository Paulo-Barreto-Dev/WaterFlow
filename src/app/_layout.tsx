import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { AuthProvider, useAuth } from '@/components/AuthProvider';
import { theme } from '@/config/theme';

function Navigator() {
  const { state, refresh } = useAuth();

  if (state.status === 'loading') {
    return <View style={styles.center}><ActivityIndicator color={theme.colors.primary} size="large" /></View>;
  }

  if (state.status === 'error') {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>Não foi possível verificar seu acesso</Text>
        <Text style={styles.errorMessage}>{state.message}</Text>
        <Pressable accessibilityRole="button" onPress={() => void refresh()} style={styles.retry}>
          <Text style={styles.retryText}>Tentar novamente</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={state.status === 'signedOut'}>
        <Stack.Screen name="login" />
      </Stack.Protected>
      <Stack.Protected guard={state.status === 'signedIn'} redirectTo="/login">
        <Stack.Screen name="(app)" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="light" />
      <Navigator />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center', backgroundColor: theme.colors.background, flex: 1, justifyContent: 'center', padding: 28 },
  errorTitle: { color: theme.colors.text, fontSize: 20, fontWeight: '800', textAlign: 'center' },
  errorMessage: { color: theme.colors.muted, fontSize: 14, lineHeight: 21, marginTop: 12, textAlign: 'center' },
  retry: { backgroundColor: theme.colors.primary, borderRadius: 16, marginTop: 24, paddingHorizontal: 22, paddingVertical: 14 },
  retryText: { color: theme.colors.background, fontWeight: '800' },
});
