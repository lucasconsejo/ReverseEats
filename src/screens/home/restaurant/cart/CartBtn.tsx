import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { colors } from '../../../../theme/colors';
import { CartBtnProps } from '../../../../types/props.types';

const CartBtn: React.FC<CartBtnProps> = ({ text, onPress }) => (
    <TouchableOpacity style={styles.cart} onPress={() => onPress()}>
        <Text style={styles.textCart}>{text}</Text>
    </TouchableOpacity>
)

export default CartBtn;

const styles = StyleSheet.create({
    cart: {
        width: "100%",
        backgroundColor: colors.primary,
    },
    textCart: {
        color: colors.white,
        textAlign: "center",
        paddingVertical: 30,
        fontSize: 22
    }
});
