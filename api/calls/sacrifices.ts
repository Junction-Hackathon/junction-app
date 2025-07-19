import { Sacrifice } from "@/types/sacrifice";
import { api } from "../axios";

export class SacrificesAPI {
    static async fetchSacrifices() {
        const res = await api.get<Sacrifice[]>("/sacrifice");
        return res.data;
    }
}