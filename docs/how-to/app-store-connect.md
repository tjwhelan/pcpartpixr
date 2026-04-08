# How to test on visionOS devices and submit to the App Store

## 前提条件

1. 获取开发者信息
   1. 登录 [https://developer.apple.com/account](https://developer.apple.com/account)
   2. 在页面上找到你的 **Team ID** 并保存，稍后会用到。
2. 创建应用标识符
   1. 在你的开发者账号仪表板中，前往 [Certificates, Identifiers & Profiles -> Identifiers](https://developer.apple.com/account/resources/identifiers/list)。
   2. 为此应用创建一个专用的 **Bundle ID**。

## 真机测试

1. 创建应用记录
   1. 登录 [https://appstoreconnect.apple.com/](https://appstoreconnect.apple.com/)
   2. 打开 **Apps** 列表（[https://appstoreconnect.apple.com/apps](https://appstoreconnect.apple.com/apps)）。
   3. 创建一个新 App，并选择你之前创建的 **Bundle ID**。
2. 获取测试设备的 **UDID**
   1. 将测试设备连接到一台已安装 **Xcode** 且已登录你的开发者账号的 Mac。
   2. 在 Xcode 中，选择 **Window -> Devices and Simulators**。
   3. 在 **Devices** 下，选择测试设备。
   4. 记下该设备的 **Identifier** 字段（UDID）。
3. 注册测试设备
   1. 在你的开发者账号仪表板中，前往 [Certificates, Identifiers & Profiles -> Devices](https://developer.apple.com/account/resources/devices/list)。
   2. 添加测试设备并填写其详细信息。
4. 构建并运行
   1. 在 Web 项目中运行 [WebSpatial Builder 的 `build` 命令]()（必须提供 **Team ID** 和 **Bundle ID** 参数）。

   ```bash
   webspatial-builder build --base=$PREVIEW_SERVER --bundle-id=$APPLE_BUNDLE_ID --teamId=$APPLE_TEAM_ID
   ```

   2. 构建成功后，在仓库的 `build/` 目录中找到应用程序包（IPA 文件）。
   3. 在 Xcode 中，选择 **Window -> Devices and Simulators**。
   4. 在 **Devices** 下，选择测试设备。
   5. 在 **Installed Apps** 中，添加 IPA 文件。

## 提交到 App Store

1. 配置 App
   1. 从 **App** 列表（[https://appstoreconnect.apple.com/apps](https://appstoreconnect.apple.com/apps)）中，打开你之前创建的 App。
   2. 输入 App Store 上架所需的信息（例如屏幕截图、宣传文案等），然后点击右上角的 **Save** 按钮。
   3. 配置 **App Review**、**General**、**Regulatory**、**Pricing**、**Privacy** 信息。
2. 构建并上传
   1. 在 Web 项目中运行 [WebSpatial Builder 的 `publish` 命令](https://webspatial.dev/docs/development-guide/enabling-webspatial-in-web-projects/step-2-add-build-tool-for-packaged-webspatial-apps#publish)（除了 **Team ID** 和 **Bundle ID** 之外，还必须提供[**版本**、**开发者账号**和**账户密码**]()）。

   ```bash
   webspatial-builder publish --base=$PRODUCT_SERVER --bundle-id=$APPLE_BUNDLE_ID --teamId=$APPLE_TEAM_ID
    --version=$APP_VERSION --u=$APPLE_DEV_NAME --p=$APPLE_DEV_PASSWORD
   ```

   2. 会将 IPA 作为特定构建版本上传到 **App Store Connect**。

3. 提交审核
   1. 在 **App** 列表（[https://appstoreconnect.apple.com/apps](https://appstoreconnect.apple.com/apps)）中，打开该应用。
   2. 在 **Build Versions** 下，点击 **Add** 并选择你刚刚上传的版本。
   3. 等待审核；你可以在应用的 **App Review** 页面跟踪审核进度。

```

```
