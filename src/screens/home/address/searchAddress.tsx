import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { ScreenProps } from "../../../types/props.types";
import { colors } from '../../../theme/colors';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { searchAddress, updateAddress } from "../../../firebase/addressApi";
import { useNavigation } from "@react-navigation/native";
import useUser from "../../../hooks/useUser";

const SearchAddress: React.FC<ScreenProps> = ({ navigation, route }) => {
    const { id } = route.params;
    const [input, setInput] = useState<string>("");
    const [address, setAddress] = useState<Array<any>>([]);
    const [user, userDispatch] = useUser();
    const textInputRef: any = useRef();

   const setFocus = useCallback(() => {
        if (textInputRef.current) {
            textInputRef.current.focus();
        }
   }, []);

   const navi = useNavigation();

    useEffect(() => {
        navi.addListener("focus", setFocus);
    }, []);  

    useEffect(() => {
        if (input.trim().length) {
            searchAddress(input, 50)
            .then(res => res.json())
            .then(res => {
                const features = res.features;
                const apiData:any = [];
                if (features !== undefined && features.length ){
                    features.forEach((f:any) => {
                        apiData.push({
                            id: f.properties.id,
                            address: f.properties.name,
                            zipCode: f.properties.postcode,
                            city: f.properties.city,
                        })
                    });
                    setAddress(apiData);
                } else {
                    setAddress([]);
                }
            })
        } else {
            setAddress([]);
        }
    }, [input]);

    const handleClick = (address: string) => {
        updateAddress(id, address)
        .then(() => {
            userDispatch({ 
                type: "UPDATE_USER_ADDRESS",
                payload: address
            });
            navigation.goBack();
        });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white}}>
            <StatusBar style="light" />
            <View style={styles.searchContainer}>
                <FontAwesomeIcon icon={faSearch} size={20} color={colors.black} style={styles.searchIcon} />
                <TextInput
                    ref={textInputRef}
                    autoFocus
                    style={styles.search}
                    keyboardType="default"
                    placeholder="Rechercher une adresse"
                    value={input} 
                    onChangeText={(text) => setInput(text)}
                    autoCapitalize="none"
                />
            </View>
            <ScrollView>
                {address.map((item, index) => (
                    <TouchableOpacity style={[styles.addressItem, {borderBottomWidth: address.length -1 == index ? 0 : 1}]} key={item.id} onPress={() => handleClick(`${item.address} ${item.zipCode} ${item.city}`)}>
                        <Text style={styles.address}>{item.address}</Text>
                        <Text style={styles.city}>{item.zipCode} {item.city}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
};

export default SearchAddress;

const styles = StyleSheet.create({
    searchContainer: {
        marginTop: 10,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: colors.graySubTitle,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center"
    },
    searchIcon: {
        marginHorizontal: 10
    },
    search: {
        flex: 1, 
        paddingVertical: 8,
        fontSize: 18
    },
    addressItem: {
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical:15,
        borderBottomColor: "#D1D1D1",
    },
    address: {
        fontSize: 18,
    },
    city:  {
        fontSize: 18,
        color: colors.graySubTitle,
    }
});