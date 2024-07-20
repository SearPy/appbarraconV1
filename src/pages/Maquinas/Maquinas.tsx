import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { add, pencil, close } from 'ionicons/icons';
import { useParams } from 'react-router';

const Maquinas: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Maquinas</IonTitle>
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
                <IonCol>Nro</IonCol>
                <IonCol>Nombre</IonCol>
                <IonCol>Chapa</IonCol>
                <IonCol></IonCol>
              </IonRow>
              <IonRow>
                <IonCol>Nro</IonCol>
                <IonCol>Nombre</IonCol>
                <IonCol>Chapa</IonCol>
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

export default Maquinas;
