import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../../../../theme/colors';
import { Food } from '../../../../types/global.types';
import { MenuItemsProps } from '../../../../types/props.types';
import MenuItem from './MenuItem';

const MenuItems: React.FC<MenuItemsProps> = ({ restaurantId, restaurantName, foods, title, navigation }) => {
    const onPress = (food: Food) => {
        navigation.navigate("Food", { food, restaurantId, restaurantName });
    }
    return (
        <View style={styles.container}>
            {foods.length ? 
                <View style={styles.menuContainer}>
                    <Text style={styles.title}>{title}</Text>
                    {
                        foods.map((item: Food) => <MenuItem key={item.id} food={item} onPress={onPress} />)
                    }
                </View>
                : null
            }
        </View>
    );
}

export default MenuItems;

const styles = StyleSheet.create({
    container: {
        marginTop: 0,
    },
    menuContainer: {
        marginBottom: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderColor: colors.lineGray
    },
    title: {
        fontFamily: "UberMoveMedium",
        fontSize: 23,
    }
});
