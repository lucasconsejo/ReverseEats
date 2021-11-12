import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import React, { useEffect, useState }  from "react"
import { useForm } from "react-hook-form"
import {View, Text, TouchableWithoutFeedback, Keyboard, StatusBar, StyleSheet, TouchableOpacity, ActivityIndicator, SafeAreaView, Alert} from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import Button from "../../../theme/buttons"
import { colors } from "../../../theme/colors"
import Input from "../../../theme/inputs"
import { SignupAdressFormData } from "../../../types/global.types"
import { ScreenProps } from "../../../types/props.types"
import Autocomplete from "../../../theme/autocomplete"
import { searchAddress } from "../../../firebase/addressApi"
import { createUser, postUser } from "../../../firebase/authRequests"

const SignupAdress: React.FC<ScreenProps> = ({route, navigation}) => {
    const { firstName, lastName, email, password, role } = route.params;

    const [msgError, setMsgError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [isAddressValid, setIsAddressValid] = useState<boolean>(false);
    const [input, setInput] = useState<string>("");
    const [data, setdata] = useState<Array<any>>([
    ]);

    useEffect(() => {
        setMsgError("")
        searchAddress(input, 4)
        .then(res => res.json())
        .then(res => {
            const features = res.features;
            const apiData:any = [];
            if(features !== undefined && features.length ){
                features.forEach((f:any) => {
                    apiData.push({
                        id: f.properties.id,
                        address: f.properties.name,
                        zipCode: f.properties.postcode,
                        city: f.properties.city,
                    })
                });
                setdata(apiData);
            }else {
                setdata([]);
            }
        })
    }, [input])

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

    const submitAdress = () => {
        setdata([]);
        if(input.trim().length){
            searchAddress(input, 4)
            .then(res => res.json())
            .then(res => {
                if(res.features.length == 1 && res.features[0].properties.label === input){
                    createUser(email, password)
                    .then(res => {
                        const id = res.user.uid;
                        const bddRole = role === "Client" ? "customer" : "cook";
                        postUser(id, firstName, lastName, email, bddRole, input)
                        .then(() => {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: "SignupConfirm" }],
                            });
                        })
                    })
                    .catch( (err) => {
                        console.log(err);
                    })
                }
                else{
                    setMsgError("Adresse non valide.");
                }
            })
        } else {
            createUser(email, password)
            .then(res => {
                const id = res.user.uid;
                const bddRole = role === "Client" ? "customer" : "cook";
                postUser(id, firstName, lastName, email, bddRole, null)
                .then(() => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "SignupConfirm" }],
                    });
                }).catch( (err) => {
                    console.log(err);
                })
            })
            .catch( (err) => {
                console.log(err);
            })
        }
    };
    
    

    const goSignupFormScreen = () => {
        navigation.goBack();
    }
    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundDark}}>
            <StatusBar backgroundColor={colors.backgroundDark} barStyle="light-content" />

            <View style={{ flex: 1}}>
                <KeyboardAwareScrollView 
                    style={styles.container} 
                    contentContainerStyle={{ flex: 1, justifyContent: "space-between"}}>
                    <View>
                        <TouchableOpacity style={styles.arrow} onPress={goSignupFormScreen}>
                            <FontAwesomeIcon icon={faArrowLeft} color={colors.white} size={30} />
                        </TouchableOpacity>
                        <Text style={styles.title}>Inscription</Text>
                        <Text style={styles.titleLeft}>{role}</Text>

                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <Autocomplete onChangeText={setInput} input={input} data={data}/>
                        </TouchableWithoutFeedback>
                        <TouchableOpacity>
                            <Text style={{color: colors.primary }}>Ou utiliser ma position actuelle</Text> 
                        </TouchableOpacity>
                        {handleError()}
                        
                    </View>
                    <Button 
                            theme="secondaryDarkRight" 
                            style={{ marginBottom: 70, }} 
                            title={input.length ? "Terminer" : "Ignorer et terminer" }
                            onPress={submitAdress}
                            active={true}
                    />
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
        flex: 1,
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