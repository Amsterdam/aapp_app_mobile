# Amsterdam App

We are creating a native app for citizens, entrepreneurs, and visitors of the City of Amsterdam to provide information, allow communication, and streamline transactions.

## Installation

The [React Native docs](https://reactnative.dev/docs/environment-setup) offer a good overview of how to set up your development environment. Specific instructions for this project:

- Clone the repository
  - or from GitHub: `git clone git@github.com:Amsterdam/aapp_app_mobile.git` (please check if it is up to date)
- Set Node version
  - Install Volta (https://volta.sh/) and make sure it has set the correct Node version (see package.json)
- Install Node dependencies: `npm i`.
- For iOS development, install other dependencies:
  - install rbenv: `brew install rbenv ruby-build` and execute `rbenv init`
  - install ruby version: `rbenv install` and `rbenv global 3.1.4`
  - Check if you have Ruby Gems (`gem -v`), if not, install via homebrew `brew install brew-gem` or <https://rubygems.org/>
  - Install bundler (Ruby gem manager): `gem install bundler:2.4.16`
  - Install/update the gems with bundler: `bundle install`
  - Go to `/ios`
  - Install pods: `npm run ios:install:pods`
- Get the necessary files and add them to the project
  - See "Secret files" below
- To run the app on a simulator/emulator
  - Start the iOS phone simulator: `npm run ios:phone:dev`
  - Start the Android phone emulator: `npm run android:phone:dev`
  - Other options are available: to build a production version of the app or to run on tablet simulator/emulator
    - Make sure to add @Pixel_C_API_30 to your devices in Android Studio's AVD Manager (Android tablet emulator)

### Scripts

Here is an overview of the commands that we offer with package.json:

- [Script commands](./.docs/scripts.md)

### Secret files

To build the app locally, you need these files. Because they contain credentials or API keys, they are not part of the repo, but stored securely.

#### Keepass

You can find these files in the Keepass database. To access this database:

- Clone the [Keepass repo](https://dev.azure.com/CloudCompetenceCenter/Amsterdam-App/_git/Keepass)
- Make sure you are in the `main` branch to have access to the most recent file `KP Database.kdbx`
- Install a [Keepass client](https://keepass.info/) and use it to open the `.kpdx` file
- Request the password from a colleague
- The files can be found in Keepass under `Front-end` and `Signing`

#### Files ignored by Git

- `.env` - Environment variables to be used in the JS. This should be added to the project root. Also see `.env.example`.
- `android/app/google-services.json` - Production Firebase config/key for Android ([source](https://console.firebase.google.com/u/1/project/amsterdam-15a0a/settings/general/android:nl.amsterdam.app)).
- `android/app/src/dev/google-services.json` - Development Firebase config/key for Android ([source](https://console.firebase.google.com/u/1/project/amsterdam-15a0a/settings/general/android:nl.amsterdam.app.dev)).
- `ios/GoogleService-Info-Prod.plist` - Production Firebase config/key for iOS ([source](https://console.firebase.google.com/u/1/project/amsterdam-15a0a/settings/general/ios:nl.amsterdam.app)).
- `ios/GoogleService-Info-Test.plist` - Development Firebase config/key for iOS ([source](https://console.firebase.google.com/u/1/project/amsterdam-15a0a/settings/general/ios:nl.amsterdam.app.dev)).

## Git collaboration

Our workflow and approach is documented [here](https://dev.azure.com/CloudCompetenceCenter/Amsterdam-App/_wiki/wikis/Amsterdam-App.wiki/11135/Samenwerken-aan-code)

## Deeplinks

These are links from outside the app that will open the app and trigger something. They are prefixed with `amsterdam://`

- Construction work editors after log in with Azure Entra ID: `construction-work-editor/:accessToken?`
- Redirect from a push notification about construction work news: `news/:id`
- Redirect from a push notification about construction work warning: `warning/:id`
- Redirect from Mijn Amsterdam after the login flow within the city pass module: `amsterdam://stadspas/[result]`

## Keep your code secure

Add new files containing API keys or credentials to `.gitignore`. These files may not be pushed to the repo.

We use `detect-secrets` to scan the codebase for secrets. This results in a .secrets.baseline file in the root of the project:

- <https://github.com/Yelp/detect-secrets>

## External services

- **Azure Application Insights:** A comprehensive monitoring service that provides real-time error logging, performance tracking, and diagnostic insights to ensure the stability and reliability of our app.
- **Google Firebase Messaging:** Provides cloud messaging services to send push notifications and in-app messages, enabling real-time communication with users across platforms.
- **GitHub:** Hosts our code repository as an open-source project, in compliance with government organization requirements for transparency and accessibility.
- **Piwik Pro:** A privacy-focused analytics platform that helps us measure user engagement and behavior within the app, ensuring data-driven improvements while maintaining compliance with privacy regulations.
- **Storybook:** Used for developing and showcasing our UI components in isolation, providing a visual interface to view, test, and document components in various states.

## Storybook

- Run locally with the `storybook` script command
- [Production URL] (<https://amsterdam.github.io/amsterdam-app-storybook>)

## Typescript

- Global types are defined in `src/custom.d.ts`

## More documentation

More documentation can be found in the `.docs` folder:

- [Build documentation](./.docs/build.md)
- [Certificate pinning (security)](./.docs/certificate-pinning.md)
- [Cache durations](./.docs/cache-durations.md)
- [Troubleshooting](./.docs/frequently-solved-problems.md)
- [Test automation](./.docs/test-automation.md)

Modules:

- [City-Pass](./.docs/modules/city-pass.md)
