import { PredictionResult } from '../types';
import { DR_STAGES } from '../data/diseaseInformation';

class VoiceReportService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeaking = false;
  private onStateChangeCallback: ((speaking: boolean) => void) | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public isSupported(): boolean {
    return this.synth !== null;
  }

  public setOnStateChange(cb: (speaking: boolean) => void) {
    this.onStateChangeCallback = cb;
  }

  public generateReportText(result: PredictionResult): string {
    const stage = DR_STAGES[result.predictedStage];
    const eyeLabel = result.eye === 'OD' ? 'Right eye' : 'Left eye';

    return (
      `VisionCare AI screening summary. ` +
      `Screening reference: ${result.screeningId}. ` +
      `Examined eye: ${eyeLabel}. ` +
      `Screening mode: Demonstration research prototype. ` +
      `Detected stage: ${stage.name}, with a model confidence of ${result.confidence.toFixed(1)} percent. ` +
      `Clinical classification is ${stage.severityLevel} severity, ${stage.referable ? 'and is classified as referable diabetic retinopathy' : 'and does not currently require urgent referral'}. ` +
      `Recommended next step: ${stage.recommendedNextSteps}. ` +
      `Important medical disclaimer: VisionCare AI is an experimental research prototype and does not replace examination or diagnosis by a qualified eye care professional.`
    );
  }

  public speak(result: PredictionResult, onEnd?: () => void) {
    if (!this.synth) {
      console.warn('Speech synthesis not supported in this browser.');
      return;
    }

    this.stop();

    const text = this.generateReportText(result);
    const utterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance = utterance;

    // Select pleasant natural voice if available
    const voices = this.synth.getVoices();
    const preferredVoice =
      voices.find((v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel'))) ||
      voices.find((v) => v.lang.startsWith('en'));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      this.isSpeaking = true;
      if (this.onStateChangeCallback) this.onStateChangeCallback(true);
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      if (this.onStateChangeCallback) this.onStateChangeCallback(false);
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis error:', e);
      this.isSpeaking = false;
      if (this.onStateChangeCallback) this.onStateChangeCallback(false);
      if (onEnd) onEnd();
    };

    this.synth.speak(utterance);
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
      if (this.onStateChangeCallback) this.onStateChangeCallback(false);
    }
  }

  public getSpeakingStatus(): boolean {
    return this.isSpeaking;
  }
}

export const voiceReportService = new VoiceReportService();
