import AsyncStorage from '@react-native-async-storage/async-storage'
import { User } from '../types/global.types';

export const setCacheUser = (user : User) => {
    AsyncStorage.setItem("user", JSON.stringify(user));
}

export const getCacheUser = async () => {
    return await AsyncStorage.getItem("user");
}

export const clearCacheUser = () => {
    return AsyncStorage.removeItem("user");
}
