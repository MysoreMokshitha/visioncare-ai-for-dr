import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ScreeningPage } from './pages/ScreeningPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { AboutPage } from './pages/AboutPage';
import { HistoryPage } from './pages/HistoryPage';
import { DoctorAccessPage } from './pages/DoctorAccessPage';
import { PatientPortalModal } from './components/modals/PatientPortalModal';
import { HistoryModal } from './components/modals/HistoryModal';
import { SafetyNoticeModal } from './components/modals/SafetyNoticeModal';
import { PatientProfile, PredictionResult } from './types';
import {
  getPatients,
  savePatient,
  deletePatient,
} from './services/patientService';
import {
  getScreeningHistory,
  saveScreeningRecord,
  deleteScreeningRecord,
  resetDemoScreenings,
} from './services/historyService';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');

  // Patient profiles state
  const [patients, setPatients] = useState<PatientProfile[]>(() => getPatients());
  const [activePatient, setActivePatient] = useState<PatientProfile>(() => {
    const list = getPatients();
    // Default to Srujana Sree (VC-2026-00004) matching reference screenshots
    return list.find((p) => p.id === 'VC-2026-00004') || list[0];
  });

  // Longitudinal screening history state
  const [screeningRecords, setScreeningRecords] = useState<PredictionResult[]>(() =>
    getScreeningHistory()
  );

  // Active screening result loaded in the Screening Workstation
  const [currentResult, setCurrentResult] = useState<PredictionResult | null>(() => {
    const records = getScreeningHistory();
    return records.length > 0 ? records[0] : null;
  });

  // Modals state
  const [isPatientPortalOpen, setIsPatientPortalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isSafetyNoticeOpen, setIsSafetyNoticeOpen] = useState(false);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Handle saving new or updated patient
  const handleSavePatient = (patient: PatientProfile) => {
    const updated = savePatient(patient);
    setPatients(updated);
    setActivePatient(patient);
  };

  // Handle new screening record created
  const handleRecordCreated = (record: PredictionResult) => {
    const updated = saveScreeningRecord(record);
    setScreeningRecords(updated);

    // Update patient's screening count
    const updatedPatient: PatientProfile = {
      ...activePatient,
      previousScreeningsCount: (activePatient.previousScreeningsCount || 0) + 1,
    };
    handleSavePatient(updatedPatient);
  };

  // Handle deleting screening record
  const handleDeleteRecord = (id: string) => {
    const updated = deleteScreeningRecord(id);
    setScreeningRecords(updated);
    if (currentResult?.screeningId === id) {
      setCurrentResult(updated.length > 0 ? updated[0] : null);
    }
  };

  // Handle reset demo records
  const handleResetDemoData = () => {
    const resetRecords = resetDemoScreenings();
    setScreeningRecords(resetRecords);
    if (resetRecords.length > 0) {
      setCurrentResult(resetRecords[0]);
    }
  };

  // Inspect specific historical record in Screening station
  const handleOpenRecordInScreening = (record: PredictionResult) => {
    setCurrentResult(record);
    const p = patients.find((pt) => pt.id === record.patientId);
    if (p) setActivePatient(p);
    setCurrentPage('screening');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f6fc] text-slate-800 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Global Navigation Header matching Screenshot 1 & 4 */}
      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        activePatient={activePatient}
        onOpenPatientPortal={() => setIsPatientPortalOpen(true)}
        onOpenHistoryModal={() => setIsHistoryModalOpen(true)}
        onOpenSafetyNotice={() => setIsSafetyNoticeOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={setCurrentPage}
            onOpenPatientPortal={() => setIsPatientPortalOpen(true)}
          />
        )}

        {currentPage === 'screening' && (
          <ScreeningPage
            activePatient={activePatient}
            onOpenPatientPortal={() => setIsPatientPortalOpen(true)}
            onOpenHistoryModal={() => setIsHistoryModalOpen(true)}
            onRecordCreated={handleRecordCreated}
            currentResult={currentResult}
            setCurrentResult={setCurrentResult}
          />
        )}

        {currentPage === 'how-it-works' && (
          <HowItWorksPage onNavigate={setCurrentPage} />
        )}

        {currentPage === 'about' && <AboutPage />}

        {currentPage === 'history' && (
          <HistoryPage
            records={screeningRecords}
            patients={patients}
            onOpenScreeningWithRecord={handleOpenRecordInScreening}
            onNewScreening={() => {
              setCurrentPage('screening');
            }}
            onDeleteRecord={handleDeleteRecord}
            onResetDemoData={handleResetDemoData}
          />
        )}

        {currentPage === 'doctor-access' && (
          <DoctorAccessPage
            records={screeningRecords}
            patients={patients}
            onOpenScreeningWithRecord={handleOpenRecordInScreening}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={setCurrentPage}
        onOpenSafetyNotice={() => setIsSafetyNoticeOpen(true)}
      />

      {/* Modals matching Screenshots 2 & 3 */}
      <PatientPortalModal
        isOpen={isPatientPortalOpen}
        onClose={() => setIsPatientPortalOpen(false)}
        activePatient={activePatient}
        patients={patients}
        onSelectPatient={(p) => setActivePatient(p)}
        onSavePatient={handleSavePatient}
        onProceedToScreening={() => {
          setIsPatientPortalOpen(false);
          setCurrentPage('screening');
        }}
        onViewHistory={() => {
          setIsPatientPortalOpen(false);
          setIsHistoryModalOpen(true);
        }}
      />

      <HistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        activePatient={activePatient}
        records={screeningRecords}
        onSelectRecord={handleOpenRecordInScreening}
        onNewScreening={() => {
          setIsHistoryModalOpen(false);
          setCurrentPage('screening');
        }}
        onDeleteRecord={handleDeleteRecord}
      />

      <SafetyNoticeModal
        isOpen={isSafetyNoticeOpen}
        onClose={() => setIsSafetyNoticeOpen(false)}
      />
    </div>
  );
}
