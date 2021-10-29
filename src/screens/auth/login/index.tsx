import React, { useEffect, useState } from "react"
import { Text, TouchableOpacity, View, StyleSheet, TextInput, Platform, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context"
import { ButtomPrimary, ButtomSecondary } from "../../../theme/buttons"
import { colors } from "../../../theme/colors"
import Logo from "../../../assets/light-logo.svg"
import { useFontsHook } from "../../../theme/fonts";

type Props = {
    navigation: any
}

const Login: React.FC<Props> = ({ navigation }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loaded] = useFontsHook();

    if (!loaded) {
        return null
    }

    const goHomeScreen = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
        });
    }

    const goSignupScreen = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "Signup" }],
        });
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white}}>
            <View style={{ flex: 1 }}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "padding"}
                    style={{ flex: 1 }}
                    keyboardVerticalOffset={-150}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={[{ flex: 1, justifyContent: "space-between"}]}>
                            <View style={styles.logoContainer}>
                                <Logo />
                            </View>

                            <View style={styles.container}>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Email</Text>
                                    <TextInput keyboardType="email-address" style={styles.input} value={email} onChangeText={setEmail} />
                                </View>

                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Mot de passe</Text>
                                    <TextInput secureTextEntry style={styles.input} value={password} onChangeText={setPassword} />
                                </View>

                            <ButtomPrimary style={{ marginTop: 10 }} title="Connexion" onPress={goHomeScreen} />
                            <ButtomSecondary style={{ marginTop: 10 }} title="Inscription" onPress={goSignupScreen} />
                        </View>

                            <TouchableOpacity>
                                <Text style={styles.resetPassword}>Mot de passe oublié ?</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        marginBottom: 80,
        marginHorizontal: 30,
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
    resetPassword: {
        textAlign: "center", 
        fontSize: 18, 
        fontWeight: "500", 
        marginBottom: 30
    }
});
  