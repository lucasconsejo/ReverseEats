import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, ImageBackground, TouchableOpacity, Text } from "react-native";
import { colors } from "../../../theme/colors";
import { FoodHeaderProps } from "../../../types/props.types";

const FoodHeader: React.FC<FoodHeaderProps> = ({ food }) => {
    const navigation = useNavigation();
    return (
        <View>
            <ImageBackground source={{ uri: food.img.replace(/ /g,"%20") }} style={styles.cover}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <FontAwesomeIcon icon={faArrowLeft} size={25} />
                </TouchableOpacity>
            </ImageBackground>
            <View style={{ marginHorizontal: 15, marginTop: 10 }}>
                <Text style={styles.title}>{food.name}</Text>
                <Text style={styles.ingredients}>{food.ingredients}</Text>
            </View>
        </View>
    )
}

export default FoodHeader;

const styles = StyleSheet.create({
    cover: {
        height: 300,
    }, 
    backBtn: {
        zIndex: 1,
        position: "absolute",
        top: 50,
        left: 20,
        borderRadius: 100,
        backgroundColor: colors.white,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    title: {
        fontFamily: "UberMoveBold",
        fontSize: 25
    },
    ingredients: {
        fontSize: 18,
        marginVertical: 10,
        color: colors.cookGray,
    },
});