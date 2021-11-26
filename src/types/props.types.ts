import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { NavigationProp } from "@react-navigation/native";
import { Control } from "react-hook-form";
import { KeyboardTypeOptions, StyleProp, ViewStyle } from "react-native";
import { Cart, Food, Restaurant } from "./global.types";

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
    restaurants: Array<Restaurant>,
    selectedCategory: string, 
    loading: boolean,
    setSelectedCategory: any,
    onRefresh: any,
    loadMore: any
}
export type HomeRestaurantProps = {
    restaurant: Restaurant
}

export type NoResultsProps = {
    loading: boolean
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

export type IncreaseAndDecreaseBtnProps = {
    nbOrder: number,
    setNbOrder: any
}

export type OptionsProps = {
    options: Array<any>,
    selectedOptions: Array<any>,
    setSelectedOptions: any,
}

export type MaterialsProps = {
    materials: Array<any>,
}

export type FoodBtnProps = {
    text: string,
    onPress: any
}

export type FoodHeaderProps = {
    food: Food
}

export type DeleteFoodBtnProps ={
    removeCart: any
}

export type CartRenderProps = {
    restaurant: any,
    navigation: any
}

export type CartItemsProps = {
    title: string,
    cartState: Array<Cart>,
    setShowCart: any,
    navigation: any,
    caculTotal: number
}

export type SubTotalRenderProps = {
    caculTotal: number
}

export type CartBtnProps = {
    text: string,
    onPress: any
}

export type CartItemProps = {
    item: Cart, 
    navigation: any
}

export type MenuItemsProps = {
    foods: Food[],
    restaurantId: string,
    restaurantName: string,
    title: string,
    navigation:  any
}

export type MenuItemProps = {
    food: Food,
    onPress:  any
}

export type MenuContainerProps = {
    navigation: any,
    restaurantId: string,
    restaurantName: string,
    startersResult: Array<Food>, 
    mainCoursesResult: Array<Food>, 
    dessertsResult: Array<Food>,
    comments: string

}

export type DurationRenderProps = {
    duration: string,
    category: string
}

export type CookRenderProps = {
    cook: string
}

export type TitleRenderProps = {
    title: string,
    note: number
}

export type BackgroundRenderProps = {
    cover: string
}

export type FiltersProps = {
    selectedCategory: string,
    setSelectedCategory: any
}

export type HeaderProps = {
    selectedCategory: string,
    setSelectedCategory: any
}

export type MapViewContainerProps = {
    duration: number,
    setDuration: any,
    markers: Array<any>,
    middleMarker: any,
    setMiddleMarker: any
}