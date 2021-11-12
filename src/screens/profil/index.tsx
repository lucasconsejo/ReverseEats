import React from "react"
import { Text, View, StyleSheet, StatusBar, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ScreenProps } from "../../types/props.types"
import { clearCacheUser } from "../../cache/user";
import { colors } from "../../theme/colors";
import Button from "../../theme/buttons";
import useUser from "../../hooks/useUser";
import Profile from "../../assets/img/Profile.svg";


const Profil: React.FC<ScreenProps> = ({ navigation }) => {
    const [user, userDispatch] = useUser();

    const logout = () => {
        clearCacheUser();
        userDispatch({ type: "REMOVE_USER" });
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
    const roleNotNull = () => {
        if(user!.role !== null) {
            if(user!.role == "customer"){
            return (
                <View>
                    <Text style={styles.label}>Role</Text>
                    <Text style={styles.text}>Client</Text>
                </View>
            );
            } else {
                return (
                    <View>
                        <Text style={styles.label}>Role</Text>
                        <Text style={styles.text}>Cuisinier</Text>
                    </View>
                );
            }
        }
    }

    if (user) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.white}}>
                <StatusBar backgroundColor={colors.white} barStyle="dark-content" />

                <View style={{ marginHorizontal: 30, marginTop: 80}}>
                    <View style={{alignItems: "center"}}>
                        <Profile style={{ marginBottom: 20 }}/>
                        <Text style={styles.name}>{user!.firstName} {user!.lastName}</Text>
                        <Button 
                            theme="secondary" 
                            title="Modifier le profil" 
                            style={{ backgroundColor: colors.white, marginBottom: 40 }} 
                            onPress={() => console.log("modifier le profil")} />
                    </View>
                
                    {emailNotNull()}  
                    {adressNotNull()}
                    {roleNotNull()}

                    <Button 
                        theme="secondaryLeft" 
                        title="Se déconnecter" 
                        style={{ backgroundColor: colors.white, marginTop: 30, marginBottom: 60 }} 
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
