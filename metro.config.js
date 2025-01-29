const { getDefaultConfig } = require("expo/metro-config");
const {
  wrapWithReanimatedMetroConfig,
} = require("react-native-reanimated/metro-config");

const config = (() => {
  const config = getDefaultConfig(__dirname);
  return config;
})();

module.exports = wrapWithReanimatedMetroConfig(config);
