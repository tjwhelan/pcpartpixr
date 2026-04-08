# How to configure the JSX runtime in Rspack-based projects

基于 [Rspack](https://www.rspack.dev/)/[Rsbuild](https://rsbuild.rs/) 的 React 项目不能[用 tsconfig 的`jsxImportSource` 配置 JSX Runtime](../introduction/getting-started.md#set-up-your-project)，而是需要在 swc-loader 里配置。

基于 Rsbuild 的项目需要使用 React Plugin 的 [`swcReactOptions`](https://rsbuild.rs/plugins/list/plugin-react#swcreactoptions) 来配置：

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
```

基于 Rspack 的项目需要使用 [`builtin:swc-loader`](https://www.rspack.dev/guide/features/builtin-swc-loader#builtin-swc-loader) 来配置：

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
```
