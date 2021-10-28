import { faHome, faSearch, faShoppingCart, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Home from '../../screens/home';

const TabsRoutes: Array<BottomTabsRoutesTypes> = [
    {
      name: "HomeScreen",
      label: "Accueil",
      icon: faHome,
      component: Home,
    },
    {
      name: "SearchScreen",
      label: "Parcourir",
      icon: faSearch,
      component: Home,
    },
    {
      name: "OrdersScreen",
      label: "Commandes",
      icon: faShoppingCart,
      component: Home,
    },
    {
      name: "ProfileScreen",
      label: "Profil",
      icon: faUser,
      component: Home,
    }
];

export default TabsRoutes;

type BottomTabsRoutesTypes = {
    name: string,
    label: string,
    icon: IconDefinition,
    component: React.ComponentType<any>
}