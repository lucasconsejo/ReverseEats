import React, { useEffect, useState }  from "react"
import { Text, TouchableOpacity, View, StyleSheet, KeyboardAvoidingView, Platform} from "react-native"
import { colors } from "../../../theme/colors"
import {StatusBar} from "expo-status-bar"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import Input from "../../../theme/inputs";
import Button from "../../../theme/buttons"
import { useForm } from 'react-hook-form';
import { SignupFormData } from "../../../types/global.types";

type Props = {
    navigation : any,
    route: any,
}

const SignupForm: React.FC<Props> = ({ route, navigation }) => {
    const { role } = route.params;

    const [msgError, setMsgError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const { control, handleSubmit, formState: { errors } } = useForm<SignupFormData>({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordConfirm: '',
        },
      });

    useEffect(() => {
        if ( errors.firstName || errors.lastName || errors.email || errors.password || errors.passwordConfirm) {
            setMsgError("Champs incomplet.")
        } else {
            setMsgError("")
        }
    }, [errors.firstName, errors.lastName, errors.email, errors.password, errors.passwordConfirm])
      
    const submitSignup = handleSubmit(({firstName, lastName, email, password, passwordConfirm}) => {
        console.log();
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
                    <View>
                    <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "padding"}
                    style={{ flex: 1 }}
                    keyboardVerticalOffset={-150}
                >

                        <Text style={styles.titleLeft}>{role}</Text>
                        <Input
                            name="firstName" 
                            label="Nom" 
                            theme="dark" 
                            control={control} 
                            keyboardType="default" 
                            required 
                        />
                        <Input
                            name="lastName" 
                            label="Prénom" 
                            theme="dark" 
                            control={control} 
                            keyboardType="default" 
                            required 
                        />
                        <Input
                            name="email" 
                            label="Email" 
                            theme="dark" 
                            control={control} 
                            keyboardType="email-address" 
                            required 
                        />
                        <Input
                            name="password" 
                            label="Mot de passe" 
                            theme="dark" 
                            control={control} 
                            keyboardType="visible-password" 
                            required 
                        />
                        <Input
                            name="passwordConfirm" 
                            label="Confirmation du mot de passe" 
                            theme="dark" 
                            control={control} 
                            keyboardType="visible-password" 
                            required 
                        />

                        <Button theme="secondaryDarkRight" style={{ marginTop: 10 }} title="Suivant" onPress={submitSignup} />
                    </View>

                </View>
            </View>
        </View>
    )
}

export default SignupForm

const styles = StyleSheet.create({
    error: { 
        marginHorizontal: 0, 
        borderRadius: 5 
    },
    textError: {
        color: colors.textError,
        fontSize: 16,
        paddingVertical: 8,
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
    logoContainer: {
        marginTop: -170,
        flexDirection: "row",
        justifyContent: "center"
    },
    logo: {
        resizeMode: 'stretch',
    },
});