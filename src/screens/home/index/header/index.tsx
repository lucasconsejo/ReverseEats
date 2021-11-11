import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState, useEffect } from 'react';
import { Platform, StatusBar, View, StyleSheet, Text, Animated } from "react-native";
import useUser from '../../../../hooks/useUser';
import { colors } from '../../../../theme/colors';
import { HomeHeaderProps } from '../../../../types/props.types';
import Filters from "./filters";
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Header: React.FC<HomeHeaderProps> = ({ navigation }) => {
    const [user] = useUser();
    const [animation, setAnimation] = useState<any>(new Animated.Value(0));

    useEffect(() => {
        startAnimation();
    }, []);

    const startAnimation = () => {
        Animated.sequence([
            Animated.timing(animation, {
                toValue:1,
                useNativeDriver: false,
                duration: 500
            }),
            Animated.timing(animation, {
                toValue:0,
                useNativeDriver: false,
                duration: 500,
                delay: 100
            })
        ]).start(() => startAnimation());
    }
    
    const boxInterpolation = animation.interpolate({
        inputRange: [0, 1],
        outputRange:[0, 1]
    });

    const renderFilterIcon = () => {
        return (user.address.length && user.address !== "undefined") ? <FontAwesomeIcon icon={faFilter} size={25} color={colors.black}/> :
        (
            <Animated.View style={{ opacity: boxInterpolation }}>
                <FontAwesomeIcon icon={faFilter} size={25} color={colors.black}/>
            </Animated.View>
        )
    }

    return (
        <View style={styles.headerContainer}>
            <View style={styles.headerTitleContainer}>
                <View>
                    <Text style={styles.headerTitle}>Bonjour {user.firstName}</Text>
                    <Text style={styles.headerSubTitle}>Qu’allez-vous commander aujourd’hui ?</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("DeliveryOptions")}>
                    {renderFilterIcon()}
                </TouchableOpacity>
            </View>
            <View style={styles.filters}>
                <Filters />
            </View>
        </View>
    );
}

export default Header;

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: colors.white,
        paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight || 0) + 40 : 40,
        paddingBottom: 15
    },
    headerTitle: {
        fontSize: 26,
        fontFamily: "UberMoveBold",
    },
    headerSubTitle: {
        fontSize: 17,
    },
    headerTitleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },
    selectAddress: {
        marginTop: 15,
        marginHorizontal: 20,
    },
    filters: {
        marginVertical: 15
    }
})
