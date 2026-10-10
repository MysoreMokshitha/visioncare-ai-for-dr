import React, { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
  PlusCircle,
  FileCheck,
  Stethoscope,
  Info,
} from 'lucide-react';
import { PatientProfile, PredictionResult } from '../../types';
import { DR_STAGES } from '../../data/diseaseInformation';
import { generatePdfReport } from '../../services/pdfReportService';

interface ScreeningSummaryCardProps {
  result: PredictionResult;
  patient: PatientProfile;
  onNewScreening: () => void;
  onPrintReport: () => void;
}

export const ScreeningSummaryCard: React.FC<ScreeningSummaryCardProps> = ({
  result,
  patient,
  onNewScreening,
  onPrintReport,
}) => {
  const [reportCaseId, setReportCaseId] = useState(patient.id);
  const stage = DR_STAGES[result.predictedStage];

  const handleDownloadPdf = () => {
    generatePdfReport(result, { ...patient, id: reportCaseId || patient.id });
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-5">
      {/* Header matching Screenshot 8 */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-teal-600" />
            <span>AI Screening Summary</span>
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Clinical decision support & summary
          </p>
        </div>
        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
          Clinical Summary
        </span>
      </div>

      {/* 4-Item Grid matching Screenshot 8 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Predicted Stage
          </p>
          <p className="text-sm font-bold text-slate-900 mt-1">
            {stage.shortName}
          </p>
        </div>

        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Confidence
          </p>
          <p className="text-sm font-bold text-cyan-800 font-mono mt-1">
            {result.confidence.toFixed(1)}%
          </p>
        </div>

        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Image Quality
          </p>
          <p className="text-sm font-bold text-teal-700 mt-1">
            {result.imageQuality.overallStatus}
          </p>
        </div>

        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Referral Urgency
          </p>
          <p className={`text-xs font-bold mt-1 ${stage.referable ? 'text-red-700' : 'text-emerald-700'}`}>
            {stage.referralUrgency}
          </p>
        </div>
      </div>

      {/* Key Model Explanation matching Screenshot 9 */}
      <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1 text-xs">
        <div className="flex items-center gap-1.5 font-bold text-slate-800">
          <FileCheck className="w-3.5 h-3.5 text-cyan-600" />
          <span>Key Model Explanation:</span>
        </div>
        <p className="text-slate-600 leading-relaxed pl-5">
          {stage.keyModelExplanation}
        </p>
      </div>

      {/* Recommended Next Step matching Screenshot 9 */}
      <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1 text-xs">
        <div className="flex items-center gap-1.5 font-bold text-slate-800">
          <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
          <span>Recommended Next Step:</span>
        </div>
        <p className="text-slate-600 leading-relaxed pl-5">
          {stage.recommendedNextSteps}
        </p>
      </div>

      {/* Optional Case ID Input matching Screenshot 9 */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Optional Case / Patient ID for Report:
        </label>
        <input
          type="text"
          value={reportCaseId}
          onChange={(e) => setReportCaseId(e.target.value)}
          placeholder="VC-2026-00004"
          className="w-full px-3.5 py-2 text-xs font-mono font-medium rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-cyan-500 bg-white"
        />
      </div>

      {/* Actions: Download PDF + Print + New Screening */}
      <div className="flex flex-wrap items-center gap-2.5 pt-2">
        <button
          onClick={handleDownloadPdf}
          className="flex-1 min-w-[200px] py-2.5 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-600 text-white font-bold text-xs shadow-md shadow-sky-500/20 hover:from-sky-600 hover:to-cyan-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Download AI Screening Report</span>
        </button>

        <button
          onClick={onPrintReport}
          className="py-2.5 px-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 hover:border-slate-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Printer className="w-4 h-4 text-slate-500" />
          <span>Print Report</span>
        </button>

        <button
          onClick={onNewScreening}
          className="py-2.5 px-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 hover:border-slate-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4 text-cyan-600" />
          <span>New Screening</span>
        </button>
      </div>

      {/* Disclaimer Notice matching Screenshot 9 */}
      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2 text-[11px] text-slate-500 leading-relaxed">
        <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
        <p>
          VisionCare AI for DR is an AI research and educational prototype. It provides image-based screening assistance and does not replace examination or diagnosis by a qualified ophthalmologist.
        </p>
      </div>
    </div>
  );
};
