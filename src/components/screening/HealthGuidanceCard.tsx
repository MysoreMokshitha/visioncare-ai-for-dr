import React from 'react';
import { HeartPulse, AlertTriangle, Stethoscope, ShieldCheck, Info } from 'lucide-react';
import { DRStageIndex } from '../../types';
import { DR_STAGES } from '../../data/diseaseInformation';

interface HealthGuidanceCardProps {
  stageIndex: DRStageIndex;
}

export const HealthGuidanceCard: React.FC<HealthGuidanceCardProps> = ({ stageIndex }) => {
  const stage = DR_STAGES[stageIndex];
  const isHighRisk = stage.referable;

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
      {/* Header matching Screenshot 7 */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-teal-600" />
            <span>AI Health Guidance</span>
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Stage-specific educational symptom information & clinical guidance
          </p>
        </div>
        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
          Educational Guidance
        </span>
      </div>

      {/* Educational Symptom Context */}
      <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5 text-xs text-slate-700">
        <div className="flex items-center gap-1.5 font-bold text-slate-900">
          <Info className="w-3.5 h-3.5 text-cyan-600" />
          <span>Educational Symptom Context for {stage.shortName} :</span>
        </div>
        <ul className="list-disc list-inside space-y-0.5 text-slate-600 pl-1">
          {stage.symptoms.map((symptom, idx) => (
            <li key={idx} className="leading-relaxed">
              {symptom}
            </li>
          ))}
        </ul>
      </div>

      {/* Urgency Alert Box matching Screenshot 7 */}
      <div
        className={`p-4 rounded-xl border flex items-start gap-3 text-xs ${
          isHighRisk
            ? 'bg-red-50/80 border-red-200 text-red-950'
            : 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
        }`}
      >
        <AlertTriangle
          className={`w-5 h-5 shrink-0 mt-0.5 ${
            isHighRisk ? 'text-red-600' : 'text-emerald-600'
          }`}
        />
        <div>
          <h5 className="font-bold text-sm tracking-tight mb-0.5">
            {isHighRisk
              ? 'Prompt ophthalmic evaluation is recommended.'
              : 'Routine preventive diabetic eye monitoring.'}
          </h5>
          <p className="leading-relaxed">
            {stage.recommendedNextSteps} Referral timeframe: {stage.referralIntervalRecommendation}.
          </p>
        </div>
      </div>

      {/* Doctor Consultation & Diagnostic Notices */}
      <div className="space-y-2 text-xs text-slate-600">
        <div className="flex items-start gap-2">
          <Stethoscope className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-slate-800">Doctor Consultation Notice:</strong> When any of these visual symptoms are noticed, especially if they are new, worsening, or sudden, consult an eye-care professional promptly.
          </p>
        </div>

        <div className="flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-slate-800">Diagnostic Notice:</strong> Symptoms alone cannot confirm diabetic retinopathy. A retinal examination and professional evaluation are required for diagnosis.
          </p>
        </div>
      </div>
    </div>
  );
};
