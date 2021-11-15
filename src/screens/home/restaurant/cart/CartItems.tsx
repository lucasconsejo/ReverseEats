import React from 'react'
import { Dimensions, FlatList, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { CartItemsProps } from '../../../../types/props.types'
import CartItem from './CartItem';
import SubTotalRender from './SubTotalRender';

const CartItems: React.FC<CartItemsProps> = ({ title, cartState, setShowCart, navigation, caculTotal }) => (
    <TouchableWithoutFeedback onPress={() => setShowCart(false)}>
        <View style={styles.container}>
            <View style={styles.subContainer} onStartShouldSetResponder={() => true}>
                <Text style={styles.title}>{title}</Text>
                <FlatList
                    style={{ maxHeight: 300}}
                    data={cartState}
                    renderItem={({ item }) => <CartItem item={item} navigation={navigation} />}
                />
                <SubTotalRender caculTotal={caculTotal} />
            </View>
        </View>
    </TouchableWithoutFeedback>
)

export default CartItems;

const styles = StyleSheet.create({
    container: { 
        position: "absolute", 
        bottom: 0, 
        height: Dimensions.get("screen").height, 
        width: "100%", 
        backgroundColor: "#00000087"
    },
    subContainer: { 
        backgroundColor: "white", 
        position: "absolute", 
        bottom: 0, 
        marginBottom: 85, 
        width: "100%"
    },
    title: { 
        textAlign: "center", 
        fontSize: 18,
        marginVertical: 15, 
        fontFamily: "UberMoveMedium" 
    }
});
