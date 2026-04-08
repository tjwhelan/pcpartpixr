# How to meet the minimum PWA requirements

1. 这个 Web App 的网页 URL 必须是 HTTPS 协议

2. 对于这个 Web App 的[每个网址，都需要](https://w3c.github.io/manifest/#using-a-link-element-to-link-to-a-manifest)在 HTML 的 `<head>` 里提供 [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest) 的 URL：

   ```html
   <link rel="manifest" href="/app.webmanifest" />
   ```

   这个 manifest 的 URL 应该提供 [JSON 类型](https://mimesniff.spec.whatwg.org/#json-mime-type)的响应，比如 `application/manifest+json`。

   > 更多信息可参考 [MDN](<(https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable)>) 和 [web.dev](https://web.dev/learn/pwa/web-app-manifest/)。

3. Manifest 的 JSON 中至少要包含以下字段：

- [`name`](https://developer.mozilla.org/en-US/docs/Web/Manifest/name) 或 [`short_name`](https://developer.mozilla.org/en-US/docs/Web/Manifest/short_name)：提供应用名称
- [`icons`](https://developer.mozilla.org/en-US/docs/Web/Manifest/icons)：提供应用图标
  - 至少要包含一个 `"purpose": "any"` 的图标（满足 PWA 的要求）
  - 至少包含一个 `"purpose": "maskable"` （无透明背景、无圆角边缘）的尺寸不小于 `1024×1024` 的图标（满足空间应用的需求，见文末[推荐的图标组合和示例文件](#recommended-icons-for-web-apps)）
- [`start_url`](https://developer.mozilla.org/en-US/docs/Web/Manifest/start_url)：配置起始场景对应的网址
- [`display`](https://developer.mozilla.org/en-US/docs/Web/Manifest/display)：配置网页窗口的显示模式，影响网页窗口附属的原生 UI，WebSpatial Runtime 目前只支持 `"standalone"`（原生 UI 中没有后退等导航按钮）和 `"minimal-ui"`（默认值，有导航按钮）

  示例：

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

> 符合以下要求的示例图标文件：[webspatial-icon-examples.zip](https://webspatial.dev/assets/guide/webspatial-icon-examples.zip)

| 尺寸            | 用途                                                                                                              | 出现场景                                                                                                               | 允许透明背景 | 允许圆角   | 提供方式                                                                                                                                                                           |
| --------------- | ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------ | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 48 × 48         | favicon.ico                                                                                                       | 浏览器标签栏                                                                                                           | 必须         | 允许       | [HTML `<link>`](https://github.com/joshbuchea/HEAD#icons)                                                                                                                          |
| 180 × 180       | [iOS 应用图标](https://developer.apple.com/design/human-interface-guidelines/app-icons#iOS-iPadOS-app-icon-sizes) | iOS“添加到主屏幕”                                                                                                      | 不允许       | 不允许     | [HTML `<link>`](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html) |
| 192 × 192       | 标准 PWA 图标                                                                                                     | 主屏幕的小图标                                                                                                         | 必须         | 必须       | Web App Manifest                                                                                                                                                                   |
| **512 × 512**   | 标准 PWA 图标                                                                                                     | 各类启动页、应用市场等                                                                                                 | 必须         | 必须       | Web App Manifest                                                                                                                                                                   |
| **1024 × 1024** | 空间应用图标                                                                                                      | [visionOS](https://developer.apple.com/design/human-interface-guidelines/app-icons#visionOS-app-icon-sizes), PICO OS 6 | **不允许**   | **不允许** | Web App Manifest                                                                                                                                                                   |
