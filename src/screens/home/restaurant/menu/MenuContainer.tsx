import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { MenuContainerProps } from '../../../../types/props.types'
import MenuItems from './MenuItems'

const MenuContainer: React.FC<MenuContainerProps> = ({ startersResult, mainCoursesResult, dessertsResult, comments, navigation }) => (
    <View>
        <View style={styles.menuContainer}>
            <MenuItems foods={startersResult} title="Entrées" navigation={navigation} />
            <MenuItems foods={mainCoursesResult} title="Plats" navigation={navigation} />
            <MenuItems foods={dessertsResult} title="Désserts" navigation={navigation} />
        </View>
        <View style={styles.comment}>
            <Text style={styles.commentTitle}>Commentaire du cuisinier</Text>
            <View style={styles.commentContainer}>
                <Text style={styles.commentText}>{comments}</Text>
            </View>
        </View>
    </View>
)

export default MenuContainer;

const styles = StyleSheet.create({
    menuContainer: {
        marginTop: 30
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
