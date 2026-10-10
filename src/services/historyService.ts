import { PredictionResult } from '../types';
import { INITIAL_SCREENING_RECORDS } from '../data/demoData';

const STORAGE_KEY = 'visioncare_screenings_v1';

export function getScreeningHistory(): PredictionResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SCREENING_RECORDS));
      return INITIAL_SCREENING_RECORDS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return INITIAL_SCREENING_RECORDS;
    }
    return parsed;
  } catch (e) {
    console.error('Failed to load screening history:', e);
    return INITIAL_SCREENING_RECORDS;
  }
}

export function saveScreeningRecord(record: PredictionResult): PredictionResult[] {
  const current = getScreeningHistory();
  // Avoid saving heavy image data URLs directly into localStorage if large
  // Keep originalImageUrl and gradCam if they are small data URLs, or trim if > 200KB
  const sanitizedRecord: PredictionResult = {
    ...record,
    originalImageUrl:
      record.originalImageUrl && record.originalImageUrl.length > 300000
        ? '' // Avoid localStorage quota overflow
        : record.originalImageUrl,
    gradCam: {
      ...record.gradCam,
      heatmapDataUrl:
        record.gradCam.heatmapDataUrl && record.gradCam.heatmapDataUrl.length > 300000
          ? ''
          : record.gradCam.heatmapDataUrl,
    },
  };

  const updated = [sanitizedRecord, ...current.filter((r) => r.screeningId !== record.screeningId)];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('LocalStorage quota limit reached; pruning oldest records:', e);
    const pruned = updated.slice(0, 10);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pruned));
    } catch {
      // Ignore if quota is completely restricted
    }
  }
  return updated;
}

export function deleteScreeningRecord(screeningId: string): PredictionResult[] {
  const current = getScreeningHistory();
  const updated = current.filter((r) => r.screeningId !== screeningId);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to delete screening record:', e);
  }
  return updated;
}

export function resetDemoScreenings(): PredictionResult[] {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SCREENING_RECORDS));
  } catch (e) {
    console.error(e);
  }
  return INITIAL_SCREENING_RECORDS;
}
