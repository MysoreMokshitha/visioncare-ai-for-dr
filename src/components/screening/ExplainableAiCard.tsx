import React, { useState } from 'react';
import { Sparkles, Sliders, Info, Eye } from 'lucide-react';
import { GradCamVisualizationData } from '../../types';

interface ExplainableAiCardProps {
  originalImageUrl: string;
  gradCam: GradCamVisualizationData;
}

export const ExplainableAiCard: React.FC<ExplainableAiCardProps> = ({
  originalImageUrl,
  gradCam,
}) => {
  const [activeTab, setActiveTab] = useState<'side-by-side' | 'overlay' | 'original' | 'heatmap'>('side-by-side');
  const [opacity, setOpacity] = useState<number>(55);

  const tabs = [
    { id: 'side-by-side', label: 'Side-by-Side' },
    { id: 'overlay', label: 'Overlay' },
    { id: 'original', label: 'Original' },
    { id: 'heatmap', label: 'Heatmap' },
  ] as const;

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-5">
      {/* Header matching Screenshot 6 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-600" />
            <span>Explainable AI</span>
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Retinal regions influencing the prediction
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80 text-xs font-semibold self-start sm:self-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-sky-500 text-white shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Visualization Viewport Container */}
      <div className="space-y-4">
        {/* SIDE BY SIDE MODE */}
        {activeTab === 'side-by-side' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Left: Original Retinal Image */}
            <div className="bg-slate-950 rounded-2xl p-3 border border-slate-800 shadow-md flex flex-col items-center">
              <div className="w-full flex items-center justify-between pb-2 text-[11px] font-bold text-sky-400">
                <span className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  <span>LEFT: Original Retinal Image</span>
                </span>
              </div>
              <div className="relative w-full aspect-square max-w-[280px] rounded-xl overflow-hidden bg-black flex items-center justify-center">
                {originalImageUrl ? (
                  <img
                    src={originalImageUrl}
                    alt="Original Retinal Scan"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="text-slate-500 text-xs">No image loaded</div>
                )}
              </div>
            </div>

            {/* Right: Grad-CAM++ Heatmap Overlay */}
            <div className="bg-slate-950 rounded-2xl p-3 border border-slate-800 shadow-md flex flex-col items-center">
              <div className="w-full flex items-center justify-between pb-2 text-[11px] font-bold text-cyan-400">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>RIGHT: Grad-CAM++ Heatmap Overlay</span>
                </span>
              </div>
              <div className="relative w-full aspect-square max-w-[280px] rounded-xl overflow-hidden bg-black flex items-center justify-center">
                {originalImageUrl && (
                  <img
                    src={originalImageUrl}
                    alt="Base Retinal Scan"
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                )}
                {gradCam.heatmapDataUrl && (
                  <img
                    src={gradCam.heatmapDataUrl}
                    alt="Grad-CAM++ Heatmap"
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none mix-blend-screen transition-opacity duration-150"
                    style={{ opacity: opacity / 100 }}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* OVERLAY SINGLE VIEW */}
        {activeTab === 'overlay' && (
          <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 shadow-md flex flex-col items-center max-w-md mx-auto">
            <span className="text-xs font-bold text-cyan-400 mb-2">
              Combined Heatmap & Retinal Vessel Overlay
            </span>
            <div className="relative w-full aspect-square max-w-[320px] rounded-xl overflow-hidden bg-black flex items-center justify-center">
              {originalImageUrl && (
                <img
                  src={originalImageUrl}
                  alt="Base Retinal Scan"
                  className="absolute inset-0 w-full h-full object-contain"
                />
              )}
              {gradCam.heatmapDataUrl && (
                <img
                  src={gradCam.heatmapDataUrl}
                  alt="Grad-CAM++ Heatmap"
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none mix-blend-screen transition-opacity duration-150"
                  style={{ opacity: opacity / 100 }}
                />
              )}
            </div>
          </div>
        )}

        {/* ORIGINAL ONLY */}
        {activeTab === 'original' && (
          <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 shadow-md flex flex-col items-center max-w-md mx-auto">
            <span className="text-xs font-bold text-sky-400 mb-2">
              Original High-Resolution Retinal Fundus Scan
            </span>
            <div className="relative w-full aspect-square max-w-[320px] rounded-xl overflow-hidden bg-black flex items-center justify-center">
              <img
                src={originalImageUrl}
                alt="Original Fundus Scan"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}

        {/* HEATMAP ONLY */}
        {activeTab === 'heatmap' && (
          <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 shadow-md flex flex-col items-center max-w-md mx-auto">
            <span className="text-xs font-bold text-amber-400 mb-2">
              Raw Grad-CAM++ Saliency Heatmap
            </span>
            <div className="relative w-full aspect-square max-w-[320px] rounded-xl overflow-hidden bg-black flex items-center justify-center">
              <img
                src={gradCam.heatmapDataUrl}
                alt="Raw Grad-CAM++ Heatmap"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}

        {/* Controls: Opacity Slider & Attention Scale matching Screenshot 6 */}
        <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center border-t border-slate-100">
          {/* Opacity Slider */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <span className="flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-cyan-600" />
                <span>Overlay Opacity:</span>
              </span>
              <span className="font-mono text-cyan-800 font-bold">{opacity}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
            />
          </div>

          {/* Attention Scale Legend */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
              Attention Scale:
            </span>
            <div className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 via-yellow-400 to-red-600 shadow-xs" />
            <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
              <span>Low Attention</span>
              <span>Medium Attention</span>
              <span>High Attention</span>
            </div>
          </div>
        </div>

        {/* Explanatory Callout Notice matching Screenshot 6 */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
          <Info className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
          <p className="text-[11px]">
            Highlighted regions represent image areas that contributed more strongly to the model&apos;s prediction. The heatmap is an AI explanation and should not be interpreted as precise lesion segmentation.
          </p>
        </div>
      </div>
    </div>
  );
};
