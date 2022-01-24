import React, { useMemo, useState } from 'react';
import { Vault, BrowserVault } from '@ionic-enterprise/identity-vault';
import { lockVault, unlockVault } from './Vault.service';

type VaultContextValue = {
    lockVault: () => Promise<void>,
    unlockVault: () => Promise<void>,
    vault: BrowserVault | Vault | null
}
export const VaultContext = React.createContext<VaultContextValue>({
    lockVault: () => { throw new Error('Vault not initiated.'); },
    unlockVault: () => { throw new Error('Vault not initiated.'); },
    vault: null
});

// Provider for context
interface VaultContextProviderProp {
    children?: React.ReactNode;
    vault: Vault | BrowserVault
}
export const VaultContextProvider = (props: VaultContextProviderProp) => {
    const [vault] = useState<Vault|BrowserVault>(props.vault);

    // Initialize vault service functions
    const connectedLockVault = useMemo(() => lockVault(vault), [vault]);
    const connectedUnlockVault = useMemo(() => unlockVault(vault), [vault]);

    const value: VaultContextValue = {
        lockVault: connectedLockVault,
        unlockVault: connectedUnlockVault,
        vault
    };

    return (
        <VaultContext.Provider value={value}>
            {props.children}
        </VaultContext.Provider>
    );
};