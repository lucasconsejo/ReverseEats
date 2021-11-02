import React from "react"
import { Text, View, Button } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ScreenProps } from "../../types/props.types"
import { useEffect, useState } from 'react';
import { clearCacheUser, getCacheUser } from "../../cache/user";
import { User } from "../../types/global.types";
import { StatusBar } from "expo-status-bar";

const Home: React.FC<ScreenProps> = ({ navigation }) => {
    const [user, setUser] = useState<User | null>(null);

    const logout = () => {
        clearCacheUser();
        navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
        });
    }

    useEffect(() => {
        getCacheUser()
        .then(res => {
            setUser(JSON.parse(`${res}`));
        });
    }, [])

    if (user) {
        return (
            <SafeAreaView>
                <StatusBar style="dark" />
                <View>
                    <Text>{user!.id}</Text>
                    <Text>{user!.email}</Text>
                    <Text>{user!.firstName}</Text>
                    <Text>{user!.lastName}</Text>
                    <Text>{user!.role}</Text>
                    <Button title="Déconnexion" onPress={() => logout()} />
                </View>
            </SafeAreaView>
        )
    } 
    return null;
}

export default Home