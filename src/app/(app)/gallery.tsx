import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/Screen';
import { SectionHeading } from '@/components/SectionHeading';
import { PhotoCard } from '@/components/PhotoCard';
import { theme } from '@/config/theme';
import type { Photo } from '@/types/photo';

export default function GalleryScreen() {
  const photos: Photo[] = [];

  return (
    <Screen>
      <SectionHeading eyebrow="MEMÓRIAS COMPARTILHADAS" title="Galeria" description="Um lugar para reunir os registros da nossa turma." />

      {photos.length === 0 ? (
        <View style={styles.emptyState}>
          <View style={styles.iconHalo}>
            <Ionicons name="images-outline" size={42} color={theme.colors.primary} />
          </View>
          <Text style={styles.title}>Ainda não há fotografias</Text>
          <Text style={styles.description}>Quando os registros com foto estiverem disponíveis, eles aparecerão aqui para os três amigos.</Text>
        </View>
      ) : (
        <View style={styles.photoList}>
          {photos.map((photo) => <PhotoCard key={photo.id} photo={photo} />)}
        </View>
      )}

      <View style={styles.footer}>
        <Ionicons name="people-outline" size={19} color={theme.colors.primary} />
        <Text style={styles.footerText}>Galeria compartilhada em preparação</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  emptyState: {
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.card,
    borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
    marginTop: 34,
    minHeight: 360,
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  iconHalo: { alignItems: 'center', backgroundColor: theme.colors.primarySoft, borderRadius: 40, height: 80, justifyContent: 'center', width: 80 },
  title: { color: theme.colors.text, fontSize: 20, fontWeight: '800', marginTop: 25, textAlign: 'center' },
  description: { color: theme.colors.muted, fontSize: 14, lineHeight: 22, marginTop: 10, textAlign: 'center' },
  photoList: { gap: 14, marginTop: 34 },
  footer: { alignItems: 'center', flexDirection: 'row', gap: 10, justifyContent: 'center', marginTop: 26 },
  footerText: { color: theme.colors.muted, fontSize: 13 },
});
