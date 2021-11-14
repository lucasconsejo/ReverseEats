import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React, { useContext, useState } from 'react'
import { ImageBackground, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { OrderContext } from '../../../context/orderProvider'
import CollapseBtn from '../../../theme/collapseBtn'
import { colors } from '../../../theme/colors'
import { Food as FoodType } from '../../../types/global.types';
import { ScreenProps } from '../../../types/props.types'

const Food: React.FC<ScreenProps> = ({ navigation, route }) => {
    const { food } = route.params
    const {orderState, orderDispatch} = useContext(OrderContext);
    const [nbOrder, setNbOrder] = useState<number>(1);
    const [increaseLongPress, setIncreaseLongPress] = useState<any>(null);
    const [decreaseLongPress, setDecreaseLongPress] = useState<any>(null);
    const [selectedOptions, setSelectedOptions] = useState<Array<string>>([]);

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
        // orderDispatch({ 
        //     type: "ADD_ORDER",
        //     payload: {
        //         id: food.id,
        //     }
        // });
        navigation.goBack();
    }

    const increaseOrder = () => {
        setNbOrder((prev: number) => prev < 99 ? prev+1 : prev);
        setIncreaseLongPress(setTimeout(increaseOrder, 200));
    }

    const decreaseOrder = () => {
        setNbOrder((prev: number) => prev > 1 ? prev-1 : prev);
        setDecreaseLongPress(setTimeout(decreaseOrder, 200));
    }

    const total = (price: number) => (Math.round((price * nbOrder) * 100) / 100).toFixed(2);

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

                <View style={{ marginVertical: 10 }}>
                    <CollapseBtn
                        title="Matériel requis"
                        noDataTitle="Aucun matériel requis"
                        data={food.materials}
                        type="materials"
                        defaultShow
                    />
                </View>

                <View style={{ marginVertical: 10,  paddingBottom: 15, borderBottomWidth: 1, borderColor: colors.lineGray }}>
                    <CollapseBtn
                        title="Options"
                        noDataTitle="Aucune option"
                        data={food.options}
                        type="options"
                        selectedData={selectedOptions}
                        onChangeSelectedData={setSelectedOptions}
                        defaultShow
                    />
                </View>

                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: 50 }}>
                    <TouchableOpacity onPressIn={decreaseOrder} onPressOut={() => clearInterval(decreaseLongPress)}>
                        <View style={[styles.increaseBtn, { opacity: nbOrder > 1 ? 1 : 0.3  }]}>
                            <Text style={styles.textIncrease}>-</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 30, marginHorizontal: 30 }}>{nbOrder}</Text>
                    <TouchableOpacity onPressIn={increaseOrder} onPressOut={() => clearInterval(increaseLongPress)}>
                        <View style={styles.increaseBtn}>
                            <Text style={styles.textIncrease}>+</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.addOrder} onPress={() => addOrder(food)}>
                <Text style={styles.textAddOrder}>Ajouter {nbOrder} au panier • {total(food.price)}€</Text>
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
    }, 
    increaseBtn: {
        width: 80,
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        backgroundColor: colors.lightGray,
    },
    textIncrease: {
        fontSize: 50
    }
})
