# City-pass

The City-Pass module is designed for City-Pass holders, an initiative by the Municipality of Amsterdam to provide various discounts to low-income residents. By owning a City-Pass, eligible citizens can access these offers. This module enables the digital version of the City-Pass, making it easier for users to access and manage their benefits online.
Furthermore, the pass can be scanned at certain locations, such as museums. For these cases, authentication is done by scanning either the pass's barcode or QR code, which is why both are displayed on the pass.

## Architectural decisions

### DigiD login:

To get access to City-Pass data, we use the already in-place functionality of another platform within the Municipality of Amsterdam: Mijn Amsterdam. Through them, we login with DigiD and get a hashed version of the City-Pass registration number which gets stored on our backend, together with a session token. This solution enables us to store only the access token on the user's device.

### Session token

To acquire a session token we make use of an endpoint that returns one, together with a refresh token. Once the access token is expired, a new one gets fetched with the refresh token. Once the refresh token is expired, the user will be logged out, which means the data gets deleted locally as well as on the server and requires the user to login again with DigiD.

### City-Pass data

Together with the session token and hashed registration number, our backend is able to request the data at Mijn Amsterdam, which fetches the data from its source: Gpass.

- [Login with DigID](../assets/digid-login.png)
- [Retrieve City-Pass data](../assets/pass-data.png)
- [Refresh session tokens](../assets/refresh-token.png)

## Processed data

Endpoints are secured by requiring an access token in the request header, which is fetched in advanced as explained above. Together with a refresh token, this is stored in the secure storage of the user's device as follows:

```
    {
        access_token: string
        refresh_token: string
    }
```

To have access to the passes even while being offline, relevant data is been stored in the secure storage of the user's device. The data stored is as follows:

```
[
    {
        a: boolean // whether the pass is active
        f: string // the first name of the pass holder
        i: string // the infix of the pass holder if applicable
        l: string // the last name of the pass holder
        d: string // the date until which the pass is valid
        p: string // the complete pass number
        t: string // the type of city pass
    }
]
```

## List of features

- Copy pass number: Certain purchases can only be completed online and require the pass number. To simplify this process for the user, the app allows the pass number to be easily copied directly from the app.
- Display security code: Some purchases require both a pass number and a security code. Since this is sensitive information, the user must authenticate before accessing it. We use biometric authentication to ensure secure access.
- Rotation locking: To ensure the pass remains properly displayed, screen rotation is locked while the user is viewing the pass.
- Increase screen brightness: To ensure the pass can be scanned properly.
- Block screenshot: To increase the module's safety, taking screenshots is disabled for some of the screens. Because of this, it is not possible to capture screens with sensitive data, such as the passes and the security code.

## Links

More information about City-Pass (Stadspas): https://www.amsterdam.nl/stadspas/
