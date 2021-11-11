import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, TextInput, ScrollView } from 'react-native';
import { colors } from '../../../../theme/colors';
import useUser from "../../../../hooks/useUser";
import { searchAddress, updateAddress } from "../../../../firebase/addressApi";

const SelectAddress: React.FC = () => {
    const [user, userDispatch] = useUser();
    const [isAddress, setIsAddress] = useState<boolean>(user.address.length);
    const [color, setColor] = useState<string>(isAddress ? colors.black : colors.white);
    const [backgroundColor, setBackgroundColor] = useState<any>({ backgroundColor: isAddress ? colors.lightGray : colors.black });
    const [text, setText] = useState<string>(isAddress ? user.address : "Veuillez saisir une adresse");
    const [input, setInput] = useState<string>(text);
    const [showInput, setShowInput] = useState<boolean>(false);
    const [address, setAddress] = useState<Array<any>>([]);

    useEffect(() => {
        if (input.trim().length) {
            searchAddress(input, 20)
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

    useEffect(() => {
        showInput ? setIsAddress(true) : setIsAddress(user.address.length);
    }, [showInput])

    useEffect(() => {
        setColor(isAddress ? colors.black : colors.white);
        setBackgroundColor({ backgroundColor: isAddress ? colors.lightGray : colors.black });
        setText(isAddress ? user.address : "Veuillez saisir une adresse");
    }, [isAddress])

    const handleClick = (address: string) => {
        updateAddress(user.id, address)
        .then(() => {
            setInput(address);
            userDispatch({ 
                type: "UPDATE_USER_ADDRESS",
                payload: address
            });
            setAddress([]);
        })
        .finally(() => setShowInput(false));
    };

    return (
        <View style={[styles.container]}>
            <View style={styles.textContainer}>
                {
                    showInput ? (
                        <TextInput
                            value={input}
                            keyboardType="default"
                            placeholder="Rechercher une adresse"
                            style={[styles.text, { color: color, borderRadius: 5, }, backgroundColor]}
                            onChangeText={(text) => setInput(text)}
                            onFocus={() => input == "Veuillez saisir une adresse" && setInput("")}
                            autoCapitalize="none"
                            autoFocus
                        />
                    )
                    : (
                        <TouchableOpacity onPress={() => setShowInput(true)}>
                            <Text 
                                style={[styles.text, { color: color, borderRadius: 5, }, backgroundColor]}
                                numberOfLines={1}
                            >
                                {input}
                            </Text>
                        </TouchableOpacity>
                    )
                }
            </View>
            {
                showInput && (
                    <ScrollView>
                        {address.map((item, index) => (
                            <TouchableOpacity style={[styles.addressItem, {borderBottomWidth: address.length -1 == index ? 0 : 1}]} key={item.id} onPress={() => handleClick(`${item.address} ${item.zipCode} ${item.city}`)}>
                                <Text style={styles.address}>{item.address}</Text>
                                <Text style={styles.city}>{item.zipCode} {item.city}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                )
            }
        </View>
    )
};

export default SelectAddress;

const styles = StyleSheet.create({
    container: {
       
    },
    textContainer: { 
        borderRadius: 5,
    },
    text: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 18,
        fontWeight: "500"
    },
    addressItem: {
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