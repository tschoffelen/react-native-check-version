module.exports = function(api) {
  api.cache(true);
  const presets = [
    [
      "@babel/preset-env",
      {
        modules: "auto",
        targets: {
          browsers: ["defaults"]
        },
        useBuiltIns: "entry",
        corejs: 2
      }
    ],
    "@babel/preset-flow"
  ];

  const plugins = [
    "@babel/plugin-proposal-class-properties"
  ];

  return {
    presets,
    plugins
  };
};
