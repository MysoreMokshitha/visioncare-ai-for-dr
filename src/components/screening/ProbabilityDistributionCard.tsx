import React from 'react';
import { BarChart3 } from 'lucide-react';
import { ClassProbability, DRStageIndex } from '../../types';

interface ProbabilityDistributionCardProps {
  probabilities: ClassProbability[];
  predictedStage: DRStageIndex;
}

export const ProbabilityDistributionCard: React.FC<ProbabilityDistributionCardProps> = ({
  probabilities,
  predictedStage,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
      {/* Header matching Screenshot 5 */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-cyan-600" />
            <span>Prediction Confidence</span>
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Model probability distribution across all 5 severity stages
          </p>
        </div>
        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
          5-Class Model
        </span>
      </div>

      {/* Probability Bars */}
      <div className="space-y-3 pt-2">
        {probabilities.map((item) => {
          const isSelected = item.stage === predictedStage;
          return (
            <div key={item.stage} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span
                  className={`${
                    isSelected
                      ? 'font-bold text-slate-900'
                      : 'font-medium text-slate-600'
                  }`}
                >
                  {item.label}
                </span>
                <span
                  className={`font-mono ${
                    isSelected
                      ? 'font-bold text-cyan-800'
                      : 'text-slate-500'
                  }`}
                >
                  {item.probability.toFixed(1)}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isSelected
                      ? 'bg-gradient-to-r from-sky-500 to-cyan-600 shadow-xs'
                      : 'bg-slate-300'
                  }`}
                  style={{ width: `${Math.max(1, item.probability)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
