import React from "react"
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { ScreenProps } from "../../types/props.types"
import { StatusBar } from "expo-status-bar"
import useCachedUser from "../../hooks/useCachedUser"
import { colors } from "../../theme/colors"
import Header from "./header"
import Restaurants from "./restaurants"
import Montagnard from "../../assets/img/le-montagnard.png"
import Guibole from "../../assets/img/la-guibole.png"

const Home: React.FC<ScreenProps> = ({ navigation }) => {
    const user = useCachedUser();
    const restaurants: Array<any> = [{
        id: "fsdfsdfsfsdfsdf",
        name: "Le Montagnard",
        cook: "Lucas Consejo",
        cover: Montagnard,
        note: 4.8,
        duration: "5 min",
        category: "Savoyard"
    },
    {
        id: "fsdfsdfsfsdfsdsdfgfg",
        name: "La guibole du père Coin-Coin",
        cook: "Tony Pedrero",
        cover: Guibole,
        note: 3.5,
        duration: "5 min",
        category: "Authentique"
    }];

    if (user && user.role === "customer") {
        return (
            <SafeAreaView style={styles.view}>
                <StatusBar style="dark" />
                <ScrollView style={{ backgroundColor: colors.background}}>
                    <Header firstName={user.firstName} />
                    <Restaurants restaurants={restaurants} />
                </ScrollView>
            </SafeAreaView>
        );
    }
    return null;
}

export default Home;

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: colors.white
    },
});