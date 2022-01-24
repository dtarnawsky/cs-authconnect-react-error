import { Capacitor } from '@capacitor/core';
import { IdentityVaultConfig, BrowserVault, Vault, VaultType, DeviceSecurityType } from '@ionic-enterprise/identity-vault';

// Vault Keys
export const storageVaultKey = 'storage-key';
// Cofigurations for initializing Identity Vault
export const vaultConfig: IdentityVaultConfig = {
    key: 'com.youreka.mobile.v2',
    type: VaultType.DeviceSecurity,
    // TODO: determine device security type. Android only supports SystemPasscode on Android 11 and greater.
    deviceSecurityType: DeviceSecurityType.Both,
    // TODO: Determine following values
    lockAfterBackgrounded: 1000,
    shouldClearVaultAfterTooManyFailedAttempts: true,
    customPasscodeInvalidUnlockAttempts: 2,
    unlockVaultOnLoad: false
};

/**
 * Create the Vault object
 * @returns Returns vault object
 */
export const createVault = (): BrowserVault | Vault  => {
    return Capacitor.getPlatform() === 'web'
    ? new BrowserVault(vaultConfig)
    : new Vault(vaultConfig);
};

// Values for different device secureity types
type LockType = 'NoLocking' | 'Biometrics' | 'SystemPasscode' | 'Both' | undefined;
/**
 * Return the correct device security configs to update the vault
 * @param lockType Type of vault lock that needs to be returned
 * @returns Vault type and security type configs
 */
export const getConfigUpdates = (lockType: LockType): { type: VaultType, deviceSecurityType: DeviceSecurityType} => {
    switch (lockType) {
        case 'Biometrics':
            return {
                type: VaultType.DeviceSecurity,
                deviceSecurityType: DeviceSecurityType.Biometrics,
            };
        case 'SystemPasscode':
            return {
                type: VaultType.DeviceSecurity,
                deviceSecurityType: DeviceSecurityType.SystemPasscode,
            };
        case 'Both':
            return {
                type: VaultType.DeviceSecurity,
                deviceSecurityType: DeviceSecurityType.Both,
            };
        default:
            return {
                type: VaultType.SecureStorage,
                deviceSecurityType: DeviceSecurityType.None,
            };
    }
};

/**
 * Get the Storage Database key and set it to the setStorage state value
 * @param Vault object
 * @returns Storage Key value
 */
export const getStorageKeyFromVault = async (vault: Vault | BrowserVault): Promise<string> => {
    console.log('GetStorage Before');
    let key = await vault.getValue(storageVaultKey);
    if (!key) {
        console.log('SETStorage Before');
        await vault.setValue(storageVaultKey, 'dummyKey');
        console.log('SETStorage After');
    }
    console.log('GetStorage After');
    return key;
};

/**
 * Lock Vault
 * @param vault object to lock
 */
export const lockVault = (vault: Vault | BrowserVault) => async (): Promise<void> => {
    console.log('Vault Locked');
    await vault.lock();
};

/**
 * Unlock Vault
 * @param vault object to unlock
 */
export const unlockVault = (vault: Vault | BrowserVault) => async (): Promise<void> => {
    console.log('Vault Un-Locked');
    await vault.unlock();
};