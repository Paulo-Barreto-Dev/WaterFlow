import { StyleSheet, Text, View } from 'react-native';

import { theme } from '@/config/theme';

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>{eyebrow}</Text>
      <Text style={styles.title}>{title}</Text>
      {description ? <Text style={styles.description}>{description}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 8 },
  eyebrow: { color: theme.colors.primary, fontSize: 12, fontWeight: '800', letterSpacing: 2.2 },
  title: { color: theme.colors.text, fontSize: 32, fontWeight: '800', letterSpacing: -0.7 },
  description: { color: theme.colors.muted, fontSize: 15, lineHeight: 23 },
});
