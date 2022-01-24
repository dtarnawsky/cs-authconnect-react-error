import {
  IonItem, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonCardContent, IonPage, IonContent
} from '@ionic/react';

import Toolbar from '../../components/Toolbar/Toolbar';

import './FormsList.css';

const FormsList: React.FC = () => {
  return (
    <IonPage>
      <Toolbar/>
      <IonContent>
        <IonItem lines="none">
          <IonCard onClick={() => null}>
            <IonCardHeader>
              <IonCardTitle>#18052063 - Simple Template</IonCardTitle>
              <IonCardSubtitle>F-00695603</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <div>
                <img className="expand-icon" src="assets/caret-down.svg" alt="down-arrow"></img>
              </div>
              <div>
                EXPAND
              </div>
            </IonCardContent>
          </IonCard>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default FormsList;
