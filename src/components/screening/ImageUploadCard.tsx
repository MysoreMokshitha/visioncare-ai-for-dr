import React, { useRef, useState } from 'react';
import { UploadCloud, Camera, Info, Sparkles } from 'lucide-react';
import { DRStageIndex } from '../../types';

interface ImageUploadCardProps {
  onFileSelected: (file: File) => void;
  onSelectSamplePreset: (stage: DRStageIndex) => void;
  selectedPresetStage: DRStageIndex | null;
}

export const ImageUploadCard: React.FC<ImageUploadCardProps> = ({
  onFileSelected,
  onSelectSamplePreset,
  selectedPresetStage,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        onFileSelected(file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelected(e.target.files[0]);
    }
  };

  const samplePresets: { stage: DRStageIndex; label: string }[] = [
    { stage: 0, label: '0 — No DR' },
    { stage: 1, label: '1 — Mild' },
    { stage: 2, label: '2 — Moderate' },
    { stage: 3, label: '3 — Severe' },
    { stage: 4, label: '4 — Proliferative DR' },
  ];

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4">
      {/* Drag & Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
          isDragging
            ? 'border-cyan-500 bg-cyan-50/50 scale-[1.01]'
            : 'border-cyan-200 bg-gradient-to-b from-sky-50/30 to-white hover:border-cyan-400'
        }`}
      >
        <div className="w-12 h-12 mx-auto rounded-full bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 mb-3 shadow-2xs">
          <UploadCloud className="w-6 h-6" />
        </div>

        <h4 className="text-base font-bold text-slate-900 tracking-tight">
          Upload Retinal / Fundus Image
        </h4>
        <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
          Drag & drop your image here or browse from your device.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".jpg,.jpeg,.png,image/jpeg,image/png"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-600 text-white font-semibold text-xs shadow-xs hover:from-sky-600 hover:to-cyan-700 transition-all cursor-pointer"
          >
            Browse Image
          </button>

          <button
            onClick={() => onSelectSamplePreset(3)}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Use simulated ophthalmoscope capture"
          >
            <Camera className="w-3.5 h-3.5 text-teal-600" />
            <span>Use Imaging Device</span>
          </button>
        </div>

        <p className="text-[11px] text-slate-400 mt-3">
          Supported: JPG, JPEG, PNG • Max Size: 20 MB
        </p>
      </div>

      {/* Hardware Note */}
      <div className="p-3 bg-sky-50/70 rounded-xl border border-sky-100 flex items-start gap-2 text-xs text-sky-900">
        <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed text-[11px]">
          Diabetic retinopathy analysis requires a retinal/fundus image. A standard phone or webcam cannot reliably capture retinal structures.
        </p>
      </div>

      {/* Verified Preset Chips */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
          <span>Or test with verified retinal scans:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {samplePresets.map((preset) => {
            const isSelected = selectedPresetStage === preset.stage;
            return (
              <button
                key={preset.stage}
                onClick={() => onSelectSamplePreset(preset.stage)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-600 text-white border-cyan-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-cyan-50 hover:border-cyan-300'
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
