import React from "react"
import { Text, View, StyleSheet, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ScreenProps } from "../../types/props.types"
import { clearCacheUser } from "../../cache/user";
import { StatusBar } from "expo-status-bar";
import useCachedUser from "../../hooks/useCachedUser";
import { colors } from "../../theme/colors";
import Button from "../../theme/buttons";

const Profil: React.FC<ScreenProps> = ({ navigation }) => {
    const user = useCachedUser();

    const logout = () => {
        clearCacheUser();
        navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
        });
    }

    const emailNotNull = () => {
        if(user!.email !== null)
            return (
                <View>
                    <Text style={styles.label}>Email</Text>
                    <Text style={styles.text}>{user!.email}</Text>
                </View>
            );
    }
    const adressNotNull = () => {
        if(user!.address !== null) {
            return (
                <View>
                    <Text style={styles.label}>Adresse</Text>
                    <Text style={styles.text}>{user!.address}</Text>
                </View>
            );
        }
    }
    const cityOrCodeNotNull = () => {
        if(user!.city !== null || user!.zipCode !== null) {
            return (
                <View>
                    <Text style={styles.label}>Adresse</Text>
                    <Text style={styles.text}>{user!.address}</Text>
                </View>
            );
        }
    }
    const roleNotNull = () => {
        if(user!.role !== null) {
            return (
                <View>
                    <Text style={styles.label}>Role</Text>
                    <Text style={styles.text}>{user!.role}</Text>
                </View>
            );
        }
    }

    if (user) {
        return (
            <SafeAreaView>
                <StatusBar style="dark" />
                <View style={{ marginHorizontal: 30, marginTop: 180}}>
                    <View style={{alignItems: "center"}}>
                        <Text style={styles.name}>{user!.firstName} {user!.lastName}</Text>
                        <Button 
                            theme="secondary" 
                            title="Modifier le profil" 
                            style={{ backgroundColor: colors.lightGray, paddingBottom: 40 }} 
                            onPress={() => console.log("modifier le profil")} />
                    </View>
                
                    {emailNotNull()}  
                    {adressNotNull()}
                    {cityOrCodeNotNull()}
                    {roleNotNull()}

                    <Button 
                        theme="secondaryLeft" 
                        title="Se déconnecter" 
                        style={{ backgroundColor: colors.lightGray, paddingTop: 30 }} 
                        onPress={() => logout()} />
                </View>
            </SafeAreaView>
        )
    } 
    return null;
}

export default Profil;

const styles = StyleSheet.create({
    name: { 
        fontFamily: "UberMoveMedium",
        fontSize: 24,
    },
    label: { 
        fontSize: 18,
        color: colors.cookGray,
        paddingBottom: 5,
        paddingTop: 5,
    },
    text: {
        paddingTop: 5,
        paddingBottom: 10,
        fontSize: 18,
    }

})
