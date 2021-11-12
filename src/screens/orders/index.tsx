import React, { useContext } from "react"
import { Text, View, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ScreenProps } from "../../types/props.types"
import { colors } from "../../theme/colors";
import Button from "../../theme/buttons";
import useUser from "../../hooks/useUser";
import Bowl from "../../assets/img/bowl.svg";
import { OrderContext } from "../../context/orderProvider";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";


const Orders: React.FC<ScreenProps> = ({ navigation }) => {
    const [user, userDispatch] = useUser();
    const {orderState, orderDispatch} = useContext(OrderContext);
    
    

    const dataToDisplay = () => {
        if(!orderState.length) {
            orderDispatch({ 
                type: "ADD_ORDER",
                payload: {
                    id: "1",
                }
            });
            orderDispatch({ 
                type: "ADD_ORDER",
                payload: {
                    id: "2",
                }
            });
            orderDispatch({ 
                type: "ADD_ORDER",
                payload: {
                    id: "3",
                }
            });
        }
        
        if(!orderState.length) {
            return (
                <View style={{alignItems: "center"}}>
                    <Bowl/>
                    <Text style={{ fontFamily: "UberMoveMedium", fontSize:23, paddingBottom: 12 }}>
                        Aucune commande en cours
                        </Text>
                    <Text style={{ fontSize: 17, textAlign:"center", paddingBottom: 35}}>Commencez par ajouter des plats d’un restaurant.</Text>
            
                    <Button
                        theme="blackBtn" 
                        style={{}} 
                        title="Commander" 
                        onPress={() => console.log("Go to Parcourir")}
                    />
                </View>
            );
        } else { 
            return (
                <ScrollView>
                    {orderState.map((item, index) => {
                    return (
                        <View style={{ flex: 1}}>
                            <View style={{ flexDirection: "column"}}>

                            </View>
                              <Text>{item.id}</Text>         
                        </View>
                    );
                    })}
                </ScrollView>
                )
        }
    }

    return (
        <SafeAreaView style={{ flex:1, backgroundColor: colors.white}}>
            <View style={styles.container}>
        
                <View style={styles.header}>
                    <Text style={ styles.title }>
                        Commandes 
                    </Text>

                    <Button
                    theme="historyBtn" 
                    style={{ marginTop: 10 }} 
                    title="Historique" 
                    onPress={() => console.log("Historique")}
                    />
                </View>

                <View style={styles.content}>
                    {dataToDisplay()}
                    
                </View>
            </View>
            
        </SafeAreaView>
    )
}

export default Orders;

const styles = StyleSheet.create({
    container: { 
         
        marginHorizontal: 25
    },
    header: { 
        flexDirection: "row", 
        justifyContent:"space-between", 
        alignItems:"center",
        marginTop: 20, 
    },
    content: {
        paddingTop: 90,
        alignItems: "center",
    },
    title: {

        fontFamily: "UberMoveBold",
        fontSize: 26,
    }
})
