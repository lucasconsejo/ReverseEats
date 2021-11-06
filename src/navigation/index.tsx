import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import Login from '../screens/auth/login';
import Signup from '../screens/auth/signup';
import SignupForm from '../screens/auth/signup/signupForm';
import SignupAdress from '../screens/auth/signup/signupAdress';
import SignupConfirm from '../screens/auth/signup/signupConfirm';
import BottomTabsNavigation from './BottomTabsNavigation';
import { NavigationProps } from '../types/props.types';
import ForgotPassword from '../screens/auth/forgotPassword';
import ForgotPasswordConfirm from '../screens/auth/forgotPassword/forgotPasswordConfirm';

const Stack = createStackNavigator();

const Navigation: React.FC<NavigationProps> = ({ defaultRoute }) => (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={defaultRoute} screenOptions={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS}}>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Signup" component={Signup}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
        <Stack.Screen name="ForgotPasswordConfirm" component={ForgotPasswordConfirm}/>
        <Stack.Screen name="SignupForm" component={SignupForm}/>
        <Stack.Screen name="SignupAdress" component={SignupAdress}/>
        <Stack.Screen name="SignupConfirm" component={SignupConfirm}/>
        <Stack.Screen name="Home" component={BottomTabsNavigation}/>
      </Stack.Navigator>
    </NavigationContainer>
);

export default Navigation;