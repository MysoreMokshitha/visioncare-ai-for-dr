import React from 'react';
import {
  Scan,
  User,
  Stethoscope,
  CheckCircle2,
  Sparkles,
  Eye,
  Layers,
  Activity,
  History,
  FileText,
  ShieldCheck,
  ArrowRight,
  Database,
  Cpu,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onOpenPatientPortal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenPatientPortal,
}) => {
  return (
    <div className="space-y-16 py-6 sm:py-10">
      {/* HERO SECTION - Exact Visual Match to Screenshot 1 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Branding, Title, and Action Buttons */}
          <div className="lg:col-span-6 space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50/80 border border-cyan-200/80 text-cyan-800 text-xs font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
              <span>EXPLAINABLE AI FOR RETINAL SCREENING</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
              VisionCare <span className="text-cyan-600">AI for DR</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              AI-assisted diabetic retinopathy screening from retinal fundus images with 5-class severity grading, real-time image quality evaluation, and Grad-CAM++ explainability.
            </p>

            {/* Hero Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('screening')}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-600 text-white font-bold text-sm shadow-lg shadow-sky-500/25 hover:from-sky-600 hover:to-cyan-700 transition-all flex items-center gap-2 hover:scale-[1.02] cursor-pointer"
              >
                <Scan className="w-4 h-4" />
                <span>Start Screening</span>
              </button>

              <button
                onClick={onOpenPatientPortal}
                className="px-5 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <User className="w-4 h-4 text-cyan-600" />
                <span>Patient Portal</span>
              </button>

              <button
                onClick={() => onNavigate('doctor-access')}
                className="px-5 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <Stethoscope className="w-4 h-4 text-teal-600" />
                <span>Doctor Access</span>
              </button>
            </div>
          </div>

          {/* Right Column: Dark Navy Visual Panel - Exact Match to Screenshot 1 */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-lg bg-[#0b1329] rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl overflow-hidden group">
              {/* Subtle background glow */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Top Floating Pill: Model Architecture */}
              <div className="relative z-10 inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs shadow-md">
                <div className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    Model Architecture
                  </p>
                  <p className="text-xs font-bold text-white tracking-tight">
                    EfficientNetB0 Transfer Learning
                  </p>
                </div>
              </div>

              {/* Center Glowing Retinal Fundus Visual */}
              <div className="my-8 flex items-center justify-center relative">
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden bg-radial from-amber-700 via-red-950 to-black border-4 border-slate-800 shadow-[0_0_50px_rgba(217,119,6,0.3)] flex items-center justify-center">
                  {/* Subtle fundus arcades and optic disc glow */}
                  <div className="absolute left-16 top-28 w-14 h-16 rounded-full bg-yellow-200/90 blur-xs shadow-[0_0_20px_#fef08a]" />
                  <div className="absolute right-20 top-32 w-10 h-10 rounded-full bg-red-950 blur-xs" />

                  {/* Radiating vascular arcades */}
                  <svg className="absolute inset-0 w-full h-full stroke-red-900/80 fill-none" viewBox="0 0 100 100">
                    <path d="M 35 50 Q 50 30 75 35" strokeWidth="2.5" />
                    <path d="M 35 50 Q 55 25 80 20" strokeWidth="1.5" />
                    <path d="M 35 50 Q 50 70 75 65" strokeWidth="2.5" />
                    <path d="M 35 50 Q 55 75 80 80" strokeWidth="1.5" />
                    <path d="M 35 50 Q 20 40 10 45" strokeWidth="1.8" />
                    <path d="M 35 50 Q 20 60 10 55" strokeWidth="1.8" />
                  </svg>

                  {/* Grad-CAM++ Attention Heatmap Overlay Rings */}
                  <div className="absolute w-36 h-36 rounded-full bg-gradient-to-tr from-cyan-500/30 via-yellow-400/40 to-red-600/50 blur-md mix-blend-screen" />

                  {/* Scanner Crosshairs */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-52 h-52 border border-cyan-400/30 rounded-full animate-pulse" />
                    <div className="w-24 h-24 border border-cyan-400/50 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Bottom Floating Pill: Explainability */}
              <div className="relative z-10 flex justify-end">
                <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs shadow-md">
                  <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                      Explainability
                    </p>
                    <p className="text-xs font-bold text-white tracking-tight">
                      Grad-CAM++ Visual Attention
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 CORE PLATFORM CAPABILITIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Integrated Screening Capabilities
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Engineered for rapid, interpretability-first diabetic retinopathy assessment with clinical transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-cyan-300 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 text-sky-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Scan className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Retinal Image Screening
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Accepts high-resolution digital color fundus photographs via drag & drop, file upload, or simulated ophthalmoscope hardware presets.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-cyan-300 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 text-teal-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              5-Class Severity Classification
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Standardized ICDR grading: No DR (0), Mild (1), Moderate (2), Severe (3), and Proliferative DR (4) with calibrated posterior probability distributions.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-cyan-300 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Grad-CAM++ Explainability
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Pixel-level gradient visual attention heatmaps with side-by-side comparison, opacity slider, and lesion saliency overlays.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-cyan-300 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Image Quality Assessment
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Real-time browser canvas pixel analysis for resolution, chromatic fundus signature, illumination, blur, and vascular contrast verification.
            </p>
          </div>

          {/* Card 5 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-cyan-300 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <History className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Longitudinal Screening Records
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Permanent reference-based patient records tracking disease progression across visits with search, filters, and historical comparison.
            </p>
          </div>

          {/* Card 6 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-cyan-300 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              PDF & Printable Reports
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Instant one-click medical PDF generation and browser print formatting with clinical recommendations, attention maps, and doctor signoff blocks.
            </p>
          </div>
        </div>
      </section>

      {/* BENCHMARK DATASET & RESEARCH CONTEXT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-teal-50 text-teal-800 text-xs font-bold">
                <Database className="w-3.5 h-3.5" />
                <span>RESEARCH BENCHMARK CONTEXT</span>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Trained on Validated Diabetic Retinopathy Datasets
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                The VisionCare deep learning architecture is anchored on the standard APTOS 2019 / Sovitrath 224×224 benchmark distribution comprising 3,662 stratified retinal scans:
              </p>

              {/* Class Distribution Bars */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Class 0: No DR</p>
                  <p className="text-base font-extrabold text-emerald-700 mt-0.5">1,805</p>
                  <p className="text-[10px] text-slate-400">49.3%</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Class 1: Mild</p>
                  <p className="text-base font-extrabold text-cyan-700 mt-0.5">370</p>
                  <p className="text-[10px] text-slate-400">10.1%</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Class 2: Moderate</p>
                  <p className="text-base font-extrabold text-amber-700 mt-0.5">999</p>
                  <p className="text-[10px] text-slate-400">27.3%</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Class 3: Severe</p>
                  <p className="text-base font-extrabold text-orange-700 mt-0.5">193</p>
                  <p className="text-[10px] text-slate-400">5.3%</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center col-span-2 sm:col-span-1">
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Class 4: PDR</p>
                  <p className="text-base font-extrabold text-rose-700 mt-0.5">295</p>
                  <p className="text-[10px] text-slate-400">8.0%</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold">
                <Cpu className="w-4 h-4" />
                <span>End-to-End Pipeline</span>
              </div>
              <h4 className="text-lg font-bold">
                CLAHE Preprocessing & Explainability
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Retinal images undergo contrast-limited adaptive histogram equalization (CLAHE) on the green channel to enhance microaneurysms and intraretinal hemorrhages before forward pass through deep convolutional feature extractors.
              </p>
              <button
                onClick={() => onNavigate('how-it-works')}
                className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Explore Technical Architecture</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
