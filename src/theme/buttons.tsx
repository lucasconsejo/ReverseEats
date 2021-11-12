import React from "react"
import { Text, TouchableOpacity, StyleSheet } from "react-native"
import { colors } from './colors';

const Button: React.FC<ButtonProps> = ({ theme, title, style, onPress, active }) => {
    switch (theme) {
        case "primary":
            return <ButtonPrimary title={title} style={style} onPress={onPress} />
        case "secondary":
            return <ButtonSecondary title={title} style={style} onPress={onPress} />
        case "secondaryLeft":
            return <ButtonSecondaryLeft title={title} style={style} onPress={onPress} />
        case "secondaryDarkRight":
            return <ButtonSecondaryDarkRight title={title} style={style} onPress={onPress} active={active}/>
        case "blackBtn":
            return <BlackBtn title={title} style={style} onPress={onPress}/>
        case "historyBtn":
            return <HistoryBtn title={title} style={style} onPress={onPress}/>
        default:
            return null
    }
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({ title, style, onPress }) => (
    <TouchableOpacity style={[primary.btn, style]} onPress={onPress}>
        <Text style={primary.text}>{title}</Text>
    </TouchableOpacity>
)

const ButtonSecondary: React.FC<ButtonPrimaryProps> = ({ title, style, onPress }) => (
    <TouchableOpacity style={[secondary.btn, style]} onPress={onPress}>
        <Text style={secondary.text}>{title}</Text>
    </TouchableOpacity>
)
const ButtonSecondaryLeft: React.FC<ButtonPrimaryProps> = ({ title, style, onPress }) => (
    <TouchableOpacity style={[secondaryLeft.btn, style]} onPress={onPress}>
        <Text style={secondaryLeft.text}>{title}</Text>
    </TouchableOpacity>
)

const ButtonSecondaryDarkRight: React.FC<ButtonPrimaryProps> = ({ title, style, onPress, active }) => (
    <TouchableOpacity style={[secondaryDarkRight.btn, style]} onPress={onPress} >
        <Text style={[secondaryDarkRight.text, {color :  active ? colors.primary : colors.lightGray}]}>{title}</Text>
    </TouchableOpacity>
)

const BlackBtn: React.FC<ButtonPrimaryProps> = ({ title, style, onPress }) => (
    <TouchableOpacity style={[blackBtn.btn, style]} onPress={onPress} >
        <Text style={blackBtn.text}>{title}</Text>
    </TouchableOpacity>
)

const HistoryBtn: React.FC<ButtonPrimaryProps> = ({ title, style, onPress }) => (
    <TouchableOpacity style={[historyBtn.btn, style]} onPress={onPress} >
        <Text style={historyBtn.text}>{title}</Text>
    </TouchableOpacity>
)

export default Button;

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
const secondaryLeft = StyleSheet.create({
    btn: {
        borderRadius: 5,
    },
    text: {
        color: colors.primary,
        textAlign: "left",
        fontWeight: "500",
        fontSize: 20,
        paddingVertical: 15,
    },
});

const secondaryDarkRight = StyleSheet.create({
    btn: {
        backgroundColor: colors.backgroundDark,
        borderRadius: 5,
    },
    text: {
        color: colors.primary,
        textAlign: "right",
        fontWeight: "500",
        fontSize: 20,
        paddingVertical: 15,
    },
});

const blackBtn = StyleSheet.create({
    btn: {
        backgroundColor: colors.black,
        borderRadius: 5,
    },
    text: {
        color: colors.white,
        textAlign: "center",
        fontWeight: "500",
        fontSize: 16,
        marginVertical: 13,
        marginHorizontal: 30
    },
});

const historyBtn = StyleSheet.create({
    btn: {
        backgroundColor: colors.historyGray,
        borderRadius: 5,
    },
    text: {
        color: colors.black,
        textAlign: "center",
        fontWeight: "500",
        fontSize: 15,
        marginVertical: 8,
        marginHorizontal: 15
    },
});

type ButtonProps = {
    theme: string,
    title: string,
    style?: Object,
    onPress: any,
    active?: boolean
}

type ButtonPrimaryProps = {
    title: string,
    style?: Object,
    onPress: any,
    active?: boolean
}
