import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../../theme/colors";
import { ScreenProps } from "../../../types/props.types";
import Logo from "../../../assets/dark-logo.svg"
import Winnie from "../../../assets/food-winnie-the-pooh.gif"
import Button from "../../../theme/buttons";


const SignupConfirm: React.FC<ScreenProps> = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.backgroundDark}}>
            <StatusBar style="light" />
            <View style={ styles.container}>

                <View style={styles.logoContainer}>
                    <Logo />
                </View>

                <Text style={styles.titleLeft}>Inscription terminée</Text>
                <Text style={styles.textWhite}>Connectez-vous pour trouver un cuisinier près de chez vous.</Text>
                <View style={{ alignItems: "center"}}>
                    <Image style={{ width: 250, height: 210}} source={Winnie}/>
                </View>

                <Button 
                theme="secondaryDarkRight" 
                style={{ marginTop: 35}} 
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

export default SignupConfirm

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
        color: colors.white,
        fontFamily: "UberMoveMedium",
        fontSize: 30,
        marginBottom: 30,
        textAlign: "left",
    },
    textWhite: {
        fontSize: 20,
        fontWeight: "500",
        color: colors.white,
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