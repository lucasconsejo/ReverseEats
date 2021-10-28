import React from "react"
import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

type Props = {
    navigation: NavigationType
}

const Home: React.FC<Props> = ({ navigation }) => {
    return (
        <SafeAreaView>
            <View>
                <Text>Home</Text>
            </View>
        </SafeAreaView>
    )
}

export default Home