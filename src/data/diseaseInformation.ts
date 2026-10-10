import { DRStageDefinition, DRStageIndex } from '../types';

export const DR_STAGES: Record<DRStageIndex, DRStageDefinition> = {
  0: {
    index: 0,
    code: 'No_DR',
    name: 'No Diabetic Retinopathy',
    shortName: 'No DR',
    gradeLabel: 'Grade 0 — Normal Retinal Microvasculature',
    severityLevel: 'None',
    referable: false,
    referralUrgency: 'Annual Routine Screening',
    colorClass: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
      badge: 'bg-emerald-100 text-emerald-800',
      progress: 'bg-emerald-500',
    },
    summaryDescription:
      'No detectable retinal microvascular abnormalities. The macula, optic disc, and retinal vessel arcades appear within normal limits for diabetic retinopathy screening.',
    clinicalSignificance:
      'Absence of microaneurysms, hemorrhages, or exudates indicates stable retinal vascular health at this screening time point.',
    symptoms: [
      'Typically asymptomatic with normal visual acuity.',
      'Regular glucose and blood pressure control remain essential.',
    ],
    keyModelExplanation:
      'Feature extractors identified intact vascular arcades and clear retinal background without microvascular lesions.',
    recommendedNextSteps:
      'Continue routine annual diabetic eye examination. Maintain optimal glycemic and blood pressure management.',
    referralIntervalRecommendation: 'Routine annual follow-up (12 months)',
  },
  1: {
    index: 1,
    code: 'Mild',
    name: 'Mild Diabetic Retinopathy',
    shortName: 'Mild',
    gradeLabel: 'Grade 1 — Mild Non-Proliferative (Microaneurysms Only)',
    severityLevel: 'Low',
    referable: false,
    referralUrgency: 'Routine Follow-up (6–12 months)',
    colorClass: {
      bg: 'bg-cyan-50',
      text: 'text-cyan-700',
      border: 'border-cyan-200',
      badge: 'bg-cyan-100 text-cyan-800',
      progress: 'bg-cyan-500',
    },
    summaryDescription:
      'Characterized by the presence of microaneurysms only. Microaneurysms are small outpouchings in retinal capillary walls and represent the earliest detectable clinical sign of DR.',
    clinicalSignificance:
      'Early microvascular compromise. While vision is typically preserved, it marks the onset of diabetic retinopathy requiring close systemic surveillance.',
    symptoms: [
      'Usually no noticeable visual loss or eye pain.',
      'Occasional minor visual fatigue or fluctuating sharpness.',
    ],
    keyModelExplanation:
      'Isolated microaneurysms detected in parafoveal capillary networks without gross intraretinal exudation or vascular leakage.',
    recommendedNextSteps:
      'Repeat dilated retinal examination in 6 to 12 months. Review systemic metabolic markers (HbA1c, lipid profile, blood pressure).',
    referralIntervalRecommendation: 'Re-screen within 6 to 12 months',
  },
  2: {
    index: 2,
    code: 'Moderate',
    name: 'Moderate Diabetic Retinopathy',
    shortName: 'Moderate',
    gradeLabel: 'Grade 2 — Moderate Non-Proliferative',
    severityLevel: 'Moderate',
    referable: true,
    referralUrgency: 'Referral within 2 to 3 months',
    colorClass: {
      bg: 'bg-amber-50',
      text: 'text-amber-800',
      border: 'border-amber-200',
      badge: 'bg-amber-100 text-amber-800',
      progress: 'bg-amber-500',
    },
    summaryDescription:
      'More than just microaneurysms, but less than severe NPDR. May present with blot hemorrhages, hard exudates (lipid deposits), and mild venous caliber fluctuations.',
    clinicalSignificance:
      'Accelerating capillary damage with increased risk of macular edema or progression to proliferative retinopathy.',
    symptoms: [
      'Mild blurring of near or distance vision.',
      'Occasional subtle floaters or dark spots.',
      'Reduced contrast sensitivity under dim illumination.',
    ],
    keyModelExplanation:
      'Network detected multiple focal dot-and-blot intraretinal hemorrhages and scattered lipid exudate clusters in perimacular regions.',
    recommendedNextSteps:
      'Formal ophthalmic evaluation recommended within 2 to 3 months for dilated biomicroscopy and optical coherence tomography (OCT) evaluation.',
    referralIntervalRecommendation: 'Ophthalmic referral within 2 to 3 months',
  },
  3: {
    index: 3,
    code: 'Severe',
    name: 'Severe Diabetic Retinopathy',
    shortName: 'Severe',
    gradeLabel: 'Grade 3 — Severe Non-Proliferative (High-Risk Referable)',
    severityLevel: 'High',
    referable: true,
    referralUrgency: 'Prompt referral within 2 to 4 weeks',
    colorClass: {
      bg: 'bg-orange-50',
      text: 'text-orange-900',
      border: 'border-orange-300',
      badge: 'bg-orange-100 text-orange-900',
      progress: 'bg-orange-600',
    },
    summaryDescription:
      'Severe non-proliferative diabetic retinopathy involves significant capillary blockage in multiple quadrants and carries a high risk of progressing to the proliferative stage.',
    clinicalSignificance:
      'High-risk referable diabetic retinopathy. Meets the 4-2-1 international clinical rule: prominent intraretinal hemorrhages in 4 quadrants, venous beading in 2+ quadrants, or IRMA in 1+ quadrant.',
    symptoms: [
      'Possible visual concerns may include blurred or hazy vision.',
      'Dark floating spots or shadow webs in visual field.',
      'Fluctuating vision and difficulty seeing clearly in dim light.',
    ],
    keyModelExplanation:
      'Prominent intraretinal hemorrhages (4 quadrants), venous beading, or IRMA. High risk of progression.',
    recommendedNextSteps:
      'The AI model identified features consistent with Severe DR. Prompt ophthalmic evaluation within 2 to 4 weeks is strongly recommended.',
    referralIntervalRecommendation: 'Prompt referral within 2 to 4 weeks',
  },
  4: {
    index: 4,
    code: 'Proliferative_DR',
    name: 'Proliferative Diabetic Retinopathy',
    shortName: 'Proliferate DR',
    gradeLabel: 'Grade 4 — Proliferative Diabetic Retinopathy (Advanced)',
    severityLevel: 'Critical',
    referable: true,
    referralUrgency: 'Urgent evaluation within 1 to 2 weeks',
    colorClass: {
      bg: 'bg-rose-50',
      text: 'text-rose-900',
      border: 'border-rose-300',
      badge: 'bg-rose-100 text-rose-900',
      progress: 'bg-rose-600',
    },
    summaryDescription:
      'Characterized by pathological neovascularization (new fragile blood vessels on the disc or elsewhere) and/or preretinal or vitreous hemorrhage. Risk of severe vision loss.',
    clinicalSignificance:
      'Critical ophthalmologic emergency. Fragile new vessels can bleed into the vitreous or trigger fibrovascular traction leading to tractional retinal detachment.',
    symptoms: [
      'Sudden shower of new floaters or spiderweb-like veils.',
      'Significant or patchy painless loss of vision.',
      'Reddish tint or haze across the field of view.',
    ],
    keyModelExplanation:
      'Extensive neovascularization patterns detected along the optic disc (NVD) and major arcade vessels with suspected vitreous traction zones.',
    recommendedNextSteps:
      'Urgent evaluation by a vitreoretinal specialist within 1 to 2 weeks for consideration of panretinal photocoagulation (PRP) or anti-VEGF pharmacotherapy.',
    referralIntervalRecommendation: 'Urgent referral within 1 to 2 weeks',
  },
};
