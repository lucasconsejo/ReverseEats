import React, { useState } from "react"
import { Text, TouchableOpacity, View, StyleSheet, TextInput, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ButtomPrimary, ButtomSecondary } from "../../../theme/buttons"
import { colors } from "../../../theme/colors"
import Logo from "../../../assets/dark-logo.svg"
import { useFontsHook } from "../../../theme/fonts"

type Props = {
    navigation : any,
}

const Signup: React.FC<Props> = ({ navigation }) => {

    const [loaded] = useFontsHook();

    if (!loaded) {
        return null
    }
    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundDark}}>
            <View style={{ flex: 1, justifyContent: "space-between" }}>
                <View style={styles.logoContainer}>
                    <Logo />
                </View>

                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                       <Text style={styles.title}>Incription</Text>
                    </View>

                    <View style={styles.inputContainer}>
                       <Text style={styles.textWhite}>Nous vous proposons d’inviter un cuisinier chez vous afin de vous préparer un menu au choix.</Text>
                    </View>

                    <View style={styles.inputContainer}>
                    <Text style={styles.textYellow}>Vous savez cuisiner ? <Text style={styles.textWhite}>N’hésitez pas à proposer vos services à nos nombreux clients. </Text></Text>
                    
                    </View>
                </View>

                <View style={{ flexDirection: "row", height: 100}}>
                    <TouchableOpacity style={styles.btnClient}>
                        <Text style={styles.btnClientText}>Client</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnCuisinier}>
                        <Text style={styles.btnCuisinierText}>Cuisinier</Text>
                    </TouchableOpacity>
                </View>   
            </View>
        </View>
    )
}

export default Signup

const styles = StyleSheet.create({
    container: {
        marginTop: -80,
        marginHorizontal: 30,
    },
    title: {
        color: colors.white,
        fontFamily: "UberMoveMedium",
        fontSize: 30,
    },
    textYellow: {
        fontSize: 20,
        fontWeight: "500",
        color: colors.yellow,
    },
    textWhite: {
        fontSize: 20,
        fontWeight: "500",
        color: colors.white,
    },
    inputContainer: {
        marginBottom: 10,
    },
    label: {
        color: colors.black,
        fontSize: 18,
        fontWeight: "500"
    },
    input: {
      height: 50,
      marginVertical: 8,
      borderWidth: 1,
      padding: 10,
      borderRadius: 5,
      borderColor: colors.secondary,
      fontSize: 18
    },
    btnClient: {
        flexGrow: 1,
        justifyContent: "center",
        backgroundColor: colors.primary,
    },
    btnClientText: {
        textAlign: "center",
        fontWeight: "500",
        color: colors.white,
        fontSize: 24,
    },
    btnCuisinier: {
        flexGrow: 1,
        justifyContent: "center",
        backgroundColor: colors.yellow,
    },
    btnCuisinierText: {
        textAlign: "center",
        fontWeight: "500",
        color: colors.black,
        fontSize: 24,
    },
    logoContainer: {
        marginTop: 70,
        flexDirection: "row",
        justifyContent: "center"
    },
    logo: {
        resizeMode: 'stretch',
    },
});