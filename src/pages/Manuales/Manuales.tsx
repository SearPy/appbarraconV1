import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { add, pencil, close } from 'ionicons/icons';
import { useParams } from 'react-router';

const Manuales: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Piezas</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard>
          <IonItem>
              <IonButton color="primary" fill="solid" slot="end" size="default">
                <IonIcon icon={add} />
              </IonButton>
            </IonItem>
            <IonGrid className="table">
              <IonRow>
                <IonCol>Manales</IonCol>
                <IonCol></IonCol>
              </IonRow>
              <IonRow>
                <IonCol>Manual1</IonCol>
                <IonCol>
                  <IonButton color="primary" fill="clear">
                      <IonIcon icon={pencil} slot="icon-only" />
                  </IonButton>
                  <IonButton color="danger" fill="clear">
                    <IonIcon icon={close} slot="icon-only" />
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>Manual2</IonCol>
                <IonCol>
                  <IonButton color="primary" fill="clear">
                      <IonIcon icon={pencil} slot="icon-only" />
                  </IonButton>
                  <IonButton color="danger" fill="clear">
                    <IonIcon icon={close} slot="icon-only" />
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>Manual3</IonCol>
                <IonCol>
                  <IonButton color="primary" fill="clear">
                      <IonIcon icon={pencil} slot="icon-only" />
                  </IonButton>
                  <IonButton color="danger" fill="clear">
                    <IonIcon icon={close} slot="icon-only" />
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Manuales;
