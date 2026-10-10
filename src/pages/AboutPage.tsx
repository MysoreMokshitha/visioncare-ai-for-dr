import React from 'react';
import {
  Eye,
  FileCheck,
  ShieldAlert,
  Database,
  Cpu,
  Layers,
  Sparkles,
  GitPullRequest,
  CheckCircle,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Title & Badge */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wider">
          <span>RESEARCH METHODOLOGY</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          VisionCare AI: An Explainable AI-Assisted Framework for Diabetic Retinopathy Screening
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl mx-auto">
          Bridging the gap between deep learning computer vision and ophthalmological clinical workflow through transparent, evidence-based feature attribution.
        </p>
      </div>

      {/* Problem Statement & Clinical Motivation */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-xs space-y-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Eye className="w-5 h-5 text-cyan-600" />
          <span>Clinical Problem & Global Motivation</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600 leading-relaxed">
          <p>
            Diabetic retinopathy (DR) is the leading cause of preventable blindness among working-age adults worldwide. Over 537 million adults globally live with diabetes, of whom approximately one in three will develop clinical retinopathy. Because early stages (microaneurysms and subtle intraretinal exudates) are often completely asymptomatic, patients rarely seek eye care until irreversible macular edema or proliferative neovascularization causes profound visual loss.
          </p>
          <p>
            Annual dilated retinal screening is the proven standard of care for preventing sight-threatening DR. However, a severe shortage of ophthalmologists and retinal specialists—particularly in rural and resource-constrained clinics—creates severe diagnostic bottlenecks. Automated, explainable screening platforms can triage large patient populations, promptly flagging referable cases for urgent clinical intervention while reassuring stable patients.
          </p>
        </div>
      </div>

      {/* Dataset & Architectural Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 text-teal-700 flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Kaggle APTOS & Sovitrath Dataset Context
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            The foundation model was developed using the widely recognized Kaggle benchmark dataset (<code>sovitrath/diabetic-retinopathy-224x224-2019-data</code>), consisting of 3,662 stratified color fundus photographs graded by expert panels according to the International Clinical Diabetic Retinopathy (ICDR) scale:
          </p>
          <ul className="text-xs text-slate-700 space-y-1.5 pl-2 font-medium">
            <li>• Class 0 (No DR): 1,805 images</li>
            <li>• Class 1 (Mild NPDR): 370 images</li>
            <li>• Class 2 (Moderate NPDR): 999 images</li>
            <li>• Class 3 (Severe NPDR): 193 images</li>
            <li>• Class 4 (Proliferative DR): 295 images</li>
          </ul>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-700 flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Feature Extraction & Explainability Pipeline
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Standard black-box AI predictions encounter clinical resistance because clinicians cannot verify what anatomical features triggered a high-risk classification. VisionCare couples an EfficientNetB0 transfer learning backbone with Grad-CAM++ (Gradient-weighted Class Activation Mapping++):
          </p>
          <ul className="text-xs text-slate-700 space-y-1.5 pl-2 font-medium">
            <li>• Preprocessing: Green-channel CLAHE contrast enhancement</li>
            <li>• Feature extractor: Mobile inverted bottleneck convolutions (MBConv)</li>
            <li>• Explainability: Higher-order gradient weights highlighting microvascular lesions</li>
            <li>• Triage: Automated referable vs. non-referable classification logic</li>
          </ul>
        </div>
      </div>

      {/* Limitations & Ethical Research Scope */}
      <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 space-y-4 text-xs text-slate-600 leading-relaxed">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
          <ShieldAlert className="w-4 h-4 text-amber-600" />
          <span>Research Limitations & Ethical Disclosures</span>
        </div>
        <p>
          <strong>1. Hardware Dependency:</strong> Effective fundus analysis necessitates non-mydriatic desktop fundus cameras or optical lens adapters. Consumer phone cameras or webcams capture external ocular surfaces rather than retinal microvasculature.
        </p>
        <p>
          <strong>2. Not an Autonomous Diagnostic Device:</strong> VisionCare AI for DR is an educational and hackathon research prototype. Saliency maps (Grad-CAM++) demonstrate model focus areas and should never be conflated with precise lesion segmentation or definitive medical diagnoses.
        </p>
        <p>
          <strong>3. Future Work:</strong> The ongoing research roadmap explores multi-disease screening (ODIR-5K), ConvNeXt Tiny architectures with CBAM attention, multi-modal clinical risk factor integration (HbA1c, hypertension, diabetes duration), and longitudinal progression modeling across multi-year patient visits.
        </p>
      </div>
    </div>
  );
};
