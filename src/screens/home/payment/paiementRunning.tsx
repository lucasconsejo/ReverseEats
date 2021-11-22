import React, { useEffect, useContext } from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import Logo from '../../../assets/light-logo.svg'
import { colors } from '../../../theme/colors'
import { ScreenProps } from '../../../types/props.types'
import { Order } from '../../../types/global.types'
import uuid from 'react-native-uuid';
import useUser from '../../../hooks/useUser'
import { OrderContext } from '../../../context/orderProvider'
import { CartContext } from '../../../context/cartProvider'
import { postOrder } from '../../../firebase/orderRequests'

const PaymentRunning: React.FC<ScreenProps> = ({ navigation }) => {
    const { cartState, cartDispatch } = useContext(CartContext);
    const { orderDispatch } = useContext(OrderContext); 
    const [user] = useUser();

    const calculTotal = cartState.reduce((a, b) => a + (b.totalPrice || 0), 0);
    const calculTotalFrais = calculTotal + 1.99;

    useEffect(() => {
        createOrder()
    }, []); 

    const createOrder = () => {
        const orderParams: Order = {
            id: uuid.v4().toString(),
            userID: user.id,
            foods: cartState.map((cart) => {
                return {
                    food: cart.food, 
                    options: cart.options,
                    quantity: cart.quantity
                }}),
            restaurantID: cartState[0].restaurantId,
            restaurantName: cartState[0].restaurantName,
            status: "En attente",
            orderDate: new Date(),
            total: calculTotalFrais
        }
        orderDispatch({
            type: "ADD_ORDER",
            payload: orderParams,
        });
        postOrder(orderParams)
        .then(() => {
            cartDispatch({
                type: "RESET_CART",
            });
            navigation.reset({
                index: 0,
                routes: [{ name: "PaymentResult" }],
            })
        });
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
            <View style={{ flex: 6, alignItems: 'center', justifyContent: 'center'}}>
                <Logo/>
                <Text style={{ fontSize: 22, marginTop: 10 }}>Transaction en cours...</Text>

            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{ fontSize: 21, fontFamily: "UberMoveMedium" }}>Ne quittez pas l'application</Text>
            </View>
        </View>
    )
}

export default PaymentRunning

const styles = StyleSheet.create({})
