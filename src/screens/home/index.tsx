import React from "react"
import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ScreenProps } from "../../types/props.types"

const Home: React.FC<ScreenProps> = ({ navigation }) => {
    return (
        <SafeAreaView>
            <View>
                <Text>Home</Text>
            </View>
        </SafeAreaView>
    )
}

export default Home