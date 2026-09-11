# Release date lifecycle automation

## Purpose

This workflow keeps release lifecycle dates consistent across environments by updating app releases to the right business state without manual intervention.

## Lifecycle rules

- Releases move through three lifecycle states: published, deprecated, and unpublished.
- The current release is the highest version observed in the app stores and is marked as published.
- Only the two most recent releases are treated as actively supported.
- The next older release is marked as deprecated with a one-week deprecation window.
- The oldest release in the managed window is marked as unpublished.
- If the current release is already marked as published, no additional lifecycle updates are applied.

## Cross-store decision behavior

- The workflow evaluates iOS and Android together and uses the highest release seen across both stores.
- During staggered roll-outs (for example, a newer version is in review in one store while the other store is still behind), the workflow applies a conservative update path.
- In that conservative path, only the currently deprecated release is unpublished.
- Publishing the new current release and setting a new deprecation date are postponed until store states are aligned.

## Major architectural decision

- Store state is treated as the source of truth for lifecycle progression, instead of relying on a manual release calendar.
- This avoids premature lifecycle transitions when iOS and Android publish at different times and keeps release availability predictable for users.
