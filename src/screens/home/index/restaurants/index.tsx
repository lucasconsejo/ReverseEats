import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, RefreshControl, Dimensions } from 'react-native';
import { HomeRestaurantProps, HomeRestaurantsProps, NoResultsProps } from '../../../../types/props.types';
import Thai from "../../../../assets/icons/thai.png"
import TimeIcon from "../../../../assets/icons/time.png"
import { colors } from '../../../../theme/colors';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { CartContext } from '../../../../context/cartProvider';
import Header from '../header/index';

const Restaurants: React.FC<HomeRestaurantsProps>  = ({ restaurants, loading, onRefresh, loadMore, selectedCategory, setSelectedCategory }) => (
    <FlatList
        style={{ flex: 1 }}
        data={restaurants}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<NoResults loading={loading} />}
        ListHeaderComponent={<Header selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={<RefreshControl tintColor={colors.primary} refreshing={loading} onRefresh={onRefresh} />}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        renderItem={({item, index}) => (
            <RestaurantItem restaurant={item} />
        )}
    />
)

const RestaurantItem: React.FC<HomeRestaurantProps> = ({ restaurant }) => {
    const navigation: NavigationProp<ReactNavigation.RootParamList|any> = useNavigation();
    const { cartState } = useContext(CartContext);
    const nbFood = cartState.reduce((a, b) => a + (b.quantity || 0), 0);

    const onPress = () => {
        navigation.navigate("Restaurant", {
            restaurant,
        });
    }

    const SelectedCart = (restaurantId: string) => {
        if (cartState.length && cartState[0].restaurantId === restaurantId) {
            return (
                <View style={styles.badge}>
                    <Text style={{ color: colors.white, fontSize: nbFood > 99 ? 17 : 25 }}>{nbFood > 99 ? "99+" : nbFood}</Text>
                </View>
            )
        } 
    }

    return (
        <TouchableOpacity style={styles.restaurant} onPress={onPress}>
            <View>
                <View style={{ position: "relative" }}>
                    <Image style={{ height: 150, backgroundColor: colors.lineGray }} source={{ uri: restaurant.cover }}/>
                    {SelectedCart(restaurant.id)}
                </View>
                <View style={styles.restaurantsContainer}>
                    <View style={styles.restaurantsHeader}>
                        <Text style={styles.restaurantTitle}>{restaurant.name}</Text>
                        <Text style={styles.cook}>par {restaurant.cook}</Text>
                    </View>
                    <View style={styles.opinion}>
                        <Text style={styles.textOpinion}>{restaurant.note}</Text>
                    </View>
                </View>
                <View style={styles.moreInfos}>
                    <View style={styles.duration}>
                        <Image source={TimeIcon}/>
                        <Text style={styles.textDuration}>{restaurant.duration}</Text>
                    </View>
                    <View style={styles.tag}>
                        <Text style={styles.textTag}>{restaurant.category}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )   
}
const NoResults: React.FC<NoResultsProps> = ({ loading }) => {
    return !loading ? 
    (
        <View style={styles.container}>
            <View style={styles.img}>
                <Image source={Thai} style={{ width: 150, height: 150 }}/>
            </View>
            <Text style={styles.title}>Aucun résultat trouvé</Text>
            <Text style={styles.subTitle}>Modifiez les options de livraison pour trouver plus de résultats.</Text>
        </View>
    )
    : <View />
}
export default Restaurants;

const styles = StyleSheet.create({
    container: {
        height: "100%",
        alignItems: "center",
        backgroundColor: colors.background
    },
    img: {
        marginTop: 30
    },
    title: {
        fontSize: 24,
        fontFamily: "UberMoveMedium"
    },
    subTitle: {
        paddingHorizontal: 10,
        fontSize: 17,
        textAlign: "center",
        marginTop: 30,
        color: colors.graySubTitle
    },
    restaurant: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        marginVertical: 5,
        paddingVertical: 10,
    },
    backgroundImg: {

    },
    restaurantsContainer: {
        flexDirection: "row",
        justifyContent:"space-between",
        marginTop: 5,
    },
    restaurantsHeader: {
    
    },
    restaurantTitle: {
        fontFamily: "UberMoveMedium",
        fontSize: 20
    },
    cook: {
        color: colors.cookGray,
        fontSize: 18
    },
    opinion: {
        height: 30,
        borderRadius: 100,
        backgroundColor: colors.lightGray
    },
    textOpinion: {
        fontSize: 20,
        paddingHorizontal: 5,
        paddingVertical: 1,
        textAlign: "center"
    },
    moreInfos: {
        marginTop: 20,
        flexDirection: "row"
    },
    duration: {
        flexDirection: "row",
        alignItems: "center"
    },
    textDuration: {
        marginLeft: 5,
        color: colors.timeGray,
        fontSize: 16
    },
    tag: {
        borderRadius: 5,
        backgroundColor: colors.lightPrimary,
        marginLeft: 20
    },
    textTag: {
        color: colors.primary,
        fontSize: 16,
        paddingHorizontal: 15,
        paddingVertical: 2
    },
    badge: { 
        position: "absolute", 
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 2, }, 
        shadowOpacity: 0.25, 
        shadowRadius: 3.84, 
        elevation: 5, 
        backgroundColor: colors.primary, 
        top: -7, 
        right: -10, 
        width: 40, 
        height: 40, 
        padding: 5, 
        borderRadius: 100, 
        justifyContent: "center",
        alignItems: "center"
    }
});