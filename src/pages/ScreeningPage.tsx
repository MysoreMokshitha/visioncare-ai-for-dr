import React, { useState, useEffect } from 'react';
import {
  PatientProfile,
  PredictionResult,
  EyeExamined,
  DRStageIndex,
  ImageQualityMetrics,
} from '../types';
import { PatientBar } from '../components/screening/PatientBar';
import { ImageUploadCard } from '../components/screening/ImageUploadCard';
import { ImagePreviewCard } from '../components/screening/ImagePreviewCard';
import { ImageQualityCard } from '../components/screening/ImageQualityCard';
import { ResultOverviewCard } from '../components/screening/ResultOverviewCard';
import { ProbabilityDistributionCard } from '../components/screening/ProbabilityDistributionCard';
import { ExplainableAiCard } from '../components/screening/ExplainableAiCard';
import { HealthGuidanceCard } from '../components/screening/HealthGuidanceCard';
import { VoiceReportCard } from '../components/screening/VoiceReportCard';
import { ScreeningSummaryCard } from '../components/screening/ScreeningSummaryCard';
import { PrintableReport } from '../components/reports/PrintableReport';
import { SAMPLE_SCANS, generateSyntheticRetinalScan } from '../data/sampleScans';
import { validateRetinalImage } from '../services/imageValidationService';
import { runPrediction } from '../services/predictionService';
import { voiceReportService } from '../services/voiceReportService';

interface ScreeningPageProps {
  activePatient: PatientProfile;
  onOpenPatientPortal: () => void;
  onOpenHistoryModal: () => void;
  onRecordCreated: (record: PredictionResult) => void;
  currentResult: PredictionResult | null;
  setCurrentResult: (result: PredictionResult | null) => void;
}

