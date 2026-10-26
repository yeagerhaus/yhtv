import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { FocusTile } from '@/components/FocusTile';

// Milestone 0 placeholder: a row of focusable tiles to verify D-pad focus.
const TILES = Array.from({ length: 10 }, (_, i) => `Tile ${i + 1}`);

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>yhtv</Text>
      <ScrollView
        horizontal
        contentContainerStyle={styles.row}
        showsHorizontalScrollIndicator={false}
      >
        {TILES.map((label, i) => (
          <FocusTile key={label} label={label} hasTVPreferredFocus={i === 0} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    paddingHorizontal: 96,
  },
  title: {
    color: '#fff',
    fontSize: 48,
    fontWeight: '600',
    marginBottom: 48,
  },
  row: {
    gap: 32,
    paddingVertical: 24,
  },
});
