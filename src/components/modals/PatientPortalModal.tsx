import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  UserPlus,
  Users,
} from 'lucide-react';
import { PatientProfile } from '../../types';
import { generateNextPatientId } from '../../services/patientService';

interface PatientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  activePatient: PatientProfile;
  patients: PatientProfile[];
  onSelectPatient: (patient: PatientProfile) => void;
  onSavePatient: (patient: PatientProfile) => void;
  onProceedToScreening: () => void;
  onViewHistory: () => void;
}

export const PatientPortalModal: React.FC<PatientPortalModalProps> = ({
  isOpen,
  onClose,
  activePatient,
  patients,
  onSelectPatient,
  onSavePatient,
  onProceedToScreening,
  onViewHistory,
}) => {
  const [activeTab, setActiveTab] = useState<'current' | 'switch' | 'create'>('current');

  // Form state for creating a new patient
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState<number>(30);
  const [newGender, setNewGender] = useState<PatientProfile['gender']>('Female');
  const [newPhone, setNewPhone] = useState('');
  const [newAddress, setNewAddress] = useState('');

  if (!isOpen) return null;

  const handleCreatePatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newId = generateNextPatientId();
    const created: PatientProfile = {
      id: newId,
      name: newName.trim(),
      age: Number(newAge) || 30,
      gender: newGender,
      phone: newPhone.trim() || undefined,
      address: newAddress.trim() || undefined,
      registeredDate: new Date().toISOString().slice(0, 10),
      previousScreeningsCount: 0,
    };

    onSavePatient(created);
    onSelectPatient(created);
    setActiveTab('current');
    setNewName('');
    setNewPhone('');
    setNewAddress('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-lg w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Matching Screenshot 2 */}
        <div className="px-6 pt-6 pb-4 flex items-start justify-between border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Patient Portal</h3>
            <div className="flex items-center gap-1.5 text-xs text-teal-700 mt-1 font-medium">
              <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
              <span>Secure reference-based identification & permanent records</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher for Switch / New Patient */}
        <div className="px-6 pt-3 flex items-center gap-2 border-b border-slate-100 text-xs">
          <button
            onClick={() => setActiveTab('current')}
            className={`pb-2.5 font-semibold transition-colors ${
              activeTab === 'current'
                ? 'text-cyan-700 border-b-2 border-cyan-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Active Profile
          </button>
          <button
            onClick={() => setActiveTab('switch')}
            className={`pb-2.5 font-semibold transition-colors flex items-center gap-1 ${
              activeTab === 'switch'
                ? 'text-cyan-700 border-b-2 border-cyan-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Switch Patient ({patients.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`pb-2.5 font-semibold transition-colors flex items-center gap-1 ${
              activeTab === 'create'
                ? 'text-cyan-700 border-b-2 border-cyan-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>+ New Profile</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {activeTab === 'current' && (
            <div className="space-y-6">
              {/* Profile Card - Exact Visual Reproduction of Screenshot 2 */}
              <div className="text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600 mb-3 shadow-xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 tracking-tight">
                  {activePatient.name}
                </h4>
                <div className="inline-block mt-1.5 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-mono font-medium tracking-wide">
                  {activePatient.id}
                </div>
              </div>

              {/* Patient Info Grid */}
              <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-100 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                    Age & Gender
                  </p>
                  <p className="font-semibold text-slate-800 mt-0.5">
                    {activePatient.age} yrs • {activePatient.gender}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                    Phone
                  </p>
                  <p className="font-semibold text-slate-800 mt-0.5">
                    {activePatient.phone || 'Not recorded'}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                    Address
                  </p>
                  <p className="font-semibold text-slate-800 mt-0.5">
                    {activePatient.address || 'Standard Clinic'}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                    Previous Screenings
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      onViewHistory();
                    }}
                    className="font-semibold text-cyan-700 hover:underline mt-0.5"
                  >
                    {activePatient.previousScreeningsCount} Screenings
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onProceedToScreening();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-600 text-white font-semibold text-sm shadow-md shadow-sky-500/20 hover:from-sky-600 hover:to-cyan-700 transition-all flex items-center justify-center gap-2"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>Proceed to Screening</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onViewHistory();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span>View Previous History</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'switch' && (
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              <p className="text-xs text-slate-500">
                Select a registered demo patient profile to load their longitudinal records:
              </p>
              {patients.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    onSelectPatient(p);
                    setActiveTab('current');
                  }}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    p.id === activePatient.id
                      ? 'bg-cyan-50/70 border-cyan-300 ring-1 ring-cyan-400'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{p.name}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {p.id}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {p.age} yrs • {p.gender} • {p.previousScreeningsCount} screenings
                    </p>
                  </div>
                  {p.id === activePatient.id && (
                    <span className="text-xs font-semibold text-cyan-700 bg-cyan-100 px-2 py-1 rounded-md">
                      Active
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'create' && (
            <form onSubmit={handleCreatePatient} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patel"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Age *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    required
                    value={newAge}
                    onChange={(e) => setNewAge(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Gender
                  </label>
                  <select
                    value={newGender}
                    onChange={(e) => setNewGender(e.target.value as PatientProfile['gender'])}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone (Optional)
                </label>
                <input
                  type="text"
                  placeholder="+91 9876543210"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Address / City (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Chittoor, Andhra Pradesh"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('current')}
                  className="flex-1 py-2 text-xs font-semibold rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-xs font-semibold rounded-lg bg-cyan-600 text-white hover:bg-cyan-700"
                >
                  Save & Set Active
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
