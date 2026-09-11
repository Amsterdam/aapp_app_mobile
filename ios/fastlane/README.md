## fastlane documentation

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

## iOS

### ios getAppStoreVersionNumbers

```sh
[bundle exec] fastlane ios getAppStoreVersionNumbers
```

Fetch App Store live and review release version numbers

### ios syncDevelopment

```sh
[bundle exec] fastlane ios syncDevelopment
```

Sync development certificates

### ios syncAdhoc

```sh
[bundle exec] fastlane ios syncAdhoc
```

Sync adhoc certificates

### ios syncAppstore

```sh
[bundle exec] fastlane ios syncAppstore
```

Sync appstore certificates

### ios syncAll

```sh
[bundle exec] fastlane ios syncAll
```

Sync all certificates

### ios setEnvironmentForApp

```sh
[bundle exec] fastlane ios setEnvironmentForApp
```

### ios buildApps

```sh
[bundle exec] fastlane ios buildApps
```

Build iOS app(s); optionally limit with variant:test|prod|all

### ios distributeInternal

```sh
[bundle exec] fastlane ios distributeInternal
```

### ios distributeStakeholders

```sh
[bundle exec] fastlane ios distributeStakeholders
```

### ios distributeProduction

```sh
[bundle exec] fastlane ios distributeProduction
```

---

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
