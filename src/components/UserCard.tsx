import { StyleSheet, Text, View } from 'react-native';

import { theme } from '@/config/theme';

type Props = {
  name: string;
  initials: string;
  accent: string;
};

export function UserCard({ name, initials, accent }: Props) {
  return (
    <View style={styles.card}>
      <View style={[styles.avatar, { backgroundColor: accent }]}>
        <Text style={styles.initials}>{initials}</Text>
      </View>
      <View style={styles.copy}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.status}>Aguardando primeiro registro</Text>
      </View>
      <View style={styles.dot} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.card,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 14,
    minHeight: 82,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  avatar: { alignItems: 'center', borderRadius: 17, height: 46, justifyContent: 'center', width: 46 },
  initials: { color: theme.colors.background, fontSize: 13, fontWeight: '900' },
  copy: { flex: 1, gap: 4 },
  name: { color: theme.colors.text, fontSize: 16, fontWeight: '700' },
  status: { color: theme.colors.muted, fontSize: 12 },
  dot: { backgroundColor: theme.colors.faint, borderRadius: 5, height: 8, width: 8 },
});
