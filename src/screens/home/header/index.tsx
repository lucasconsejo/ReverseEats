import React from 'react';
import { Platform, StatusBar, View, StyleSheet, Text } from "react-native";
import { colors } from "../../../theme/colors";
import { HomeHeaderProps } from '../../../types/props.types';
import SelectAddress from '../address';
import Filters from "./filters";

const Header: React.FC<HomeHeaderProps> = ({ id, firstName, address, navigation }) => (
    <View style={styles.headerContainer}>
        <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Bonjour {firstName}</Text>
            <Text style={styles.headerSubTitle}>Qu’allez-vous commander aujourd’hui ?</Text>
        </View>
        <View style={styles.selectAddress}>
            <SelectAddress id={id} address={address} navigation={navigation} />
        </View>
        <View style={styles.filters}>
            <Filters />
        </View>
    </View>
);

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
        fontSize: 18,
    },
    headerTitleContainer: {
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
