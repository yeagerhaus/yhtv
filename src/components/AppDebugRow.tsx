import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { AppInfo } from '@modules/launcher-native';

type Props = {
  app: AppInfo;
  hasTVPreferredFocus?: boolean;
  onPress: (app: AppInfo) => void;
  onLongPress: (app: AppInfo) => void;
};

export function AppDebugRow({ app, hasTVPreferredFocus, onPress, onLongPress }: Props) {
  // react-native-tvos passes `focused` to Pressable's style callback at runtime,
  // but its typings only declare `pressed`, so track focus explicitly.
  const [focused, setFocused] = useState(false);

  return (
    <Pressable
      hasTVPreferredFocus={hasTVPreferredFocus}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onPress={() => onPress(app)}
      onLongPress={() => onLongPress(app)}
      style={[styles.row, focused && styles.focused]}
    >
      <Image
        source={{ uri: app.bannerUri ?? app.iconUri }}
        style={app.bannerUri ? styles.banner : styles.icon}
        resizeMode="contain"
      />
      <View style={styles.text}>
        <Text style={styles.label}>{app.label}</Text>
        <Text style={styles.meta}>
          {app.packageName}
          {app.isSystem ? ' · system' : ''}
          {app.bannerUri ? '' : ' · no banner'}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  focused: {
    backgroundColor: '#2c2c2e',
  },
  banner: {
    width: 80,
    height: 45,
    borderRadius: 4,
  },
  icon: {
    width: 80,
    height: 45,
  },
  text: {
    flex: 1,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  meta: {
    color: '#8e8e93',
    fontSize: 11,
  },
});
