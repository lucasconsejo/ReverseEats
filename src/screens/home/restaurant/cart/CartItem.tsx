import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../../../../theme/colors'
import { CartItemProps } from '../../../../types/props.types'

const CartItem: React.FC<CartItemProps> = ({ item, navigation }) => {
    const onPress = () => {
        navigation.navigate("Food", {
            food: item.food,
            restaurantId: item.restaurantId,
            quantity: item.quantity,
            options: item.options,
            openFromCart: true,
            cartId: item.id
        })
    }
    return (
        <TouchableOpacity onPress={onPress} key={item.id} style={styles.container}>
            <View style={styles.quantity}>
                <Text style={{ fontSize: 22 }}>{item.quantity}</Text>
            </View>
            <View style={{ width: "70%" }}>
                <Text numberOfLines={1} style={{ fontSize: 18 }}>{item.food.name}</Text>
                <Text style={{ color: "#7D7D7D" }}>{item.options.length} {item.options.length > 1 ? "options" : "option"}</Text>
            </View>
            <Text style={{ fontSize: 18 }}>{item.totalPrice}€</Text>
        </TouchableOpacity>
    )
}

export default CartItem;

const styles = StyleSheet.create({
    container: { 
        flexDirection: "row", 
        justifyContent: "space-between", 
        paddingHorizontal: 15, 
        paddingVertical: 25, 
        borderTopWidth: 1, 
        borderColor: colors.lineGray 
    },
    quantity: { 
        backgroundColor: "#F3F3F3", 
        borderRadius: 5, 
        width: 35, 
        height: 35, 
        justifyContent: "center", 
        alignItems: "center", 
        marginRight: 5 
    }
});
