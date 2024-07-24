import { IonAlert, IonButton, IonButtons, IonCard, IonCol, IonContent, IonDatetime, IonDatetimeButton, IonGrid,
          IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonModal, IonPage, 
          IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import { checkmark, arrowDown } from 'ionicons/icons';
import { useRouteMatch } from 'react-router-dom'
import { useHistory } from 'react-router';
import '../Paginas.css';
import { useMaskito } from '@maskito/react';
import { useEffect, useState } from 'react';
import Pieza from './Piezas';
import useSQLiteDB from '../../SqlConfig/useSQLiteDB';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';


const MantenimientoEdt: React.FC = () => {

  const history = useHistory();
  const [selectedOption, setSelectedOption] = useState('');
  const [mantenimientos, setItem]= useState<{ fecha: string, mantenimiento: string, kilometraje: string, tipo: string, funcionario: string  }>({ fecha: '', 
  mantenimiento: '', kilometraje: '', tipo: '', funcionario: ''});
  const { performSQLAction, initialized } = useSQLiteDB();
  const [currentDate, setCurrentDate] = useState('')
  const [isOpen, setIsOpen] = useState(false);
  const [piezanew, setPiezanew]= useState<{ pieza: string, cantidad: string }>({ pieza: '', cantidad: '' });
  const [pieza, setPieza]= useState<Pieza[]>([]);
  const routeMatch: any = useRouteMatch("/app/mantenimiento/:id");
  const id = routeMatch?.params?.id;

  
  useEffect(() => {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const localDate = new Date(now.getTime() - offset * 60 * 1000);
    setCurrentDate(localDate.toISOString().slice(0, -1));
  }, []);

  useEffect(() => {
    console.log("el id es: " + id)
    search();
  }, [history.location.pathname]);

  const seleccion = (e: any) => {
    setSelectedOption(e.detail.value);
  };

  
  const retorno = () => {
    history.push('/app/mantenimiento');
  }

  const cinMaskOpt = {
    mask: [/\d/,'.',/\d/, /\d/, /\d/,'.', /\d/, /\d/, /\d/],
  };
  const cinMask = useMaskito({ options: cinMaskOpt });

  const inputPiezas = (e: any) => {
    const { name, value } = e.target;
    setPiezanew({ ...piezanew, [name]: value });
  };

  const inputMantenimiento = (e: any) => {
    const { name, value } = e.target;
    setItem({ ...mantenimientos, [name]: value });
  };

  const addpieza = () =>{
    if(piezanew.pieza =='' || piezanew.cantidad === ''){
      setIsOpen(true);
    }else{
      setPieza(prevPiezanew => [...prevPiezanew, piezanew]);
      setPiezanew ({ pieza: '', cantidad: '' });
    }
  } 


  const saveMantenimiento = async () => {
    if (
      mantenimientos.funcionario === '' ||  
      mantenimientos.kilometraje === '' || 
      mantenimientos.mantenimiento === '' || 
      selectedOption === '' || 
      pieza.length === 0
    ) {
      setIsOpen(true);
    } else {
      try {
        performSQLAction(
          async (db: SQLiteDBConnection | undefined) => {
            await db?.query(`INSERT INTO mantenimientos (fecha, mantenimiento, kilometraje, tipo, funcionario) values (?, ?, ?, ?, ?);`, [
              currentDate,
              mantenimientos.mantenimiento,
              mantenimientos.kilometraje,
              selectedOption,
              mantenimientos.funcionario
            ]);
  
            const result = await db?.query('SELECT last_insert_rowid() as id;');
            
            if (result && result.values && result.values.length > 0) {
              const generatedId = result.values[0].id;
              for (const p of pieza) {
                await db?.query(`INSERT INTO piezas (pieza, cantidad, mantenimiento_id) values (?, ?, ?);`, [
                  p.pieza,
                  p.cantidad,
                  generatedId
                ]);
              }
            } else {
              console.error('No se pudo obtener el ID generado');
            }
          },
          async () => {
            setItem({ fecha: '', mantenimiento: '', kilometraje: '', tipo: '', funcionario: ''});
          }
        );
        retorno();
      } catch (error) {
        alert((error as Error).message);
      }
    }
  };


  const search = async () => {
    if (id === 'new') {
      setItem({ fecha: '', mantenimiento: '', kilometraje: '', tipo: '', funcionario: '' });
    } else {
      try {
        performSQLAction(async (db: SQLiteDBConnection | undefined) => {
          const respSelect = await db?.query(`SELECT * FROM mantenimientos WHERE id = ?`, [id]);
          if (respSelect && respSelect.values && respSelect.values.length > 0) {
            console.log("Encontré el registro con el ID:", id);
            setItem(respSelect.values[0]);
            console.log("Este es: " + respSelect.values[0].mantenimiento);
          } else {
            console.log("No se encontró ningún registro con el ID:", id);
            setItem({ fecha: '', mantenimiento: '', kilometraje: '', tipo: '', funcionario: ''});
          }
        });
      } catch (error) {
        alert((error as Error).message);
        setItem({ fecha: '', mantenimiento: '', kilometraje: '', tipo: '', funcionario: ''});
      }
    }
  }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Mantenimiento de Maquinarias</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <IonRow>
            <IonItem>
              <IonDatetimeButton datetime="datetime" disabled></IonDatetimeButton>
                <IonModal keepContentsMounted={true}>
                  <IonDatetime id="datetime" value={currentDate}></IonDatetime>
                </IonModal>
            </IonItem>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Mantenimiento</IonLabel>
                <IonInput autocapitalize="characters"
                          name="mantenimiento"
                          value={mantenimientos.mantenimiento}
                          onIonInput={inputMantenimiento}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Kilometraje</IonLabel>
                <IonInput autocapitalize="characters" type='number'
                          name="kilometraje"
                          value={mantenimientos.kilometraje}
                          onIonInput={inputMantenimiento}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonItem>
              <IonLabel position="stacked">Tipo de Mantenimiento</IonLabel>
              <IonSelect aria-label="Tipo" interface="action-sheet" placeholder="Tipo de Mantenimiento"
                          onIonChange={seleccion}>
                <IonSelectOption value="Cambio de Aceite">Cambio de Aceite</IonSelectOption>
                <IonSelectOption value="Cambio de Piezas">Cambio de Piezas</IonSelectOption>
                <IonSelectOption value="Soldadura">Soldadura</IonSelectOption>
              </IonSelect>
            </IonItem>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Funcionario</IonLabel>
                <IonInput autocapitalize="characters"
                          ref={async (phoneInput) => {
                            if (phoneInput) {
                              const input = await phoneInput.getInputElement();
                              cinMask(input);
                            }
                          }}
                          placeholder='1.234.567'
                          name="funcionario"
                          value={mantenimientos.funcionario}
                          onIonInput={inputMantenimiento}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Pieza</IonLabel>
                <IonInput autocapitalize="characters"
                          name="pieza"
                          value={piezanew.pieza}
                          onIonInput={inputPiezas}></IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Cantidad</IonLabel>
                <IonInput autocapitalize="characters" type='number'
                          name="cantidad"
                          value={piezanew.cantidad}
                          onIonInput={inputPiezas}></IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonButton onClick={addpieza} color="primary" fill="solid" size="default">
                <IonIcon icon={arrowDown} />
              </IonButton>
            </IonCol>
          </IonRow>

          <IonAlert
            isOpen={isOpen}
            header="Error"
            message="Verifica los campos"
            buttons={['ok']}
            onDidDismiss={() => setIsOpen(false)}>
          </IonAlert>

          <IonGrid>
            <IonRow>
              <IonCol>Pieza</IonCol>
              <IonCol>Cantidad</IonCol>
            </IonRow>
            {pieza.map((p, index) => (
              <IonRow key={index}>
                <IonCol>{p.pieza}</IonCol>
                <IonCol>{p.cantidad}</IonCol>
              </IonRow>
            ))}
          </IonGrid>
          <IonItem>
              <IonButton onClick={saveMantenimiento} color="success" fill="solid" slot="end" size="default" >
                <IonIcon icon={checkmark} />
              </IonButton>
            </IonItem>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default MantenimientoEdt;
