import { useEventListener } from 'expo';
import { useCallback, useEffect, useRef, useState } from 'react';

import LauncherNative, { AppInfo } from '@modules/launcher-native';

/** The launchable app list, refreshed whenever a package is added, removed or changed. */
export function useLaunchableApps() {
  const [apps, setApps] = useState<AppInfo[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  // Package events arrive in bursts; only the latest request may update state.
  const requestId = useRef(0);

  const refresh = useCallback(() => {
    const id = ++requestId.current;
    LauncherNative.getLaunchableApps().then(
      (result) => {
        if (id !== requestId.current) return;
        setApps(result);
        setError(null);
      },
      (e: Error) => {
        if (id === requestId.current) setError(e);
      },
    );
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEventListener(LauncherNative, 'onPackagesChanged', refresh);

  return { apps, error, refresh };
}
