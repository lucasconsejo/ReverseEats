import React, { useContext, useEffect, useState } from "react"
import { Text, TouchableOpacity, View, StyleSheet, StatusBar, Platform, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { useForm } from 'react-hook-form';
import { SafeAreaView } from "react-native-safe-area-context"
import Button from "../../../theme/buttons"
import { colors } from '../../../theme/colors';
import Logo from "../../../assets/light-logo.svg"
import Input from "../../../theme/inputs";
import { ScreenProps } from "../../../types/props.types";
import { LoginFormData } from "../../../types/global.types";
import { getUser, loginRequest } from '../../../firebase/authRequests';
import useUser from "../../../hooks/useUser";
import { DateContext } from "../../../context/dateProvider";

const Login: React.FC<ScreenProps> = ({ navigation }) => {
    const { dateDispatch } = useContext(DateContext);
    const [msgError, setMsgError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [user, userDispatch] = useUser();
    const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        defaultValues: {
          email: "",
          password: "",
        }
    });

    useEffect(() => {
        if (errors.email || errors.password) {
            setMsgError("Champs incomplet.")
        } else {
            setMsgError("")
        }
    }, [errors.email, errors.password])

    const submitLogin = handleSubmit(({ email, password }) => {
        setLoading(true);
        loginRequest(email, password)
        .then(res => {
            getUser(res.user.uid)
            .then(res => res.json())
            .then(res => {
                dateDispatch({ type: "CURRENT_DATE" });
                userDispatch({ 
                    type: "ADD_USER",
                    payload: res.data
                });
                navigation.reset({
                index: 0,
                    routes: [{ name: "Home" }],
                });
            });
        })
        .catch(err => {
            if (err.message.includes("too-many-requests")) {
                setMsgError("Trop de tentative, réesayez plus tard.");
            }
            if (err.message.includes("wrong-password") || err.message.includes("user-not-found")) {
                setMsgError("Email ou mot de passe incorrect.");
            }
            else {
                setMsgError(err.message);
            }
        })
        .finally(() => setLoading(false));
    });

    const handleError = () => {
        if (msgError.length) {
            return (
                <View style={styles.error}>
                    <Text style={styles.textError}>{msgError}</Text>
                </View>
            );
        }
        return null;
    }

    const connectionBtn = () => {
        return loading ? (
            <ActivityIndicator size={32} color={colors.primary} />
        )
        : ( 
            <Button 
                theme="primary" 
                style={{ marginTop: 10 }} 
                title="Connexion" 
                onPress={submitLogin} 
            />
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white}}>
           <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
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
                                <Input 
                                    name="email" 
                                    label="Email" 
                                    theme="light" 
                                    control={control} 
                                    keyboardType="email-address" 
                                    required 
                                />
                                <Input 
                                    name="password" 
                                    label="Mot de passe" 
                                    theme="light" 
                                    control={control} 
                                    keyboardType="default" 
                                    onSubmitEditing={submitLogin} 
                                    secureTextEntry 
                                    required 
                                />

                                {handleError()}
                                {connectionBtn()}
                                
                                <Button 
                                    theme="secondary" 
                                    style={{ marginTop: 10 }} 
                                    title="Inscription" 
                                    onPress={() => navigation.navigate("Signup")} 
                                />
                            </View>

                            <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
                                <Text style={styles.resetPassword}>Mot de passe oublié ?</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        marginBottom: 80,
        marginHorizontal: 30,
    },
    logoContainer: {
        marginTop: 70,
        flexDirection: "row",
        justifyContent: "center"
    },
    logo: {
        resizeMode: 'stretch',
    },
    error: { 
        marginHorizontal: 0, 
        borderRadius: 5 
    },
    textError: {
        color: colors.textError,
        fontSize: 16,
        paddingVertical: 8,
    },
    resetPassword: {
        textAlign: "center", 
        fontSize: 18, 
        fontWeight: "500", 
        marginBottom: 30
    }
});
