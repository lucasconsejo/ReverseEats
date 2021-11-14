import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { NavigationProp } from "@react-navigation/native";
import { Control } from "react-hook-form";
import { KeyboardTypeOptions, StyleProp, ViewStyle } from "react-native";
import { Restaurant } from "./global.types";

export type ScreenProps = {
    navigation: NavigationProp<ReactNavigation.RootParamList|any>,
    route: any,
}

export type NavigationProps = {
    defaultRoute: string
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

export type HomeRestaurantsProps = {
    restaurants: Array<Restaurant>
}

export type SelectDateTimeProps = {
    type: "date" | "time",
    icon: IconDefinition
}

export type CollapseBtnProps = {
    title: string,
    noDataTitle: string,
    data: Array<any>,
    type: "materials" | "options",
    defaultShow?: boolean,
    selectedData?: Array<string>,
    onChangeSelectedData?: any
}