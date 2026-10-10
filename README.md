# VisionCare AI for DR: Explainable AI-Assisted Diabetic Retinopathy Screening

**VisionCare AI for DR** is an Explainable AI-assisted diabetic retinopathy screening platform using digital retinal fundus photography. It integrates standardized 5-class severity grading, real-time image quality assessment, and Grad-CAM++ visual attention saliency heatmaps for transparent clinical triage.

---

## Key Features

1. **Retinal Fundus Image Analysis**:
   - Technical quality checks: resolution validation, brightness, blur/sharpness (discrete Laplacian variance approximation), and chromatic fundus signature verification.
   - Presets for verified scans (`0 — No DR`, `1 — Mild`, `2 — Moderate`, `3 — Severe`, `4 — Proliferative DR`).
2. **5-Class DR Severity Classification**:
   - Grade 0: No Diabetic Retinopathy
   - Grade 1: Mild NPDR (Microaneurysms only)
   - Grade 2: Moderate NPDR (Hemorrhages and hard exudates)
   - Grade 3: Severe NPDR (High-Risk Referable)
   - Grade 4: Proliferative Diabetic Retinopathy (Advanced)
3. **Grad-CAM++ Explainability**:
   - Side-by-side comparison of original retinal scans and gradient saliency heatmaps.
   - Interactive overlay opacity slider and attention scale legend (Blue: Low Attention → Red: High Attention).
4. **Clinical Decision Support & Health Guidance**:
   - Stage-specific symptom context, referral urgency timelines, and diagnostic notices.
5. **AI Voice Report**:
   - Synthesizes screening findings into an audio summary using browser SpeechSynthesis.
6. **Downloadable & Printable Medical Reports**:
   - One-click downloadable PDF screening reports via `jspdf`.
   - Browser print formatting (`window.print()`) formatted to medical documentation standards.
7. **Longitudinal Patient Screening History**:
   - Dynamic patient reference IDs (e.g. `VC-2026-00004`).
   - Browser `localStorage` persistence tracking longitudinal history across visits.
8. **Doctor Access Portal**:
   - Clinician triage workstation with patient review queues, impression sign-offs, and clinical notes.

---

## Technology Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **PDF Generation**: jsPDF
- **Speech Synthesis**: HTML5 Web Speech API
- **Image Processing**: Canvas 2D pixel-level statistical checks

---

## Project Structure

```text
/
├── index.html                    # Entry point with SEO and typography
├── metadata.json                 # Project descriptor
├── package.json                  # Dependencies and build scripts
├── vite.config.ts                # Vite configuration
├── src/
│   ├── main.tsx                  # React DOM mount
│   ├── App.tsx                   # Main state coordinator and routing
│   ├── index.css                 # Healthcare visual tokens and print styles
│   ├── types/                    # TypeScript interfaces (DRStage, Quality, Patient)
│   ├── data/
│   │   ├── diseaseInformation.ts # Clinical definitions, symptoms, urgency timelines
│   │   ├── sampleScans.ts        # Synthetic verified fundus scans and Grad-CAM++ maps
│   │   └── demoData.ts           # Demo patient records and history
│   ├── services/
│   │   ├── imageValidationService.ts # Real technical pixel analysis
│   │   ├── predictionService.ts      # Model inference & explainability engine
│   │   ├── patientService.ts         # Patient persistence
│   │   ├── historyService.ts         # Longitudinal screening persistence
│   │   ├── voiceReportService.ts     # Audio speech synthesis
│   │   └── pdfReportService.ts       # Medical PDF generator
│   ├── components/
│   │   ├── layout/ (Navbar, Footer)
│   │   ├── modals/ (PatientPortalModal, HistoryModal, SafetyNoticeModal)
│   │   ├── screening/ (PatientBar, ImageUploadCard, ImagePreviewCard,
│   │   │               ImageQualityCard, ResultOverviewCard,
│   │   │               ProbabilityDistributionCard, ExplainableAiCard,
│   │   │               HealthGuidanceCard, VoiceReportCard,
│   │   │               ScreeningSummaryCard)
│   │   └── reports/ (PrintableReport)
│   └── pages/
│       ├── HomePage.tsx          # Visual hero with architecture badges
│       ├── ScreeningPage.tsx     # 2-column screening workstation
│       ├── HowItWorksPage.tsx    # 6-step architecture breakdown
│       ├── AboutPage.tsx         # Problem statement and dataset context
│       ├── HistoryPage.tsx       # Longitudinal screening records table
│       └── DoctorAccessPage.tsx  # Clinician review & sign-off portal
```

---

## Local Development in VS Code (Windows)

1. Clone or extract the project folder in VS Code.
2. Open a terminal (`Ctrl + \``) in VS Code.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser at `http://localhost:3000`.

---

## Production Build

To build the project for production:

```bash
npm run build
```

This generates an optimized static bundle in the `dist` folder. To preview the build:

```bash
npm run preview
```

---

## Model & Explainability Integration Requirements

To connect a custom TensorFlow / PyTorch deep learning model:
1. **Input Dimensions**: Typically $224 \times 224 \times 3$ or $512 \times 512 \times 3$ normalized to $[0, 1]$ or $[-1, 1]$.
2. **Preprocessing**: Apply CLAHE (Contrast-Limited Adaptive Histogram Equalization) on the green channel if trained with this augmentation.
3. **Model Weights**: Convert Keras (`.keras` / `.h5`) to TensorFlow.js (`model.json` + shards) or host as an inference endpoint behind `/api/predict`.
4. **Grad-CAM++**: Compute gradients of the score for target class $c$ with respect to feature activation maps of the final convolutional layer (e.g. `top_conv` in EfficientNetB0).

---

## Free-Tier & Deployment Instructions

This application is built entirely using **free, open-source libraries** and requires **no paid external APIs or subscriptions** to run.

### Deploying to Vercel (Free Tier)
1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of VisionCare AI for DR"
   git branch -M main
   git remote add origin https://github.com/<your-username>/visioncare-ai-dr.git
   git push -u origin main
   ```
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Select **Vite** as the Framework Preset.
5. Click **Deploy**. Vercel will build and host the app globally on their free tier.

---

## Medical Disclaimer

**VisionCare AI for DR is an experimental research and educational prototype.** It is not an FDA-cleared, CE-marked, or CDSCO-approved medical diagnostic device. It is intended solely for research demonstration, educational exploration, and triage workflow simulation. It does not replace dilated fundus biomicroscopy or diagnosis by a qualified eye-care professional.
