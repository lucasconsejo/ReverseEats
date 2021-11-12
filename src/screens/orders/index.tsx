import React from "react"
import { Text, View, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ScreenProps } from "../../types/props.types"
import { colors } from "../../theme/colors";
import Button from "../../theme/buttons";
import useUser from "../../hooks/useUser";
import Bowl from "../../assets/img/bowl.svg";


const Orders: React.FC<ScreenProps> = ({ navigation }) => {
    const [user, userDispatch] = useUser();

    
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
