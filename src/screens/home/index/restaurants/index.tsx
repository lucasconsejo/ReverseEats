import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { HomeRestaurantsProps } from '../../../../types/props.types';
import Thai from "../../../../assets/icons/thai.png"
import TimeIcon from "../../../../assets/icons/time.png"
import { colors } from '../../../../theme/colors';

const Restaurants: React.FC<HomeRestaurantsProps> = ({ restaurants }) => (!restaurants.length) ? <NoResults /> : <RestaurantsList restaurants={restaurants} />;

const NoResults: React.FC = () => (
    <View style={styles.container}>
        <View style={styles.img}>
            <Image source={Thai} style={{ width: 150, height: 150 }}/>
        </View>
        <Text style={styles.title}>Aucun résultat trouvé</Text>
        <Text style={styles.subTitle}>Modifiez les options de livraison pour trouver plus de résultats.</Text>
    </View>
)

const RestaurantsList: React.FC<HomeRestaurantsProps> = ({ restaurants }) => (
    <View>
        {
            restaurants.map((item, index) => {
                return (
                    <TouchableOpacity style={styles.restaurant} key={index}>
                        <View>
                            <Image style={{ height: 150 }} source={{ uri: item.cover }}/>
                            <View style={styles.restaurantsContainer}>
                                <View style={styles.restaurantsHeader}>
                                    <Text style={styles.restaurantTitle}>{item.name}</Text>
                                    <Text style={styles.cook}>par {item.cook}</Text>
                                </View>
                                <View style={styles.opinion}>
                                    <Text style={styles.textOpinion}>{item.note}</Text>
                                </View>
                            </View>
                            <View style={styles.moreInfos}>
                                <View style={styles.duration}>
                                    <Image source={TimeIcon}/>
                                    <Text style={styles.textDuration}>{item.duration}</Text>
                                </View>
                                <View style={styles.tag}>
                                    <Text style={styles.textTag}>{item.category}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            })
        }
    </View>
)

export default Restaurants;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        marginTop: 10,
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
});