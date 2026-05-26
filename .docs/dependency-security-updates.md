# Dependency security updates

This document describes how we handle dependency-related Security & Quality findings (Dependabot alerts, vulnerable transitive dependencies, etc.) for this repo.

## Goal

- Keep the **Security & Quality** count as low as possible.
- Prefer **minimal-impact** patches (patch/minor updates, lockfile-only changes) over broad upgrades.
- If something is not fixable due to upstream pinning, document **why** and **what we’re waiting for**.

## Where to start

1. In GitHub, open the PR (or default branch) and check the **Security & Quality** tab.
2. For each item, identify **which ecosystem** it belongs to:
   - **NPM / JavaScript**: `package.json`, `package-lock.json`
   - **Ruby gems**: `Gemfile`, `Gemfile.lock` (often build tooling like Fastlane)
   - (Native iOS/Android: Pod/Gradle are separate, but often triggered by JS package upgrades.)

Tip: Avoid clicking **Try again** in Dependabot unless your goal is specifically to make Dependabot re-attempt creating an automated PR. For “manual fix” cases, the alert should disappear automatically after the relevant fix is merged.

## General workflow

For each finding:

1. Determine whether it’s a **direct** or **transitive** dependency.
2. Check what version range is vulnerable and what version fixes it.
3. Check current versions in our project:
   - `npm ls <package>` (JS) or `bundle info <gem>` (Ruby)
4. Try the lowest-impact option first:
   - **Patch bump** of a transitive dependency via lockfile update.
5. Validate:
   - `npm ls <package>` (JS) or `bundle info <gem>` (Ruby)
   - Run relevant checks (see “Validation”).
6. If it’s **blocked** (pinned / upstream not released):
   - Decide whether it’s acceptable to **park** for now based on impact.
   - Add a short note to the PR (or tracking ticket) explaining the constraint.

## NPM (JavaScript) vulnerability fixes

### Inspect what versions we have

Use `npm ls` to see where a dependency is pulled in:

```bash
npm ls brace-expansion
```

You may see multiple versions at the same time (different parts of the dependency tree). That’s normal.

### Fixing a vulnerable **transitive** dependency (lockfile-only bump)

Sometimes Dependabot shows a warning like “No patch version available” even though a fixed patch exists.
In that case, you can often “nudge” the lockfile by temporarily installing the fixed version.

Example pattern:

1. Check the installed version:

```bash
npm ls <package>
```

2. Install the fixed version:

```bash
npm install <package>@<fixed-version>
```

3. Ensure the vulnerable version is gone:

```bash
npm ls <package>
```

4. If the install added the package to `package.json` but we don’t want it as a direct dependency:
   - Remove the newly added entry from `package.json`
   - Run install again to re-stabilize the lockfile:

```bash
npm install
npm ls <package>
```

Notes:

- Some very old versions may remain because they are **hard pinned** by upstream dependencies.
  That’s OK if the vulnerability doesn’t apply to those version ranges, or if the finding is specifically about a newer major line.

### Example: `brace-expansion` patch bump

An example we’ve seen:

- Vulnerable: `brace-expansion@5.0.5`
- Fixed in: `5.0.6`

Workflow:

```bash
npm ls brace-expansion
npm install brace-expansion@5.0.6
npm ls brace-expansion
```

If `brace-expansion` got added to `package.json` but we don’t want it as a direct dependency:

1. Remove it from `package.json`
2. Run install again to re-stabilize the lockfile:

```bash
npm install
npm ls brace-expansion
```

### When you need `pod install`

- **Pure JS-only dependency changes** (e.g. `brace-expansion`) typically do **not** require iOS pod updates.
- If you update a package with native code (React Native module), it’s safest to run:

```bash
npm run ios:install:pods
```

When in doubt, updating pods is fine (it just takes longer).

### Key distinction: build-time vs runtime

- All Ruby gems (including Fastlane) are only used during **build and deployment**, not shipped inside the app. That often lowers practical risk for end users, but still affects security posture and checks.
- JS dependencies can be either build-time (e.g. Storybook/web tooling) or runtime (shipped in the app). For runtime dependencies, we should prioritize patching to minimize risk.

### If a vulnerable gem is pinned by another dependency

Sometimes a vulnerability is in a gem like `jwt`, and the dependency that requires it (e.g. Fastlane) only supports versions below a fixed major.
If we are already on the newest Fastlane and it still pins the vulnerable range, we typically **cannot fix it locally**.

What to do:

- Confirm we’re on the latest compatible Fastlane (`Gemfile.lock`).
- Record that the fix is blocked by upstream Fastlane compatibility.
- Add a note about impact:
  - used only during build pipeline
  - not present in the shipped app
- Park the item until upstream releases support for the fixed gem version.

### Example: `jwt` vulnerability via Fastlane

An example we’ve seen:

- Vulnerable gem: `jwt` below a fixed version (for some advisories this is `>= 3.2.0`)
- Blocker: Fastlane is not yet compatible with `jwt` v3.x due to breaking changes.

If we are already on the newest Fastlane and the lockfile still pins `jwt` < 3, we cannot fix this locally. Treat it as upstream-blocked, and document that it’s build-time only.

## “Pinned by upstream” (can’t upgrade) cases

You’ll sometimes find:

- A vulnerable transitive dependency is pinned by another dependency (example: `postcss` pinned by `@expo/metro-config`).

Steps:

1. Identify the pinning package via `npm ls <package>`.
2. Check if the upstream repo already merged a fix but hasn’t released yet.
3. If the latest published version is still pinned:
   - decide to park
   - document what we’re waiting for (new release of the pinning package)

### Example: `postcss` pinned by `@expo/metro-config`

An example we’ve seen:

- Vulnerable: `postcss@8.4.49` (and generally versions below a fixed threshold)
- Desired: `>= 8.5.10` (you may see a specific target like `8.5.14`)

If `npm ls postcss` shows it is pinned via `@expo/metro-config`, and upgrading Expo patch versions doesn’t move it, then it’s likely not fixable until Expo publishes a release that updates that transitive dependency.

When parking, also note impact: `postcss` is mainly relevant for web/HTML pipelines (e.g. Storybook/web tooling). For the native app runtime this is often low-impact, but still tracked by security tooling.

## Validation

After changes:

- Install is consistent: `npm run ci` (preferred for reproducibility)
- Builds locally (if native modules were updated):
  - iOS: `npm run ios:phone:dev`
  - Android: `npm run android:phone:dev`
- App seems to work fine in the simulator/emulator (smoke test)
- Formatting/lint (when relevant):
  - `npm run format` (check)
  - `npm run lint`
- Tests (smoke): `npm test`

Keep validation proportional to the change:

- Lockfile-only update of a tiny transitive package: quickly check if the app seems to work.
- Native module updates: add `npm run ios:install:pods` and consider a local build and test the app.

## Git / PR hygiene

- Prefer a focused branch name, e.g. `chore/deps-brace-expansion`.
- PR should clearly state:
  - what vulnerability it fixes
  - which package/version changed
  - whether it’s a lockfile-only change
