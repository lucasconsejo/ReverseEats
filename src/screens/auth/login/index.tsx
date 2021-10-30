import React from "react"
import { Text, TouchableOpacity, View, StyleSheet, Platform, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useForm } from 'react-hook-form';
import { SafeAreaView } from "react-native-safe-area-context"
import Button from "../../../theme/buttons"
import { colors } from "../../../theme/colors"
import Logo from "../../../assets/light-logo.svg"
import Input from "../../../theme/inputs";
import { ScreenProps } from "../../../types/props.types";
import { LoginFormData } from "../../../types/global.types";


const Login: React.FC<ScreenProps> = ({ navigation }) => {
    const { control, handleSubmit } = useForm<LoginFormData>({
        defaultValues: {
          email: "",
          password: "",
        }
    });

    const goHomeScreen = handleSubmit((data) => {
        navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
        });
    });

    const goSignupScreen = () => {
        navigation.navigate("Signup");
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
                                    onSubmitEditing={goHomeScreen} 
                                    secureTextEntry 
                                    required 
                                />
                                <Button 
                                    theme="primary" 
                                    style={{ marginTop: 10 }} 
                                    title="Connexion" 
                                    onPress={goHomeScreen} 
                                />
                                <Button 
                                    theme="secondary" 
                                    style={{ marginTop: 10 }} 
                                    title="Inscription" 
                                    onPress={goSignupScreen} 
                                />
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
    resetPassword: {
        textAlign: "center", 
        fontSize: 18, 
        fontWeight: "500", 
        marginBottom: 30
    }
});
