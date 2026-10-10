import React, { useState } from 'react';
import {
  Eye,
  Scan,
  Stethoscope,
  History,
  LogOut,
  User,
  Menu,
  X,
  ShieldAlert,
} from 'lucide-react';
import { PatientProfile } from '../../types';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  activePatient: PatientProfile;
  onOpenPatientPortal: () => void;
  onOpenHistoryModal: () => void;
  onOpenSafetyNotice: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  activePatient,
  onOpenPatientPortal,
  onOpenHistoryModal,
  onOpenSafetyNotice,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'screening', label: 'Screening' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Branding */}
          <div
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-200">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-slate-900">
                  VisionCare <span className="text-cyan-600">AI for DR</span>
                </span>
              </div>
              <p className="text-[10px] font-semibold tracking-wider text-teal-600 uppercase">
                AI Research Prototype
              </p>
            </div>
          </div>

          {/* Center: Main Nav Links */}
          <nav className="hidden md:flex items-center p-1.5 bg-slate-100/70 rounded-full border border-slate-200/60">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-5 py-1.5 text-sm font-semibold rounded-full transition-all duration-150 ${
                    isActive
                      ? 'bg-sky-100 text-sky-800 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right: Actions and Patient Profile */}
          <div className="hidden lg:flex flex-col items-end gap-1.5">
            {/* Top row: Patient Pill + History + Switch */}
            <div className="flex items-center gap-1.5 bg-cyan-50/70 border border-cyan-100 rounded-full px-3 py-1 shadow-2xs">
              <button
                onClick={onOpenPatientPortal}
                className="flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-cyan-700 transition-colors pr-2 border-r border-cyan-200/70"
                title="View Patient Profile"
              >
                <div className="w-5 h-5 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center">
                  <User className="w-3.5 h-3.5" />
                </div>
                <span>{activePatient.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white border border-cyan-200 text-cyan-800 font-mono">
                  {activePatient.id}
                </span>
              </button>

              <button
                onClick={onOpenHistoryModal}
                className="flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-cyan-700 px-2 py-0.5 rounded-full hover:bg-white transition-colors"
                title="View Screening History"
              >
                <History className="w-3.5 h-3.5" />
                <span>History</span>
              </button>

              <button
                onClick={onOpenPatientPortal}
                className="text-slate-400 hover:text-slate-700 p-0.5 rounded-full hover:bg-white transition-colors"
                title="Switch Patient"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Bottom row: Doctor Access & Start Screening */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('doctor-access')}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg border transition-all duration-150 ${
                  currentPage === 'doctor-access'
                    ? 'bg-cyan-50 border-cyan-300 text-cyan-800'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
                <span>Doctor Access</span>
              </button>

              <button
                onClick={() => onNavigate('screening')}
                className="flex items-center gap-1.5 px-3.5 py-1 text-xs font-semibold rounded-lg bg-gradient-to-r from-sky-500 to-cyan-600 text-white shadow-xs shadow-sky-500/20 hover:from-sky-600 hover:to-cyan-700 transition-all duration-150 hover:scale-[1.02]"
              >
                <Scan className="w-3.5 h-3.5" />
                <span>Start Screening</span>
              </button>
            </div>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => onNavigate('screening')}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-sky-500 text-white"
            >
              <Scan className="w-3.5 h-3.5" />
              <span>Screening</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Safety Notice Ribbon */}
      <div className="bg-sky-50/80 border-t border-sky-100 px-4 py-1.5 text-center text-[11px] text-sky-800 flex items-center justify-center gap-2">
        <ShieldAlert className="w-3.5 h-3.5 text-sky-600 shrink-0" />
        <span className="truncate">
          VisionCare AI for DR is an experimental research prototype. It is not a substitute for an examination by an eye-care professional.
        </span>
        <button
          onClick={onOpenSafetyNotice}
          className="underline font-semibold hover:text-sky-900 shrink-0 ml-1 cursor-pointer"
        >
          Safety Details
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 shadow-lg">
          <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-cyan-600" />
              <div>
                <p className="text-xs font-bold text-slate-800">{activePatient.name}</p>
                <p className="text-[10px] font-mono text-cyan-700">{activePatient.id}</p>
              </div>
            </div>
            <button
              onClick={() => {
                onOpenPatientPortal();
                setMobileMenuOpen(false);
              }}
              className="text-xs text-cyan-700 underline font-medium"
            >
              Manage
            </button>
          </div>

          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 text-sm font-semibold rounded-lg ${
                  currentPage === item.id ? 'bg-sky-50 text-sky-800' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                onNavigate('doctor-access');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 text-sm font-semibold rounded-lg text-slate-700 hover:bg-slate-50 flex items-center gap-2"
            >
              <Stethoscope className="w-4 h-4 text-teal-600" />
              <span>Doctor Access</span>
            </button>
            <button
              onClick={() => {
                onOpenHistoryModal();
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 text-sm font-semibold rounded-lg text-slate-700 hover:bg-slate-50 flex items-center gap-2"
            >
              <History className="w-4 h-4 text-slate-500" />
              <span>Screening History</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
