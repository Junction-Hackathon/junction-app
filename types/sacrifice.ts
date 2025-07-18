export interface Donor {
  id: string;
  name: string;
  email: string;
  phone: string;
  sheepId: string;
  sacrificeType: 'goat' | 'sheep' | 'cow_share';
  amount: number;
  notes?: string;
  region: string;
  address: string;
}

export interface SacrificeVideo {
  id: string;
  donorId: string;
  localPath: string;
  uploadedUrl?: string;
  status: 'recorded' | 'uploading' | 'processing' | 'completed' | 'failed';
  recordedAt: string;
  uploadedAt?: string;
  processedAt?: string;
  blurredUrl?: string;
  originalUrl?: string;
  aiVerified?: boolean;
  metadata?: {
    duration: number;
    size: number;
    quality: string;
  };
}

export interface OfflineQueue {
  id: string;
  type: 'video_upload' | 'status_update';
  data: any;
  createdAt: string;
  retryCount: number;
}