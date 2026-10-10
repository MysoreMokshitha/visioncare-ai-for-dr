import React, { useState } from 'react';
import {
  Stethoscope,
  User,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Printer,
  Sparkles,
  Search,
  Filter,
  Save,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { PatientProfile, PredictionResult } from '../types';
import { DR_STAGES } from '../data/diseaseInformation';
import { generatePdfReport } from '../services/pdfReportService';

interface DoctorAccessPageProps {
  records: PredictionResult[];
  patients: PatientProfile[];
  onOpenScreeningWithRecord: (record: PredictionResult) => void;
}

export const DoctorAccessPage: React.FC<DoctorAccessPageProps> = ({
  records,
  patients,
  onOpenScreeningWithRecord,
}) => {
  const [selectedRecordId, setSelectedRecordId] = useState<string>(
    records.length > 0 ? records[0].screeningId : ''
  );
  const [doctorNotes, setDoctorNotes] = useState<Record<string, string>>({
    'SCR-20260813-00017': 'Prominent blot hemorrhages confirmed in superior temporal quadrant. Venous beading noted. Scheduled for dilated OCT biomicroscopy in 2 weeks.',
  });
  const [reviewStatus, setReviewStatus] = useState<Record<string, boolean>>({
    'SCR-20260813-00017': true,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterReferableOnly, setFilterReferableOnly] = useState(false);

  const selectedRecord = records.find((r) => r.screeningId === selectedRecordId) || records[0];
  const selectedPatient = patients.find((p) => p.id === selectedRecord?.patientId) || patients[0];

  const filteredRecords = records.filter((r) => {
    const stage = DR_STAGES[r.predictedStage];
    const matchesSearch =
      r.screeningId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stage.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesReferable = !filterReferableOnly || stage.referable;
    return matchesSearch && matchesReferable;
  });

  const handleSaveReview = (screeningId: string) => {
    setReviewStatus((prev) => ({ ...prev, [screeningId]: true }));
    alert('Clinical review verified and signed off for this screening record.');
  };

  const handleDownloadPdf = (record: PredictionResult) => {
    const patient = patients.find((p) => p.id === record.patientId) || patients[0];
    generatePdfReport(record, patient);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Clinician Header Bar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center shrink-0">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                Doctor Access & Review Station
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
                CLINICIAN DEMO PORTAL
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Reviewing Clinician: Dr. Sneha Rao, MS Ophthalmology (Retina Specialist) • License #AP-88419
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl font-medium text-slate-700">
            Total Triage Queue: <strong className="text-slate-900">{records.length} Cases</strong>
          </div>
        </div>
      </div>

      {/* Main Grid: Triage Queue on Left, Case Inspection on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Triage Patient Queue */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-600" />
              <span>Patient Screening Triage Queue</span>
            </h3>
            <span className="text-xs font-semibold text-slate-500">
              {filteredRecords.length} records
            </span>
          </div>

          {/* Search & Filter */}
          <div className="space-y-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search patient, ID, or stage..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-cyan-500 bg-slate-50"
              />
            </div>

            <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={filterReferableOnly}
                onChange={(e) => setFilterReferableOnly(e.target.checked)}
                className="rounded-sm text-cyan-600 focus:ring-cyan-500"
              />
              <span className="font-medium">Filter High-Risk Referable Only (Stages 2–4)</span>
            </label>
          </div>

          {/* List of screening records */}
          <div className="space-y-2.5 max-h-[550px] overflow-y-auto pr-1">
            {filteredRecords.map((record) => {
              const stage = DR_STAGES[record.predictedStage];
              const isSelected = record.screeningId === selectedRecord?.screeningId;
              const isReviewed = reviewStatus[record.screeningId];

              return (
                <div
                  key={record.screeningId}
                  onClick={() => setSelectedRecordId(record.screeningId)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-50/70 border-cyan-400 ring-2 ring-cyan-500/30'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900">
                          {patients.find((p) => p.id === record.patientId)?.name || record.patientId}
                        </span>
                        <span className="text-[10px] font-mono text-cyan-800 bg-cyan-100/60 px-1.5 py-0.2 rounded-sm">
                          {record.eye}
                        </span>
                      </div>
                      <p className="text-[11px] font-mono text-slate-500 mt-0.5">
                        {record.screeningId}
                      </p>
                    </div>

                    <div className="text-right">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                          stage.referable
                            ? 'bg-orange-50 text-orange-900 border-orange-200'
                            : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        }`}
                      >
                        {stage.shortName}
                      </span>
                      <p className="text-[10px] font-semibold text-slate-500 mt-1">
                        {record.confidence.toFixed(1)}%
                      </p>
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>{new Date(record.timestamp).toLocaleDateString()}</span>
                    {isReviewed ? (
                      <span className="text-teal-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-teal-600" />
                        <span>Signed off</span>
                      </span>
                    ) : (
                      <span className="text-amber-700 font-semibold flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-amber-600" />
                        <span>Pending Review</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Case Inspection & Clinician Verification Block */}
        {selectedRecord ? (
          <div className="lg:col-span-7 space-y-6">
            {/* Top Case Bar */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Clinical Case Inspection
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    {selectedPatient.name} ({selectedPatient.id})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Eye: {selectedRecord.eye === 'OD' ? 'Right Eye (OD)' : 'Left Eye (OS)'} • Ref: {selectedRecord.screeningId}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenScreeningWithRecord(selectedRecord)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Open in Station
                  </button>
                  <button
                    onClick={() => handleDownloadPdf(selectedRecord)}
                    className="px-3 py-1.5 rounded-lg bg-cyan-600 text-white text-xs font-bold hover:bg-cyan-700 transition-colors flex items-center gap-1"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Export PDF</span>
                  </button>
                </div>
              </div>

              {/* Prediction & Explainability Side-by-Side Display */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex flex-col items-center">
                  <span className="text-[10px] font-bold text-sky-400 mb-1">
                    Retinal Fundus Image
                  </span>
                  <div className="w-full aspect-square max-w-[220px] rounded-lg overflow-hidden bg-black flex items-center justify-center">
                    <img
                      src={selectedRecord.originalImageUrl}
                      alt="Fundus"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex flex-col items-center">
                  <span className="text-[10px] font-bold text-cyan-400 mb-1">
                    Grad-CAM++ Saliency Heatmap
                  </span>
                  <div className="relative w-full aspect-square max-w-[220px] rounded-lg overflow-hidden bg-black flex items-center justify-center">
                    <img
                      src={selectedRecord.originalImageUrl}
                      alt="Fundus Base"
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                    <img
                      src={selectedRecord.gradCam.heatmapDataUrl}
                      alt="Heatmap"
                      className="absolute inset-0 w-full h-full object-contain mix-blend-screen opacity-70"
                    />
                  </div>
                </div>
              </div>

              {/* Automated Diagnostic Summary */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs space-y-1">
                <p className="font-bold text-slate-800">
                  AI Model Impression: {DR_STAGES[selectedRecord.predictedStage].name} ({selectedRecord.confidence.toFixed(1)}% confidence)
                </p>
                <p className="text-slate-600 leading-relaxed">
                  {DR_STAGES[selectedRecord.predictedStage].keyModelExplanation}
                </p>
              </div>

              {/* Clinician Review & Decision Form */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-bold text-slate-800">
                  Attending Clinician Examination Notes & Plan:
                </label>
                <textarea
                  rows={3}
                  value={doctorNotes[selectedRecord.screeningId] || ''}
                  onChange={(e) =>
                    setDoctorNotes((prev) => ({
                      ...prev,
                      [selectedRecord.screeningId]: e.target.value,
                    }))
                  }
                  placeholder="Record biomicroscopic observations, macular findings, or referral instructions..."
                  className="w-full p-3 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-cyan-500 bg-white"
                />

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-3 text-xs text-slate-600">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded-sm text-cyan-600" />
                      <span>Concur with automated grading</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" className="rounded-sm text-cyan-600" />
                      <span>Order Dilated OCT</span>
                    </label>
                  </div>

                  <button
                    onClick={() => handleSaveReview(selectedRecord.screeningId)}
                    className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Sign-off & Verify Review</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-7 bg-white rounded-2xl p-12 text-center text-slate-400 border border-slate-200">
            Select a screening case from the queue to inspect details.
          </div>
        )}
      </div>
    </div>
  );
};
