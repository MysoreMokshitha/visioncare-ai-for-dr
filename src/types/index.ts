export type EyeExamined = 'OD' | 'OS'; // OD = Right Eye, OS = Left Eye

export type DRStageIndex = 0 | 1 | 2 | 3 | 4;

export interface DRStageDefinition {
  index: DRStageIndex;
  code: string;
  name: string;
  shortName: string;
  gradeLabel: string;
  severityLevel: 'None' | 'Low' | 'Moderate' | 'High' | 'Critical';
  referable: boolean;
  referralUrgency: string;
  colorClass: {
    bg: string;
    text: string;
    border: string;
    badge: string;
    progress: string;
  };
  summaryDescription: string;
  clinicalSignificance: string;
  symptoms: string[];
  keyModelExplanation: string;
  recommendedNextSteps: string;
  referralIntervalRecommendation: string;
}

export interface ClassProbability {
  stage: DRStageIndex;
  label: string;
  probability: number; // percentage (0 - 100)
}

export interface ImageQualityMetrics {
  isRetinalLike: boolean;
  resolution: {
    width: number;
    height: number;
  };
  brightness: 'Low' | 'Optimal' | 'High';
  blur: 'Sharp / Clear' | 'Mild Blur' | 'High Blur / Degraded';
  contrast: 'Low' | 'Acceptable' | 'Optimal';
  overallStatus: 'Optimal' | 'Acceptable' | 'Suboptimal' | 'Unsuitable';
  notes: string[];
}

export interface GradCamRegion {
  x: number; // percentage (0-100)
  y: number; // percentage (0-100)
  radius: number; // percentage (0-100)
  intensity: number; // 0.0 - 1.0
  description: string;
}

export interface GradCamVisualizationData {
  heatmapDataUrl: string;
  dominantRegions: GradCamRegion[];
  focusFeature: string;
  attentionSummary: string;
}

export interface PredictionResult {
  screeningId: string;
  patientId: string;
  timestamp: string;
  eye: EyeExamined;
  isDemoMode: boolean;
  predictedStage: DRStageIndex;
  confidence: number; // 0 - 100
  probabilities: ClassProbability[];
  imageQuality: ImageQualityMetrics;
  gradCam: GradCamVisualizationData;
  originalImageUrl: string;
  imageFileName: string;
  imageFileSize: string;
}

export interface PatientProfile {
  id: string; // e.g., 'VC-2026-00004'
  name: string;
  age: number;
  gender: 'Female' | 'Male' | 'Other' | 'Prefer not to say';
  phone?: string;
  address?: string;
  registeredDate: string;
  previousScreeningsCount: number;
}
