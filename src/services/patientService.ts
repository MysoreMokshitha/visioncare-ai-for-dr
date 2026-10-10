import { PatientProfile } from '../types';
import { INITIAL_PATIENTS } from '../data/demoData';

const STORAGE_KEY = 'visioncare_patients_v1';

export function getPatients(): PatientProfile[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PATIENTS));
      return INITIAL_PATIENTS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PATIENTS));
      return INITIAL_PATIENTS;
    }
    return parsed;
  } catch (e) {
    console.error('Failed to load patients from storage:', e);
    return INITIAL_PATIENTS;
  }
}

export function savePatient(patient: PatientProfile): PatientProfile[] {
  const current = getPatients();
  const existingIdx = current.findIndex((p) => p.id === patient.id);
  let updated: PatientProfile[];
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = patient;
  } else {
    updated = [patient, ...current];
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save patient:', e);
  }
  return updated;
}

export function deletePatient(patientId: string): PatientProfile[] {
  const current = getPatients();
  const updated = current.filter((p) => p.id !== patientId);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to delete patient:', e);
  }
  return updated;
}

export function generateNextPatientId(): string {
  const patients = getPatients();
  const year = new Date().getFullYear();
  let maxSeq = 4;
  for (const p of patients) {
    const match = p.id.match(/^VC-(\d{4})-(\d+)$/);
    if (match && match[2]) {
      const seq = parseInt(match[2], 10);
      if (!isNaN(seq) && seq > maxSeq) {
        maxSeq = seq;
      }
    }
  }
  const nextSeq = String(maxSeq + 1).padStart(5, '0');
  return `VC-${year}-${nextSeq}`;
}
