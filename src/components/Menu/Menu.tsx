import {
    IonContent,
    IonItem,
    IonLabel,
    IonList,
    IonMenu,
    IonMenuToggle,
    // useIonRouter
} from '@ionic/react';
// import { useAuthConnect } from "@ionic-enterprise/auth-react";

interface MenuOptions {
    title: string;
    url: string;
}

const menuOptions: MenuOptions[] = [
    {
        title: 'Login',
        url: '/login'
    },
    {
        title: 'Logout',
        url: '/logout'
    }
];

const Menu: React.FC = () => {
    // const { logout, checkIsAuthenticated } = useAuthConnect();
    // const router = useIonRouter();

    return (
        <IonMenu contentId="main" type="overlay">
            <IonContent>
                <IonList>
                    {menuOptions.map((menuOption, index) => {
                        return (
                            <IonMenuToggle key={index} autoHide={false}>
                                <IonItem routerLink={menuOption.url} routerDirection="none" lines="none" detail={false}>
                                    <IonLabel>{menuOption.title}</IonLabel>
                                </IonItem>
                            </IonMenuToggle>
                        );
                    })}
                    {/* <IonMenuToggle key={'logout'} autoHide={false}>
                        <IonItem onClick={() => {
                            logout()
                            .then(async () => {
                                await checkIsAuthenticated();
                                console.log('Going to LogOUT')
                                router.push('/login');
                            })
                        }} routerDirection="none" lines="none" detail={false}>
                            <IonLabel>Logout</IonLabel>
                        </IonItem>
                    </IonMenuToggle> */}
                </IonList>
            </IonContent>
        </IonMenu>
    );
};

export default Menu;
