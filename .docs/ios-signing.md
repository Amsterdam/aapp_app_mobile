# Code signing for ios

How to fix the code signing when a certificate/profile expires.

## 1. Create new certificates and profiles in the App Store

Run the pipeline `aapp_app_mobile [sync]` to run Fastlane Match.

### Possible issues

- If you see that a profile is listed with a number, e.g. `match AppStore nl.amsterdam.app.dev 123456789`, then delete the existing profiles (`match AppStore nl.amsterdam.app` and `match AppStore nl.amsterdam.app.dev`) in the [App Store](https://developer.apple.com/account/resources/profiles/list) and run again.
- If you get an error that a certificate cannot be created, delete certificates for user `API Key: 21d7[...]c95f` in the [App Store](https://developer.apple.com/account/resources/certificates/list) and run again.
- If Match is stuck on unknown errors, you can ususally fix it by running [Match Nuke](https://docs.fastlane.tools/actions/match_nuke/). Or you can delete the certificates and profiles as described above, and delete the branch: https://dev.azure.com/CloudCompetenceCenter/Amsterdam-App/_git/aapp_app_ios-certificates?version=GBamsterdam-app

## 2. Install the provisioning profiles locally

After running the sync pipeline, run Fastlane Match locally:

```shell
$ cd ios
$ bundle exec fastlane ios syncAll readonly:true
```

This command requires the MATCH_PASSWORD env var to be set in ios/fastlane/.env (stored in KeePass).

## 3. Add the profiles to the project

Then add the profiles to the Xcode project:

- Open the workspace in Xcode
- Go to project AmsterdamApp and select target AmsterdamApp
- Go to tab Signing & Capabilities
- Set the 4 provisioning profiles:
  - Debug: `match Development nl.amsterdam.app`
  - DevDebug: `match Development nl.amsterdam.app.dev`
  - Release: `match AppStore nl.amsterdam.app`
  - DevRelease: `match AppStore nl.amsterdam.app.dev`

This pipeline requires the MATCH_PASSWORD env var to be set (stored in KeePass).

The env var `MATCH_GIT_BASIC_AUTHORIZATION` or `MATCH_GIT_BEARER_AUTHORIZATION` are optional. The latter is used in the pipelines to give DevOps to access to the aapp_app_ios-certificates repo. If omitted, the repo is accessed via SSH and a valid SSH key is required.
