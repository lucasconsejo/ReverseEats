import React from 'react'
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { ScreenProps } from '../../../types/props.types'
import PaymentValid from '../../../assets/paymentValid.svg'
import Patrick from '../../../assets/sponge-bob-patrick-star.gif'
import Button from '../../../theme/buttons'
import { colors } from '../../../theme/colors'

const PaymentResult: React.FC<ScreenProps> = ({ navigation }) => (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
        <View style={{ flex: 3, marginHorizontal: 25, justifyContent: "space-between" }}>
            <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                <Text style={{ fontSize: 26, fontFamily: "UberMoveBold", width: "80%" }}>Merci pour votre commande</Text>
                <PaymentValid/>
            </View>
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 20, fontFamily: "UberMoveMedium"}}>Paiement effectué avec succès</Text>
                <Text style={{ fontSize: 18, marginTop: 15}}>Vous allez être notifié quand le cuisinier se déplacera vers le lieu de rendez-vous.</Text>
            </View>
        </View>
        <View style={{flex:3, marginHorizontal: 25}}>
            <Text style={{ fontSize: 20, fontFamily: "UberMoveMedium", marginBottom: 15}}>Bon appétit !</Text>
            <Image style={{ width:330, height: 210, alignSelf: "center"}} source={Patrick}/>
        </View>
        <View style={{ flex: 1, marginHorizontal: 25}}>
            <Button
                theme="secondaryDarkRight"
                style={{ marginTop: 35, backgroundColor: colors.white}}
                title="Retour à l'accueil"
                onPress={ () => navigation.reset({
                    index: 0,
                        routes: [{ name: "Home" }],
                    })}
                active={true}
            />
        </View>
    </SafeAreaView>
)

export default PaymentResult

