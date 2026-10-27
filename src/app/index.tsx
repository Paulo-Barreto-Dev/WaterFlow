import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/Screen';
import { SectionHeading } from '@/components/SectionHeading';
import { TimerPreview } from '@/components/TimerPreview';
import { UserCard } from '@/components/UserCard';
import { previewUsers } from '@/config/preview';
import { theme } from '@/config/theme';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <Screen>
      <View style={styles.brandRow}>
        <View style={styles.brandIcon}><Ionicons name="water" size={22} color={theme.colors.background} /></View>
        <Text style={styles.brand}>WaterFlow</Text>
        <View style={styles.phaseBadge}><Text style={styles.phaseText}>FASE 1</Text></View>
      </View>

      <View style={styles.heading}>
        <SectionHeading eyebrow="SEU RITMO" title="Um gole de cada vez." description="Uma pausa para cuidar de você e acompanhar seus amigos." />
      </View>

      <TimerPreview />

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Bebi água, abrir câmera"
        onPress={() => router.push('/camera')}
        style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
      >
        <Ionicons name="water" size={23} color={theme.colors.background} />
        <Text style={styles.primaryButtonText}>BEBI ÁGUA!</Text>
      </Pressable>
      <Text style={styles.buttonHint}>Na próxima fase, o registro incluirá uma foto.</Text>

      <View style={styles.friendsHeading}>
        <Text style={styles.friendsTitle}>Nossa turma</Text>
        <Text style={styles.friendsCount}>3 pessoas</Text>
      </View>
      <View style={styles.cards}>
        {previewUsers.map((user) => (
          <UserCard key={user.id} name={user.name} initials={user.initials} accent={user.color} />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  brandRow: { alignItems: 'center', flexDirection: 'row', gap: 10 },
  brandIcon: { alignItems: 'center', backgroundColor: theme.colors.primary, borderRadius: 12, height: 36, justifyContent: 'center', width: 36 },
  brand: { color: theme.colors.text, flex: 1, fontSize: 20, fontWeight: '800', letterSpacing: -0.5 },
  phaseBadge: { backgroundColor: theme.colors.primarySoft, borderRadius: theme.radius.pill, paddingHorizontal: 11, paddingVertical: 7 },
  phaseText: { color: theme.colors.primary, fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  heading: { marginTop: 38 },
  primaryButton: { alignItems: 'center', backgroundColor: theme.colors.primary, borderRadius: 22, flexDirection: 'row', gap: 10, justifyContent: 'center', minHeight: 64 },
  primaryButtonText: { color: theme.colors.background, fontSize: 18, fontWeight: '900', letterSpacing: 0.5 },
  pressed: { opacity: 0.75 },
  buttonHint: { color: theme.colors.faint, fontSize: 12, marginTop: 12, textAlign: 'center' },
  friendsHeading: { alignItems: 'baseline', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16, marginTop: 36 },
  friendsTitle: { color: theme.colors.text, fontSize: 21, fontWeight: '800' },
  friendsCount: { color: theme.colors.muted, fontSize: 13 },
  cards: { gap: 10 },
});
