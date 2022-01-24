import { useIonRouter } from '@ionic/react';
import React, { useEffect } from 'react';
import { useAuthConnect } from '@ionic-enterprise/auth-react';

interface LogoutProps {}

const Logout: React.FC<LogoutProps> = () => {
    const router = useIonRouter();
    const { handleLogoutCallback, isAuthenticated } = useAuthConnect();

    useEffect(() => {
        (() => {
            // use when implicitLogin is set to CURRENT
            handleLogoutCallback()
            .then(() => {
                console.log('Logout Successful, Moving to Login page: ', isAuthenticated);
                router.push('/login', 'root');
            })
            .catch(error => {
                console.log(`Logout Error: ${error}`);
            })
        })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return null;
};

export default Logout;