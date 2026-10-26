# yhtv

A minimal, Apple TV–style home screen for Google TV, built with Expo SDK 57, Expo Router and [`react-native-tvos`](https://github.com/react-native-tvos/react-native-tvos). Android TV only.

## Setup

```sh
bun install
bun run prebuild        # TV prebuild (config-tv has isTV: true, so EXPO_TV isn't needed)
bun run android         # build + run the dev variant (com.yeagerhaus.yhtv.dev)
```

`react-native` is aliased to `react-native-tvos`, pinned to the exact release that matches the Expo SDK's React Native version (bun can't resolve the `-stable` dist-tag aliases).

## Build variants

| | default | `LAUNCHER_HOME=1` |
|---|---|---|
| applicationId | `com.yeagerhaus.yhtv.dev` | `com.yeagerhaus.yhtv` |
| Behaves like | a normal app | a home-screen candidate |

## Checks

```sh
bun run check           # expo lint (ESLint + Prettier) and tsc --noEmit
```
