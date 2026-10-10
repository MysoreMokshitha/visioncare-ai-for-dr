import React from 'react';
import { ShieldCheck, Maximize2, Sun, Focus, AlertTriangle, Layers } from 'lucide-react';
import { ImageQualityMetrics } from '../../types';

interface ImageQualityCardProps {
  metrics: ImageQualityMetrics;
}

export const ImageQualityCard: React.FC<ImageQualityCardProps> = ({ metrics }) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <span>Image Quality Check</span>
        </h4>
        <span
          className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
            metrics.overallStatus === 'Optimal'
              ? 'bg-teal-50 text-teal-800 border-teal-200'
              : metrics.overallStatus === 'Acceptable'
              ? 'bg-amber-50 text-amber-800 border-amber-200'
              : 'bg-rose-50 text-rose-800 border-rose-200'
          }`}
        >
          {metrics.overallStatus}
        </span>
      </div>

      {/* Metrics Rows */}
      <div className="space-y-2.5 text-xs">
        <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
          <span className="text-slate-600 flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            <span>Image Type</span>
          </span>
          <span className="font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-100">
            {metrics.isRetinalLike
              ? 'Retinal / Fundus Structure Detected'
              : 'Non-Retinal Image / Inconclusive'}
          </span>
        </div>

        <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
          <span className="text-slate-600 flex items-center gap-2">
            <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
            <span>Resolution</span>
          </span>
          <span className="font-mono font-semibold text-slate-800">
            {metrics.resolution.width} × {metrics.resolution.height} px
          </span>
        </div>

        <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
          <span className="text-slate-600 flex items-center gap-2">
            <Sun className="w-3.5 h-3.5 text-slate-400" />
            <span>Brightness</span>
          </span>
          <span className="font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-100">
            {metrics.brightness}
          </span>
        </div>

        <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
          <span className="text-slate-600 flex items-center gap-2">
            <Focus className="w-3.5 h-3.5 text-slate-400" />
            <span>Blur</span>
          </span>
          <span className="font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-100">
            {metrics.blur}
          </span>
        </div>

        <div className="flex items-center justify-between py-1.5">
          <span className="text-slate-600 flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
            <span>Overall Quality</span>
          </span>
          <span className="font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-100">
            {metrics.overallStatus}
          </span>
        </div>
      </div>

      {/* Advisory Warnings if any */}
      {metrics.notes.length > 0 && (
        <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/80 flex items-start gap-2 text-xs text-amber-900">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            {metrics.notes.map((note, idx) => (
              <p key={idx} className="leading-relaxed text-[11px]">
                {note}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
