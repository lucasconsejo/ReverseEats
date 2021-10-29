import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import Login from '../screens/auth/login';
import Signup from '../screens/auth/signup';
import BottomTabsNavigation from './BottomTabsNavigation';

const Stack = createStackNavigator();

const Navigation: React.FC = () => (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS}}>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Signup" component={Signup}/>
        <Stack.Screen name="Home" component={BottomTabsNavigation}/>
      </Stack.Navigator>
    </NavigationContainer>
);

export default Navigation;