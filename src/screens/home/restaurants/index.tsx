import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { HomeRestaurantsProps } from '../../../types/props.types';
import Thai from "../../../assets/icons/thai.png"
import { colors } from '../../../theme/colors';

const Restaurants: React.FC<HomeRestaurantsProps> = ({ restaurants }) => (!restaurants.length) ? <NoResults /> : null;

const NoResults: React.FC = () => (
    <View style={styles.container}>
        <View style={styles.img}>
            <Image source={Thai} style={{ width: 200, height: 200 }}/>
        </View>
        <Text style={styles.title}>Aucun résultat trouvé</Text>
        <Text style={styles.subTitle}>Saisissez une adresse pour afficher les cuisiniers près de chez vous.</Text>
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
        marginTop: 40
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
    }
});