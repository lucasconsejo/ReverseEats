import React, { useState } from "react"
import { Text, TouchableOpacity, View, StyleSheet, TextInput, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ButtomPrimary, ButtomSecondary } from "../../../theme/buttons"
import { colors } from "../../../theme/colors"
import Logo from "../../../assets/light-logo.svg"
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
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white}}>
            <View style={{ flex: 1, justifyContent: "space-between" }}>
                <View style={styles.logoContainer}>
                    <Logo />
                </View>

                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                       <Text style={styles.title}>Incription</Text>
                    </View>

                    <View style={styles.inputContainer}>
                       <Text style={styles.label}>Nous vous proposons d’inviter un cuisinier chez vous afin de vous préparer un menu au choix.</Text>
                    </View>

                    <View style={styles.inputContainer}>
                    <Text style={styles.label}>Vous savez cuisiner ? </Text>
                    <Text style={styles.label}>N’hésitez pas à proposer vos services à nos nombreux clients. </Text>
                    </View>
                </View>

                <View>
                    <TouchableOpacity>
                        <Text>Client</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text>Cuisinier</Text>
                    </TouchableOpacity>
                </View>   
            </View>
        </SafeAreaView>
    )
}

export default Signup

const styles = StyleSheet.create({
    container: {
        marginTop: -80,
        marginHorizontal: 30,
    },
    title: {
        fontFamily: "UberMoveMedium",
        fontSize: 30,
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
    logoContainer: {
        marginTop: 70,
        flexDirection: "row",
        justifyContent: "center"
    },
    logo: {
        resizeMode: 'stretch',
    },
});