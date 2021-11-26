import { DateTime } from 'luxon';
import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, Animated, RefreshControl, ScrollView } from 'react-native'
import { colors } from '../../theme/colors';
import { ScreenProps } from '../../types/props.types';
import { capitalizeFirstLetter } from '../../utils/utils';
import Thai from "../../assets/icons/thai.png"
import Healthy from "../../assets/icons/healthy.png"
import French from "../../assets/icons/french.png"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { getOrder } from '../../firebase/orderRequests';
import MapViewContainer from './MapViewContainer';

const OrderStatus: React.FC<ScreenProps> = ({ navigation, route }) => {
    const { order } = route.params;
    const [orderState, setOrderState] = useState(order);
    const [middleMarker, setMiddleMarker] = useState<any>(null);
    const [duration, setDuration] = useState<number>(0);
    let scroll = new Animated.Value(0)
    const [animation] = useState<any>(new Animated.Value(0));
    const markers = [
        {
            role: "customer",
            latitude: orderState.lat,
            longitude: orderState.long,
            title: 'Lieu du rendez-vous',
            description: orderState.address
        },
        {
            role: "cook",
            latitude: 44.8428,
            longitude: -0.572696,
            title: 'Cuisinier',
            description: ""
        }
    ];

    useEffect(() => {
        startAnimation();
    }, [orderState]);

    useEffect(() => {
        getOrder(orderState.id)
        .then(res => res.json())
        .then(res => {
            setOrderState(res.data);
        })
    }, []) 

    const startAnimation = () => {
        Animated.loop(
            Animated.timing(animation, {
                toValue: 85,
                useNativeDriver: false,
                duration: 1500
            })
          ).start();
    }

    const boxInterpolation = animation.interpolate({
        inputRange: [0, 85],
        outputRange:[0, 85]
    });

    const getDateToString = (date: string) => {
        const dateTime = DateTime.fromISO(date);
        return capitalizeFirstLetter(dateTime.setLocale('fr').toFormat("DDDD à HH:mm"));
    }

    const renderMaps = (status: string) => {
        return status === "En route" ? 
            <MapViewContainer
                duration={duration}
                setDuration={setDuration}
                markers={markers}
                middleMarker={middleMarker}
                setMiddleMarker={setMiddleMarker}
            />
         : (
            <View style={styles.contentStatus}>
                <View style={styles.statusImg}>
                    <Image source={getStatusImgRender(orderState.status)} style={{ width: 150, height: 150 }}/>
                </View>
                <Text style={styles.statusTitle}>{getStatusTitleRender(orderState.status)}</Text>
                <Text style={styles.statusSubTitle}>{getStatusSubTitleRender(orderState.status)}</Text>
            </View> 
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesomeIcon icon={faArrowLeft} color={colors.black} size={30} />
                </TouchableOpacity>
                {orderState.status === "En route" ? (
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }}>
                        <Text style={{ fontFamily: "UberMoveMedium", fontSize: 35 }}>{DateTime.now().plus({ minutes: duration }).toFormat("HH:mm")}</Text>
                        <Text style={{ color: colors.cookGray, fontSize: 18, marginBottom: 5 }}>Arrivée estimée</Text>
                    </View>
                ) : (
                    <Text style={styles.date}>{getDateToString(orderState.orderDate)}</Text>
                )}
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 5 }}>
                    {Array.from(Array(4)).map((item, index) =>  {
                        if (index < getStatusBarRender(orderState.status)) {
                            return <View key={index} style={{ width: 85, height: 6, backgroundColor: colors.primary }} />
                        } else if (getStatusBarRender(orderState.status) == 3) {
                            return <View key={index} style={{ width: 85, height: 6, backgroundColor: colors.primary }} />
                        } else if (index == getStatusBarRender(orderState.status)) {
                            return (
                                <View key={index}>
                                    <View style={{ width: 85, height: 6, backgroundColor: colors.lineGray }} />
                                    <Animated.View style={{ position: "absolute",  width: boxInterpolation, height: 6, backgroundColor: colors.primary }} />
                                </View>
                            )
                        } else {
                            return <View key={index} style={{ width: 85, height: 6, backgroundColor: colors.lineGray }} />
                        }
                    })}
                </View>
                <Text style={styles.subTitleHeader}>{getHeaderStatusMsgRender(orderState.status)}</Text>
            </View>
            <Animated.ScrollView showsVerticalScrollIndicator={false}  onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scroll }}}], {useNativeDriver: true})}>
                <Animated.View 
                    style={{
                        height: 500,
                        transform: [{translateY: Animated.multiply(scroll, 1)}]
                      }}>
                    <View style={styles.content}>
                        {renderMaps(orderState.status)} 
                    </View>
                </Animated.View>
                <View style={styles.infos}>
                    <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
                        <View style={{ backgroundColor: colors.lineGray,  height: 5, borderRadius: 5, width: 80 }} />
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={{ width: "75%", fontSize: 20, fontFamily: "UberMoveMedium" }}>{orderState.restaurantName}</Text>
                        {statusToDisplay(orderState.status)}
                    </View>
                    <Text style={{ fontSize: 20, marginVertical: 10 }}>Résumé</Text>
                    <View style={{ marginTop: 10 }}>
                        {orderState.foods.map((item: any, index: number) => (
                            <View key={index} style={{ flexDirection: "row", justifyContent: "space-between", borderColor: colors.lineGray, borderBottomWidth: 1, paddingVertical: 10 }}>
                                <View style={styles.quantity}>
                                    <Text style={{ fontSize: 22 }}>{item.quantity}</Text>
                                </View>
                                <View style={{ width: "65%" }}>
                                    <Text numberOfLines={1} style={{ fontSize: 18 }}>{item.food.name}</Text>
                                    <Text numberOfLines={2} style={{ color: "#7D7D7D" }}>{item.food.ingredients}</Text>
                                </View>
                                <View>
                                    <Image style={{ height: 75, width: 75, backgroundColor: colors.lightGray }} source={{ uri: item.food.img.replace(/ /g,"%20") }} />
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </Animated.ScrollView>
        </SafeAreaView>
    )
}

export default OrderStatus;

const styles = StyleSheet.create({
    header: {
        padding: 15
    },
    date: {
        fontFamily: "UberMoveMedium",
        fontSize: 24,
        marginVertical: 10
    },
    subTitleHeader: {
        fontSize: 16,
        marginVertical: 5
    },
    content: {
        height: 500,
        backgroundColor: colors.lightGray
    },
    infos: {
        backgroundColor: colors.white,
        paddingHorizontal: 15,
        paddingBottom: 15,
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5
    },
    contentStatus: {
        alignItems: "center"
    },
    statusImg: {
        marginTop: 60
    },
    statusTitle: {
        fontSize: 24,
        fontFamily: "UberMoveMedium"
    },
    statusSubTitle: {
        paddingHorizontal: 10,
        fontSize: 17,
        textAlign: "center",
        marginTop: 15,
        color: colors.graySubTitle
    },
    quantity: { 
        backgroundColor: "#F3F3F3", 
        borderRadius: 5, 
        width: 35, 
        height: 35, 
        justifyContent: "center", 
        alignItems: "center", 
        marginRight: 5 
    },
});

const statusStyles = StyleSheet.create({
    base: {
        paddingHorizontal: 8, 
        paddingVertical: 4, 
        alignSelf: "flex-start",
        borderRadius: 5
    },
    enAttente: {
        backgroundColor: 'rgba(253, 132, 21, 0.1)',
    },
    enCours: {
        backgroundColor: 'rgba(62, 182, 186, 0.1)',
    },
    termine: {
        backgroundColor: colors.primary,
    },
    annule: {
        backgroundColor: 'rgba(186, 62, 62, 0.1)',
    },
    inconnu: {
        backgroundColor: 'rgba(170, 170, 170, 0.1)',
    }
})

const getStatusBarRender = (status: string) => { 
    switch (status) {
        case "Acceptée":
            return 0
        case "En route":
            return 1
        case "En cours":
            return 2
        case "Terminée":
            return 3
        default :
            return -1
    }
}

const getHeaderStatusMsgRender = (status: string) => { 
    switch (status) {
        case "En attente":
            return "Votre commande est en attente de confirmation du cuisinier."
        case "Acceptée":
            return "Le cuisinier a accepté et prépare votre commande."
        case "En route":
            return "Le cuisinier est en route vers le lieu de rendez-vous."
        case "En cours":
            return "Le cuisnier est arrivé au lieu de rendez-vous."
        case "Annulée":
            return "Le cuisnier a refusé votre commande."
        case "Terminée":
            return "Le cuisnier est parti du lieu de rendez-vous."
        default :
            return "Votre commande est en attente de confirmation du cuisinier."
    }
}

const getStatusTitleRender = (status: string) => { 
    switch (status) {
        case "Acceptée":
        case "En attente":
        case "En route":
            return "Un peu de patience"
        case "En cours":
            return "Commande en cours"
        case "Annulée":
            return "Commande annulée"
        case "Terminée":
            return "Commande terminée"
        default :
            return "Un peu de patience"
    }
}

const getStatusSubTitleRender = (status: string) => { 
    switch (status) {
        case "En route":
        case "Acceptée":
            return "Le cuisinier a besoin de se préparer pour vous offrir le meilleur."
        case "En attente":
            return "Le cuisinier va confirmer votre commande."
        case "En cours":
            return "Le cuisinier est en train de cuisiner votre commande."
        case "Annulée":
            return "Le cuisinier a annulé votre commande."
        case "Terminée":
            return "Le cuisinier a terminé de cuisiner."
        default :
            return "Le cuisinier va confirmer votre commande."
    }
}

const getStatusImgRender = (status: string) => { 
    switch (status) {
        case "En route":
        case "Acceptée":
            return Healthy
        case "Annulée":
        case "Terminée":
        case "En attente":
            return Thai
        case "En cours":
            return French
        default :
            return Thai
    }
}

const statusToDisplay = (status: string) => { 
    switch (status) {
        case "En attente":
            return (
                <View style={[statusStyles.enAttente, statusStyles.base]}>
                    <Text style={{ 
                    color: "#FD8415", 
                    }}>{status}</Text>
                </View>
            )
        case "Acceptée":
        case "En route":
        case "En cours":
            return (
                <View style={[statusStyles.enCours, statusStyles.base]}>
                    <Text style={{ 
                    color: colors.primary, 
                    }}>{status}</Text>
                </View>
            ) 
        case "Terminée":
            return (
                <View style={[statusStyles.termine, statusStyles.base]}>
                    <Text style={{ 
                    color: colors.white, 
                    }}>{status}</Text>
                </View>
            ) 
        case "Annulée":
            return (
            <View style={[statusStyles.annule, statusStyles.base]}>
                <Text style={{ 
                color: "#BA3E3E", 
                }}>{status}</Text>
            </View>
            ) 
        default :
            return (
            <View style={[statusStyles.inconnu, statusStyles.base
                ]}>
                <Text style={{ 
                color: "#BA3E3E", 
                }}>Statut inconnu</Text> 
            </View>
        )
        
    }
}
