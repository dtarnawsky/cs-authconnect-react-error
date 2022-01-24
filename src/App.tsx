import { useEffect, useMemo } from 'react';
import { IonApp, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import AuthConnectContainer from './components/AuthConnectProvider/AuthConnectProvider';
import { getStorageKeyFromVault, createVault } from './Vault/Vault.service';
import { VaultContextProvider } from './Vault/VaultContext';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  // Initialize vault object
  const vault = useMemo(() => createVault(), []);

  // Initialize the Vault, Database, and repositories on start of app
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(async () => {
      // Initialize repositories
        // setTimeout(async () => {
          const key = await getStorageKeyFromVault(vault);
          console.log(`App Key 1: ${key}`);
        // }, 10000);
    })();

  },[vault]);

  return (
    <VaultContextProvider vault={vault}>
      <IonApp>
        <IonReactRouter>
          <AuthConnectContainer /> 
        </IonReactRouter>
      </IonApp>  
    </VaultContextProvider>
  );
};

export default App;
