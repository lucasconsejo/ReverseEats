import React, { useContext, useEffect, useState } from "react"
import { Text, View, StyleSheet, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ScreenProps } from "../../types/props.types"
import { colors } from "../../theme/colors";
import Button from "../../theme/buttons";
import useUser from "../../hooks/useUser";
import Bowl from "../../assets/img/bowl.svg";
import { OrderContext } from "../../context/orderProvider";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { getOrders } from "../../firebase/orderRequests";
import { DateTime, Zone } from 'luxon';


const Orders: React.FC<ScreenProps> = ({ navigation }) => {
    const [user, userDispatch] = useUser();
    const {orderState} = useContext(OrderContext);
    const [userOrders, setuserOrders] = useState([]);
    
console.log(orderState)

    const getUserOrders = () => {
        getOrders(user.id)
        .then(res => res.json())
        .then(res => {
            setuserOrders(res.data);
        })
    }

    useEffect(() => {

        getUserOrders();
    }, [orderState]);

    const getDateToString = (date: string) => {
        const dateTime = DateTime.fromISO(date);
        return dateTime.setLocale('fr').toLocaleString({ weekday: 'long', month: 'long', day: '2-digit'});
    }
    const dataToDisplay = () => {
        if(!userOrders.length) {
            return (
                <View style={{alignItems: "center", flex: 1, flexDirection: "column", justifyContent:"center"}}>
                    <Bowl/>
                    <Text style={{fontFamily: "UberMoveMedium", fontSize:23, paddingBottom: 12, height: 38 }}>
                        Aucune commande en cours
                        </Text>
                    <Text style={{ fontSize: 17, textAlign:"center", paddingBottom: 35}}>Commencez par ajouter des plats d’un restaurant.</Text>
            
                    <Button
                        theme="blackBtn" 
                        style={{}} 
                        title="Commander" 
                        onPress={() => navigation.navigate("SearchScreen")}
                    />
                </View>
            );
        } else { 
            return (
                <ScrollView>
                    {userOrders.map((item, index) => {
                        
                        return (
                            <View key={index} style={{ flex: 1,  
                                flexDirection: "row", 
                                borderColor: colors.lineGray, 
                                borderBottomWidth: 1,
                                paddingVertical: 15
                                }}>

                                <View style={{ flex: 1, paddingLeft: 25}}>
                                    <Image style={{ width:69 , height: 49}} source={{ uri: item.cover }}/>
                                </View>

                                <View style={{ 
                                    flex: 3, 
                                    paddingRight: 25
                                    }}>
                                    <Text style={{ fontSize: 18, marginBottom: 4}} numberOfLines={1}>{item.restaurantName}</Text>
                                    <Text style={{ fontSize: 16, color: "#7D7D7D", marginVertical: 2}}>{item.total} €</Text>
                                    <Text style={{ fontSize: 16, color: "#7D7D7D", marginVertical: 2, textTransform: "capitalize"}}>{getDateToString(item.orderDate)}</Text>
                                    <View style={{ 
                                        marginTop: 4,
                                        paddingHorizontal: 8, 
                                        paddingVertical: 4, 
                                        backgroundColor: 'rgba(253, 132, 21, 0.1)',
                                        alignSelf: "flex-start",
                                        borderRadius: 5
                                        }}>
                                        <Text style={{ 
                                        color: "#FD8415", 
                                        }}>{item.status}</Text>
                                    </View>
                                </View>
                            </View>
                        );
                    })}
                </ScrollView>
                )
        }
    }

    return (
        <SafeAreaView style={{ flex:1, backgroundColor: colors.white}}>
            <View style={{ flex: 1}}>
        
                <View style={styles.header}>
                    <Text style={ styles.title }>Commandes</Text>
                    <Button
                    theme="historyBtn" 
                    style={{ marginTop: 10 }} 
                    title="Historique" 
                    onPress={() => console.log("Historique")}
                    />
                </View>

                <View style={{ flex: 1}}>
                    {dataToDisplay()}
                </View>
            </View>
            
        </SafeAreaView>
    )
}

export default Orders;

const styles = StyleSheet.create({
    header: { 
        flexDirection: "row", 
        justifyContent:"space-between", 
        alignItems:"center",
        marginTop: 20, 
        marginHorizontal: 25,
    },
    title: {
        fontFamily: "UberMoveBold",
        fontSize: 26,
    }
})
