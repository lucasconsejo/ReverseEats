import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useContext, useEffect, useState } from 'react'
import { RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ScreenProps } from '../../../types/props.types';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { colors } from '../../../theme/colors';
import { StatusBar } from 'expo-status-bar';
import useUser from '../../../hooks/useUser';
import { DateContext } from '../../../context/dateProvider';
import { CartContext } from '../../../context/cartProvider';
import CartItem from '../restaurant/cart/CartItem';
import CartBtn from '../restaurant/cart/CartBtn';
import { getOrders } from '../../../firebase/orderRequests';
import { Order } from '../../../types/global.types';

const Payment: React.FC<ScreenProps> = ({ navigation }) => {
    const { dateState} = useContext(DateContext);
    const { cartState } = useContext(CartContext);
    const [user] = useUser();

    const calculTotal = cartState.reduce((a, b) => a + (b.totalPrice || 0), 0);
    const calculTotalFrais = calculTotal + 1.99;


    const onSubmit = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "PaymentRunning" }],
        })
    }

    return cartState.length ?(
        <View style={{ backgroundColor: colors.white, flex:1, justifyContent: "space-between"}}>
                <StatusBar backgroundColor={colors.white} />

                <View style={{marginHorizontal: 25, marginTop: 45}}>
                    <View style={ styles.header }>
                        <TouchableOpacity style={styles.arrow} onPress={() => navigation.goBack()}>
                            <FontAwesomeIcon icon={faArrowLeft} color={colors.black} size={30} />
                        </TouchableOpacity>
                        <Text style={styles.title}>Paiement</Text>
                        <FontAwesomeIcon icon={faArrowLeft} color={colors.black} size={30} style={{ opacity: 0}}/> 
                    </View>

                    <View >
                        <View style={ styles.fakeInput }>
                            <Text style={{ fontSize: 17}} numberOfLines={1}>{user.address}</Text>
                        </View>
                        <View style={ styles.fakeInput }>
                            <Text style={{ fontSize: 17}} numberOfLines={1}>{dateState.dateFormat}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 20}}>
                    <Text style={{ fontSize: 22, fontFamily: "UberMoveMedium", marginBottom:6, marginHorizontal: 25}}>Résumé ({cartState.length})</Text>
                    <Text style={{ fontSize: 18, fontFamily: "UberMoveMedium", marginHorizontal: 25}}>{cartState[0].restaurantName}</Text>
                    
                    <ScrollView style={{ marginTop: 20, height: 230}}>
                        {cartState.map((item, index) => {
                            return (
                                <CartItem item={item} key={index} navigation={navigation} />
                            );
                        })}
                    </ScrollView>

                    <View style={styles.sousTotal}>
                        <Text style={{ fontSize: 18}}>Sous total</Text>
                        <Text style={{ fontSize: 18 }}>{calculTotal.toFixed(2)} €</Text>
                    </View>
                    <View style={styles.fraisDep}>
                        <Text style={{ fontSize: 18}}>Frais de déplacement</Text>
                        <Text style={{ fontSize: 18 }}>1,99 €</Text>
                    </View>
                    <View style={styles.total}>
                        <Text style={{ fontSize: 18, fontWeight: "600"}}>Total</Text>
                        <Text style={{ fontSize: 18,  fontWeight: "600"}}>{calculTotalFrais.toFixed(2)} €</Text>
                    </View>
                </View>
                <CartBtn text="Valider la transaction" onPress={onSubmit} />
        </View>
    ) : null
}

export default Payment;

const styles = StyleSheet.create({
    header: {
        marginTop: 15,
        marginBottom: 30,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    arrow: {
    },
    title: {
        color: colors.black,
        fontFamily: "UberMoveMedium",
        fontSize: 30,
        textAlign: "center",
    },
    fakeInput: {
        backgroundColor: "#F0F0F0",
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderRadius: 5,
        marginVertical: 6
    },
    itemView: { 
        flex: 1, 
        flexDirection: "row",
        justifyContent: "space-between",
        borderTopColor: colors.lineGray,
        borderTopWidth: 1,
        paddingVertical: 15
    },
    sousTotal: { 
        flexDirection: "row",
        paddingHorizontal: 15, 
        paddingVertical: 15,
        justifyContent:"space-between",
        borderTopColor: colors.lineGray, 
        borderTopWidth: 1, 
    },
    fraisDep: { 
        flexDirection: "row",
        paddingHorizontal: 15, 
        paddingVertical: 15,
        justifyContent:"space-between",
        borderTopColor: colors.lineGray, 
        borderTopWidth: 1, 
    },
    total: { 
        fontWeight: "700",
        flexDirection: "row",
        paddingHorizontal: 15, 
        paddingVertical: 15,
        justifyContent:"space-between",
        borderTopColor: colors.lineGray, 
        borderTopWidth: 1, 
    }

});
