import { AuthAPI } from "./calls/auth";
import { VideosAPI } from "./calls/videos";

export class API {
    static Auth = AuthAPI;
    static Videos = VideosAPI
}