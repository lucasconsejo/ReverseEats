import React from "react"
import { Text, View, Button } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ScreenProps } from "../../types/props.types"
import { clearCacheUser } from "../../cache/user";
import { StatusBar } from "expo-status-bar";
import useCachedUser from "../../hooks/useCachedUser";

const Profil: React.FC<ScreenProps> = ({ navigation }) => {
    const user = useCachedUser();

    const logout = () => {
        clearCacheUser();
        navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
        });
    }

    if (user) {
        return (
            <SafeAreaView>
                <StatusBar style="dark" />
                <View>
                    <Text>{user!.id}</Text>
                    <Text>{user!.email}</Text>
                    <Text>{user!.firstName}</Text>
                    <Text>{user!.lastName}</Text>
                    <Text>{user!.address}</Text>
                    <Text>{user!.zipCode} {user!.city}</Text>
                    <Text>{user!.role}</Text>
                    <Button title="Déconnexion" onPress={() => logout()} />
                </View>
            </SafeAreaView>
        )
    } 
    return null;
}

export default Profil;
