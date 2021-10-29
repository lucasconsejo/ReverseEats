import React, { useState }  from "react"
import { Text, TouchableOpacity, View, StyleSheet } from "react-native"
import { colors } from "../../../theme/colors"
import {StatusBar} from "expo-status-bar"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { text } from "@fortawesome/fontawesome-svg-core"
import { TextInput } from "react-native-gesture-handler"
import Button from "../../../theme/buttons"


type Props = {
    navigation : any,
    route: any,
}

const SignupForm: React.FC<Props> = ({ route, navigation }) => {
    const { role } = route.params;
    
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");

    const goSignupScreen = () => {
        navigation.goBack();
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundDark}}>
            <StatusBar style="light" />
            <View style={{ flex: 1, justifyContent: "space-between" }}>
                <View style={styles.container}>

                    <TouchableOpacity style={styles.arrow} onPress={goSignupScreen}>
                        <FontAwesomeIcon icon={faArrowLeft} color={colors.white} size={30} />
                    </TouchableOpacity>
                    <View >
                       <Text style={styles.title}>Inscription</Text>
                    </View>

                    <Text style={styles.titleLeft}> {role}</Text>

                    <View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Nom</Text>
                            <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Prénom</Text>
                            <TextInput style={styles.input} value={lastName} onChangeText={setLastName} />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput keyboardType="email-address" style={styles.input} value={email} onChangeText={setEmail} />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Mot de passe</Text>
                            <TextInput secureTextEntry style={styles.input} value={password} onChangeText={setPassword} />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Confirmation du mot de passe</Text>
                            <TextInput secureTextEntry style={styles.input} value={passwordConfirm} onChangeText={setPasswordConfirm} />
                        </View>

                        <Button theme="secondaryDarkRight" style={{ marginTop: 10 }} title="Suivant" onPress={() => console.log()} />
                    </View>

                </View>

                  
            </View>
        </View>
    )
}

export default SignupForm

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 10,
    },
    label: {
        color: colors.white,
        fontSize: 18,
        fontWeight: "500"
    },
    input: {
      height: 50,
      marginVertical: 8,
      borderWidth: 1,
      padding: 10,
      borderRadius: 5,
      borderColor: colors.white,
      fontSize: 18,
      color: colors.white,
    },
    arrow: {
        marginTop: 80,
    },
    container: {
        marginTop: -20,
        marginHorizontal: 30,
    },
    title: {
        marginHorizontal: 80,
        marginTop: -30,
        color: colors.white,
        fontFamily: "UberMoveMedium",
        fontSize: 30,
        marginBottom: 30,
        textAlign: "center",
    },
    titleLeft: {
        color: colors.white,
        fontFamily: "UberMoveMedium",
        fontSize: 30,
        marginBottom: 30,
        textAlign: "left",
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