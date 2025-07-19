import { IVideo } from "@/types/video";
import tryCatch from "@/utils/try-catch";
import * as FileSystem from "expo-file-system"
import { api } from "../axios";

export class VideosAPI {
    static async uploadVideo(video: IVideo) {
        const videoContent = await FileSystem.readAsStringAsync(video.filepath, {
            encoding: FileSystem.EncodingType.Base64
        });

        const formData = new FormData();
        formData.append("sacrificeId", video.sacrificeId);
        formData.append("video", videoContent);

        const [res, err] = await tryCatch(() => api.post("/sacrifice-video", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }));

        if(err !== null) {
            console.log(err);
            return null;
        }

        return res?.data;
    }
}