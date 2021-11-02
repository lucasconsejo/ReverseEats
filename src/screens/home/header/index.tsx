import React from 'react';
import { Platform, StatusBar, View, StyleSheet, Text } from "react-native";
import { colors } from "../../../theme/colors";
import { HomeHeaderProps } from '../../../types/props.types';
import Filters from "./filters";

const Header: React.FC<HomeHeaderProps> = ({ firstName }) => (
    <View style={styles.headerContainer}>
        <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Bonjour {firstName}</Text>
            <Text style={styles.headerSubTitle}>Qu’allez-vous commander aujourd’hui ?</Text>
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
        paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight || 0) + 30 : 30,
        paddingBottom: 15
    },
    headerTitle: {
        fontSize: 26,
        fontFamily: "UberMoveBold",
    },
    headerSubTitle: {
        fontSize: 20,
    },
    headerTitleContainer: {
        paddingHorizontal: 15,
    },
    filters: {
        marginVertical: 15
    }
})
