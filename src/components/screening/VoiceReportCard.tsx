import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Mic } from 'lucide-react';
import { PredictionResult } from '../../types';
import { voiceReportService } from '../../services/voiceReportService';

interface VoiceReportCardProps {
  result: PredictionResult;
  autoPlayVoice: boolean;
  onToggleAutoPlay: (enabled: boolean) => void;
}

export const VoiceReportCard: React.FC<VoiceReportCardProps> = ({
  result,
  autoPlayVoice,
  onToggleAutoPlay,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const isSupported = voiceReportService.isSupported();

  useEffect(() => {
    voiceReportService.setOnStateChange((speaking) => {
      setIsPlaying(speaking);
    });

    return () => {
      voiceReportService.stop();
    };
  }, []);

  const handleTogglePlay = () => {
    if (isPlaying) {
      voiceReportService.stop();
    } else {
      voiceReportService.speak(result, () => {
        setIsPlaying(false);
      });
    }
  };

  return (
    <div className="bg-sky-50/50 rounded-2xl p-5 border border-sky-100/90 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left Side: Icon & Details matching Screenshot 8 */}
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow-xs shrink-0">
            <Volume2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-slate-900 tracking-tight">
                AI Voice Report
              </h4>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isPlaying
                    ? 'bg-amber-100 text-amber-800 animate-pulse'
                    : 'bg-sky-100 text-sky-800'
                }`}
              >
                {isPlaying ? 'PLAYING' : 'READY'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 max-w-sm">
              Listen to a professional news-reporter style summary of the screening findings and educational guidance.
            </p>
          </div>
        </div>

        {/* Right Side: Play Button & Auto-play Checkbox */}
        <div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
          <button
            onClick={handleTogglePlay}
            disabled={!isSupported}
            className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
              isPlaying
                ? 'bg-rose-600 hover:bg-rose-700 text-white'
                : 'bg-gradient-to-r from-sky-500 to-cyan-600 hover:from-sky-600 hover:to-cyan-700 text-white'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isPlaying ? (
              <>
                <VolumeX className="w-4 h-4" />
                <span>Stop Voice Report</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" />
                <span>AI Voice Report</span>
              </>
            )}
          </button>

          <label className="flex items-center gap-1.5 text-[11px] text-slate-500 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={autoPlayVoice}
              onChange={(e) => onToggleAutoPlay(e.target.checked)}
              className="rounded-sm text-cyan-600 focus:ring-cyan-500"
            />
            <span>Auto-play voice after analysis</span>
          </label>
        </div>
      </div>
    </div>
  );
};
