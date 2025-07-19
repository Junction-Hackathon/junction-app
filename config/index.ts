import Constants from "expo-constants"

export class Config {
    private static getOrThrow(key: string) {
        const value = Constants.expoConfig?.extra?.[key];
        if(value === undefined) throw new Error("Failed to find env var.");
        return value
    }

    static getBackendAPIURL() {
        return Config.getOrThrow("BACKEND_API_URL");
    }

    static getChatbotAPIURL() {
        return Config.getOrThrow("CHATBOT_API_URL");
    }
}