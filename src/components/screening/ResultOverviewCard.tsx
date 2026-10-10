import React from 'react';
import { DRStageIndex } from '../../types';
import { DR_STAGES } from '../../data/diseaseInformation';
import { BookOpen, AlertCircle, ArrowRight } from 'lucide-react';

interface ResultOverviewCardProps {
  stageIndex: DRStageIndex;
  confidence: number;
}

export const ResultOverviewCard: React.FC<ResultOverviewCardProps> = ({
  stageIndex,
  confidence,
}) => {
  const stage = DR_STAGES[stageIndex];
  const isReferable = stage.referable;

  const progressionStages: DRStageIndex[] = [0, 1, 2, 3, 4];

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-6">
      {/* Header & Badges */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-700">
            AI Screening Result
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
            {stage.shortName}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold border ${
              isReferable
                ? 'bg-amber-50 text-amber-900 border-amber-300'
                : 'bg-emerald-50 text-emerald-800 border-emerald-300'
            }`}
          >
            {isReferable ? 'High-Risk Referable DR' : 'Non-Referable Routine Review'}
          </span>
        </div>
      </div>

      {/* 3 KPI Stats Grid matching Screenshot 4 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {/* Detected Stage */}
        <div className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-100">
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
            Detected Stage
          </p>
          <p className="text-base font-extrabold text-cyan-800 mt-1 tracking-tight">
            {stage.code.toUpperCase()}
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
            {stage.gradeLabel}
          </p>
        </div>

        {/* Confidence */}
        <div className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-100">
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
            Confidence
          </p>
          <p className="text-xl font-extrabold text-slate-900 mt-1 tracking-tight">
            {confidence.toFixed(1)}%
          </p>
          <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-cyan-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, confidence)}%` }}
            />
          </div>
        </div>

        {/* Severity */}
        <div className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-100">
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
            Severity
          </p>
          <p
            className={`text-base font-extrabold mt-1 tracking-tight ${
              stage.severityLevel === 'Critical'
                ? 'text-rose-700'
                : stage.severityLevel === 'High'
                ? 'text-orange-700'
                : stage.severityLevel === 'Moderate'
                ? 'text-amber-700'
                : 'text-teal-700'
            }`}
          >
            {stage.severityLevel.toUpperCase()}
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {stage.referralUrgency}
          </p>
        </div>
      </div>

      {/* Severity Progression Steps matching Screenshot 4 */}
      <div className="space-y-2">
        <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
          Severity Progression:
        </p>

        <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
          {progressionStages.map((idx) => {
            const stepDef = DR_STAGES[idx];
            const isCurrent = idx === stageIndex;

            return (
              <div
                key={idx}
                className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all ${
                  isCurrent
                    ? 'bg-cyan-50 border-cyan-400 ring-2 ring-cyan-500 shadow-xs'
                    : 'bg-white border-slate-200 opacity-70'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mb-1 ${
                    isCurrent
                      ? 'bg-cyan-600 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {idx}
                </div>
                <span
                  className={`text-[10px] sm:text-xs leading-tight ${
                    isCurrent ? 'font-bold text-cyan-900' : 'text-slate-500'
                  }`}
                >
                  {stepDef.shortName}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* "What does this stage mean?" Card */}
      <div className="bg-sky-50/70 rounded-xl p-4 border border-sky-100 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-sky-900">
          <BookOpen className="w-4 h-4 text-sky-600" />
          <span>What does this stage mean?</span>
        </div>
        <p className="text-xs text-sky-950 leading-relaxed">
          {stage.summaryDescription}
        </p>
        <div className="flex items-center gap-1.5 pt-1 text-[11px] text-sky-700">
          <AlertCircle className="w-3.5 h-3.5 text-sky-600 shrink-0" />
          <span>Notice: AI screening result only — this does not confirm a clinical diagnosis.</span>
        </div>
      </div>
    </div>
  );
};
