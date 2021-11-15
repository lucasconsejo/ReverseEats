import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import TimeIcon from "../../../../assets/icons/time.png"
import { colors } from '../../../../theme/colors'
import { DurationRenderProps } from '../../../../types/props.types'

const DurationRender: React.FC<DurationRenderProps> = ({ duration, category }) => (
    <View style={styles.moreInfos}>
        <View style={styles.duration}>
            <Image source={TimeIcon}/>
            <Text style={styles.textDuration}>{duration}</Text>
        </View>
        <View style={styles.tag}>
            <Text style={styles.textTag}>{category}</Text>
        </View>
    </View>
)

export default DurationRender;

const styles = StyleSheet.create({
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
    }
});
