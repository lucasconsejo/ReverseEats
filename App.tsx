import { faHome, faSearch, faShoppingCart, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Text } from 'react-native';
import Home from './src/screens/home';

const Stack = createNativeStackNavigator()
const Tabs = createBottomTabNavigator()

const customTabBarIcon = (focused: boolean, icon: IconDefinition) => <FontAwesomeIcon icon={icon} color={focused ? "#3EB6BA" : "#ABABAE"} size={30} />
const customTabBarLabel = (focused: boolean, label: string) => <Text style={{ fontSize: 11, fontWeight: focused ? "bold" : "normal",  color: focused ? "#3EB6BA" : "#ABABAE" }}>{label}</Text>

const bottomTabsRoutes: Array<BottomTabsRoutesTypes> = [
  {
    name: "Home",
    label: "Accueil",
    icon: faHome,
    component: Home,
  },
  {
    name: "Search",
    label: "Parcourir",
    icon: faSearch,
    component: Home,
  },
  {
    name: "Orders",
    label: "Commandes",
    icon: faShoppingCart,
    component: Home,
  },
  {
    name: "Profile",
    label: "Profil",
    icon: faUser,
    component: Home,
  }
]

const BottomTabsNavigation = () => (
  <Tabs.Navigator screenOptions={{ headerShown: false, tabBarStyle: { paddingTop: 10, height: 90 } }}>
    {
      bottomTabsRoutes.map((item) => {
        return (
          <Tabs.Screen 
            name={item.name}
            component={item.component} 
            options={{ 
              tabBarLabel: ({ focused }) => customTabBarLabel(focused, item.label),
              tabBarIcon: ({ focused }) => customTabBarIcon(focused, item.icon)
            }}
          />
        )
      })
    }
  </Tabs.Navigator>
)

const App: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false}}>
      <Stack.Screen name="Main" component={BottomTabsNavigation}/>
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;

type BottomTabsRoutesTypes = {
  name: string,
  label: string,
  icon: IconDefinition,
  component: React.ComponentType<any>
}