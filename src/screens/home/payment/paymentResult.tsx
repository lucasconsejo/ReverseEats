import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScreenProps } from '../../../types/props.types'

const PaymentResult: React.FC<ScreenProps> = ({ navigation }) => {

    return (
        <View>
            <Text>Payment ok</Text>
        </View>
    )
}

export default PaymentResult

const styles = StyleSheet.create({})
