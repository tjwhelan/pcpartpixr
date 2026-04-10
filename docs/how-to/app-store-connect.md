# How to test on visionOS devices and submit to the App Store

## Prerequisites

1. Get developer information
   1. Sign in to [https://developer.apple.com/account](https://developer.apple.com/account)
   2. Find your **Team ID** on the page and save it. You will need it later.
2. Create an app identifier
   1. In your developer account dashboard, go to [Certificates, Identifiers & Profiles -> Identifiers](https://developer.apple.com/account/resources/identifiers/list).
   2. Create a dedicated **Bundle ID** for this app.

## Device Testing

1. Create an app record
   1. Sign in to [https://appstoreconnect.apple.com/](https://appstoreconnect.apple.com/)
   2. Open the **Apps** list ([https://appstoreconnect.apple.com/apps](https://appstoreconnect.apple.com/apps)).
   3. Create a new app and select the **Bundle ID** you created earlier.
2. Get the test device **UDID**
   1. Connect the test device to a Mac that has **Xcode** installed and is signed in to your developer account.
   2. In Xcode, choose **Window -> Devices and Simulators**.
   3. Under **Devices**, select the test device.
   4. Record the **Identifier** field for that device, which is the UDID.
3. Register the test device
   1. In your developer account dashboard, go to [Certificates, Identifiers & Profiles -> Devices](https://developer.apple.com/account/resources/devices/list).
   2. Add the test device and fill in its details.
4. Build and run
   1. Run the [WebSpatial Builder `build` command](../api/builder/build.md) in the Web project. You must provide the **Team ID** and **Bundle ID** parameters.

   ```bash
   webspatial-builder build --base=$PREVIEW_SERVER --bundle-id=$APPLE_BUNDLE_ID --teamId=$APPLE_TEAM_ID
   ```

   2. After the build succeeds, find the app package (IPA file) in the repository's `build/` directory.
   3. In Xcode, choose **Window -> Devices and Simulators**.
   4. Under **Devices**, select the test device.
   5. Add the IPA file under **Installed Apps**.

## Submission to the App Store

1. Configure the app
   1. Open the app you created earlier from the **Apps** list ([https://appstoreconnect.apple.com/apps](https://appstoreconnect.apple.com/apps)).
   2. Enter the information required for App Store submission, such as screenshots and marketing copy, then click **Save** in the top-right corner.
   3. Configure **App Review**, **General**, **Regulatory**, **Pricing**, and **Privacy** information.
2. Build and upload
   1. Run the [WebSpatial Builder `publish` command](../api/builder/publish.md) in the Web project. In addition to **Team ID** and **Bundle ID**, you must also provide [the **version**, **developer account**, and **account password**](../api/builder/publish.md).

   ```bash
   webspatial-builder publish --base=$PRODUCT_SERVER --bundle-id=$APPLE_BUNDLE_ID --teamId=$APPLE_TEAM_ID --version=$APP_VERSION --u=$APPLE_DEV_NAME --p=$APPLE_DEV_PASSWORD
   ```

   2. The IPA will be uploaded to **App Store Connect** as a specific build version.

3. Submit for review
   1. Open the app from the **Apps** list ([https://appstoreconnect.apple.com/apps](https://appstoreconnect.apple.com/apps)).
   2. Under **Build Versions**, click **Add** and select the version you just uploaded.
   3. Wait for review. You can track review progress on the app's **App Review** page.
