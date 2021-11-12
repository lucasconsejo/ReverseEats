import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, StatusBar, Image, Platform } from 'react-native';
import { colors } from '../../../theme/colors';
import { ScreenProps } from '../../../types/props.types';
import TimeIcon from "../../../assets/icons/time.png"

const Restaurant: React.FC<ScreenProps> = ({ navigation, route }) => {
    const { restaurant } = route.params

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

    return (
       <ScrollView onScroll={(e) => onScroll(e)} style={{ flex: 1, backgroundColor: colors.white}}>
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
});