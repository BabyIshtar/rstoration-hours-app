# Goddard App Store Prep Update

This update prepares the Voda Of Tucson Hours app for the next native packaging step.

## Added
- App Store-ready PWA metadata in `index.html`.
- New production app name: **Voda Of Tucson Hours**.
- Apple mobile web app tags, startup image, viewport-fit support, and status-bar configuration.
- Generated app icon assets from 72px through 1024px.
- Generated iPhone and iPad launch/splash images.
- Updated `manifest.json` with proper display, icon, category, screenshot, theme, and orientation fields.
- Updated service worker cache to include the new app shell and native-facing assets.
- Added Capacitor configuration with app id `com.vodaoftucson.hours`.
- Added Capacitor scripts for iOS and Android packaging.
- Added optional native haptic feedback support for Capacitor builds, with vibration fallback for supported browsers.
- Added safe-area CSS for iPhone notch / Dynamic Island / home indicator spacing.
- Added stronger mobile tap-target, no zoom-jump, and print/PDF fallback rules.

## Native packaging commands
Run these after you are ready to create the native iOS project:

```bash
npm install
npm run build
npm run cap:add:ios
npm run cap:open:ios
```

After the first iOS project is created, future syncs are:

```bash
npm run cap:sync
npm run cap:open:ios
```

## App Store checklist
- Enroll in Apple Developer Program.
- Create App Store Connect app record.
- Use bundle id: `com.vodaoftucson.hours`.
- Open Xcode and set signing team.
- Replace Xcode app icon set with the generated `public/voda-icon-1024.png` and derived icon sizes if needed.
- Test through TestFlight before public release.
- Complete Apple privacy questionnaire for Supabase/auth/account data usage.
- Mark the app as private/internal if you only want employees using it.

## Notes
This pass does not create the Xcode project yet. It prepares the web app so the native wrapper step is cleaner and less likely to break the current production web deployment.
