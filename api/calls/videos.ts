import * as FileSystem from "expo-file-system"

export class VideosAPI {
    static async uploadVideo(uri: string) {
        const videoData = await FileSystem.readAsStringAsync(uri);
        console.log(videoData);
        return;
    }
}