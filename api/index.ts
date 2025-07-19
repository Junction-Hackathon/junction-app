import { AuthAPI } from "./calls/auth";
import { SacrificesAPI } from "./calls/sacrifices";
import { VideosAPI } from "./calls/videos";

export class API {
    static Auth = AuthAPI;
    static Videos = VideosAPI;
    static Sacrifices = SacrificesAPI
}