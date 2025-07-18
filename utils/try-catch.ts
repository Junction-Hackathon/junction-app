import { Nullable } from "@/types";

export default async function tryCatch<T>(func: () => Promise<T>): Promise<[ data: Nullable<T>, err: Nullable<Error> ]> {
    try {
        return [await func(), null]
    } catch(err) {
        return [null, err as Error];
    }
}