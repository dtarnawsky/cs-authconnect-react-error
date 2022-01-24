import React, { useContext } from 'react';
import {
    AuthConnectProvider,
    PrivateRoute,
} from "@ionic-enterprise/auth-react";
import { IonRouterOutlet, IonSplitPane, isPlatform } from "@ionic/react";
import { Redirect, Route, Switch, useLocation } from "react-router";

import Login from '../../pages/Login/Login';
import Logout from '../../pages/Logout/Logout';
import FormsList from '../../pages/FormList/FormsList';
import Callback from "../../pages/LoginCallback/LoginCallback";
import Menu from '../Menu/Menu';
import { VaultContext } from '../../Vault/VaultContext';

const AuthConnectContainer: React.FC = () => {
    const platform = isPlatform("capacitor") ? "capacitor" : "web";

    const redirectUri = isPlatform("capacitor")
        ? "io.ionic.starter://callback"
        : "http://localhost:3000/callback";
    
    const logoutUrl = isPlatform("capacitor")
        ? "io.ionic.starter://logout"
        : "https://localhost:3000/logout";

    const location = useLocation();

    // Set up for TokenStorageProvicer
    const vaultService = useContext(VaultContext);
    const tokenStorageProvider = vaultService.vault ? vaultService.vault : 'localStorage';
    console.log(`token Vault: ${JSON.stringify(tokenStorageProvider, null, 2)}`);

    return (
        <AuthConnectProvider
            checkSessionOnChange={location.pathname}
            logLevel={"DEBUG"}
            authConfig={"salesforce"}
            platform={platform}
            clientID={"5a5ef942-0e44-46a8-bbac-6a8ba7654eb0"}
            discoveryUrl={"https://ioniccs.b2clogin.com/ioniccs.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1_SignUp"}
            redirectUri={"io.ionic.starter://login"}
            scope={'openid offline_access email profile https://ioniccs.onmicrosoft.com/5a5ef942-0e44-46a8-bbac-6a8ba7654eb0/user_impersonation'}
            logoutUrl={"io.ionic.starter://logout"}
            iosWebView={"private"}
            webAuthFlow={"PKCE"}
            implicitLogin={"CURRENT"}
            loginPath={"/login"}
            onLoginSuccess={() => console.log("Login Successful")}
            onLogoutSuccess={() => console.log("Logout Successful")}
            initializingComponent={() => <div>...Private Route Loading...</div>}
            tokenStorageProvider={tokenStorageProvider}
        >
            <IonSplitPane contentId="main">
                <Menu />
                <IonRouterOutlet id="main">
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/logout" component={Logout} />
                        <Route path="/callback" component={Callback} />
                        <PrivateRoute exact path="/FormsList">
                            <FormsList />
                        </PrivateRoute>
                        <PrivateRoute exact path="/">
                            <Redirect to="/FormsList" />
                        </PrivateRoute>
                    </Switch>
                </IonRouterOutlet>          
            </IonSplitPane>
        </AuthConnectProvider>
    );
};

export default AuthConnectContainer;
