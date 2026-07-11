module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "module:react-native-dotenv",
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@": "./src",
            "@nihongo/core": "../../packages/core",
          },
        },
      ],
      "react-native-worklets/plugin", // Updated plugin
    ],
  };
};
