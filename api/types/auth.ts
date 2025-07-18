import { User } from "@/types/user";

export type LoginUserRequestData = {
    email: string;
    password: string;
}

export type LoginUserResponseData = {
    ok: boolean;
    value: {
       accessToken: string;
       refreshToken: string;
       user: User; 
    }
}