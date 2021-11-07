import React, { useEffect, useState } from "react"
import { StyleSheet, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl } from 'react-native'
import { ScreenProps } from "../../types/props.types"
import { StatusBar } from "expo-status-bar"
import useCachedUser from "../../hooks/useCachedUser"
import { colors } from '../../theme/colors';
import Header from "./header"
import Restaurants from "./restaurants"
import { getRestaurants } from "../../firebase/restaurantsRequests"
import { Restaurant } from "../../types/global.types"

const Home: React.FC<ScreenProps> = ({ navigation }) => {
    const user = useCachedUser();
    const [loading, setLoading] = useState<boolean>(true);
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    
    useEffect(() => {
        onRefresh()
    }, [])

    const onRefresh = () => {
        setLoading(true)
        const address = `${user?.address}`;
        if (!address.includes("null")) {
            getRestaurants()
            .then(res => res.json())
            .then(res => setRestaurants(res.data))
            .finally(() => setLoading(false));
        } else {
            setRestaurants([]);
            setLoading(false)
        }
    }

    const showRestaurant = () => {
        return loading ? <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 200 }} />
        : <Restaurants restaurants={restaurants} />
    }

    if (user && user.role === "customer") {
        return (
            <SafeAreaView style={styles.view}>
                <StatusBar style="dark" />
                <ScrollView  
                    style={{ backgroundColor: colors.background}}
                    refreshControl={<RefreshControl tintColor={colors.primary} refreshing={loading} onRefresh={onRefresh} />}
                >
                    <Header id={user.id} firstName={user.firstName} address={`${user.address}`} navigation={navigation} />
                    {showRestaurant()}
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