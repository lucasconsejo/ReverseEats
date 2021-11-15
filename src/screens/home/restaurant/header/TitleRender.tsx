import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TitleRenderProps } from '../../../../types/props.types';

const TitleRender: React.FC<TitleRenderProps> = ({ title, note }) => (
    <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.note}>{note}/5</Text>
    </View>
)

export default TitleRender;

const styles = StyleSheet.create({
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
    }
});
