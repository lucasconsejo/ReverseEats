import { useEffect, useState } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'

const useCachedResources = () => {
    const [isLoadingComplete, setIsLoadingComplete] = useState(false)

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
                SplashScreen.hideAsync()
                setIsLoadingComplete(true)
            }
        }
        loadDataAndResourcesAsync()
    }, [])

    return isLoadingComplete
}

export default useCachedResources
 