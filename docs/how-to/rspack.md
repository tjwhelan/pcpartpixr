# How to configure the JSX runtime in Rspack-based projects

React projects based on [Rspack](https://www.rspack.dev/)/[Rsbuild](https://rsbuild.rs/) cannot [configure the JSX Runtime with `jsxImportSource` in `tsconfig`](../introduction/getting-started.md#set-up-your-project). Instead, they need to configure it in `swc-loader`.

Projects based on Rsbuild need to use the [`swcReactOptions`](https://rsbuild.rs/plugins/list/plugin-react#swcreactoptions) option in the React Plugin:

```js
// rsbuild.config.ts
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  plugins: [
    pluginReact({
      swcReactOptions: {
        runtime: "automatic",
        importSource: "@webspatial/react-sdk",
      },
    }),
// ...
```

Projects based on Rspack need to use [`builtin:swc-loader`](https://www.rspack.dev/guide/features/builtin-swc-loader#builtin-swc-loader):

```js
// rspack.config.mjs
export default {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "builtin:swc-loader",
          options: {
            jsc: {
              parser: { syntax: "typescript", tsx: true },
              transform: {
                react: {
                  runtime: "automatic",
                  importSource: "@webspatial/react-sdk",
                },
              },
            },
          },
        },
        type: "javascript/auto",
      },
// ...
```
