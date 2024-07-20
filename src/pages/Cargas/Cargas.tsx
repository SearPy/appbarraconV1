import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { add, pencil, close } from 'ionicons/icons';
import { useHistory, useParams } from 'react-router';

const Cargas: React.FC = () => {

  const { name } = useParams<{ name: string; }>();
  const history = useHistory();

  const addCargas = () => {
    history.push('/app/cargas/new');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Cargas de Combustible</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard>
          <IonItem>
              <IonButton onClick={addCargas} color="primary" fill="solid" slot="end" size="default">
                <IonIcon icon={add} />
              </IonButton>
            </IonItem>
            <IonGrid className="table">
              <IonRow>
                <IonCol>Nro</IonCol>
                <IonCol>Fecha</IonCol>
                <IonCol>Cantidad</IonCol>
                <IonCol>Kilometraje</IonCol>
                <IonCol>Funcionario</IonCol>
                <IonCol></IonCol>
              </IonRow>
              <IonRow>
                <IonCol>Nro</IonCol>
                <IonCol>Fecha</IonCol>
                <IonCol>Cantidad</IonCol>
                <IonCol>Kilometraje</IonCol>
                <IonCol>Funcionario</IonCol>
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

export default Cargas;
