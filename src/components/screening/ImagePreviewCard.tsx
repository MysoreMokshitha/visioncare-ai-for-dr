import React from 'react';
import { RefreshCw, Image as ImageIcon, Sparkles, Loader2 } from 'lucide-react';
import { ImageQualityMetrics } from '../../types';

interface ImagePreviewCardProps {
  imageUrl: string;
  fileName: string;
  fileSize: string;
  imageQuality: ImageQualityMetrics;
  isAnalyzing: boolean;
  onAnalyze: () => void;
  onChangeImage: () => void;
}

export const ImagePreviewCard: React.FC<ImagePreviewCardProps> = ({
  imageUrl,
  fileName,
  fileSize,
  imageQuality,
  isAnalyzing,
  onAnalyze,
  onChangeImage,
}) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-cyan-600" />
          <span>Retinal Image Preview</span>
        </h4>
        <button
          onClick={onChangeImage}
          className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1 hover:underline cursor-pointer"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Change Image</span>
        </button>
      </div>

      {/* Preview Box & Metadata Grid */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Retinal Fundus Preview Thumbnail */}
        <div className="w-36 h-36 rounded-xl bg-slate-950 p-1 border border-slate-800 flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Retinal Fundus Preview"
              className="w-full h-full object-contain rounded-lg"
            />
          ) : (
            <div className="text-slate-500 text-xs text-center p-2">
              No image preview
            </div>
          )}
        </div>

        {/* Metadata Details */}
        <div className="grid grid-cols-2 gap-3 text-xs w-full">
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
              File Name
            </p>
            <p className="font-semibold text-slate-800 font-mono mt-0.5 truncate" title={fileName}>
              {fileName}
            </p>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
              Resolution
            </p>
            <p className="font-semibold text-slate-800 mt-0.5">
              {imageQuality.resolution.width} × {imageQuality.resolution.height} px
            </p>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
              File Size
            </p>
            <p className="font-semibold text-slate-800 mt-0.5">
              {fileSize}
            </p>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
              Image Quality
            </p>
            <p className="font-semibold text-teal-700 mt-0.5">
              {imageQuality.overallStatus === 'Optimal' ? 'Good' : imageQuality.overallStatus}
            </p>
          </div>
        </div>
      </div>

      {/* Primary Action Button: Analyze Retinal Image */}
      <button
        onClick={onAnalyze}
        disabled={isAnalyzing}
        className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-600 text-white font-bold text-sm shadow-md shadow-sky-500/20 hover:from-sky-600 hover:to-cyan-700 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Analyzing Retinal Microvasculature...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            <span>Analyze Retinal Image</span>
          </>
        )}
      </button>
    </div>
  );
};
