import axios from "axios";
import { api } from "../axios";
import { Config } from "@/config";

export class ChatBotAPI {
    static async ask(question: string) {
        const baseURL = Config.getChatbotAPIURL();
        const route = `${baseURL}/ask`;
        const res = await axios.post<{ answer: string }>(route, { question }, {
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        });
        return res.data;
    }
}