import React, { useState } from 'react';
import {
  History,
  Search,
  Filter,
  FileText,
  Download,
  Trash2,
  PlusCircle,
  Eye,
  RotateCcw,
} from 'lucide-react';
import { PatientProfile, PredictionResult, DRStageIndex } from '../types';
import { DR_STAGES } from '../data/diseaseInformation';
import { generatePdfReport } from '../services/pdfReportService';

interface HistoryPageProps {
  records: PredictionResult[];
  patients: PatientProfile[];
  onOpenScreeningWithRecord: (record: PredictionResult) => void;
  onNewScreening: () => void;
  onDeleteRecord: (id: string) => void;
  onResetDemoData: () => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({
  records,
  patients,
  onOpenScreeningWithRecord,
  onNewScreening,
  onDeleteRecord,
  onResetDemoData,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStage, setFilterStage] = useState<string>('all');

  const filteredRecords = records.filter((r) => {
    const stage = DR_STAGES[r.predictedStage];
    const patientName = patients.find((p) => p.id === r.patientId)?.name || '';
    const matchesSearch =
      r.screeningId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stage.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStage =
      filterStage === 'all' || String(r.predictedStage) === filterStage;

    return matchesSearch && matchesStage;
  });

  const handleDownload = (record: PredictionResult) => {
    const patient = patients.find((p) => p.id === record.patientId) || patients[0];
    generatePdfReport(record, patient);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <History className="w-8 h-8 text-cyan-600" />
            <span>Screening Records & Longitudinal History</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse, inspect, and export historical diabetic retinopathy screening records.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onResetDemoData}
            className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center gap-1.5"
            title="Reset to default demo records"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Records</span>
          </button>

          <button
            onClick={onNewScreening}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-600 text-white text-xs font-bold shadow-xs hover:from-sky-600 hover:to-cyan-700 transition-all flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ New Screening</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Total Screenings
          </p>
          <p className="text-2xl font-black text-slate-900 mt-1 font-mono">
            {records.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Registered Patients
          </p>
          <p className="text-2xl font-black text-cyan-700 mt-1 font-mono">
            {patients.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Referable DR Cases
          </p>
          <p className="text-2xl font-black text-orange-700 mt-1 font-mono">
            {records.filter((r) => r.predictedStage >= 2).length}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Routine / Non-Referable
          </p>
          <p className="text-2xl font-black text-emerald-700 mt-1 font-mono">
            {records.filter((r) => r.predictedStage < 2).length}
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by patient name, reference ID, or stage..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-cyan-500 bg-slate-50"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={filterStage}
            onChange={(e) => setFilterStage(e.target.value)}
            className="text-xs rounded-xl border border-slate-200 px-3 py-2 bg-slate-50 text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-cyan-500 font-medium"
          >
            <option value="all">All DR Stages</option>
            <option value="0">0 — No DR</option>
            <option value="1">1 — Mild DR</option>
            <option value="2">2 — Moderate DR</option>
            <option value="3">3 — Severe DR</option>
            <option value="4">4 — Proliferative DR</option>
          </select>
        </div>
      </div>

      {/* Records Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Screening ID</th>
                <th className="py-3 px-4">Patient</th>
                <th className="py-3 px-4">Eye</th>
                <th className="py-3 px-4">Detected Stage</th>
                <th className="py-3 px-4">Confidence</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400">
                    No matching screening records found.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((r) => {
                  const stage = DR_STAGES[r.predictedStage];
                  const patient = patients.find((p) => p.id === r.patientId);

                  return (
                    <tr key={r.screeningId} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 font-mono font-medium text-slate-700">
                        {r.screeningId}
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        {patient?.name || r.patientId}
                        <span className="block text-[10px] font-mono text-slate-400 font-normal">
                          {r.patientId}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-600">
                        {r.eye === 'OD' ? 'OD (Right)' : 'OS (Left)'}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                            stage.referable
                              ? 'bg-orange-50 text-orange-900 border-orange-200'
                              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          }`}
                        >
                          {stage.shortName}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-cyan-800">
                        {r.confidence.toFixed(1)}%
                      </td>
                      <td className="py-3 px-4 text-slate-500">
                        {new Date(r.timestamp).toLocaleDateString()}{' '}
                        {new Date(r.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="py-3 px-4 text-right space-x-1">
                        <button
                          onClick={() => onOpenScreeningWithRecord(r)}
                          className="px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 hover:bg-cyan-50 hover:border-cyan-300 hover:text-cyan-800 transition-colors"
                          title="Inspect in Screening Station"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDownload(r)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                          title="Download PDF Report"
                        >
                          <Download className="w-3.5 h-3.5 inline" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete record ${r.screeningId}?`)) {
                              onDeleteRecord(r.screeningId);
                            }
                          }}
                          className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5 inline" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
