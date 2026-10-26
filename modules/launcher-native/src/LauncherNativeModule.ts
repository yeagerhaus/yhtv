import { NativeModule, requireNativeModule } from 'expo';

import { AppInfo, LauncherNativeModuleEvents } from './LauncherNative.types';

declare class LauncherNativeModule extends NativeModule<LauncherNativeModuleEvents> {
  /** Apps with a LEANBACK_LAUNCHER or LAUNCHER activity, sorted by label. */
  getLaunchableApps(): Promise<AppInfo[]>;
  /** Throws if the package has no launch intent. */
  launchApp(packageName: string): void;
  openAppInfo(packageName: string): void;
  openSystemSettings(): void;
}

export default requireNativeModule<LauncherNativeModule>('LauncherNative');
