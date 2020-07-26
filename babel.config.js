module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      root:['.'],
      extensions: [
        '.ios.ts',
        '.android.ts',
        '.ts',
        '.ios.tsx',
        '.android.tsx',
        '.tsx',
        '.jsx',
        '.js',
        '.json',
      ],
      alias: {
        "@Decorators":["./src/Decorators"],
        "@Controllers":["./src/Controllers"],
        "@Services":["./src/Services"],
        "@Interfaces":["./src/Interfaces"]
      }
    }],
    ["@babel/plugin-transform-flow-strip-types"],
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
    "babel-plugin-parameter-decorator"
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
