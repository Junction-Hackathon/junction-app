import { api } from "../axios";
import { LoginUserRequestData, LoginUserResponseData, RegisterUserData, RegisterUserResponseData } from "../types/auth";

export class AuthAPI {
    static async loginUser(loginUserData: LoginUserRequestData) {
        const res = await api.post<LoginUserResponseData>("/authentication/login", loginUserData);
        return res.data;
    }

    static async registerUser(registerUserData: RegisterUserData) {
        const res = await api.post<RegisterUserResponseData>("/authentication/register", registerUserData);
        return res.data;
    }
}