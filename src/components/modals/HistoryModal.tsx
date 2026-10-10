import React from 'react';
import {
  X,
  History,
  FileText,
  PlusCircle,
  Eye,
  Trash2,
} from 'lucide-react';
import { PatientProfile, PredictionResult } from '../../types';
import { DR_STAGES } from '../../data/diseaseInformation';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  activePatient: PatientProfile;
  records: PredictionResult[];
  onSelectRecord: (record: PredictionResult) => void;
  onNewScreening: () => void;
  onDeleteRecord?: (id: string) => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  activePatient,
  records,
  onSelectRecord,
  onNewScreening,
  onDeleteRecord,
}) => {
  if (!isOpen) return null;

  // Filter records for the active patient (or show all if empty)
  const patientRecords = records.filter((r) => r.patientId === activePatient.id);
  const displayRecords = patientRecords.length > 0 ? patientRecords : records;

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-xl w-full overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Matching Screenshot 3 */}
        <div className="px-6 pt-6 pb-4 flex items-start justify-between border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <History className="w-5 h-5 text-cyan-600" />
              <span>Patient Screening History</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Comprehensive longitudinal screening records
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Patient Sub-header with + New Screening Button */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-slate-900">{activePatient.name}</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800">
              {activePatient.id}
            </span>
          </div>

          <button
            onClick={() => {
              onClose();
              onNewScreening();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500 text-white text-xs font-semibold hover:bg-sky-600 shadow-xs transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>New Screening</span>
          </button>
        </div>

        {/* Scrollable Records List */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1">
          {displayRecords.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <History className="w-10 h-10 mx-auto text-slate-300 mb-2 stroke-1" />
              <p className="text-sm font-semibold text-slate-600">No screenings recorded yet</p>
              <p className="text-xs text-slate-400 mt-1">
                Perform your first retinal scan screening to begin longitudinal tracking.
              </p>
            </div>
          ) : (
            displayRecords.map((record) => {
              const stageDef = DR_STAGES[record.predictedStage];

              // Badge colors matching Screenshot 3
              let badgeColor = 'bg-orange-100 text-orange-800 border-orange-200';
              if (record.predictedStage === 0) {
                badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-200';
              } else if (record.predictedStage === 1) {
                badgeColor = 'bg-cyan-100 text-cyan-800 border-cyan-200';
              } else if (record.predictedStage === 2) {
                badgeColor = 'bg-amber-100 text-amber-800 border-amber-200';
              } else if (record.predictedStage === 3) {
                badgeColor = 'bg-orange-100 text-orange-900 border-orange-200';
              } else if (record.predictedStage === 4) {
                badgeColor = 'bg-rose-100 text-rose-900 border-rose-200';
              }

              return (
                <div
                  key={record.screeningId}
                  className="bg-white rounded-xl border border-slate-200 p-3.5 flex items-center justify-between hover:border-cyan-300 hover:shadow-xs transition-all group"
                >
                  <div className="flex items-center gap-3.5">
                    {/* Severity Badge */}
                    <div
                      className={`w-24 text-center py-1.5 px-2 rounded-lg text-xs font-bold border ${badgeColor}`}
                    >
                      {stageDef.shortName}
                    </div>

                    {/* Metadata */}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-slate-500 font-medium">
                          {record.screeningId}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400">
                          {record.eye === 'OD' ? 'Right Eye (OD)' : 'Left Eye (OS)'}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-800 mt-0.5">
                        {formatDate(record.timestamp)}
                      </p>
                      <p className="text-[11px] text-cyan-700 font-medium">
                        {record.confidence.toFixed(1)}% confidence
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        onClose();
                        onSelectRecord(record);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 hover:border-cyan-400 hover:text-cyan-800 transition-colors"
                      title="Inspect full screening result"
                    >
                      <FileText className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-600" />
                      <span>Details</span>
                    </button>

                    {onDeleteRecord && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`Delete record ${record.screeningId}?`)) {
                            onDeleteRecord(record.screeningId);
                          }
                        }}
                        className="text-slate-300 hover:text-rose-500 p-1.5 rounded-md hover:bg-rose-50 transition-colors"
                        title="Delete record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
