import React, { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { colors } from "../../../theme/colors";
import { IncreaseAndDecreaseBtnProps } from "../../../types/props.types";

const IncreaseAndDecreaseBtn: React.FC<IncreaseAndDecreaseBtnProps> = ({ nbOrder, setNbOrder}) => {
    const [increaseLongPress, setIncreaseLongPress] = useState<any>(null);
    const [decreaseLongPress, setDecreaseLongPress] = useState<any>(null);

    const increaseOrder = () => {
        setNbOrder((prev: number) => prev < 99 ? prev+1 : prev);
        setIncreaseLongPress(setTimeout(increaseOrder, 200));
    }

    const decreaseOrder = () => {
        setNbOrder((prev: number) => prev > 1 ? prev-1 : prev);
        setDecreaseLongPress(setTimeout(decreaseOrder, 200));
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPressIn={decreaseOrder} onPressOut={() => clearInterval(decreaseLongPress)}>
                <View style={[styles.increaseBtn, { opacity: nbOrder > 1 ? 1 : 0.3  }]}>
                    <Text style={styles.textIncrease}>-</Text>
                </View>
            </TouchableOpacity>
            <Text style={{ fontSize: 30, marginHorizontal: 30 }}>{nbOrder}</Text>
            <TouchableOpacity onPressIn={increaseOrder} onPressOut={() => clearInterval(increaseLongPress)}>
                <View style={styles.increaseBtn}>
                    <Text style={styles.textIncrease}>+</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default IncreaseAndDecreaseBtn;

const styles = StyleSheet.create({
    container: { 
        flexDirection: "row", 
        justifyContent: "center", 
        alignItems: "center", 
        marginBottom: 50 
    },
    increaseBtn: {
        width: 80,
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        backgroundColor: colors.lightGray,
    },
    textIncrease: {
        fontSize: 50
    }
});