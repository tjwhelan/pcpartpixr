# How to enable WebSpatial in SSR-enabled projects

开启了 SSR 的 React 项目，在[集成 WebSpatial SDK 的时候](../introduction/getting-started.md#set-up-your-project)，有一个额外步骤，需要添加 SDK 里的 `SSRProvider`：

```js
import { hydrateRoot } from "react-dom/client";
import { SSRProvider } from "@webspatial/react-sdk";

hydrateRoot(
  document.getElementById("root"),
  <SSRProvider>
    <App />
  </SSRProvider>,
);
```

以 Shopify 的电商网站框架 [Hydrogen](https://hydrogen.shopify.dev/)（基于 Remix 和 React Router，默认开启 SSR）为例：

```js
import { HydratedRouter } from "react-router/dom";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { NonceProvider } from "@shopify/hydrogen";
import { SSRProvider } from "@webspatial/react-sdk";

if (!window.location.origin.includes("webcache.googleusercontent.com")) {
  startTransition(() => {
    const existingNonce = document.querySelector("script[nonce]")?.nonce;

    hydrateRoot(
      document,
      <StrictMode>
        <NonceProvider value={existingNonce}>
          <SSRProvider>
            <HydratedRouter />
          </SSRProvider>
        </NonceProvider>
      </StrictMode>,
    );
  });
}
```
