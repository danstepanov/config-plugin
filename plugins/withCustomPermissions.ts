// use require instead of import so this file can be used with `expo prebuild` command
import {
  ConfigPlugin,
  withAndroidManifest,
  withInfoPlist,
  withPlugins,
} from '@expo/config-plugins';

const withCustomPermissions: ConfigPlugin = (config) => {
  return withPlugins(config, [
    // Modify iOS Info.plist
    (config) =>
      withInfoPlist(config, (config) => {
        config.modResults.NSLocationWhenInUseUsageDescription =
          'We need access to your location to show you relevant content.';
        config.modResults.NSCameraUsageDescription =
          'We need access to your camera to take photos.';
        // Add other permissions as needed
        return config;
      }),
    // Modify Android AndroidManifest.xml
    (config: any) =>
      withAndroidManifest(config, (config) => {
        const permissions = config.modResults.manifest['uses-permission'] || [];
        permissions.push({ $: { 'android:name': 'android.permission.ACCESS_FINE_LOCATION' } });
        permissions.push({ $: { 'android:name': 'android.permission.CAMERA' } });
        // Add other permissions as needed
        config.modResults.manifest['uses-permission'] = permissions;
        return config;
      }),
  ]);
};

export default withCustomPermissions;
