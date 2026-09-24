# User

## Remove all data

### Purpose

The remove-all-data flow lets a user clear personal app settings and account links in one guided process, also all settings on the server connected to this app instance are removed.

### Business rules

1. Data removal is always an explicit user action and requires a final confirmation before execution.
2. If notification permission is still enabled at device level, the user is first suggested to disable that permission before final removal can continue. As having this permission enabled will automatically reregister the device in the backend after removal.
3. The user should be logged out of all modules where the user is logged in.
4. All app instance related data should be cleared from the backend with an unregister.
5. The device should be unregistered for notifications.
6. Locally stored credentials or access secrets should be removed.
7. If a logout or unregister fails, the failure should be logged and communicated to the user, allowing them to retry the operation. Corresponding secrets and state should not be cleared, to be able to retry the operation.
8. The result screen always communicates whether removal fully succeeded or partially failed.
9. When some steps fail, the user receives a per-domain failure list so they can retry with clear context.

### Major architectural decisions

1. The flow is designed as best-effort, not all-or-nothing: successful domains are cleared even if some domains fail.
2. State reset is applied broadly across modules and shared app state, with selective retention during partial failure to preserve enough context for a meaningful retry.
