import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  ArrowLeft,
  Video,
  Square,
  RotateCcw,
  Check,
} from "lucide-react-native";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { View, Button, StyleSheet, Text, TouchableOpacity } from "react-native";
import {
  CameraType,
  CameraView,
  useCameraPermissions,
  useMicrophonePermissions,
} from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Nullable } from "@/types";
import CameraPermissionDialogBox from "@/components/CameraPermissionDialogBox";
import NetInfo from "@react-native-community/netinfo";
import { dbManager } from "@/db";
import { useVideoSyncer } from "@/hooks/useVideoSyncer";
import { videoStorage, VideoStorageManager } from "@/video-storage";
import { API } from "@/api";
import { IVideo } from "@/types/video";
import Toast from "react-native-toast-message";

export default function CameraRecorder() {
  const router = useRouter();

  const { sacrificeId } = useLocalSearchParams();

  const [success, setSuccess] = useState<Nullable<boolean>>(null);

  const [facing, setFacing] = useState<CameraType>("back");
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState<Nullable<string>>(null);
  const cameraRef = useRef<Nullable<CameraView>>(null);

  const [micPermission, requestMicrophonePermission] =
    useMicrophonePermissions();

  const [mediaPermission, setMediaPermission] =
    useState<Nullable<boolean>>(null);

  const { state, notSynced } = useVideoSyncer();

  const getPermissions = useCallback(async () => {
    const mediaStatus = await MediaLibrary.requestPermissionsAsync();
    setMediaPermission(mediaStatus.status === "granted");
    await requestCameraPermission();
    await requestMicrophonePermission();
  }, [micPermission, cameraPermission]);

  useEffect(() => {
    getPermissions();
  }, []);

  const startRecording = async () => {
    if (!cameraRef.current || isRecording) return;

    setSuccess(null);
    setIsRecording(true);

    const video = await cameraRef.current.recordAsync();
    if (!video || !video.uri) return;

    setRecordedVideo(video.uri);

    // save the file in the storage
    await MediaLibrary.saveToLibraryAsync(video.uri);

    return video.uri;
  };

  const saveVideo = async () => {
    if (recordedVideo === null) return;

    const saveOnDb = async (video: IVideo) => {
      notSynced();
      await dbManager.saveVideo(video);
      setSuccess(true);
    };

    const saveOnServer = async (video: IVideo) => {
      await API.Videos.uploadVideo(video);
      setSuccess(true);
    };

    if (sacrificeId === undefined) return;

    if (state.isConnected) {
      await saveOnServer({
        filepath: recordedVideo,
        sacrificeId: sacrificeId as string,
      });
      setRecordedVideo(null);
      return console.log("Saved...");
    }

    const video = await videoStorage.saveVideoLocally(
      recordedVideo,
      sacrificeId as string
    );

    await saveOnDb(video);
    setRecordedVideo(null);

    console.log("Saved...");
  };

  const stopRecording = () => {
    if (cameraRef.current && isRecording) {
      cameraRef.current.stopRecording();
      setIsRecording(false);
    }
  };

  const retakeVideo = () => {
    setRecordedVideo(null);
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  useEffect(() => {
    if (success === true) {
      Toast.show({
        text1: "Video uploaded successfully.",
      });
    }
  }, [success]);

  if (!cameraPermission || !micPermission || mediaPermission === null) {
    return (
      <View>
        <Text>Loading permissions...</Text>
      </View>
    );
  }

  if (!cameraPermission.granted) {
    return (
      <CameraPermissionDialogBox
        requestCameraPermission={requestCameraPermission}
      />
    );
  }

  if (!micPermission.granted) {
    return (
      <View>
        <Text>Microphone permission is required</Text>
        <Button
          title="Grant Permission"
          onPress={requestMicrophonePermission}
        />
      </View>
    );
  }

  if (!mediaPermission) {
    return (
      <View>
        <Text>Media library permission is required to save videos</Text>
      </View>
    );
  }

  if (recordedVideo) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Video Recorded</Text>
        </View>

        <View style={styles.previewContainer}>
          <Text style={styles.previewText}>Video recorded successfully!</Text>
          <Text style={styles.previewSubtext}>
            The video will be uploaded automatically when internet connection is
            available.
          </Text>
        </View>

        <View style={styles.previewActions}>
          <TouchableOpacity style={styles.retakeButton} onPress={retakeVideo}>
            <RotateCcw size={20} color="#F59E0B" />
            <Text style={styles.retakeText}>Retake</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={saveVideo}>
            <Check size={20} color="#FFFFFF" />
            <Text style={styles.saveText}>Save Video</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Record Sacrifice</Text>
      </View>

      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsTitle}>
          بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
        </Text>
        <Text style={styles.instructionsText}>
          Please record the complete sacrifice process clearly
        </Text>
      </View>

      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
        mode="video"
      >
        <View style={styles.cameraOverlay}>
          <TouchableOpacity
            style={styles.flipButton}
            onPress={toggleCameraFacing}
          >
            <RotateCcw size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.recordingControls}>
          {isRecording && (
            <View style={styles.recordingIndicator}>
              <View style={styles.recordingDot} />
              <Text style={styles.recordingText}>Recording...</Text>
            </View>
          )}

          <TouchableOpacity
            style={[
              styles.recordButton,
              isRecording && styles.recordButtonActive,
            ]}
            onPress={isRecording ? stopRecording : startRecording}
          >
            {isRecording ? (
              <Square size={32} color="#FFFFFF" fill="#FFFFFF" />
            ) : (
              <Video size={32} color="#FFFFFF" />
            )}
          </TouchableOpacity>
        </View>
      </CameraView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#065F46",
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  instructionsContainer: {
    backgroundColor: "#065F46",
    padding: 20,
    alignItems: "center",
  },
  instructionsTitle: {
    fontSize: 18,
    color: "#F59E0B",
    fontWeight: "600",
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 14,
    color: "#A7F3D0",
    textAlign: "center",
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  flipButton: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 25,
    padding: 10,
  },
  recordingControls: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  recordingIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 20,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EF4444",
    marginRight: 8,
  },
  recordingText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  recordButton: {
    backgroundColor: "#F59E0B",
    borderRadius: 40,
    padding: 20,
  },
  recordButtonActive: {
    backgroundColor: "#EF4444",
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 16,
    textAlign: "center",
  },
  permissionText: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
  },
  permissionButton: {
    backgroundColor: "#F59E0B",
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  permissionButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  previewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F8FAFC",
  },
  previewText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#065F46",
    marginBottom: 12,
    textAlign: "center",
  },
  previewSubtext: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 24,
  },
  previewActions: {
    flexDirection: "row",
    padding: 20,
    gap: 12,
    backgroundColor: "#F8FAFC",
  },
  retakeButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: "#F59E0B",
  },
  retakeText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#F59E0B",
  },
  saveButton: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#10B981",
    borderRadius: 12,
    paddingVertical: 16,
  },
  saveText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
