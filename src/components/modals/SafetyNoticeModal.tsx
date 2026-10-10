import React from 'react';
import { X, ShieldAlert, AlertTriangle, Eye, Hospital, FileCheck } from 'lucide-react';

interface SafetyNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SafetyNoticeModal: React.FC<SafetyNoticeModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 pt-6 pb-4 flex items-start justify-between border-b border-slate-100 bg-amber-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Medical & Research Safety Protocol
              </h3>
              <p className="text-xs text-amber-800 font-medium">
                Mandatory disclosure for AI research prototypes
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-600 leading-relaxed">
          <div className="p-3 bg-red-50 rounded-xl border border-red-200 text-red-900">
            <div className="flex items-center gap-2 font-bold mb-1 text-xs">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
              <span>Urgent Medical Symptoms Warning</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              If you or a patient are experiencing sudden loss of vision, flashes of light, a dramatic surge in dark floaters, or eye pain, immediately seek urgent care at a dedicated emergency eye clinic or hospital. Do not wait for AI screening results.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-teal-600" />
              <span>1. Experimental Research Prototype</span>
            </h4>
            <p>
              VisionCare AI for DR is developed strictly for research, academic evaluation, and hackathon presentation. It is not an FDA-cleared, CE-marked, or CDSCO-approved medical diagnostic device. It must not be utilized for autonomous clinical decision-making or primary clinical diagnoses.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-cyan-600" />
              <span>2. Specialized Hardware Requirements</span>
            </h4>
            <p>
              Diabetic retinopathy evaluation requires specialized digital fundus cameras (such as non-mydriatic desktop fundus cameras or optical smartphone ophthalmoscopes). Consumer smartphone cameras or webcams photograph only the cornea and iris and cannot image the posterior retina.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-1.5">
              <Hospital className="w-4 h-4 text-sky-600" />
              <span>3. Clinician Supervision Mandatory</span>
            </h4>
            <p>
              All automated findings, confidence estimates, and Grad-CAM++ visual attention maps are designed as supplementary clinical decision support aids for trained ophthalmic professionals. A dilated biomicroscopy examination by an eye specialist remains the definitive clinical standard of care.
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors"
            >
              I Understand & Acknowledge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