export const ScreeningPage: React.FC<ScreeningPageProps> = ({
  activePatient,
  onOpenPatientPortal,
  onOpenHistoryModal,
  onRecordCreated,
  currentResult,
  setCurrentResult,
}) => {
  const [selectedEye, setSelectedEye] = useState<EyeExamined>('OD');
  const [selectedPresetStage, setSelectedPresetStage] = useState<DRStageIndex | null>(3);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [autoPlayVoice, setAutoPlayVoice] = useState(false);

  // Current image state
  const [currentImageUrl, setCurrentImageUrl] = useState<string>('');
  const [currentFileName, setCurrentFileName] = useState<string>('0cb14014117d.png');
  const [currentFileSize, setCurrentFileSize] = useState<string>('66.6 KB');
  const [currentQualityMetrics, setCurrentQualityMetrics] = useState<ImageQualityMetrics>({
    isRetinalLike: true,
    resolution: { width: 224, height: 224 },
    brightness: 'Optimal',
    blur: 'Sharp / Clear',
    contrast: 'Acceptable',
    overallStatus: 'Acceptable',
    notes: ['Low contrast between retinal vessels and fundus background.'],
  });

  // Initialize with default Severe DR sample (matching Screenshots 4 & 5) if no result exists yet
  useEffect(() => {
    if (!currentResult && typeof document !== 'undefined') {
      const generated = generateSyntheticRetinalScan(3, 300);
      setCurrentImageUrl(generated.fundusUrl);

      // Run initial default analysis matching screenshot
      runPrediction({
        patientId: activePatient.id,
        eye: selectedEye,
        imageFileName: '0cb14014117d.png',
        imageFileSize: '66.6 KB',
        imageUrl: generated.fundusUrl,
        imageQuality: currentQualityMetrics,
        forcedStage: 3,
      }).then((initialResult) => {
        setCurrentResult(initialResult);
      });
    }
  }, []);

  // Update result if active patient changes
  useEffect(() => {
    if (currentResult && currentResult.patientId !== activePatient.id) {
      setCurrentResult({
        ...currentResult,
        patientId: activePatient.id,
      });
    }
  }, [activePatient.id]);

  // Handle preset test chip selection (0 - 4)
  const handleSelectPreset = async (stage: DRStageIndex) => {
    setSelectedPresetStage(stage);
    const sample = SAMPLE_SCANS[stage];
    setCurrentFileName(sample.fileName);
    setCurrentFileSize(sample.fileSize);

    const generated = generateSyntheticRetinalScan(stage, 300);
    setCurrentImageUrl(generated.fundusUrl);

    const updatedQuality: ImageQualityMetrics = {
      isRetinalLike: true,
      resolution: { width: 224, height: 224 },
      brightness: 'Optimal',
      blur: 'Sharp / Clear',
      contrast: stage === 3 ? 'Acceptable' : 'Optimal',
      overallStatus: 'Acceptable',
      notes: stage === 3 ? ['Low contrast between retinal vessels and fundus background.'] : [],
    };
    setCurrentQualityMetrics(updatedQuality);

    // Auto-analyze upon selecting preset
    setIsAnalyzing(true);
    try {
      const result = await runPrediction({
        patientId: activePatient.id,
        eye: selectedEye,
        imageFileName: sample.fileName,
        imageFileSize: sample.fileSize,
        imageUrl: generated.fundusUrl,
        imageQuality: updatedQuality,
        forcedStage: stage,
      });
      setCurrentResult(result);
      onRecordCreated(result);

      if (autoPlayVoice) {
        voiceReportService.speak(result);
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Handle uploaded user image file
  const handleFileSelected = async (file: File) => {
    setSelectedPresetStage(null);
    setCurrentFileName(file.name);
    setCurrentFileSize(`${(file.size / 1024).toFixed(1)} KB`);

    try {
      const validated = await validateRetinalImage(file);
      setCurrentImageUrl(validated.previewUrl);
      setCurrentQualityMetrics(validated.metrics);

      // Trigger analysis
      handleAnalyzeImage(validated.previewUrl, file.name, `${(file.size / 1024).toFixed(1)} KB`, validated.metrics);
    } catch (err) {
      console.error('Image analysis error:', err);
    }
  };

  // Perform analysis execution
  const handleAnalyzeImage = async (
    imgUrl = currentImageUrl,
    fName = currentFileName,
    fSize = currentFileSize,
    qMetrics = currentQualityMetrics
  ) => {
    setIsAnalyzing(true);
    try {
      const result = await runPrediction({
        patientId: activePatient.id,
        eye: selectedEye,
        imageFileName: fName,
        imageFileSize: fSize,
        imageUrl: imgUrl,
        imageQuality: qMetrics,
        forcedStage: selectedPresetStage ?? undefined,
      });

      setCurrentResult(result);
      onRecordCreated(result);

      if (autoPlayVoice) {
        voiceReportService.speak(result);
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleResetScreening = () => {
    handleSelectPreset(0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Top Banner matching Screenshot 4 */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wider">
          <span>AI SCREENING MODULE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Diabetic Retinopathy Screening
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Upload a clear retinal fundus image for AI-assisted analysis.
        </p>
      </div>

      {/* Active Patient Bar matching Screenshot 4 */}
      <PatientBar
        patient={activePatient}
        selectedEye={selectedEye}
        onSelectEye={(eye) => {
          setSelectedEye(eye);
          if (currentResult) {
            setCurrentResult({ ...currentResult, eye });
          }
        }}
        onOpenHistory={onOpenHistoryModal}
        onSwitchPatient={onOpenPatientPortal}
      />

      {/* TWO-COLUMN LAYOUT matching Screenshots 4, 5, 6, 7, 8 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Upload, Preview, Image Quality */}
        <div className="lg:col-span-5 space-y-6">
          {/* Upload Card */}
          <ImageUploadCard
            onFileSelected={handleFileSelected}
            onSelectSamplePreset={handleSelectPreset}
            selectedPresetStage={selectedPresetStage}
          />

          {/* Retinal Image Preview Card */}
          <ImagePreviewCard
            imageUrl={currentImageUrl}
            fileName={currentFileName}
            fileSize={currentFileSize}
            imageQuality={currentQualityMetrics}
            isAnalyzing={isAnalyzing}
            onAnalyze={() => handleAnalyzeImage()}
            onChangeImage={() => handleSelectPreset(selectedPresetStage === 3 ? 2 : 3)}
          />

          {/* Image Quality Check Card */}
          <ImageQualityCard metrics={currentQualityMetrics} />
        </div>

        {/* RIGHT COLUMN: AI Screening Result, Confidence, Grad-CAM++, Health Guidance, Voice, Summary */}
        <div className="lg:col-span-7 space-y-6">
          {currentResult ? (
            <>
              {/* 1. Result Overview (Stage, KPI stats, 5-stage progression) */}
              <ResultOverviewCard
                stageIndex={currentResult.predictedStage}
                confidence={currentResult.confidence}
              />

              {/* 2. Probability Distribution */}
              <ProbabilityDistributionCard
                probabilities={currentResult.probabilities}
                predictedStage={currentResult.predictedStage}
              />

              {/* 3. Explainable AI (Side-by-Side Grad-CAM++ with opacity slider) */}
              <ExplainableAiCard
                originalImageUrl={currentResult.originalImageUrl}
                gradCam={currentResult.gradCam}
              />

              {/* 4. AI Health Guidance */}
              <HealthGuidanceCard stageIndex={currentResult.predictedStage} />

              {/* 5. AI Voice Report */}
              <VoiceReportCard
                result={currentResult}
                autoPlayVoice={autoPlayVoice}
                onToggleAutoPlay={setAutoPlayVoice}
              />

              {/* 6. AI Screening Summary & PDF Export Actions */}
              <ScreeningSummaryCard
                result={currentResult}
                patient={activePatient}
                onNewScreening={handleResetScreening}
                onPrintReport={() => setShowPrintModal(true)}
              />
            </>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-400">
              <p className="text-sm font-semibold text-slate-600">
                Awaiting Retinal Image Analysis
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Select a verified scan preset or upload a fundus photograph to inspect 5-class predictions and Grad-CAM++ saliency.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Printable Report Modal matching Screenshot 14 */}
      {showPrintModal && currentResult && (
        <PrintableReport
          result={currentResult}
          patient={activePatient}
          onClose={() => setShowPrintModal(false)}
        />
      )}
    </div>
  );
};
