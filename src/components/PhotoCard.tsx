import { Image, StyleSheet, Text, View } from 'react-native';

import { theme } from '@/config/theme';
import type { Photo } from '@/types/photo';

type Props = {
  photo: Photo;
};

export function PhotoCard({ photo }: Props) {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: photo.uri }}
        accessibilityLabel={`Fotografia de ${photo.authorName}`}
        style={styles.image}
      />
      <Text style={styles.author}>{photo.authorName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.card,
    borderWidth: 1,
    overflow: 'hidden',
  },
  image: { aspectRatio: 4 / 3, width: '100%' },
  author: { color: theme.colors.text, fontSize: 15, fontWeight: '700', padding: 16 },
});
