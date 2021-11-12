import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, StatusBar, Image, Platform, RefreshControl } from 'react-native';
import { colors } from '../../../theme/colors';
import { ScreenProps } from '../../../types/props.types';
import TimeIcon from "../../../assets/icons/time.png"
import { getFoods } from '../../../firebase/foodsRequests';

const Restaurant: React.FC<ScreenProps> = ({ navigation, route }) => {
    const { restaurant } = route.params;
    const { starters, mainCourses, desserts } = restaurant.menu;
    const [loading, setLoading] = useState<boolean>(true);
    const [startersResult, setStartersResult] = useState<Array<any>>([]);
    const [mainCoursesResult, setMainCoursesResult] = useState<Array<any>>([]);
    const [dessertsResult, setSDessertsResult] = useState<Array<any>>([]);

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

    const renderProducts = (products: any, type: string) => (
        <View style={styles.productContainer}>
            <Text style={styles.productType}>{type}</Text>
            {
                products.map((item: any) => (
                    <TouchableOpacity key={item.id} style={styles.product}>
                        <View style={styles.productTexts}>
                            <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
                            <Text style={styles.productIngredients} numberOfLines={2}>{item.ingredients}</Text>
                            <Text style={styles.productPrice}>{item.price}€</Text>
                        </View>
                        <Image style={{ width: 120, height: 120 }} source={{ uri: item.img }}/>
                    </TouchableOpacity>
                ))
            }
        </View>
    )

    return (
       <ScrollView 
            onScroll={(e) => onScroll(e)} 
            refreshControl={<RefreshControl tintColor={colors.primary} refreshing={loading} onRefresh={onRefresh} />}
            style={{ flex: 1, backgroundColor: colors.white}}
        >
           <StatusBar backgroundColor="#1919195e" barStyle="light-content" translucent />
           <ImageBackground source={{ uri: restaurant.cover }} style={styles.cover}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <FontAwesomeIcon icon={faArrowLeft} size={25} />
                </TouchableOpacity>
            </ImageBackground>
            <View style={{ marginHorizontal: 15, marginTop: 10 }}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{restaurant.name}</Text>
                    <Text style={styles.note}>{restaurant.note}/5</Text>
                </View>
                <View style={{ flexDirection: "row", marginTop: 3 }}>
                    <Text style={[styles.cook, { marginRight: 5 }]}>par</Text>
                    <TouchableOpacity style={{ borderBottomWidth: 1.3, borderColor: colors.cookGray, paddingBottom: 2 }}>
                        <Text style={styles.cook}>{restaurant.cook}</Text>
                    </TouchableOpacity>
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
                {
                    !loading && (
                        <View>
                            <View style={styles.container}>
                                {startersResult.length ? renderProducts(startersResult, "Entrées") : <View />}
                                {mainCoursesResult.length ? renderProducts(mainCoursesResult, "Plats") : <View />}
                                {dessertsResult.length ? renderProducts(dessertsResult, "Désserts") : <View />}
                            </View>
                            <View style={styles.comment}>
                                <Text style={styles.commentTitle}>Commentaire du cuisinier</Text>
                                <View style={styles.commentContainer}>
                                    <Text style={styles.commentText}>{restaurant.comments}</Text>
                                </View>
                            </View>
                        </View>
                    )
                }
            </View>
        </ScrollView>
    );
};

export default Restaurant;

const styles = StyleSheet.create({
    cover: {
        height: 200,
    }, 
    backBtn: {
        zIndex: 1,
        position: "absolute",
        top: 50,
        left: 20,
        borderRadius: 100,
        backgroundColor: colors.white,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    title: {
        width: "75%",
        fontFamily: "UberMoveBold",
        fontSize: 25
    },
    note: {
        fontSize: 22
    },
    cook: {
        fontSize: 18,
        color: colors.cookGray,
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
    container: {
        marginTop: 30,
    },
    productContainer: {
        marginBottom: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderColor: colors.lineGray
    },
    productType: {
        fontFamily: "UberMoveMedium",
        fontSize: 23,
    },
    product: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 15,
    }, 
    productTexts: {
        width: "60%",
        paddingLeft: 5,
    },
    productName: {
        fontFamily: "UberMoveMedium",
        fontSize: 20,
    },
    productIngredients: {
        marginVertical: 7,
        fontSize: 17,
        color: colors.cookGray
    },
    productPrice: {
        fontSize: 20,
        color: colors.primary
    },
    comment: {
        marginBottom: 150
    },
    commentTitle: {
        fontFamily: "UberMoveMedium",
        fontSize: 23,
    },
    commentContainer: {
        marginTop: 15,
        backgroundColor: "#F3F3F3",
        borderRadius: 5,
        paddingVertical: 15,
        paddingHorizontal: 15
    },
    commentText: {
        fontSize: 18,
        lineHeight: 23
    }
});