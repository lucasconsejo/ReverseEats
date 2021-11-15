import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../../../../theme/colors';
import { MenuItemProps } from '../../../../types/props.types'

const MenuItem: React.FC<MenuItemProps> = ({ food, onPress }) => (
    <TouchableOpacity style={styles.container} onPress={() => onPress(food)}>
        <View style={styles.textContainer}>
            <Text style={styles.name} numberOfLines={2}>{food.name}</Text>
            <Text style={styles.ingredients} numberOfLines={2}>{food.ingredients}</Text>
            <Text style={styles.price}>{food.price}€</Text>
        </View>
        <Image style={{ width: 120, height: 120 }} source={{ uri: food.img.replace(/ /g,"%20") }}/>
    </TouchableOpacity>
)

export default MenuItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 15,
    },
    textContainer: {
        width: "60%",
        paddingLeft: 5,
    },
    name: {
        fontFamily: "UberMoveMedium",
        fontSize: 20,
    },
    ingredients: {
        marginVertical: 7,
        fontSize: 17,
        color: colors.cookGray
    },
    price: {
        fontSize: 20,
        color: colors.primary
    }
});
