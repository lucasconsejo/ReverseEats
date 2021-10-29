import React from "react"
import { Text, TouchableOpacity, View, StyleSheet, TextInput, Platform, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, KeyboardTypeOptions } from 'react-native';
import { useController, useForm } from 'react-hook-form';
import { SafeAreaView } from "react-native-safe-area-context"
import Button from "../../../theme/buttons"
import { colors } from "../../../theme/colors"
import Logo from "../../../assets/light-logo.svg"


const Login: React.FC<Props> = ({ navigation }) => {
    const { control, handleSubmit } = useForm<FormData>({
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
        navigation.navigate("Signup")
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
                                    <Input name="email" control={control} keyboardType="email-address" required />
                                </View>

                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Mot de passe</Text>
                                    <Input name="password" control={control} keyboardType="default" secureTextEntry required />
                                </View>

                            <Button theme="primary" style={{ marginTop: 10 }} title="Connexion" onPress={goHomeScreen} />
                            <Button theme="secondary" style={{ marginTop: 10 }} title="Inscription" onPress={goSignupScreen} />
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

const Input: React.FC<InputProps> = ({ name, control, keyboardType, secureTextEntry = false, required = false}) => {
    const { field } = useController({
        defaultValue: "",
        control,
        name,
        rules: { required }
    });

    return (
        <TextInput 
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            style={styles.input} 
            value={field.value} 
            onChangeText={field.onChange}
        />
    )
}

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
  
type Props = {
    navigation: any
}

interface FormData {
    email: string;
    password: string;
}

type InputProps = {
    name: string,
    control: any,
    keyboardType: KeyboardTypeOptions,
    secureTextEntry?: boolean
    required?: boolean
}