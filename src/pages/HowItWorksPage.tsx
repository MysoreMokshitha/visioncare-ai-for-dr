import React from 'react';
import {
  Camera,
  ShieldCheck,
  Cpu,
  BarChart3,
  Sparkles,
  FileText,
  ArrowRight,
  UploadCloud,
  CheckCircle2,
} from 'lucide-react';

interface HowItWorksPageProps {
  onNavigate: (page: string) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onNavigate }) => {
  const steps = [
    {
      num: '01',
      icon: UploadCloud,
      title: 'Capture Retinal Fundus Image',
      desc: 'Digital color fundus photographs are acquired via ophthalmic imaging equipment and uploaded into the screening interface.',
    },
    {
      num: '02',
      icon: ShieldCheck,
      title: 'Image Quality & Validation',
      desc: 'Automated validation evaluates resolution, sharpness, brightness, and confirms fundus chromaticity before deep learning execution.',
    },
    {
      num: '03',
      icon: Cpu,
      title: 'AI DR Feature Extraction',
      desc: 'EfficientNetB0 deep convolutional neural network extracts fine-grained vascular features and spatial lesion representations.',
    },
    {
      num: '04',
      icon: BarChart3,
      title: 'Severity & Confidence Estimation',
      desc: '5-class softmax output layer calculates posterior probabilities for No DR, Mild, Moderate, Severe, and Proliferative DR.',
    },
    {
      num: '05',
      icon: Sparkles,
      title: 'Grad-CAM++ Visual Attention',
      desc: 'Gradient-weighted Class Activation Mapping calculates pixel-level feature importance, generating visual attention heatmaps.',
    },
    {
      num: '06',
      icon: FileText,
      title: 'AI Screening Report',
      desc: 'A structured clinical screening summary is assembled with image quality, predicted stage, confidence, findings, next steps, and PDF download.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header matching Screenshot 13 */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wider">
          <span>SYSTEM ARCHITECTURE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
          How VisionCare AI for DR Works
        </h1>
        <p className="text-sm sm:text-base text-slate-500">
          An end-to-end 6-step deep learning and explainable AI pipeline for retinal screening.
        </p>
      </div>

      {/* Retinal Imaging Hardware Requirement Callout Card - Exact Match to Screenshot 13 */}
      <div className="bg-sky-50/70 rounded-2xl p-6 border border-sky-100 flex items-start sm:items-center gap-4 text-sky-950">
        <div className="w-12 h-12 rounded-xl bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-xs">
          <Camera className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-bold text-sky-900 tracking-tight">
            Retinal Imaging Hardware Requirement
          </h3>
          <p className="text-xs sm:text-sm text-sky-950/80 leading-relaxed">
            Retinal/fundus imaging requires appropriate ophthalmic imaging equipment (such as a table-top non-mydriatic fundus camera or a validated smartphone ophthalmoscope attachment). A standard phone camera or webcam cannot reliably capture the retinal structures required for diabetic retinopathy analysis.
          </p>
        </div>
      </div>

      {/* 6-Step Grid - Exact Match to Screenshot 13 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((step) => {
          const IconComponent = step.icon;
          return (
            <div
              key={step.num}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:border-cyan-300 hover:shadow-md transition-all relative flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-2xl font-black text-slate-200 group-hover:text-cyan-200 transition-colors font-mono">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Button matching Screenshot 13 */}
      <div className="text-center pt-4">
        <button
          onClick={() => onNavigate('screening')}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-600 text-white font-bold text-sm shadow-md shadow-sky-500/25 hover:from-sky-600 hover:to-cyan-700 transition-all hover:scale-[1.02] cursor-pointer"
        >
          <span>Test the Screening Pipeline</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
