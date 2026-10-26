import { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

type Props = {
  label: string;
  hasTVPreferredFocus?: boolean;
  onPress?: () => void;
};

export function FocusTile({ label, hasTVPreferredFocus, onPress }: Props) {
  // react-native-tvos passes `focused` to Pressable's style callback at runtime,
  // but its typings only declare `pressed`, so track focus explicitly.
  const [focused, setFocused] = useState(false);

  return (
    <Pressable
      hasTVPreferredFocus={hasTVPreferredFocus}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onPress={onPress}
      style={[styles.tile, focused && styles.focused]}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    width: 320,
    height: 180,
    borderRadius: 16,
    backgroundColor: '#1c1c1e',
    justifyContent: 'flex-end',
    padding: 20,
    opacity: 0.7,
  },
  focused: {
    backgroundColor: '#3a3a3c',
    opacity: 1,
    transform: [{ scale: 1.08 }],
  },
  label: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '500',
  },
});
