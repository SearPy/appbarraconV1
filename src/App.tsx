import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import Cargas from './pages/Cargas/Cargas';
import Maquinas from './pages/Maquinas/Maquinas';
import Piezas from './pages/Piezas/Piezas';
import Manuales from './pages/Manuales/Manuales';
import Funcionarios from './pages/Funcionarios/Funcionarios';
import CargasEdt from './pages/Cargas/CargasEdt';
import MantenimientoEdt from './pages/Mantenimiento/MantenimientoEdt';
import MantenimientoList from './pages/Mantenimiento/MantenimientoList';

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/app/mantenimiento" />
            </Route>
            <Route path="/app/mantenimiento" exact={true}>
              <MantenimientoList />
            </Route>
            <Route path="/app/mantenimiento/:id" exact={true}>
              <MantenimientoEdt/>
            </Route>
            <Route path="/app/cargas" exact={true}>
              <Cargas />
            </Route>
            <Route path="/app/cargas/:id" exact={true}>
              <CargasEdt />
            </Route>
            <Route path="/app/maquinas" exact={true}>
              <Maquinas />
            </Route>
            <Route path="/app/piezas" exact={true}>
              <Piezas />
            </Route>
            <Route path="/app/manuales" exact={true}>
              <Manuales />
            </Route>
            <Route path="/app/funcionarios" exact={true}>
              <Funcionarios />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
