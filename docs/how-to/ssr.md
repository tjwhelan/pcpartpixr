# How to enable WebSpatial in SSR-enabled projects

In a React project with SSR enabled, there is one extra step when [integrating WebSpatial SDK](../introduction/getting-started.md#set-up-your-project): add the `SSRProvider` from the SDK:

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

Using Shopify's e-commerce framework [Hydrogen](https://hydrogen.shopify.dev/) as an example, which is based on Remix and React Router and enables SSR by default:

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
