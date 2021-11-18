import { faHome, faSearch, faShoppingCart, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Home from '../../screens/home/index';
import Orders from '../../screens/orders';
import Profil from '../../screens/profil';
import Search from '../../screens/search';

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
      component: Search,
    },
    {
      name: "OrdersScreen",
      label: "Commandes",
      icon: faShoppingCart,
      component: Orders,
    },
    {
      name: "ProfileScreen",
      label: "Profil",
      icon: faUser,
      component: Profil,
    }
];

export default TabsRoutes;

type BottomTabsRoutesTypes = {
    name: string,
    label: string,
    icon: IconDefinition,
    component: React.ComponentType<any>
}