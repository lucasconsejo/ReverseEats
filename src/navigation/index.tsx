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
import SelectOptions from '../screens/home/index/header/options/SelectOptions';
import Restaurant from '../screens/home/restaurant';
import Orders from '../screens/orders';
import Food from '../screens/home/food';
import Payment from '../screens/home/payment/';
import PaymentRunning from '../screens/home/payment/paiementRunning';
import PaymentResult from '../screens/home/payment/paymentResult';

const Stack = createStackNavigator();

const Navigation: React.FC<NavigationProps> = ({ defaultRoute }) => (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={defaultRoute} screenOptions={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS}}>
        
        {/* Auth */}
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Signup" component={Signup}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
        <Stack.Screen name="ForgotPasswordConfirm" component={ForgotPasswordConfirm}/>
        <Stack.Screen name="SignupForm" component={SignupForm}/>
        <Stack.Screen name="SignupAdress" component={SignupAdress}/>
        <Stack.Screen name="SignupConfirm" component={SignupConfirm}/>

        {/* Home */}
        <Stack.Screen name="Home" component={BottomTabsNavigation}/>
        <Stack.Screen name="DeliveryOptions" component={SelectOptions}/>
        <Stack.Screen name="Restaurant" component={Restaurant}/>
        <Stack.Screen name="Food" component={Food}/>
        {/* Paiements */}
        <Stack.Screen name="Payment" component={Payment}/>
        <Stack.Screen name="PaymentRunning" component={PaymentRunning}/>
        <Stack.Screen name="PaymentResult" component={PaymentResult}/>

        {/* Orders */}
        <Stack.Screen name="Orders" component={Orders}/>
      </Stack.Navigator>
    </NavigationContainer>
);

export default Navigation;