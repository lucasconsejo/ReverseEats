import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { SelectDateTimeProps } from "../../../../../types/props.types";
import { colors } from '../../../../../theme/colors';
import { DateTime } from "luxon";
import DateTimePicker from '@react-native-community/datetimepicker';
import { DateContext } from '../../../../../context/DateProvider';
import { capitalizeFirstLetter } from "../../../../../utils/utils";

const SelectDateTime: React.FC<SelectDateTimeProps> = ({ icon, type }) => {
    const format = type == "date" ? "DDDD" : "HH:mm";
    const { dateState, dateDispatch } = useContext(DateContext);
    const [time, setTime] = useState<Date>(new Date(dateState.date));
    const [showTime, setShowTime] = useState<string>(capitalizeFirstLetter(DateTime.fromISO(dateState.date).setLocale("fr").toFormat(format)));
    const [mode, setMode] = useState<"date" | "time">(type);
    const [show, setShow] = useState<boolean>(false);

    const onChange = (event: any, selectedTime: any) => {
        const currentTime = selectedTime || time;
        setShow(Platform.OS === 'ios');
        setTime(currentTime);
    };

    const showMode = (currentMode: any) => {
        setShow(true);
        setMode(currentMode);
    };

    useEffect(() => {
        setShowTime(capitalizeFirstLetter(DateTime.fromJSDate(time).setLocale("fr").toFormat(format)));
        dateDispatch({
            type: "UPDATE_DATE", 
            payload: {
                date: DateTime.fromJSDate(time).setLocale("fr"),
                dateFormat: DateTime.fromJSDate(time).setLocale("fr").toFormat('ccc DDD à HH:mm'),
            }
        });
    }, [time]);

    const renderSelect = () => {
        return Platform.OS === "android" && (
            <View style={{ flex:1, flexDirection: "row"}}>
                <View style={styles.textContainer}>
                    <Text numberOfLines={1} style={styles.text}>{showTime}</Text>
                </View>
                <FontAwesomeIcon icon={icon} size={25} color={colors.black} />
            </View>
        )
    }

    const renderDateTimePicker = () => {
        return Platform.OS === "ios" ? (
            <DateTimePicker
                value={time}
                mode={mode}
                is24Hour={true}
                display={type == "date" ? "inline" : "spinner"}
                onChange={onChange}
                style={{width: "100%"}}
                minimumDate={new Date()}
            />
        ) : (
            show && <DateTimePicker
                value={time}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
            />
        )
    }

    return (
        <TouchableOpacity style={styles.container} onPress={() => showMode(type)}>
            {renderSelect()}
            {renderDateTimePicker()}
        </TouchableOpacity>
    )
};

export default SelectDateTime;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: Platform.OS === "ios" ? colors.white : colors.lightGray 
    },
    textContainer: { 
        width: "90%" 
    },
    text: {
        fontSize: 18,
        fontWeight: "500"
    },
});