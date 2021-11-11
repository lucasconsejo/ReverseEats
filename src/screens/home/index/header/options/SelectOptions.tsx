import { faArrowLeft, faClock, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useState } from "react";
import { TouchableOpacity, View, StyleSheet, Text, Platform } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../../../../theme/colors";
import { ScreenProps } from "../../../../../types/props.types";
import SelectAddress from "./SelectAddress";
import SelectDateTime from "./SelectDateTime";
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { ScrollView } from "react-native-gesture-handler";
import { DateContext } from "../../../../../context/DateProvider";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { capitalizeFirstLetter } from "../../../../../utils/utils";

const SelectOptions: React.FC<ScreenProps> = ({ navigation }) => {
    const { dateState } = useContext(DateContext);
    const [showDate, setShowDate] = useState<boolean>(false);
    const [showTime, setShowTime] = useState<boolean>(false);

    const renderSelectDateTime = (type: "date" | "time", icon: IconDefinition) => {
        const title = type === "date" ? "Date" : "Heure"
        const dateFormat = type === "date" ? dateState.date.toFormat("DDDD") : dateState.date.toFormat("HH:mm")
        const isDate = type === "date";
        return Platform.OS == "ios" ? (
            <View>
                <Text style={[styles.subTitle, { marginHorizontal: 20 }]}>{title}</Text>
                <TouchableOpacity style={styles.selectIosContainer} onPress={() => isDate ? setShowDate(!showDate) : setShowTime(!showTime)}>
                    <Text style={styles.subTitle}>{capitalizeFirstLetter(dateFormat)}</Text>
                    <FontAwesomeIcon icon={isDate ? faCalendarAlt : faClock} size={25} color={colors.black} />
                </TouchableOpacity>
                {isDate ? 
                    showDate && <SelectDateTime navigation={navigation} type={type} icon={icon} />
                    : showTime && <SelectDateTime navigation={navigation} type={type} icon={icon} />
                }
            </View>
        ) : (
            <View style={styles.selectContainer}>
                <Text style={styles.subTitle}>{title}</Text>
                <SelectDateTime navigation={navigation} type={type} icon={icon} />
            </View>
        )
    }

    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
            <StatusBar style="dark" />
            <ScrollView>
                <KeyboardAwareScrollView style={{ flex: 1 }}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <FontAwesomeIcon icon={faArrowLeft} color={colors.black} size={30} />
                        </TouchableOpacity>
                        <Text style={styles.title}>Options de livraison</Text>
                        <View />
                    </View>
                    <View style={styles.container}>
                        {renderSelectDateTime("date", faCalendarAlt)}
                        {renderSelectDateTime("time", faClock)}
                        <View style={styles.selectContainer}>
                            <Text style={styles.subTitle}>Adresse</Text>
                            <SelectAddress />
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </ScrollView>
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
       
    },
    selectContainer: {
        marginHorizontal: 20,
        marginBottom: 20
    },
    subTitle: {
        width: "90%",
        fontSize: 20,
    },
    selectIosContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: colors.lightGray,
        borderRadius: 5,
        marginHorizontal: 20,
        marginBottom: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
});