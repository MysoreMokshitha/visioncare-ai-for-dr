import React from 'react';
import { Eye, ShieldAlert, Cpu, HeartPulse } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
  onOpenSafetyNotice: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSafetyNotice }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center text-white shadow-md">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight">
                  VisionCare <span className="text-cyan-400">AI for DR</span>
                </span>
                <p className="text-[10px] uppercase tracking-wider text-teal-400 font-semibold">
                  AI Research Prototype
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              An explainable deep learning screening platform for 5-class diabetic retinopathy assessment using digital retinal fundus photography, Grad-CAM++ visual attention heatmaps, and structured clinical decision summaries.
            </p>
            <div className="flex items-center gap-2 text-xs text-cyan-400">
              <Cpu className="w-4 h-4" />
              <span>EfficientNetB0 Backbone • Softmax 5-Class Classifier • Grad-CAM++ Interpretability</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Home Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('screening')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Screening Station
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('how-it-works')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  System Architecture
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  About Research
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('doctor-access')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Doctor Review Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Safety Notice Card */}
          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
              <ShieldAlert className="w-4 h-4" />
              <span>Medical Safety Notice</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-normal">
              This system is strictly an investigational hackathon prototype. It does not provide medical diagnosis, prescribe therapies, or supersede clinical evaluation by an ophthalmologist.
            </p>
            <button
              onClick={onOpenSafetyNotice}
              className="text-xs text-cyan-400 hover:text-cyan-300 underline font-medium block pt-1"
            >
              Read Full Protocol & Disclaimers →
            </button>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-teal-400" />
            <span>VisionCare AI Research Initiative • Diabetic Retinopathy Screening</span>
          </div>
          <p>© {new Date().getFullYear()} VisionCare AI for DR. Open research prototype.</p>
        </div>
      </div>
    </footer>
  );
};
