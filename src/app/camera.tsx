import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/Screen';
import { SectionHeading } from '@/components/SectionHeading';
import { theme } from '@/config/theme';

export default function CameraScreen() {
  return (
    <Screen>
      <SectionHeading eyebrow="REGISTRO VISUAL" title="Câmera" description="Em breve, cada hidratação começará com uma fotografia." />

      <View style={styles.preview}>
        <View style={styles.cornerTopLeft} />
        <View style={styles.cornerTopRight} />
        <Ionicons name="camera-outline" size={62} color={theme.colors.primary} />
        <Text style={styles.previewTitle}>Espaço para sua foto</Text>
        <Text style={styles.previewCopy}>A câmera será conectada em uma próxima fase.</Text>
        <View style={styles.cornerBottomLeft} />
        <View style={styles.cornerBottomRight} />
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle-outline" size={23} color={theme.colors.primary} />
        <Text style={styles.infoText}>Nesta versão, o botão da Home apenas abre esta tela. Nenhum consumo é salvo.</Text>
      </View>
    </Screen>
  );
}

const cornerBase = { borderColor: theme.colors.primary, height: 24, position: 'absolute' as const, width: 24 };

const styles = StyleSheet.create({
  preview: {
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.card,
    borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
    marginTop: 34,
    minHeight: 370,
    padding: 28,
  },
  previewTitle: { color: theme.colors.text, fontSize: 19, fontWeight: '800', marginTop: 24 },
  previewCopy: { color: theme.colors.muted, fontSize: 14, lineHeight: 22, marginTop: 7, textAlign: 'center' },
  cornerTopLeft: { ...cornerBase, borderLeftWidth: 2, borderTopWidth: 2, left: 18, top: 18 },
  cornerTopRight: { ...cornerBase, borderRightWidth: 2, borderTopWidth: 2, right: 18, top: 18 },
  cornerBottomLeft: { ...cornerBase, borderBottomWidth: 2, borderLeftWidth: 2, bottom: 18, left: 18 },
  cornerBottomRight: { ...cornerBase, borderBottomWidth: 2, borderRightWidth: 2, bottom: 18, right: 18 },
  infoCard: { alignItems: 'center', backgroundColor: theme.colors.primarySoft, borderRadius: 18, flexDirection: 'row', gap: 12, marginTop: 24, padding: 18 },
  infoText: { color: theme.colors.muted, flex: 1, fontSize: 13, lineHeight: 20 },
});
