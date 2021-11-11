import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { SelectOptionsProps } from "../../../../types/props.types";
import { colors } from '../../../../theme/colors';
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { DateContext } from "../../../../context/DateProvider";

const Options: React.FC<SelectOptionsProps> = ({ navigation }) => {
    const { dateState } = useContext(DateContext);
    const date = dateState.dateFormat;

    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("SelectOptions")}>
            <View style={styles.textContainer}>
                <Text numberOfLines={1} style={styles.text}>{date}</Text>
            </View>
            <FontAwesomeIcon icon={faChevronDown} size={25} color={colors.black} />
        </TouchableOpacity>
    )
};

export default Options;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.lightGray
    },
    textContainer: { 
        width: "90%" 
    },
    text: {
        fontSize: 18,
        fontWeight: "500",
        color: colors.black
    },
});