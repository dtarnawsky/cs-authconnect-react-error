import { IonHeader, IonToolbar, 
  IonButtons, IonMenuButton } from '@ionic/react';
import './Toolbar.css';

interface ContainerProps { }

const Toolbar: React.FC<ContainerProps> = () => {
  // TODO Toolbar needs to be dynamic for Forms (aka add search bar and such) and Complete forms
  return (
    <IonHeader class="ion-no-border">
      <IonToolbar class="toolbar">
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Toolbar;
