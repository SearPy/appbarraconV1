import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { construct, constructOutline} from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Mantenimiento',
    url: '/app/mantenimiento',
    iosIcon: constructOutline,
    mdIcon: construct
  }
  // },
  // {
  //   title: 'Cargas',
  //   url: '/app/cargas',
  //   iosIcon: mailOutline,
  //   mdIcon: mailSharp
  // },
];


const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonItem>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src="src\imagenes\grupo2.png" alt="Logo" style={{ width: '150px', height: '100px', marginRight: '0px' }} />
              <div>
                <IonListHeader>Barracon</IonListHeader>
              </div>
            </div>
          </IonItem>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

      </IonContent>
    </IonMenu>
  );
};

export default Menu;
