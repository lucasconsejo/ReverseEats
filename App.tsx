import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Home from './src/screens/home';

const Stack = createNativeStackNavigator()
const Tabs = createBottomTabNavigator();

const BottomTabsNavigation = () => (
  <Tabs.Navigator screenOptions={{ headerShown: false }}>
    <Tabs.Screen name="Home" component={Home} />
     <Tabs.Screen name= "Search" component={Home} />
      <Tabs.Screen name= "Orders" component={Home} />
      <Tabs.Screen name= "Profile" component={Home} />
  </Tabs.Navigator>
)

const App: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={BottomTabsNavigation}/>
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
