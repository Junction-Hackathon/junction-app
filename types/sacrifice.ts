import { User } from "@/types/user";

export type Sacrifice = {
    id: string;
    donor: User;
    createdAt: string;
    updatedAt: string;
    donorId: string;
}