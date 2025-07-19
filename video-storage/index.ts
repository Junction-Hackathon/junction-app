import { IVideo } from '@/types/video';
import * as FileSystem from 'expo-file-system';

export class VideoStorageManager {
  private videoDir: string;

  constructor() {
    this.videoDir = "app-videos";
  }

  async init() {
    await FileSystem.makeDirectoryAsync(this.videoDir, { intermediates: true });
    return this;
  }

  async saveVideoLocally(videoUri: string, sacrificeId?: string): Promise<IVideo> {
    try {
      const timestamp = Date.now();
      const filename = `video_${sacrificeId}_${timestamp}.mp4`;
      const filepath = `${this.videoDir}${filename}`;

      console.log(`Saving video from ${videoUri} to ${filepath}`);

      await FileSystem.copyAsync({
        from: videoUri,
        to: filepath
      });
      
      const savedVideo: IVideo = {
        filepath,
        sacrificeId: sacrificeId ?? ""
      };

      console.log("Video saved locally:", savedVideo);
      return savedVideo;

    } catch (error) {
      console.error("Error saving video locally:", error);
      throw error;
    }
  }

  // /**
  //  * Delete local video file and DB record (after successful upload)
  //  */
  // async deleteUploadedVideo(videoId: number): Promise<void> {
  //   try {
  //     // Get video info first
  //     const video = await this.db.getFirstAsync(
  //       'SELECT * FROM videos WHERE id = ?', 
  //       videoId
  //     ) as any;

  //     if (!video) {
  //       console.warn(`Video with id ${videoId} not found in database`);
  //       return;
  //     }

  //     // Delete physical file
  //     const fileExists = await FileSystem.getInfoAsync(video.file_path);
  //     if (fileExists.exists) {
  //       await FileSystem.deleteAsync(video.file_path);
  //       console.log(`Deleted video file: ${video.file_path}`);
  //     }

  //     // Delete database record
  //     await this.db.runAsync('DELETE FROM videos WHERE id = ?', videoId);
  //     console.log(`Deleted video record: ${videoId}`);

  //   } catch (error) {
  //     console.error(`Error deleting video ${videoId}:`, error);
  //     throw error;
  //   }
  // }
}

export const videoStorage = new VideoStorageManager();