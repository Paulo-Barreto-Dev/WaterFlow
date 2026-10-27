import { StyleSheet, Text, View } from 'react-native';

import { theme } from '@/config/theme';

export function TimerPreview() {
  return (
    <View style={styles.container} accessibilityLabel="Prévia do temporizador de três horas">
      <View style={styles.outerRing}>
        <View style={styles.innerRing}>
          <Text style={styles.overline}>PRÓXIMA HIDRATAÇÃO</Text>
          <Text style={styles.time}>03:00:00</Text>
          <Text style={styles.caption}>Prévia do intervalo</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', paddingVertical: 24 },
  outerRing: {
    alignItems: 'center',
    borderColor: theme.colors.primary,
    borderRadius: 150,
    borderWidth: 7,
    height: 246,
    justifyContent: 'center',
    width: 246,
  },
  innerRing: {
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: 120,
    borderWidth: 1,
    height: 214,
    justifyContent: 'center',
    width: 214,
  },
  overline: { color: theme.colors.muted, fontSize: 10, fontWeight: '800', letterSpacing: 1.3 },
  time: { color: theme.colors.text, fontSize: 36, fontVariant: ['tabular-nums'], fontWeight: '800', marginTop: 8 },
  caption: { color: theme.colors.primary, fontSize: 12, marginTop: 7 },
});
