import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { StatusBar } from "expo-status-bar"
import React, { useEffect, useState }  from "react"
import { useForm } from "react-hook-form"
import {View, Text, TouchableWithoutFeedback, Keyboard, StyleSheet, TouchableOpacity, ActivityIndicator} from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import Button from "../../../theme/buttons"
import { colors } from "../../../theme/colors"
import Input from "../../../theme/inputs"
import { SignupAdressFormData } from "../../../types/global.types"
import { ScreenProps } from "../../../types/props.types"


const SignupAdress: React.FC<ScreenProps> = ({route, navigation}) => {
const { role } = route.params;

    const [msgError, setMsgError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const { control, handleSubmit, formState: { errors } } = useForm<SignupAdressFormData>({
        defaultValues: {
            adress: '',
        },
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

    const submitAdress = handleSubmit(({adress}) => {
        navigation.navigate('Home', {
            adress})
    });

    const signupAdressBtn = () => {
        return loading ? (
            <ActivityIndicator size={32} color={colors.primary} />
        )
        : ( 
            <Button 
                theme="secondaryDarkRight" 
                style={{ marginTop: 10, paddingTop: 360}} 
                title="Ignorer et terminer" 
                onPress={submitAdress}
                active={true}
            />
        )
    }
    const goSignupFormScreen = () => {
        navigation.goBack();
    }
    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundDark}}>
            <StatusBar style="light" />
            
            <View style={{ flex: 1  }}>
                <KeyboardAwareScrollView style={{ flex: 1 }}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.container}>
                            <View>
                                <TouchableOpacity style={styles.arrow} onPress={goSignupFormScreen}>
                                    <FontAwesomeIcon icon={faArrowLeft} color={colors.white} size={30} />
                                </TouchableOpacity>
                                <Text style={styles.title}>Inscription</Text>
                                <Text style={styles.titleLeft}>{role}</Text>
                                <Input
                                    name="adress" 
                                    label="Adresse par défaut" 
                                    theme="dark" 
                                    control={control} 
                                    keyboardType="default" 
                                    required 
                                />
                                <TouchableOpacity>
                                    <Text style={{color: colors.primary }}>Ou utiliser ma position actuelle</Text> 
                                </TouchableOpacity>
                                {handleError()}
                            </View>
                            <View>
                                {signupAdressBtn()}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAwareScrollView>
            </View>
        </View>
    )
}

export default SignupAdress

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
        flex:1,
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