import { Config } from "@/config"
import axios from "axios"

export const api = axios.create({
    baseURL: Config.getAPIURL() 
});