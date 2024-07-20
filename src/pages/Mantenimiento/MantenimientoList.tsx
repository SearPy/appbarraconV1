import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { add, eye, trash } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import useSQLiteDB from '../../SqlConfig/useSQLiteDB';

const MantenimientoList: React.FC = () => {

  //Interfaz para almacenar los datos 
  type mantenimientoItem = {
    id: string;
    fecha: string;
    mantenimiento: string;
    kilometraje: string;
    tipo: string;
    funcionario: string;
  };


  const [mantenimientos, setItem]= useState<Array<mantenimientoItem>>();
  const { performSQLAction, initialized } = useSQLiteDB();


  useEffect(() => {
    loadData();
  }, [initialized]);
  
  //Carga los datos de la DataBase
  const loadData = async () => {
      try {
          // query db
          performSQLAction(async (db: SQLiteDBConnection | undefined) => {
            const respSelect = await db?.query(`SELECT * FROM mantenimientos`);
            setItem(respSelect?.values);
          });
        } catch (error) {
          alert((error as Error).message);
          setItem([]);
      }
  }

  const history = useHistory();

  const addMantenimiento = () => {
    history.push('/app/mantenimiento/new');
  }

  const verMantenimiento = (id: string) => {
    history.push('/app/mantenimiento/' + id);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Mantenimiento</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard>
          <IonItem>
              <IonButton onClick={addMantenimiento} color="primary" fill="solid" slot="end" size="default">
                <IonIcon icon={add} />
              </IonButton>
            </IonItem>
            <IonGrid>
              <IonRow>
                <IonCol>Nro</IonCol>
                <IonCol>Fecha</IonCol>
                <IonCol>Mantenimiento</IonCol>
                <IonCol>Funcionario</IonCol>
                <IonCol></IonCol>
              </IonRow>
              {mantenimientos?.map((man) =>
                <IonRow key={man.id}>
                  <IonCol>{man?.id}</IonCol>
                  <IonCol>{new Date(man?.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}</IonCol>
                  <IonCol>{man?.tipo}</IonCol>
                  <IonCol>{man?.funcionario}</IonCol>
                  <IonCol>
                    <IonButton color="primary" fill="clear"
                              onClick={() => verMantenimiento(String(man.id))}>
                        <IonIcon icon={eye} slot="icon-only"/>
                    </IonButton>
                    <IonButton color="danger" fill="clear">
                      <IonIcon icon={trash} slot="icon-only" />
                    </IonButton>
                  </IonCol>
                </IonRow>
              )}
            </IonGrid>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default MantenimientoList;
