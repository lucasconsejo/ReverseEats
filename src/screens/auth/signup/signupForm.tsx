import React, { useEffect, useState }  from "react"
import { Text, TouchableOpacity, StatusBar, TouchableWithoutFeedback, View, StyleSheet, KeyboardAvoidingView, Keyboard, Platform, ScrollView, ActivityIndicator} from "react-native"
import { colors } from "../../../theme/colors"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import Input from "../../../theme/inputs";
import Button from "../../../theme/buttons"
import { useForm } from 'react-hook-form';
import { SignupFormData } from "../../../types/global.types";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ScreenProps } from "../../../types/props.types";

const SignupForm: React.FC<ScreenProps> = ({ route, navigation }) => {
    const { role } = route.params;

    const [msgError, setMsgError] = useState<string>("");
    const [formCompleted, setFormCompleted] = useState<boolean>(false);
    const [isConfirmSameAsPassword, setIsConfirmSameAsPassword] = useState<boolean>(false);

    const { control, handleSubmit, getValues, formState: { errors } } = useForm<SignupFormData>({
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
      
    useEffect(() => {
        const inputValues = getValues();
        const inputValuesTab = Object.entries(inputValues);
        let emptyFields = inputValuesTab.filter( (elem) => elem[1] === "")
        if(emptyFields.length){
            setFormCompleted(false);
        }
        else{
            setFormCompleted(true);
            if(inputValues.password === inputValues.passwordConfirm) {
                setIsConfirmSameAsPassword(true);
            }else{
                setIsConfirmSameAsPassword(false);
            }
        }
    }, [getValues()]);

    const submitSignup = handleSubmit(({firstName, lastName, email, password}) => {
        navigation.navigate('SignupAdress', {
            firstName, lastName, email, password, role
        })
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

    const signupBtn = () => {
        return (formCompleted && isConfirmSameAsPassword ) ? (
            <Button 
                theme="secondaryDarkRight" 
                style={{ marginTop: 10 }} 
                title="Suivant" 
                onPress={submitSignup}
                active={true} 
            />
        )
        : ( 
            <Button 
                theme="secondaryDarkRight" 
                style={{ marginTop: 10 }} 
                title="Suivant" 
                onPress={submitSignup}
                active={false} 
            />
        )
    }

    const goSignupScreen = () => {
        navigation.goBack();
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundDark}}>
            <StatusBar backgroundColor={colors.backgroundDark} barStyle="light-content" />
            
            <View style={{ flex: 1  }}>
                <KeyboardAwareScrollView style={{ flex: 1 }}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.container}>
                            <View>
                                <TouchableOpacity style={styles.arrow} onPress={goSignupScreen}>
                                    <FontAwesomeIcon icon={faArrowLeft} color={colors.white} size={30} />
                                </TouchableOpacity>
                                <Text style={styles.title}>Inscription</Text>
                               <Text style={styles.titleLeft}>{role}</Text>
                            </View>
                            <View >
                                <Input
                                    name="firstName" 
                                    label="Prémon" 
                                    theme="dark" 
                                    control={control} 
                                    keyboardType="default" 
                                    required 
                                />
                                <Input
                                    name="lastName" 
                                    label="Nom" 
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
                                    secureTextEntry
                                    required 
                                />
                                <Input
                                    name="passwordConfirm" 
                                    label="Confirmation du mot de passe" 
                                    theme="dark" 
                                    control={control} 
                                    keyboardType="default" 
                                    secureTextEntry
                                    required 
                                />

                                {handleError()}
                                {signupBtn()}

                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAwareScrollView>
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
});