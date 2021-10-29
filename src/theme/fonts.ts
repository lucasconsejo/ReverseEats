import { useFonts } from "expo-font";

export const useFontsHook = () => {
    const [loaded] = useFonts({
        UberMoveMedium: require('../assets/fonts/UberMoveMedium.otf'),
        UberMoveBold: require('../assets/fonts/UberMoveBold.otf'),
    });
    return [loaded]
}