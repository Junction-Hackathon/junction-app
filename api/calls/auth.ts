import { api } from "../axios";
import { LoginUserRequestData, LoginUserResponseData } from "../types/auth";

export class AuthAPI {
    static async loginUser(loginUserData: LoginUserRequestData) {
        const res = await api.post<LoginUserResponseData>("/authentication/login", loginUserData);
        return res.data;
    }
}