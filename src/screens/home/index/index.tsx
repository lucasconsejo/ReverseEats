import React, { useContext, useEffect, useState } from "react"
import { StyleSheet, SafeAreaView, ScrollView, View, RefreshControl } from 'react-native'
import { ScreenProps } from "../../../types/props.types"
import { StatusBar } from "expo-status-bar"
import { colors } from '../../../theme/colors';
import Header from "./header"
import Restaurants from "./restaurants"
import { getRestaurants } from "../../../firebase/restaurantsRequests"
import { Restaurant } from "../../../types/global.types"
import useUser from "../../../hooks/useUser"
import { getCacheUser } from "../../../cache/user";
import { DateContext } from "../../../context/DateProvider";
import { DateTime } from "luxon";

const Home: React.FC<ScreenProps> = ({ navigation }) => {
    const [user, userDispatch] = useUser();
    const { dateState, dateDispatch } = useContext(DateContext);
    const [loading, setLoading] = useState<boolean>(true);
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    
    useEffect(() => {
        getCacheUser()
        .then(res => {
            if (res?.length) {
                userDispatch({ 
                    type: "ADD_USER",
                    payload: JSON.parse(`${res}`)
                });
            } else {
                navigation.reset({
                    index: 0,
                    routes: [{ name: "Login" }],
                });
            }
        });
    }, []);

    useEffect(() => {
        onRefresh()
    }, [])

    useEffect(() => {
        onRefresh()
    }, [user?.address])

    const onRefresh = () => {
        setLoading(true)
        if (dateState.date.diffNow("minute").minutes < 0) {
            const now = DateTime.now().setLocale("fr");
            dateDispatch({
                type: "UPDATE_DATE",
                payload: {
                    date: now,
                    dateFormat: now.toFormat('ccc DDD à HH:mm'),
                }
            })
        }
        const address = `${user?.address}`;
        if (address.length && address !== "undefined") {
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
        return loading ? <View /> : <Restaurants restaurants={restaurants} />
    }

    if (user && user.role === "customer") {
        return (
            <SafeAreaView style={styles.view}>
                <StatusBar style="dark" />
                <ScrollView  
                    style={{ backgroundColor: colors.background}}
                    refreshControl={<RefreshControl tintColor={colors.primary} refreshing={loading} onRefresh={onRefresh} />}
                >
                    <Header />
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