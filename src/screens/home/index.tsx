import React from "react"
import { StyleSheet, View, SafeAreaView } from 'react-native'
import { ScreenProps } from "../../types/props.types"
import { StatusBar } from "expo-status-bar"
import useCachedUser from "../../hooks/useCachedUser"
import { colors } from "../../theme/colors"
import Header from "./header"

const Home: React.FC<ScreenProps> = ({ navigation }) => {
    const user = useCachedUser();

    if (user && user.role === "customer") {
        return (
            <SafeAreaView style={styles.view}>
                <StatusBar style="dark" />
                <Header firstName={user.firstName} />
                
                <View style={styles.container}>
                    
                </View>
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
    container: {
        flex: 1,
        paddingVertical: 0,
        backgroundColor: colors.background
    },
})