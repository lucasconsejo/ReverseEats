import React  from "react"
import { Text, TouchableOpacity, View, StyleSheet } from "react-native"
import { colors } from "../../../theme/colors"
import Logo from "../../../assets/dark-logo.svg"
import { useFontsHook } from "../../../theme/fonts"
import {StatusBar} from "expo-status-bar"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"


type Props = {
    navigation : any,
}

const Signup: React.FC<Props> = ({ navigation }) => {

    const [loaded] = useFontsHook();

    if (!loaded) {
        return null
    }
    const goLoginScreen = () => {
        navigation.goBack();
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundDark}}>
            <StatusBar style="light" />
            <View style={{ flex: 1, justifyContent: "space-between" }}>

                <TouchableOpacity style={styles.arrow} onPress={goLoginScreen}>
                    <FontAwesomeIcon icon={faArrowLeft} color={colors.white} size={30} />
                </TouchableOpacity>

                <View style={styles.logoContainer}>
                    <Logo />
                </View>

                <View style={styles.container}>
                    <View >
                       <Text style={styles.title}>Incription</Text>
                    </View>

                    <View>
                       <Text style={styles.textWhite}>Nous vous proposons d’inviter un cuisinier chez vous afin de vous préparer un menu au choix.</Text>
                    </View>

                    <View>
                        <Text style={styles.textYellow}>
                            Vous savez cuisiner ? 
                            <Text style={styles.textWhite}>
                                N’hésitez pas à proposer vos services à nos nombreux clients. 
                            </Text>
                        </Text>
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
    arrow: {
        marginLeft: 30,
        marginTop: 80,
    },
    container: {
        marginTop: -120,
        marginHorizontal: 30,
    },
    title: {
        color: colors.white,
        fontFamily: "UberMoveMedium",
        fontSize: 30,
        marginBottom: 30,
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
        marginBottom: 50,
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
        marginTop: -170,
        flexDirection: "row",
        justifyContent: "center"
    },
    logo: {
        resizeMode: 'stretch',
    },
});