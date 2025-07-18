export type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    phoneNumber: string;
    createdAt: string;
    updatedAt: string;
}

export enum UserRole {
    DONOR = "DONOR",
    DABAH = "DBA7",
    ORGANIZER = "ORGANIZER"
}