# How to meet the minimum PWA requirements

1. The webpage URL of this Web App must use HTTPS.

2. For [every URL in this Web App](https://w3c.github.io/manifest/#using-a-link-element-to-link-to-a-manifest), provide the URL of the [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest) in the HTML `<head>`:

   ```html
   <link rel="manifest" href="/app.webmanifest" />
   ```

   The manifest URL should return a [JSON MIME type](https://mimesniff.spec.whatwg.org/#json-mime-type) response, such as `application/manifest+json`.

   > For more information, see [MDN](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable) and [web.dev](https://web.dev/learn/pwa/web-app-manifest/).

3. The manifest JSON must contain at least these fields:

- [`name`](https://developer.mozilla.org/en-US/docs/Web/Manifest/name) or [`short_name`](https://developer.mozilla.org/en-US/docs/Web/Manifest/short_name): provides the app name
- [`icons`](https://developer.mozilla.org/en-US/docs/Web/Manifest/icons): provides app icons
  - Must include at least one icon with `"purpose": "any"` to satisfy PWA requirements
  - Must include at least one icon with `"purpose": "maskable"`, no transparent background, no rounded corners, and a size of at least `1024×1024` to satisfy spatial app requirements. See the [recommended icon set and sample files](#recommended-icons-for-web-apps) at the end of this document
- [`start_url`](https://developer.mozilla.org/en-US/docs/Web/Manifest/start_url): configures the URL for the start scene
- [`display`](https://developer.mozilla.org/en-US/docs/Web/Manifest/display): configures the display mode of the webpage window, which affects the native UI attached to the webpage window. WebSpatial Runtime currently supports only `"standalone"` (no native navigation buttons such as Back) and `"minimal-ui"` (the default, with navigation buttons)

  Example:

  ```json
  {
    "name": "My Awesome App",
    "start_url": "/",
    "display": "minimal-ui",
    "icons": [
      {
        "src": "/pwa-512x512.png",
        "sizes": "512x512",
        "type": "image/png",
        "purpose": "any"
      },
      {
        "src": "/pwa-1024x1024.png",
        "sizes": "1024x1024",
        "type": "image/png",
        "purpose": "maskable"
      }
    ]
  }
  ```

---

## Recommended Icons for Web Apps

> Sample icon files that meet the requirements below: [webspatial-icon-examples.zip](https://webspatial.dev/assets/guide/webspatial-icon-examples.zip)

| Size            | Purpose                                                                                                           | Where It Appears                                                                                                      | Transparent Background Allowed | Rounded Corners Allowed | How to Provide It                                                                                                                                                                  |
| --------------- | ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------ | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 48 × 48         | favicon.ico                                                                                                       | Browser tab                                                                                                           | Required                       | Allowed                 | [HTML `<link>`](https://github.com/joshbuchea/HEAD#icons)                                                                                                                          |
| 180 × 180       | [iOS app icon](https://developer.apple.com/design/human-interface-guidelines/app-icons#iOS-iPadOS-app-icon-sizes) | iOS "Add to Home Screen"                                                                                              | Not allowed                    | Not allowed             | [HTML `<link>`](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html) |
| 192 × 192       | Standard PWA icon                                                                                                 | Small icon on the home screen                                                                                         | Required                       | Required                | Web App Manifest                                                                                                                                                                   |
| **512 × 512**   | Standard PWA icon                                                                                                 | Various launch surfaces, app markets, and similar places                                                              | Required                       | Required                | Web App Manifest                                                                                                                                                                   |
| **1024 × 1024** | Spatial app icon                                                                                                  | [visionOS](https://developer.apple.com/design/human-interface-guidelines/app-icons#visionOS-app-icon-sizes), PICO OS 6 | **Not allowed**                | **Not allowed**         | Web App Manifest                                                                                                                                                                   |
