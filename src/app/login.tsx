import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/components/AuthProvider';
import { theme } from '@/config/theme';

export default function LoginScreen() {
  const { state, signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [favoriteFriend, setFavoriteFriend] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin() {
    setError(null);
    if (!email.trim() || !password) {
      setError('Informe seu e-mail e sua senha.');
      return;
    }
    if (favoriteFriend.trim() !== 'Paulo') {
      setError('A resposta para amigo mais legal deve ser Paulo.');
      return;
    }

    setBusy(true);
    try {
      await signIn(email.trim(), password);
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Não foi possível entrar.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.brandIcon}><Ionicons name="water" size={32} color={theme.colors.background} /></View>
        <Text style={styles.brand}>WaterFlow</Text>
        <Text style={styles.title}>Entre na nossa turma</Text>
        <Text style={styles.subtitle}>Acesso reservado aos três amigos cadastrados pelo administrador.</Text>

        <View style={styles.form}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            accessibilityLabel="E-mail"
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            onChangeText={setEmail}
            style={styles.input}
            value={email}
          />
          <Text style={styles.label}>Senha</Text>
          <TextInput
            accessibilityLabel="Senha"
            autoCapitalize="none"
            autoComplete="password"
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            value={password}
          />
          <Text style={styles.label}>Quem é o amigo mais legal?</Text>
          <TextInput
            accessibilityLabel="Amigo mais legal"
            autoCapitalize="words"
            onChangeText={setFavoriteFriend}
            style={styles.input}
            value={favoriteFriend}
          />

          {(error || (state.status === 'signedOut' && state.message)) && (
            <Text accessibilityRole="alert" style={styles.error}>{error ?? (state.status === 'signedOut' ? state.message : '')}</Text>
          )}

          <Pressable
            accessibilityRole="button"
            disabled={busy}
            onPress={() => void handleLogin()}
            style={({ pressed }) => [styles.button, (pressed || busy) && styles.pressed]}
          >
            {busy ? <ActivityIndicator color={theme.colors.background} /> : <Text style={styles.buttonText}>ENTRAR</Text>}
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: theme.colors.background, flex: 1 },
  content: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 28, paddingVertical: 40 },
  brandIcon: { alignItems: 'center', backgroundColor: theme.colors.primary, borderRadius: 20, height: 60, justifyContent: 'center', width: 60 },
  brand: { color: theme.colors.primary, fontSize: 17, fontWeight: '800', marginTop: 18 },
  title: { color: theme.colors.text, fontSize: 29, fontWeight: '800', marginTop: 22 },
  subtitle: { color: theme.colors.muted, fontSize: 15, lineHeight: 23, marginTop: 8 },
  form: { gap: 10, marginTop: 36 },
  label: { color: theme.colors.text, fontSize: 13, fontWeight: '700', marginTop: 10 },
  input: { backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: 16, borderWidth: 1, color: theme.colors.text, fontSize: 16, minHeight: 54, paddingHorizontal: 16 },
  error: { color: '#FF9D9D', fontSize: 13, lineHeight: 20, marginTop: 8 },
  button: { alignItems: 'center', backgroundColor: theme.colors.primary, borderRadius: 18, justifyContent: 'center', minHeight: 58, marginTop: 18 },
  buttonText: { color: theme.colors.background, fontSize: 16, fontWeight: '900' },
  pressed: { opacity: 0.7 },
});
