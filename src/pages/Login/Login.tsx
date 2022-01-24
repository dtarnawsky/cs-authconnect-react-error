import { useEffect } from "react";
import {
    IonContent,
    IonPage,
    IonButton,
    useIonRouter
} from "@ionic/react";
import { useAuthConnect } from "@ionic-enterprise/auth-react";

import Toolbar from '../../components/Toolbar/Toolbar';

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
    const { error, isAuthenticated, login, getAccessTokenExpiration } = useAuthConnect();
    const router = useIonRouter();

    useEffect(() => {
        console.log(`Login isAuthenticated: ${isAuthenticated}`);
    
        if (isAuthenticated) {
            router.push("/FormsList", "none", "replace");
        }
    }, [isAuthenticated, router, getAccessTokenExpiration]);

    const handleLogin = () => {
        login();
    }; 

    // useEffect( () => {
    //     const random = async () => {
    //         // TODO Take out console.log
    //         const isAuthResults = await checkIsAuthenticated();
    //         console.log(`Login isAuthenticated: ${isAuthenticated}::: ${isAuthResults}`);
        
    //         if (isAuthResults) {
    //             // router.push("/FormsList", "none", "replace");
    //         } else {
    //             console.log('Login: ', isAuthResults)
    //         }
    //     };

    //     random();

    // }, [isAuthenticated, router, getAccessTokenExpiration, checkIsAuthenticated]);

    return (
        <IonPage>
            <Toolbar />
            <IonContent>
                <IonButton expand="block" onClick={handleLogin}>
                    Login
                </IonButton>
                {error && (
                    <>
                    <div>error</div>
                    <div>{JSON.stringify(error)}</div>
                    </>
                )}
            </IonContent>
        </IonPage>
    );
};

export default Login;