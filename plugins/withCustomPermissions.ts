// use require instead of import so this file can be used with `expo prebuild` command
const { ConfigPlugin, withInfoPlist, withAndroidManifest, withPlugins } = require('@expo/config-plugins');

const withCustomPermissions: typeof ConfigPlugin = (config: any) => {
  return withPlugins(config, [
    // Modify iOS Info.plist
    (config: any) => withInfoPlist(config, (config: { modResults: { NSLocationWhenInUseUsageDescription: string; NSCameraUsageDescription: string; }; }) => {
      config.modResults.NSLocationWhenInUseUsageDescription =
        'We need access to your location to show you relevant content.';
      config.modResults.NSCameraUsageDescription =
        'We need access to your camera to take photos.';
      // Add other permissions as needed
      return config;
    }),
    // Modify Android AndroidManifest.xml
    (config: any) => withAndroidManifest(config, async (config: { modResults: { manifest: { [x: string]: any; }; }; }) => {
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
