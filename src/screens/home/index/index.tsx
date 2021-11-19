import React, { useContext, useEffect, useState } from "react"
import { StyleSheet, SafeAreaView, View, StatusBar } from 'react-native'
import { ScreenProps } from "../../../types/props.types"
import { colors } from '../../../theme/colors';
import Header from "./header"
import Restaurants from "./restaurants"
import { getRestaurants } from "../../../firebase/restaurantsRequests"
import { Restaurant } from "../../../types/global.types"
import useUser from "../../../hooks/useUser"
import { getCacheUser } from "../../../cache/user";
import { DateContext } from "../../../context/dateProvider";
import { DateTime } from "luxon";

const Home: React.FC<ScreenProps> = ({ navigation }) => {
    const [user, userDispatch] = useUser();
    const { dateState, dateDispatch } = useContext(DateContext);
    const [loading, setLoading] = useState<boolean>(true);
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(10);
    
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
        setPage(0)
        onRefresh()
    }, [user?.address])

    useEffect(() => {
        onRefresh()
    }, [selectedCategory])

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
            getRestaurants(selectedCategory, page, limit)
            .then(res => res.json())
            .then(res => setRestaurants(res.data))
            .finally(() => setLoading(false));
        } else {
            setRestaurants([]);
            setLoading(false)
        }
    }

    const loadMore = () => {
        // setPage((prev) => prev +1);
        // onRefresh();
    }

    const showRestaurant = () => {
        return loading ? <View /> : <Restaurants restaurants={restaurants} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} loading={loading} onRefresh={onRefresh} loadMore={loadMore} />
    }

    if (user && user.role === "customer") {
        return (
            <SafeAreaView style={styles.view}>
                <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
                <View style={{ backgroundColor: colors.background}}>
                    <View style={{ position: restaurants.length ? "absolute": "relative" }}>
                        <Header selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                    </View>
                    <View style={{ backgroundColor: colors.background}}>
                        {showRestaurant()}
                    </View>
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
});