import { jsPDF } from 'jspdf';
import { PatientProfile, PredictionResult } from '../types';
import { DR_STAGES } from '../data/diseaseInformation';

export function generatePdfReport(
  result: PredictionResult,
  patient: PatientProfile
): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const stage = DR_STAGES[result.predictedStage];
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 14;

  // Header Banner
  doc.setFillColor(15, 23, 42); // Navy #0f172a
  doc.rect(0, 0, pageWidth, 24, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('VISIONCARE AI FOR DR', 14, 12);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(56, 189, 248); // sky-400
  doc.text('AI-ASSISTED DIABETIC RETINOPATHY SCREENING REPORT (RESEARCH PROTOTYPE)', 14, 18);

  doc.setTextColor(203, 213, 225);
  doc.text(`DATE: ${new Date(result.timestamp).toLocaleDateString()} ${new Date(result.timestamp).toLocaleTimeString()}`, pageWidth - 14, 12, { align: 'right' });
  doc.text(`REF: ${result.screeningId}`, pageWidth - 14, 18, { align: 'right' });

  y = 32;

  // Patient & Clinical Information Card
  doc.setFillColor(248, 250, 252); // slate-50
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.roundedRect(14, y, pageWidth - 28, 26, 2, 2, 'FD');

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('PATIENT INFORMATION', 18, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);

  doc.text(`Patient Name: ${patient.name}`, 18, y + 13);
  doc.text(`Patient Reference: ${patient.id}`, 18, y + 19);

  doc.text(`Age & Gender: ${patient.age} yrs • ${patient.gender}`, 80, y + 13);
  doc.text(`Contact: ${patient.phone || 'N/A'}`, 80, y + 19);

  doc.text(`Eye Examined: ${result.eye === 'OD' ? 'Right Eye (OD)' : 'Left Eye (OS)'}`, 145, y + 13);
  doc.text(`Image Quality: ${result.imageQuality.overallStatus} (${result.imageQuality.resolution.width}x${result.imageQuality.resolution.height})`, 145, y + 19);

  y += 32;

  // AI Screening Result Box
  const isHighRisk = stage.referable;
  doc.setFillColor(isHighRisk ? 255 : 240, isHighRisk ? 247 : 253, isHighRisk ? 237 : 244); // light tint
  doc.setDrawColor(isHighRisk ? 251 : 14, isHighRisk ? 146 : 165, isHighRisk ? 60 : 233);
  doc.roundedRect(14, y, pageWidth - 28, 26, 2, 2, 'FD');

  doc.setTextColor(100, 116, 139);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('AI SCREENING CLASSIFICATION', 18, y + 6);

  doc.setTextColor(isHighRisk ? 194 : 3, isHighRisk ? 65 : 105, isHighRisk ? 12 : 161);
  doc.setFontSize(16);
  doc.text(stage.name.toUpperCase(), 18, y + 15);

  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.setFont('helvetica', 'normal');
  doc.text(stage.gradeLabel, 18, y + 21);

  // Confidence & Urgency in right side of card
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('CONFIDENCE', 130, y + 6);
  doc.text('REFERRAL STATUS', 165, y + 6);

  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.text(`${result.confidence.toFixed(1)}%`, 130, y + 14);

  doc.setFontSize(9);
  doc.setTextColor(isHighRisk ? 225 : 16, isHighRisk ? 29 : 185, isHighRisk ? 72 : 129);
  doc.text(isHighRisk ? 'Referable DR' : 'Non-Referable', 165, y + 14);

  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.text(stage.referralUrgency, 165, y + 20);

  y += 32;

  // Class Probability Distribution Table
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('5-CLASS PROBABILITY DISTRIBUTION', 14, y);
  y += 4;

  // Table header
  doc.setFillColor(241, 245, 249);
  doc.rect(14, y, pageWidth - 28, 7, 'F');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text('DR Severity Class', 18, y + 5);
  doc.text('Model Posterior Probability', 110, y + 5);
  doc.text('Status', 165, y + 5);
  y += 7;

  result.probabilities.forEach((p) => {
    const isSelected = p.stage === result.predictedStage;
    if (isSelected) {
      doc.setFillColor(238, 242, 255);
      doc.rect(14, y, pageWidth - 28, 6, 'F');
    }
    doc.setFont('helvetica', isSelected ? 'bold' : 'normal');
    doc.setTextColor(isSelected ? 30 : 51, isSelected ? 58 : 65, isSelected ? 138 : 85);
    doc.text(`Stage ${p.stage}: ${p.label}`, 18, y + 4.5);
    doc.text(`${p.probability.toFixed(1)}%`, 110, y + 4.5);
    doc.text(isSelected ? 'DETECTED' : '—', 165, y + 4.5);

    // Draw thin line
    doc.setDrawColor(226, 232, 240);
    doc.line(14, y + 6, pageWidth - 14, y + 6);
    y += 6;
  });

  y += 6;

  // Visual attention & Retinal Image Analysis
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('EXPLAINABLE AI & GRAD-CAM++ ANALYSIS', 14, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const explText = `Key Model Explanation: ${stage.keyModelExplanation} Grad-CAM++ saliency indicates the neural network focused primarily on high-gradient features within the retinal microvasculature. Note that this heatmap is an interpretability aid and does not constitute lesion segmentation.`;
  const splitExpl = doc.splitTextToSize(explText, pageWidth - 28);
  doc.text(splitExpl, 14, y);
  y += splitExpl.length * 4.5 + 4;

  // Clinical Guidance & Recommended Next Steps
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(14, y, pageWidth - 28, 26, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text('RECOMMENDED CLINICAL ACTION & GUIDANCE', 18, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const nextSteps = doc.splitTextToSize(`Action: ${stage.recommendedNextSteps}`, pageWidth - 36);
  doc.text(nextSteps, 18, y + 13);

  const urgencyText = `Timeline: ${stage.referralIntervalRecommendation} | Image Quality: ${result.imageQuality.overallStatus}`;
  doc.text(urgencyText, 18, y + 21);

  y += 32;

  // Attending Clinician Signature Block
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('Reviewing Clinician: _________________________________', 14, y);
  doc.text('Specialty / Reg No: _________________________________', 115, y);
  y += 6;
  doc.text('Clinical Impression: [  ] Agree    [  ] Overrule / Re-examine', 14, y);
  doc.text('Signature & Date: ___________________________________', 115, y);

  y += 10;

  // Medical Safety & Demonstration Disclaimer Box
  doc.setFillColor(254, 242, 242);
  doc.setDrawColor(254, 202, 202);
  doc.roundedRect(14, y, pageWidth - 28, 18, 1, 1, 'FD');

  doc.setTextColor(153, 27, 27);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('DEMONSTRATION RESEARCH PROTOTYPE — MEDICAL DISCLAIMER', 18, y + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(185, 28, 28);
  const disclaimer =
    'VisionCare AI for DR is an experimental research prototype intended for academic exploration and demonstration. It is not an FDA/CE-cleared diagnostic device and must not replace examination, diagnosis, or treatment decisions by a licensed ophthalmologist or eye-care professional.';
  const splitDisclaimer = doc.splitTextToSize(disclaimer, pageWidth - 36);
  doc.text(splitDisclaimer, 18, y + 9);

  // Trigger download
  doc.save(`VisionCare_DR_Report_${patient.id}_${result.screeningId}.pdf`);
}
