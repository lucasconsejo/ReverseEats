import React from "react"
import { Text, TouchableOpacity, StyleSheet } from "react-native"
import { colors } from './colors';

export const ButtomPrimary: React.FC<ButtonPrimaryProps> = ({ title, style, onPress }) => (
    <TouchableOpacity style={[primary.btn, style]} onPress={onPress}>
        <Text style={primary.text}>{title}</Text>
    </TouchableOpacity>
)

export const ButtomSecondary: React.FC<ButtonPrimaryProps> = ({ title, style, onPress }) => (
    <TouchableOpacity style={[secondary.btn, style]} onPress={onPress}>
        <Text style={secondary.text}>{title}</Text>
    </TouchableOpacity>
)

const primary = StyleSheet.create({
    btn: {
        backgroundColor: colors.primary,
        borderRadius: 5,
    },
    text: {
        color: colors.white,
        textAlign: "center",
        fontWeight: "500",
        fontSize: 20,
        paddingVertical: 15,
    },
});

const secondary = StyleSheet.create({
    btn: {
        backgroundColor: colors.white,
        borderRadius: 5,
    },
    text: {
        color: colors.primary,
        textAlign: "center",
        fontWeight: "500",
        fontSize: 20,
        paddingVertical: 15,
    },
});

type ButtonPrimaryProps = {
    title: string,
    style?: Object
    onPress: any
}
