import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../../../../theme/colors';
import { SubTotalRenderProps } from '../../../../types/props.types'

const SubTotalRender: React.FC<SubTotalRenderProps> = ({ caculTotal }) => (
    <View style={styles.container}>
        <Text style={{ fontSize: 18 }}>Sous-total</Text>
        <Text style={{ fontSize: 18 }}>{caculTotal.toFixed(2)}€</Text>
    </View>
)

export default SubTotalRender;

const styles = StyleSheet.create({
    container: { 
        flexDirection: "row", 
        justifyContent: "space-between", 
        paddingHorizontal: 15, 
        paddingVertical: 25,
        borderTopWidth: 1, 
        borderColor: colors.lineGray, 
        marginBottom: 10 
    }
});
