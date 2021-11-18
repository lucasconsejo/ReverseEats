import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, StatusBar, Platform, RefreshControl, Text } from 'react-native';
import { colors } from '../../../theme/colors';
import { ScreenProps } from '../../../types/props.types';
import { getFoods } from '../../../firebase/foodsRequests';
import { Food } from '../../../types/global.types';
import CartRender  from './cart/CartRender';
import MenuContainer from './menu/MenuContainer';
import DurationRender from './header/DurationRender';
import CookRender from './header/CookRender';
import TitleRender from './header/TitleRender';
import BackgroundRender from './header/BackgroundRender';
import { CartContext } from '../../../context/cartProvider';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const Restaurant: React.FC<ScreenProps> = ({ navigation, route }) => {
    const { restaurant } = route.params;
    const { starters, mainCourses, desserts } = restaurant.menu;
    const [loading, setLoading] = useState<boolean>(true);
    const [startersResult, setStartersResult] = useState<Array<Food>>([]);
    const [mainCoursesResult, setMainCoursesResult] = useState<Array<Food>>([]);
    const [dessertsResult, setSDessertsResult] = useState<Array<Food>>([]);
    const { cartState } = useContext(CartContext);

    useEffect(() => {
        onRefresh();
    }, []);

    const onRefresh = () => {
        setLoading(true);
        getFoods(starters)
            .then(res => res.json())
            .then(res => {
                setStartersResult(res.data)
                getFoods(mainCourses)
                .then(res => res.json())
                .then(res => {
                    setMainCoursesResult(res.data)
                    getFoods(desserts)
                    .then(res => res.json())
                    .then(res => setSDessertsResult(res.data))
                    .finally(() => setLoading(false))
                })
            })
    }

    const onScroll = (e: any) => {
        const scrollY = e.nativeEvent.contentOffset.y
        if (scrollY >= 150) {
            StatusBar.setBarStyle('dark-content', true);
            Platform.OS == "android" && StatusBar.setBackgroundColor(colors.white, true);
        } else {
            StatusBar.setBarStyle('light-content', true);
            Platform.OS == "android" && StatusBar.setBackgroundColor("#1919195e", true);
        }
    }

    const WarningCart = () => {
        if (cartState.length && cartState[0].restaurantId !== restaurant.id) {
            return (
                <View style={{ marginTop: 20, backgroundColor: "#ffc1001a", borderRadius: 5, paddingVertical: 10, paddingHorizontal: 15, width: "100%", flexDirection: "row", justifyContent:"space-between" }}>
                    <FontAwesomeIcon icon={faExclamationTriangle} size={30} color="#ffc100" />
                    <Text style={{ color: "#ffc100", paddingHorizontal: 15 }}>Vous avez déjà un panier en cours dans un autre restaurant.</Text>
                </View>
            )
        } 
    }

    return (
        <View style={{ flex: 1, justifyContent: "space-between" }}>
            <ScrollView 
                    onScroll={(e) => onScroll(e)} 
                    refreshControl={<RefreshControl tintColor={colors.primary} refreshing={loading} onRefresh={onRefresh} />}
                    style={{ flex: 1, backgroundColor: colors.white}}
                >
                    <StatusBar backgroundColor="#1919195e" barStyle="light-content" translucent />
                    <BackgroundRender cover={restaurant.cover} />
                    <View style={{ marginHorizontal: 15, marginTop: 10 }}>
                        <TitleRender title={restaurant.name} note={restaurant.note} />
                        <CookRender cook={restaurant.cook} />
                        <DurationRender duration={restaurant.duration} category={restaurant.category} />
                        {WarningCart()}
                        {
                            !loading && (
                                <MenuContainer
                                    restaurantName={restaurant.name}
                                    startersResult={startersResult}
                                    mainCoursesResult={mainCoursesResult}
                                    dessertsResult={dessertsResult}
                                    comments={restaurant.comments}
                                    navigation={navigation}
                                    restaurantId={restaurant.id}
                                />
                            )
                        }
                    </View>
                </ScrollView>
                <CartRender restaurant={restaurant} navigation={navigation} />
        </View>
    );
};

export default Restaurant;
