import React, { useContext, useRef, useState } from 'react'
import { Image, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import uuid from 'react-native-uuid';
import { CartContext } from '../../../context/cartProvider'
import { colors } from '../../../theme/colors'
import { Food as FoodType } from '../../../types/global.types';
import { DeleteFoodBtnProps, FoodBtnProps, ScreenProps } from '../../../types/props.types'
import FoodHeader from './Header';
import IncreaseAndDecreaseBtn from './IncreaseAndDecreaseBtn';
import Materials from './Materials';
import Options from './Options';

const Food: React.FC<ScreenProps> = ({ navigation, route }) => {
    const { food, cartId, quantity, options, openFromCart, restaurantId, restaurantName } = route.params
    const { cartState, cartDispatch } = useContext(CartContext);
    const [nbOrder, setNbOrder] = useState<number>(quantity || 1);
    const [selectedOptions, setSelectedOptions] = useState<Array<string>>(options || []);
    const scrollViewRef = useRef<any>();
    const currentRestaurantCart = cartState.length ? cartState[0].restaurantId === restaurantId : true;

    const onScroll = (e: any) => {
        const scrollY = e.nativeEvent.contentOffset.y
        if (scrollY >= 150) {
            StatusBar.setBarStyle('dark-content', true);
            Platform.OS == "android" && StatusBar.setBackgroundColor(colors.white, true);
        } else {
            StatusBar.setBarStyle('light-content', true);
            Platform.OS == "android" && StatusBar.setBackgroundColor("#1919195e", true);
        }
    }

    const addCart = (food: FoodType) => {
        cartDispatch({ 
            type: "ADD_CART",
            payload: {
                id: uuid.v4(),
                restaurantId: restaurantId,
                restaurantName: restaurantName,
                food: food,
                totalPrice: total(food.price),
                quantity: nbOrder,
                options: selectedOptions
            }
        });
        navigation.goBack();
    }

    const updateCart = () => {
        cartDispatch({ 
            type: "UPDATE_CART",
            payload: {
                id: cartId, 
                food,
                restaurantId: restaurantId,
                restaurantName: restaurantName,
                totalPrice: total(food.price),
                quantity: nbOrder,
                options: selectedOptions
            }
        });
        navigation.goBack();
    }

    const removeCart = () => {
        cartDispatch({ 
            type: "REMOVE_CART",
            payload: cartId
        });
        navigation.goBack();
    }

    const total = (price: number) => (Math.round((price * nbOrder) * 100) / 100);

    return (
        <View style={styles.container}>
            <ScrollView
                onScroll={(e) => onScroll(e)} 
                ref={scrollViewRef}
                onContentSizeChange={() => openFromCart && scrollViewRef.current.scrollToEnd({ animated: true })}
                style={{ flex: 1, backgroundColor: colors.white}}
            >
                <StatusBar backgroundColor="#1919195e" barStyle="light-content" translucent />
                <FoodHeader food={food} />
                <Materials materials={food.materials} />
                <Options options={food.options} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} />
                {currentRestaurantCart && <IncreaseAndDecreaseBtn nbOrder={nbOrder} setNbOrder={setNbOrder} />}
                {openFromCart && <DeleteFoodBtn removeCart={removeCart}/>}
            </ScrollView>
            {currentRestaurantCart && 
                <FoodBtn 
                    text={openFromCart ? `Mettre à jour • ${total(food.price).toFixed(2)}€` : `Ajouter ${nbOrder} au panier • ${total(food.price).toFixed(2)}€`} 
                    onPress={() => openFromCart ? updateCart() : addCart(food)}
                />
            }
        </View>
    )
}

export default Food;

const FoodBtn: React.FC<FoodBtnProps> = ({ text, onPress }) => (
    <TouchableOpacity style={styles.addOrder} onPress={onPress}>
        <Text style={styles.textAddOrder}>{text}</Text>
    </TouchableOpacity>
)

const DeleteFoodBtn: React.FC<DeleteFoodBtnProps> = ({ removeCart }) => (
    <View style={{ alignItems: "center" }}>
        <TouchableOpacity style={styles.deleteBtnContainer} onPress={removeCart}>
            <Image style={styles.deleteImageBtn} source={require("../../../assets/icons/delete.png")} />
            <Text style={{ fontSize: 18, fontWeight: "500" }}>Supprimer du panier</Text>
        </TouchableOpacity>
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between"
    },
    addOrder: {
        width: "100%",
        backgroundColor: colors.primary,
    },
    textAddOrder: {
        color: colors.white,
        textAlign: "center",
        paddingVertical: 30,
        fontSize: 22
    },
    deleteBtnContainer: {
        backgroundColor: "#F3F3F3", 
        flexDirection: "row", 
        justifyContent: "center", 
        alignItems: "center", 
        borderRadius: 5, 
        paddingHorizontal: 10, 
        paddingVertical: 10, 
        marginBottom: 50
    },
    deleteImageBtn: {
        width: 25, 
        height: 25, 
        marginRight: 5
    }
})
