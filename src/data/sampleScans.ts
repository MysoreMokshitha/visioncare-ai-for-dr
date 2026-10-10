import { DRStageIndex, GradCamRegion } from '../types';

export interface SampleScanData {
  stage: DRStageIndex;
  fileName: string;
  fileSize: string;
  resolution: string;
  confidence: number;
  probabilities: [number, number, number, number, number]; // [No DR, Mild, Moderate, Severe, Proliferative DR]
  dominantRegions: GradCamRegion[];
  focusFeature: string;
  notes: string;
  imageUrl: string;
  heatmapUrl: string;
}

// Generate realistic retinal fundus image and Grad-CAM++ heatmap via HTML5 Canvas
export function generateSyntheticRetinalScan(
  stage: DRStageIndex,
  size = 400
): { fundusUrl: string; heatmapUrl: string } {
  // If running in an environment without document/canvas (e.g. build step), fallback safely
  if (typeof document === 'undefined') {
    return { fundusUrl: '', heatmapUrl: '' };
  }

  // 1. Create Fundus Canvas
  const fundusCanvas = document.createElement('canvas');
  fundusCanvas.width = size;
  fundusCanvas.height = size;
  const ctx = fundusCanvas.getContext('2d');

  if (!ctx) return { fundusUrl: '', heatmapUrl: '' };

  const center = size / 2;
  const radius = size * 0.46;

  // Background black surround
  ctx.fillStyle = '#05070a';
  ctx.fillRect(0, 0, size, size);

  // Retinal Globe (radial gradient from warm orange to deep crimson border)
  const globeGrad = ctx.createRadialGradient(
    center - 20,
    center - 10,
    radius * 0.1,
    center,
    center,
    radius
  );
  globeGrad.addColorStop(0, '#d97706'); // warm golden amber center
  globeGrad.addColorStop(0.35, '#b45309'); // deep rich orange
  globeGrad.addColorStop(0.7, '#991b1b'); // deep red retina
  globeGrad.addColorStop(0.92, '#7f1d1d'); // peripheral red-brown
  globeGrad.addColorStop(1, '#05070a'); // black edge

  ctx.beginPath();
  ctx.arc(center, center, radius, 0, Math.PI * 2);
  ctx.fillStyle = globeGrad;
  ctx.fill();

  // Subtle choroidal texture
  ctx.save();
  ctx.clip();
  ctx.globalAlpha = 0.08;
  for (let i = 0; i < 40; i++) {
    const rx = center + (Math.sin(i * 13) * radius * 0.85);
    const ry = center + (Math.cos(i * 17) * radius * 0.85);
    const grad = ctx.createRadialGradient(rx, ry, 5, rx, ry, 45);
    grad.addColorStop(0, '#fbbf24');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.fillRect(rx - 50, ry - 50, 100, 100);
  }
  ctx.restore();

  // Optic Disc (pale yellow-white oval on nasal side, roughly x: 32% of width)
  const discX = size * 0.33;
  const discY = size * 0.52;
  const discR = size * 0.09;

  ctx.save();
  ctx.beginPath();
  ctx.arc(center, center, radius, 0, Math.PI * 2);
  ctx.clip();

  // Optic disc glow
  const discGrad = ctx.createRadialGradient(discX, discY, 2, discX, discY, discR);
  discGrad.addColorStop(0, '#fef08a'); // soft bright cream
  discGrad.addColorStop(0.65, '#fde047');
  discGrad.addColorStop(0.9, '#f59e0b');
  discGrad.addColorStop(1, '#b45309');

  ctx.beginPath();
  ctx.ellipse(discX, discY, discR * 0.9, discR * 1.05, 0.1, 0, Math.PI * 2);
  ctx.fillStyle = discGrad;
  ctx.fill();

  // Physiologic cup (whiter center)
  const cupGrad = ctx.createRadialGradient(discX - 2, discY, 1, discX, discY, discR * 0.45);
  cupGrad.addColorStop(0, '#fef9c3');
  cupGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = cupGrad;
  ctx.beginPath();
  ctx.arc(discX - 2, discY, discR * 0.45, 0, Math.PI * 2);
  ctx.fill();

  // Macula / Fovea (dark reddish avascular zone on temporal side, x: 62% of width)
  const foveaX = size * 0.65;
  const foveaY = size * 0.54;
  const foveaGrad = ctx.createRadialGradient(foveaX, foveaY, 2, foveaX, foveaY, size * 0.1);
  foveaGrad.addColorStop(0, '#581c1c'); // deeper darker red center
  foveaGrad.addColorStop(0.6, '#7f1d1d');
  foveaGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = foveaGrad;
  ctx.beginPath();
  ctx.arc(foveaX, foveaY, size * 0.1, 0, Math.PI * 2);
  ctx.fill();

  // Retinal Blood Vessels (Superior & Inferior temporal arches radiating from disc)
  ctx.strokeStyle = '#581c1c';
  ctx.lineCap = 'round';

  const drawVesselBranch = (
    startX: number,
    startY: number,
    ctrl1X: number,
    ctrl1Y: number,
    ctrl2X: number,
    ctrl2Y: number,
    endX: number,
    endY: number,
    width: number
  ) => {
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.bezierCurveTo(ctrl1X, ctrl1Y, ctrl2X, ctrl2Y, endX, endY);
    ctx.stroke();
  };

  // Superior arcade
  drawVesselBranch(discX, discY, discX + 30, discY - 60, discX + 110, discY - 110, foveaX + 80, discY - 80, 4.5);
  drawVesselBranch(discX, discY, discX + 25, discY - 55, discX + 90, discY - 95, foveaX + 60, discY - 70, 2.5);

  // Inferior arcade
  drawVesselBranch(discX, discY, discX + 30, discY + 60, discX + 110, discY + 110, foveaX + 80, discY + 80, 4.5);
  drawVesselBranch(discX, discY, discX + 25, discY + 55, discX + 90, discY + 95, foveaX + 60, discY + 70, 2.5);

  // Nasal vessels
  drawVesselBranch(discX, discY, discX - 40, discY - 30, discX - 70, discY - 40, discX - 90, discY - 20, 2.8);
  drawVesselBranch(discX, discY, discX - 40, discY + 30, discX - 70, discY + 40, discX - 90, discY + 20, 2.8);

  // Stage-specific retinal pathology lesions:
  if (stage >= 1) {
    // Microaneurysms (small red dots)
    ctx.fillStyle = '#450a0a';
    const numMA = stage === 1 ? 7 : stage === 2 ? 18 : 35;
    for (let i = 0; i < numMA; i++) {
      const px = foveaX + Math.sin(i * 3.7) * (size * 0.18);
      const py = foveaY + Math.cos(i * 2.9) * (size * 0.16);
      ctx.beginPath();
      ctx.arc(px, py, 1.8, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  if (stage >= 2) {
    // Blot hemorrhages (larger dark red irregular spots)
    ctx.fillStyle = '#3f0708';
    const numHemorrhages = stage === 2 ? 6 : stage === 3 ? 16 : 24;
    for (let i = 0; i < numHemorrhages; i++) {
      const px = center + Math.sin(i * 4.3) * (size * 0.26);
      const py = center + Math.cos(i * 3.1) * (size * 0.22);
      ctx.beginPath();
      ctx.ellipse(px, py, 4 + (i % 3), 3 + (i % 2), (i * 0.4), 0, Math.PI * 2);
      ctx.fill();
    }

    // Hard Exudates (bright yellow lipid deposits)
    ctx.fillStyle = '#fef08a';
    for (let i = 0; i < (stage === 2 ? 10 : 25); i++) {
      const exX = foveaX + 15 + Math.sin(i * 1.9) * (size * 0.12);
      const exY = foveaY - 10 + Math.cos(i * 2.3) * (size * 0.12);
      ctx.beginPath();
      ctx.arc(exX, exY, 1.5 + (i % 2), 0, Math.PI * 2);
      ctx.fill();
    }
  }

  if (stage >= 3) {
    // Cotton-wool spots (fluffy white/grey patches indicating retinal ischemia)
    ctx.fillStyle = 'rgba(241, 245, 249, 0.45)';
    for (let i = 0; i < 4; i++) {
      const cwX = foveaX + (i === 0 ? -40 : i === 1 ? 30 : -10) + (i * 10);
      const cwY = foveaY + (i === 0 ? -50 : i === 1 ? 55 : -70);
      ctx.beginPath();
      ctx.ellipse(cwX, cwY, 12, 7, 0.6, 0, Math.PI * 2);
      ctx.fill();
    }

    // Venous beading (tortuous segmented blood vessel)
    ctx.strokeStyle = '#380608';
    ctx.lineWidth = 5.5;
    ctx.beginPath();
    ctx.arc(discX + 60, discY - 60, 22, 0.4, 1.8);
    ctx.stroke();
  }

  if (stage >= 4) {
    // Neovascularization (fine tangled fronds of fragile new capillaries)
    ctx.strokeStyle = '#450a0a';
    ctx.lineWidth = 1.2;
    for (let k = 0; k < 18; k++) {
      const angle = k * 0.35;
      const nx = discX + Math.cos(angle) * (discR * 1.3);
      const ny = discY + Math.sin(angle) * (discR * 1.3);
      ctx.beginPath();
      ctx.moveTo(discX, discY);
      ctx.lineTo(nx, ny);
      ctx.stroke();
    }

    // Preretinal / Vitreous Hemorrhage pooling
    ctx.fillStyle = 'rgba(69, 10, 10, 0.85)';
    ctx.beginPath();
    ctx.arc(center + 20, center + 40, size * 0.14, 0, Math.PI);
    ctx.closePath();
    ctx.fill();
  }

  ctx.restore();

  const fundusUrl = fundusCanvas.toDataURL('image/png');

  // 2. Create Grad-CAM++ Heatmap Canvas
  const heatmapCanvas = document.createElement('canvas');
  heatmapCanvas.width = size;
  heatmapCanvas.height = size;
  const hCtx = heatmapCanvas.getContext('2d');

  if (!hCtx) return { fundusUrl, heatmapUrl: '' };

  // Jet / Turbo palette generator (blue -> cyan -> green -> yellow -> red)
  // Transparent base
  hCtx.clearRect(0, 0, size, size);

  // Retinal clip
  hCtx.save();
  hCtx.beginPath();
  hCtx.arc(center, center, radius, 0, Math.PI * 2);
  hCtx.clip();

  // Create subtle baseline gradient (cool dark blue)
  hCtx.fillStyle = 'rgba(15, 23, 42, 0.15)';
  hCtx.fillRect(0, 0, size, size);

  // Add attention hotspots according to stage pathology locations:
  interface Hotspot {
    x: number;
    y: number;
    r: number;
    intensity: number;
  }

  const hotspots: Hotspot[] = [];

  if (stage === 0) {
    // Mild attention on normal vascular arcade bifurcations
    hotspots.push(
      { x: discX + 45, y: discY - 50, r: 65, intensity: 0.4 },
      { x: discX + 45, y: discY + 50, r: 60, intensity: 0.35 }
    );
  } else if (stage === 1) {
    // Focused around microaneurysms near macula
    hotspots.push(
      { x: foveaX - 20, y: foveaY - 15, r: 70, intensity: 0.75 },
      { x: foveaX + 30, y: foveaY + 20, r: 50, intensity: 0.6 }
    );
  } else if (stage === 2) {
    // Hemorrhage clusters and hard exudates
    hotspots.push(
      { x: foveaX + 25, y: foveaY - 30, r: 85, intensity: 0.85 },
      { x: center - 10, y: center + 35, r: 75, intensity: 0.75 },
      { x: discX + 70, y: discY - 45, r: 55, intensity: 0.6 }
    );
  } else if (stage === 3) {
    // Exact match for user's screenshot 6 & 11!
    // Prominent hotspots on upper temporal quadrant and lower temporal arcade
    hotspots.push(
      { x: center + 75, y: center - 60, r: 90, intensity: 0.98 }, // red core in upper right
      { x: center - 65, y: center + 35, r: 70, intensity: 0.85 }, // elongated oval in mid-left
      { x: center + 55, y: center + 70, r: 65, intensity: 0.7 }
    );
  } else if (stage === 4) {
    // Massive hotspot over optic disc neovascularization and vitreous bleed
    hotspots.push(
      { x: discX + 15, y: discY, r: 105, intensity: 0.99 },
      { x: center + 25, y: center + 45, r: 95, intensity: 0.92 },
      { x: center + 80, y: center - 50, r: 65, intensity: 0.8 }
    );
  }

  // Draw smooth gaussian heat blobs
  for (const spot of hotspots) {
    const radGrad = hCtx.createRadialGradient(spot.x, spot.y, 2, spot.x, spot.y, spot.r);
    if (spot.intensity > 0.8) {
      radGrad.addColorStop(0, 'rgba(239, 68, 68, 0.95)'); // Bright Red
      radGrad.addColorStop(0.3, 'rgba(249, 115, 22, 0.8)'); // Orange
      radGrad.addColorStop(0.55, 'rgba(234, 179, 8, 0.65)'); // Yellow
      radGrad.addColorStop(0.75, 'rgba(34, 197, 94, 0.4)'); // Green
      radGrad.addColorStop(0.9, 'rgba(6, 182, 212, 0.2)'); // Cyan
      radGrad.addColorStop(1, 'rgba(59, 130, 246, 0)');
    } else if (spot.intensity > 0.6) {
      radGrad.addColorStop(0, 'rgba(245, 158, 11, 0.85)'); // Amber
      radGrad.addColorStop(0.4, 'rgba(234, 179, 8, 0.6)');
      radGrad.addColorStop(0.7, 'rgba(16, 185, 129, 0.35)');
      radGrad.addColorStop(1, 'rgba(59, 130, 246, 0)');
    } else {
      radGrad.addColorStop(0, 'rgba(6, 182, 212, 0.7)');
      radGrad.addColorStop(0.5, 'rgba(59, 130, 246, 0.4)');
      radGrad.addColorStop(1, 'rgba(37, 99, 235, 0)');
    }

    hCtx.fillStyle = radGrad;
    hCtx.beginPath();
    hCtx.arc(spot.x, spot.y, spot.r, 0, Math.PI * 2);
    hCtx.fill();
  }

  hCtx.restore();

  const heatmapUrl = heatmapCanvas.toDataURL('image/png');

  return { fundusUrl, heatmapUrl };
}

// 5 verified sample scans corresponding to screenshot 4/5/6:
export const SAMPLE_SCANS: Record<DRStageIndex, SampleScanData> = {
  0: {
    stage: 0,
    fileName: '0af2632b781a.png',
    fileSize: '61.4 KB',
    resolution: '224 × 224 px',
    confidence: 94.6,
    probabilities: [94.6, 3.8, 1.2, 0.3, 0.1],
    dominantRegions: [
      { x: 35, y: 50, radius: 18, intensity: 0.35, description: 'Physiologic optic nerve head' },
      { x: 62, y: 54, radius: 15, intensity: 0.28, description: 'Normal macula avascular zone' },
    ],
    focusFeature: 'Intact retinal vessel arcades without microvascular leakage',
    notes: 'Optimal clarity with preserved retinal pigment epithelium layer.',
    imageUrl: '',
    heatmapUrl: '',
  },
  1: {
    stage: 1,
    fileName: '0c2e6acf44b9.png',
    fileSize: '64.2 KB',
    resolution: '224 × 224 px',
    confidence: 78.4,
    probabilities: [14.2, 78.4, 5.6, 1.3, 0.5],
    dominantRegions: [
      { x: 60, y: 48, radius: 22, intensity: 0.75, description: 'Parafoveal microaneurysm focus' },
    ],
    focusFeature: 'Isolated microaneurysms detected in parafoveal capillary net',
    notes: 'Earliest identifiable NPDR sign; no hard exudates detected.',
    imageUrl: '',
    heatmapUrl: '',
  },
  2: {
    stage: 2,
    fileName: '0d08d4a4600f.png',
    fileSize: '65.8 KB',
    resolution: '224 × 224 px',
    confidence: 71.2,
    probabilities: [2.1, 14.5, 71.2, 9.8, 2.4],
    dominantRegions: [
      { x: 64, y: 45, radius: 25, intensity: 0.85, description: 'Lipid exudates & dot hemorrhages' },
      { x: 48, y: 58, radius: 20, intensity: 0.72, description: 'Mid-peripheral blot hemorrhage' },
    ],
    focusFeature: 'Multiple intraretinal blot hemorrhages and hard exudates',
    notes: 'Moderate NPDR; macula threatened by proximate exudation.',
    imageUrl: '',
    heatmapUrl: '',
  },
  3: {
    stage: 3,
    fileName: '0cb14014117d.png', // Exact match from user screenshots 5 & 6!
    fileSize: '66.6 KB',
    resolution: '224 × 224 px',
    confidence: 60.3, // Exact match from screenshot 5 (60.3%)!
    probabilities: [0.2, 0.2, 15.1, 60.3, 24.1], // Exact match from screenshot 5!
    dominantRegions: [
      { x: 68, y: 35, radius: 28, intensity: 0.98, description: 'Upper temporal arcade severe hemorrhage cluster' },
      { x: 35, y: 58, radius: 24, intensity: 0.85, description: 'Venous beading & cotton wool ischemia' },
      { x: 64, y: 68, radius: 22, intensity: 0.7, description: 'Inferior quadrant microvascular abnormalities' },
    ],
    focusFeature: 'Prominent intraretinal hemorrhages (4 quadrants), venous beading, or IRMA',
    notes: 'High-Risk Referable DR. High likelihood of progression to proliferative stage.',
    imageUrl: '',
    heatmapUrl: '',
  },
  4: {
    stage: 4,
    fileName: '0e3a0429f52c.png',
    fileSize: '69.1 KB',
    resolution: '224 × 224 px',
    confidence: 90.3, // Matches history list in screenshot 3!
    probabilities: [0.1, 0.3, 2.8, 6.5, 90.3],
    dominantRegions: [
      { x: 33, y: 52, radius: 30, intensity: 0.99, description: 'Active neovascularization of the optic disc (NVD)' },
      { x: 55, y: 62, radius: 28, intensity: 0.92, description: 'Preretinal/vitreous pooling hemorrhage' },
    ],
    focusFeature: 'Neovascularization fronds (NVD/NVE) and preretinal vitreous hemorrhage',
    notes: 'Critical surgical/anti-VEGF evaluation required immediately.',
    imageUrl: '',
    heatmapUrl: '',
  },
};
