import { useEffect, useState } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import { StatusBar } from 'react-native'

const useCachedResources = () => {
    const [isLoadingComplete, setIsLoadingComplete] = useState(false)

    StatusBar.setBarStyle("light-content");

    useEffect(() => {
        const loadDataAndResourcesAsync = async () => {
            try {
                SplashScreen.preventAutoHideAsync()
                await Font.loadAsync({
                    UberMoveMedium: require('../assets/fonts/UberMoveMedium.otf'),
                    UberMoveBold: require('../assets/fonts/UberMoveBold.otf'),
                });
                await new Promise(resolve => setTimeout(resolve, 1500));
            } catch (e) {
                console.warn(e)
            } finally {
                StatusBar.setBarStyle("dark-content");
                SplashScreen.hideAsync()
                setIsLoadingComplete(true)
            }
        }
        loadDataAndResourcesAsync()
    }, [])

    return isLoadingComplete
}

export default useCachedResources
 