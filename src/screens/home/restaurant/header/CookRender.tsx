import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../../../../theme/colors';
import { CookRenderProps } from '../../../../types/props.types';

const CookRender: React.FC<CookRenderProps> = ({ cook }) => (
    <View style={styles.container}>
        <Text style={[styles.cook, { marginRight: 5 }]}>par</Text>
        <TouchableOpacity style={styles.cookBtn}>
            <Text style={styles.cook}>{cook}</Text>
        </TouchableOpacity>
    </View>
)

export default CookRender;

const styles = StyleSheet.create({
    container: { 
        flexDirection: "row", 
        marginTop: 3
    },
    cookBtn: { 
        borderBottomWidth: 1.3, 
        borderColor: colors.cookGray, 
        paddingBottom: 2
    },
    cook: {
        fontSize: 18,
        color: colors.cookGray,
    }
});
