import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { SelectAddressProps } from "../../../types/props.types";
import { colors } from '../../../theme/colors';
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const SelectAddress: React.FC<SelectAddressProps> = ({ id, address, navigation }) => {
    const isAddress = !address.includes("null");
    const color = isAddress ? colors.black : colors.white;
    const backgroundColor = { backgroundColor: isAddress ? colors.lightGray : colors.black };
    const text = isAddress ? address : "Veuillez saisir une adresse";

    return (
        <TouchableOpacity style={[styles.container, backgroundColor]} onPress={() => navigation.navigate("SearchAddress", { id })}>
            <View style={styles.textContainer}>
                <Text numberOfLines={1} style={[styles.text, { color: color }]}>{text}</Text>
            </View>
            <FontAwesomeIcon icon={faChevronDown} size={25} color={color} />
        </TouchableOpacity>
    )
};

export default SelectAddress;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    textContainer: { 
        width: "90%" 
    },
    text: {
        fontSize: 18,
        fontWeight: "500"
    },
});