import { User, UserRole } from "@/types/user";

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

export type RegisterUserData = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    role: UserRole;
}

export type RegisterUserResponseData = {
    ok: boolean;
    value: {
        accessToken: string;
        refreshToken: string;
        user: User;
    }
}