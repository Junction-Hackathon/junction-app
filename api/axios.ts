import { Config } from "@/config"
import { STORAGE_KEYS } from "@/constants/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"

export const api = axios.create({
    baseURL: Config.getAPIURL() 
});

api.interceptors.request.use(async (config) => {
    const accessToken = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if(accessToken === null) return config;
    const authHeader =  `Bearer ${accessToken.replaceAll("\"", "")}`;
    config.headers["Authorization"] = authHeader;
    return config;
})