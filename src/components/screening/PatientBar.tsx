import React from 'react';
import { User, History, ArrowRightLeft } from 'lucide-react';
import { EyeExamined, PatientProfile } from '../../types';

interface PatientBarProps {
  patient: PatientProfile;
  selectedEye: EyeExamined;
  onSelectEye: (eye: EyeExamined) => void;
  onOpenHistory: () => void;
  onSwitchPatient: () => void;
}

export const PatientBar: React.FC<PatientBarProps> = ({
  patient,
  selectedEye,
  onSelectEye,
  onOpenHistory,
  onSwitchPatient,
}) => {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
      {/* Patient Info */}
      <div className="flex items-start sm:items-center gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center shrink-0">
          <User className="w-5 h-5" />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              {patient.name}
            </h3>
            <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-cyan-50 border border-cyan-200 text-cyan-800 font-semibold">
              {patient.id}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Age: {patient.age} yrs • Gender: {patient.gender} • Screenings are automatically persisted to your permanent record.
          </p>
        </div>
      </div>

      {/* Controls: Eye Examined + History + Switch */}
      <div className="flex flex-wrap items-center gap-2 self-start md:self-center">
        {/* Eye examined selector */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
          <button
            onClick={() => onSelectEye('OD')}
            className={`px-3 py-1 rounded-lg transition-all ${
              selectedEye === 'OD'
                ? 'bg-white text-cyan-800 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Right Eye (OD)
          </button>
          <button
            onClick={() => onSelectEye('OS')}
            className={`px-3 py-1 rounded-lg transition-all ${
              selectedEye === 'OS'
                ? 'bg-white text-cyan-800 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Left Eye (OS)
          </button>
        </div>

        <button
          onClick={onOpenHistory}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
        >
          <History className="w-3.5 h-3.5 text-slate-500" />
          <span>Patient History</span>
        </button>

        <button
          onClick={onSwitchPatient}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
        >
          <ArrowRightLeft className="w-3.5 h-3.5 text-slate-500" />
          <span>Switch</span>
        </button>
      </div>
    </div>
  );
};
