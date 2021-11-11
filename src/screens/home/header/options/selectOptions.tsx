import { faArrowLeft, faClock, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../../../theme/colors";
import { ScreenProps } from "../../../../types/props.types";
import SelectAddress from "./SelectAddress";
import SelectDateTime from "./SelectDateTime";

const SelectOptions: React.FC<ScreenProps> = ({ navigation }) => {
    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
            <StatusBar style="dark" />
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesomeIcon icon={faArrowLeft} color={colors.black} size={30} />
                </TouchableOpacity>
                <Text style={styles.title}>Option de livraison</Text>
                <View />
            </View>
            <View style={styles.container}>
                <View>
                    <Text style={styles.subTitle}>Date</Text>
                    <SelectDateTime navigation={navigation} type="date" icon={faCalendarAlt} />
                </View>
                <View style={styles.selectContainer}>
                    <Text style={styles.subTitle}>Heure</Text>
                    <SelectDateTime navigation={navigation} type="time" icon={faClock} />
                </View>
                <View style={styles.selectContainer}>
                    <Text style={styles.subTitle}>Adresse</Text>
                    <SelectAddress navigation={navigation} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SelectOptions;

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 20,
        marginVertical: 20,
    },
    title: {
        fontSize: 25,
        fontFamily: "UberMoveMedium",
    },
    container: {
        marginHorizontal: 20
    },
    selectContainer: {
        marginTop: 20
    },
    subTitle: {
        fontSize: 20,
        marginBottom: 5,
    }
});