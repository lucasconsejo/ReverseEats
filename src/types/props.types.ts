import { NavigationProp } from "@react-navigation/native";
import { Control } from "react-hook-form";
import { KeyboardTypeOptions, StyleProp, ViewStyle } from "react-native";

export type ScreenProps = {
    navigation: NavigationProp<ReactNavigation.RootParamList|any>,
    route: any,
}

export type InputProps = {
    name: string,
    label?: string,
    theme: "light" | "dark",
    style?: StyleProp<ViewStyle>,
    control: Control<any, object>,
    keyboardType: KeyboardTypeOptions,
    onSubmitEditing?: any,
    secureTextEntry?: boolean
    required?: boolean
}
