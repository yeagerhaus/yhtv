import { useEventListener } from 'expo';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { AppDebugRow } from '@/components/AppDebugRow';
import { useLaunchableApps } from '@/hooks/useLaunchableApps';
import LauncherNative, { AppInfo, PackagesChangedEvent } from '@modules/launcher-native';

// Milestone 1 debug screen: every launchable app in a plain list.
// Select launches the app; long-press opens its App info.
export default function Home() {
  const { apps, error } = useLaunchableApps();
  const [lastEvent, setLastEvent] = useState<PackagesChangedEvent | null>(null);
  const [launchError, setLaunchError] = useState<string | null>(null);

  useEventListener(LauncherNative, 'onPackagesChanged', setLastEvent);

  const launch = (app: AppInfo) => {
    try {
      setLaunchError(null);
      LauncherNative.launchApp(app.packageName);
    } catch (e) {
      setLaunchError((e as Error).message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Apps {apps ? `(${apps.length})` : ''}</Text>
        <Pressable
          onPress={() => LauncherNative.openSystemSettings()}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        >
          <Text style={styles.buttonText}>Android Settings</Text>
        </Pressable>
      </View>
      <Text style={styles.status}>
        {lastEvent ? `Last event: ${lastEvent.action} ${lastEvent.packageName}` : 'No events yet'}
        {launchError ? `  ·  ${launchError}` : ''}
      </Text>
      {error ? <Text style={styles.error}>{error.message}</Text> : null}
      <FlatList
        data={apps ?? []}
        keyExtractor={(app) => app.packageName}
        renderItem={({ item, index }) => (
          <AppDebugRow
            app={item}
            hasTVPreferredFocus={index === 0}
            onPress={launch}
            onLongPress={(app) => LauncherNative.openAppInfo(app.packageName)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 48,
    paddingTop: 27,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#1c1c1e',
  },
  buttonPressed: {
    backgroundColor: '#3a3a3c',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  status: {
    color: '#8e8e93',
    fontSize: 12,
    marginVertical: 8,
  },
  error: {
    color: '#ff453a',
    fontSize: 14,
    marginBottom: 8,
  },
});
