import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Logo from '../../../assets/light-logo.svg'
import { colors } from '../../../theme/colors'

const paiementRunning: React.FC = () => {

    useEffect( () => {
        setTimeout(()=>{
            console.log("waited");
       }, 5000);
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <View style={{ flex: 6, alignItems: 'center', justifyContent: 'center'}}>
                <Logo/>
                <Text style={{ fontSize: 22, marginTop: 10 }}>Transaction en cours...</Text>

            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{ fontSize: 21, fontFamily: "UberMoveMedium" }}>Ne quittez pas l'application</Text>
            </View>
        </View>
    )
}

export default paiementRunning

const styles = StyleSheet.create({})
