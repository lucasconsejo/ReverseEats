import { ScreenProps } from '../../../types/props.types';
import React from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../../../theme/colors';
import Button from '../../../theme/buttons';
import Logo from "../../../assets/light-logo.svg"
import Success from "../../../assets/late-night-seth-lnsm.gif"

const ForgotPasswordConfirm: React.FC<ScreenProps> = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white}}>
            <StatusBar style="light" />
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Logo />
                </View>

                <Text style={styles.titleLeft}>Email envoyé !</Text>
                <Text style={styles.textWhite}>Vous allez recevoir un email pour modifier votre mot de passe.</Text>
                <View style={{ alignItems: "center"}}>
                    <Image style={{ width: 250, height: 210}} source={Success}/>
                </View>

                <Button 
                    theme="secondaryDarkRight" 
                    style={{ marginTop: 35, backgroundColor: colors.white}} 
                    title="Retour à la connexion" 
                    onPress={ () => navigation.reset({
                        index: 0,
                            routes: [{ name: "Login" }],
                        })}
                    active={true}
                />
            </View>
        </SafeAreaView>
    )
}

export default ForgotPasswordConfirm;

const styles = StyleSheet.create({
    arrow: {
        marginLeft: 30,
        marginTop: 80,
    },
    container: {
        marginTop: 0,
        marginHorizontal: 30,
    },
    titleLeft: {
        paddingTop: 50,
        color: colors.black,
        fontFamily: "UberMoveMedium",
        fontSize: 30,
        marginBottom: 30,
        textAlign: "left",
    },
    textWhite: {
        fontSize: 20,
        color: colors.black,
        marginBottom: 50,
    },
    logoContainer: {
        marginTop: 65,
        flexDirection: "row",
        justifyContent: "center"
    },
    logo: {
        resizeMode: 'stretch',
    },
});