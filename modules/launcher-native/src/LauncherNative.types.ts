export type AppInfo = {
  packageName: string;
  label: string;
  /** file:// PNG cached in the app's cache dir, keyed by package + versionCode. */
  bannerUri: string | null;
  /** Fallback when an app has no TV banner. */
  iconUri: string;
  isSystem: boolean;
};

export type PackagesChangedEvent = {
  packageName: string;
  action: 'added' | 'removed' | 'changed';
};

export type LauncherNativeModuleEvents = {
  onPackagesChanged: (event: PackagesChangedEvent) => void;
};
