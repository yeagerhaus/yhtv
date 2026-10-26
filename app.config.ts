import { ConfigContext, ExpoConfig } from 'expo/config';

// LAUNCHER_HOME=1 builds the home-screen candidate. The default build is a normal
// app with a different applicationId, so both can be installed side by side.
const isHome = process.env.LAUNCHER_HOME === '1';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: isHome ? 'yhtv' : 'yhtv dev',
  slug: 'yhtv',
  scheme: 'yhtv',
  version: '1.0.0',
  orientation: 'landscape',
  userInterfaceStyle: 'dark',
  platforms: ['android'],
  android: {
    package: isHome ? 'com.yeagerhaus.yhtv' : 'com.yeagerhaus.yhtv.dev',
  },
  plugins: [
    [
      '@react-native-tvos/config-tv',
      {
        isTV: true,
        androidTVRequired: true,
        androidTVBanner: './assets/images/icon-400x240.png',
      },
    ],
    [
      'expo-splash-screen',
      {
        image: './assets/images/icon-760x760.png',
        imageWidth: 200,
        backgroundColor: '#000000',
      },
    ],
    'expo-router',
  ],
  experiments: {
    typedRoutes: true,
  },
});
