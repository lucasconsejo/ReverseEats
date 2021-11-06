import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, ActivityIndicator, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { colors } from '../../../theme/colors';
import { ScreenProps } from '../../../types/props.types';
import Logo from "../../../assets/light-logo.svg"
import Input from '../../../theme/inputs';
import { useForm } from 'react-hook-form';
import { ForgetPasswordFormData } from '../../../types/global.types';
import Button from '../../../theme/buttons';
import { resetPassword } from '../../../firebase/authRequests';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const ForgotPassword: React.FC<ScreenProps> = ({ navigation }) => {
    const [msgError, setMsgError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const { control, handleSubmit, formState: { errors } } = useForm<ForgetPasswordFormData>({
        defaultValues: {
          email: ""
        }
    });

    useEffect(() => {
        if (errors.email) {
            setMsgError("Champs incomplet.")
        } else {
            setMsgError("")
        }
    }, [errors.email])

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
                title="Modifier mon mot de passe" 
                onPress={submitForgetPassword} 
            />
        )
    }

    const submitForgetPassword = handleSubmit(({ email }) => {
        setLoading(true);
        resetPassword(email)
        .then(() => {
            navigation.reset({
                index: 0,
                    routes: [{ name: "ForgotPasswordConfirm" }],
                });
        })
        .catch(err => {
            console.log(err);
            if (err.message.includes("invalid-email") || err.message.includes("user-not-found")) {
                setMsgError("Email invalide.");
            }
            else {
                setMsgError(err.message);
            }
        })
        .finally(() => setLoading(false));
    });

    return (
        <View style={{ flex: 1, backgroundColor: colors.white}}>
            <KeyboardAwareScrollView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity style={styles.arrow} onPress={() => navigation.goBack()}>
                        <FontAwesomeIcon icon={faArrowLeft} color={colors.black} size={30} />
                    </TouchableOpacity>

                    <View style={styles.logoContainer}>
                        <Logo />
                    </View>

                    <View style={styles.container}>
                        <View >
                            <Text style={styles.title}>Mot de passe oublié ?</Text>
                            <Text style={styles.subTitle}>Veuillez saisir votre adresse mail afin de modifier votre mot de passe.</Text>
                        </View>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <Input 
                                name="email" 
                                label="Email" 
                                theme="light" 
                                control={control} 
                                keyboardType="email-address" 
                                required 
                            />
                        </TouchableWithoutFeedback>

                        {handleError()}
                        {connectionBtn()}
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default ForgotPassword;

const styles = StyleSheet.create({
    container: {
        marginBottom: 80,
        marginHorizontal: 30,
    },
    arrow: {
        marginLeft: 30,
        marginTop: 80,
    },
    logoContainer: {
        marginTop: 17,
        flexDirection: "row",
        justifyContent: "center"
    },
    logo: {
        resizeMode: 'stretch',
    },
    title: {
        marginTop: 40,
        fontSize: 25,
        fontFamily: "UberMoveMedium"
    },
    subTitle: {
        fontSize: 18,
        marginTop: 10,
        marginBottom: 30
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
});