import React from 'react';
import { X, Printer, ArrowLeft } from 'lucide-react';
import { PatientProfile, PredictionResult } from '../../types';
import { DR_STAGES } from '../../data/diseaseInformation';

interface PrintableReportProps {
  result: PredictionResult;
  patient: PatientProfile;
  onClose: () => void;
}

export const PrintableReport: React.FC<PrintableReportProps> = ({
  result,
  patient,
  onClose,
}) => {
  const stage = DR_STAGES[result.predictedStage];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex flex-col items-center p-4 sm:p-6 print:p-0 print:static print:bg-white">
      {/* Top Floating Action Bar (Hidden when printing) */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg border border-slate-200 p-3 mb-4 flex items-center justify-between no-print">
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Screening Station</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report (or Save PDF)</span>
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Printable Sheet (Exact visual replica of Screenshot 14) */}
      <div className="w-full max-w-4xl bg-white shadow-2xl print:shadow-none border border-slate-200 print:border-none p-8 sm:p-12 text-slate-900 rounded-2xl print:rounded-none space-y-6">
        {/* Header matching Screenshot 14 */}
        <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">
              VisionCare AI for DR
            </h1>
            <p className="text-xs font-bold text-teal-700 tracking-wide uppercase mt-0.5">
              AI-Assisted Diabetic Retinopathy Screening Report
            </p>
          </div>

          <div className="text-right text-[11px] text-slate-600 space-y-0.5">
            <p><strong className="text-slate-900">Patient ID:</strong> {patient.id}</p>
            <p><strong className="text-slate-900">Patient Name:</strong> {patient.name}</p>
            <p><strong className="text-slate-900">Age & Gender:</strong> {patient.age} yrs • {patient.gender}</p>
            <p><strong className="text-slate-900">Screening Date:</strong> {new Date(result.timestamp).toLocaleDateString('en-GB')}</p>
            <p><strong className="text-slate-900">Screening Ref:</strong> {result.screeningId}</p>
          </div>
        </div>

        {/* AI Screening Result Banner matching Screenshot 14 */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              AI Screening Result
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
              {stage.name.toUpperCase()}
            </h2>
            <p className="text-xs text-slate-600 font-medium">
              {stage.gradeLabel}
            </p>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Confidence
            </span>
            <p className="text-3xl font-black text-cyan-800 font-mono tracking-tight">
              {result.confidence.toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Class Probability Distribution Table matching Screenshot 14 */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Class Probability Distribution
          </h3>
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-2 px-3">DR Severity Class</th>
                  <th className="py-2 px-3">Confidence Probability</th>
                  <th className="py-2 px-3">Classification Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {result.probabilities.map((item) => {
                  const isDetected = item.stage === result.predictedStage;
                  return (
                    <tr
                      key={item.stage}
                      className={isDetected ? 'bg-cyan-50/70 font-bold text-slate-900' : 'text-slate-600'}
                    >
                      <td className="py-2 px-3">{item.label}</td>
                      <td className="py-2 px-3 font-mono">{item.probability.toFixed(1)}%</td>
                      <td className="py-2 px-3">
                        {isDetected ? (
                          <span className="text-cyan-800 font-bold">★ DETECTED STAGE</span>
                        ) : (
                          '—'
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Retinal Image Analysis matching Screenshot 14 */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            Retinal Image Analysis
          </h3>
          <p className="text-[11px] text-slate-500 mb-3">
            Image Suitability: {result.imageQuality.overallStatus} • Brightness: {result.imageQuality.brightness} • Sharpness: {result.imageQuality.blur} • Resolution: {result.imageQuality.resolution.width} × {result.imageQuality.resolution.height} px
          </p>

          <div className="grid grid-cols-2 gap-6 bg-slate-950 p-4 rounded-xl text-center">
            {/* Original Retinal Fundus Scan */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-bold text-sky-400 mb-2">
                Original Retinal Fundus Scan
              </span>
              <div className="w-48 h-48 rounded-lg overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={result.originalImageUrl}
                  alt="Original Fundus Scan"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Grad-CAM++ Explainability Heatmap */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-bold text-cyan-400 mb-2">
                Grad-CAM++ Explainability Heatmap
              </span>
              <div className="relative w-48 h-48 rounded-lg overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={result.originalImageUrl}
                  alt="Base Fundus Scan"
                  className="absolute inset-0 w-full h-full object-contain"
                />
                <img
                  src={result.gradCam.heatmapDataUrl}
                  alt="Grad-CAM++ Overlay"
                  className="absolute inset-0 w-full h-full object-contain mix-blend-screen opacity-75"
                />
              </div>
            </div>
          </div>
        </div>

        {/* AI Health Guidance matching Screenshot 14 */}
        <div className="space-y-2 border-t border-slate-200 pt-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            AI Health Guidance
          </h3>
          <p className="text-xs text-slate-700 leading-relaxed">
            {stage.summaryDescription}
          </p>
          <p className="text-xs text-slate-700 leading-relaxed">
            <strong>Key Model Explanation:</strong> {stage.keyModelExplanation}
          </p>
          <p className="text-xs font-bold text-red-800">
            Referral Urgency: {stage.referralUrgency}.
          </p>
        </div>

        {/* Clinician Review & Signature */}
        <div className="border-t border-slate-200 pt-6 grid grid-cols-2 gap-8 text-xs text-slate-600">
          <div>
            <p className="font-bold text-slate-900 mb-1">Attending Clinician Review:</p>
            <p>Impression: [ ] Concur [ ] Discordant [ ] Repeat imaging</p>
            <div className="h-10 border-b border-dashed border-slate-300 mt-2" />
            <p className="text-[10px] text-slate-400 mt-1">Clinician Signature / Date</p>
          </div>
          <div>
            <p className="font-bold text-slate-900 mb-1">Clinical Recommendations:</p>
            <p>{stage.recommendedNextSteps}</p>
            <div className="h-10 border-b border-dashed border-slate-300 mt-2" />
            <p className="text-[10px] text-slate-400 mt-1">Hospital / Clinic Stamp</p>
          </div>
        </div>

        {/* Footer Medical Disclaimer matching Screenshot 14 */}
        <div className="border-t border-slate-200 pt-3 text-[10px] text-slate-400 leading-normal">
          <p>
            <strong>Research Notice:</strong> VisionCare AI for DR is an experimental research and educational prototype. It provides image-based screening assistance and does not replace examination or diagnosis by a qualified eye-care professional.
          </p>
        </div>
      </div>
    </div>
  );
};
