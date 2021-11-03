import React from "react"
import { StyleSheet, SafeAreaView } from 'react-native'
import { ScreenProps } from "../../types/props.types"
import { StatusBar } from "expo-status-bar"
import useCachedUser from "../../hooks/useCachedUser"
import { colors } from "../../theme/colors"
import Header from "./header"
import Restaurants from "./restaurants"

const Home: React.FC<ScreenProps> = ({ navigation }) => {
    const user = useCachedUser();
    const restaurants: Array<any> = [];

    if (user && user.role === "customer") {
        return (
            <SafeAreaView style={styles.view}>
                <StatusBar style="dark" />
                <Header firstName={user.firstName} />
                <Restaurants restaurants={restaurants} />
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