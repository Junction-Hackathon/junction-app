import { useCallback, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import { ENV_KEYS } from "@/constants/env";
import { dbManager } from "@/db";
import { Nullable } from "@/types";
import tryCatch from "@/utils/try-catch";
import { IVideo } from "@/types/video";
import { useNetInfo } from "@react-native-community/netinfo";

const SYNC_INTERVAL_MS = 10 * 60 * 1000; // 10 minutes

export const useVideoSyncer = () => {
  const [shouldSync, setShouldSync] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<Nullable<Error>>(null);
  const [lastSync, setLastSync] = useState<Nullable<Date>>(null);
  const state = useNetInfo();

  const checkShouldSync = useCallback(async () => {
    const lastSyncStr = await AsyncStorage.getItem(ENV_KEYS.LAST_SYNC_KEY);
    const lastSync = lastSyncStr ? parseInt(lastSyncStr, 10) : 0;
    const now = Date.now();
    setShouldSync(now - lastSync > SYNC_INTERVAL_MS);
  }, []);

  const sync = useCallback(async () => {
    if(!state.isConnected) return;

    setError(null);
    const [pendingVideos, err] = await tryCatch(() => dbManager.getPendingVideos());

    if (!pendingVideos || err) return setError(err);
    if (pendingVideos.length === 0) return;

    setIsUploading(true);
    const destDir = ENV_KEYS.VIDEO_UPLOAD_DIRECTORY;

    for (const video of pendingVideos as IVideo[]) {
      const filename = video.filepath.split("/").pop();
      const destPath = `${destDir}/${filename}`;

      const [_, copyErr] = await tryCatch(() =>
        FileSystem.copyAsync({ from: video.filepath, to: destPath })
      );

      if (copyErr) {
        console.error("Copy failed for", video.filepath);
        continue;
      }

      await dbManager.markAsSynced(video.filepath);
    }

    setLastSync(new Date());
    await AsyncStorage.setItem(ENV_KEYS.LAST_SYNC_KEY, Date.now().toString());
    setIsUploading(false);
    setShouldSync(false);
  }, []);

  const notSynced = () => setShouldSync(true);

  useEffect(() => {
    checkShouldSync();
  }, [checkShouldSync]);

  return { shouldSync, sync, isUploading, error, notSynced, state, lastSync };
};
