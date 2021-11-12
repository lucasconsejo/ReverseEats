import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React, { useContext } from 'react'
import { ImageBackground, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { OrderContext } from '../../../context/orderProvider'
import { colors } from '../../../theme/colors'
import { Food as FoodType } from '../../../types/global.types';
import { ScreenProps } from '../../../types/props.types'

const Food: React.FC<ScreenProps> = ({ navigation, route }) => {
    const { food } = route.params
    const {orderState, orderDispatch} = useContext(OrderContext);


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

    const addOrder = (food: FoodType) => {
        orderDispatch({ 
            type: "ADD_ORDER",
            payload: {
                id: food.id,
            }
        });
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <ScrollView
                onScroll={(e) => onScroll(e)} 
                style={{ flex: 1, backgroundColor: colors.white}}
            >
                <StatusBar backgroundColor="#1919195e" barStyle="light-content" translucent />
                <ImageBackground source={{ uri: food.img.replace(/ /g,"%20") }} style={styles.cover}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                        <FontAwesomeIcon icon={faArrowLeft} size={25} />
                    </TouchableOpacity>
                </ImageBackground>
                <View style={{ marginHorizontal: 15, marginTop: 10 }}>
                    <Text style={styles.title}>{food.name}</Text>
                    <Text style={styles.ingredients}>{food.ingredients}</Text>
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.addOrder} onPress={() => addOrder(food)}>
                <Text style={styles.textAddOrder}>Ajouter 1 au panier • {food.price}€</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Food

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between"
    },
    cover: {
        height: 300,
    }, 
    backBtn: {
        zIndex: 1,
        position: "absolute",
        top: 50,
        left: 20,
        borderRadius: 100,
        backgroundColor: colors.white,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    title: {
        fontFamily: "UberMoveBold",
        fontSize: 25
    },
    ingredients: {
        fontSize: 18,
        marginVertical: 10,
        color: colors.cookGray,
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
    }
})
