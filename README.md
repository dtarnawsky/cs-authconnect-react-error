# Auth Connect React
This sample app has a call `getStorageKeyFromVault` which gets a value from the vault at startup. It also uses Auth Connect and its `tokenStorageProvider` is set the same vault.

During startup the second time it will throw a `code: 8, message: "User canceled auth attempt."` error because both Auth Connect and the app are trying to access a biometrically secured vault at the same time.