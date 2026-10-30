# Boat-charging

## Purpose

Boat charging lets users reserve a socket, complete the required payment and conditions steps, and manage a charging session until it either starts, is cancelled, or is stopped.

## Business rules

1. Guests must provide a valid email address, but do not need to confirm it separately.
2. Guests and logged in users without saved vignettes must enter and verify the boat's vignette before starting a session. Logged in users with saved vignettes must choose one, or enter and verify a different vignette instead.
3. Users must approve the terms and conditions before proceeding. Logged in users who already approved the latest version are not asked to accept them again.
4. Both guests and logged in users review and confirm the session before payment checkout opens.
5. All prices shown to users in the boat-charging flow must be inclusive of VAT, including location rates, start fees, session history amounts, and cost breakdowns.
6. A paid session does not start charging immediately after checkout. Charging starts automatically only after the cable is connected.
7. The session has separate in-progress phases for starting and stopping so the user can see whether the charging point is still processing a command.
8. Cancelling and stopping are different actions. A session that has not started charging yet can still be cancelled, while an active charging session must be stopped.
9. If the start command fails, the session remains recoverable. The user is told to unplug and try again, or to cancel the session instead.

## Start session flow

Before payment, users choose a saved vignette or enter and verify a vignette, approve the terms when required, and review and confirm the session. Guests provide a valid email address and always follow vignette verification; email confirmation is not part of the flow. Logged in users with saved vignettes are offered vignette selection instead of verification, but can choose to enter and verify a different vignette. Logged in users can skip terms acceptance when they have already approved the latest version.

### Flow

This diagram shows the primary user journey. Users who are not logged in can choose between logging in and continuing as a guest. After login, users follow the same saved-vignette selection or verification path as users who were already logged in. Both vignette paths lead to terms acceptance when required, followed by session confirmation.

```mermaid
flowchart TD
A[User selects a location] --> B[User selects a socket]
B --> C{Is the user logged in?}
C -- No --> D{User chooses login or guest}
C -- Yes --> W{Does the user have saved vignettes?}
D -- Login --> F[User logs in]
D -- Guest --> G[User enters a valid email address]
F --> H{Is an access code already set?}
H -- No --> I[User sets an access code]
H -- Yes --> W
I --> W
W -- No --> E[User enters and verifies the boat's vignette]
W -- Yes --> X{User chooses a saved or different vignette}
X -- Saved vignette --> Y[User selects and confirms a saved vignette]
X -- Different vignette --> E
G --> E
E --> J{Are the required terms approved?}
Y --> J
J -- No --> K[User accepts the terms and conditions]
J -- Yes --> L[User reviews and confirms the session]
K --> L
L --> M[Payment checkout opens in the browser]
M --> N[User completes payment]
N --> O[Session is ready for charging]
O --> P{Is the cable connected?}
P -- No --> Q[User is asked to connect the cable]
Q --> P
P -- Yes --> R[Charging start is requested automatically]
R --> S[Session enters the starting phase]
S --> T{Did charging start successfully?}
T -- Yes --> U[Session becomes active]
T -- No --> V[User sees a retry message and can cancel or try again]
```

## Session lifecycle after checkout

After payment, the session can move through five user-visible phases:

1. Ready to start: the payment is complete, but the cable still needs to be connected.
2. Starting: the app is waiting for confirmation that the charging point accepted the start request.
3. Charging: charging is active and the session shows energy use, time, and estimated cost.
4. Stopping: the stop request has been sent and the app keeps the charging view visible until the charging point confirms the session is ending.
5. Stopped: the charging point confirmed that charging has ended.

## Stop and recovery rules

1. Before charging starts, the user can cancel the session. This is the way to end a paid session that is still waiting to start or is still in the starting phase.
2. Once charging is active, the user can stop charging. Stopping is confirmed separately and may remain visible as an in-progress state for a short period.
3. If a start attempt fails, the user is instructed to disconnect the cable and retry. The retry path stays available as long as the session is still in the pre-charging state.
