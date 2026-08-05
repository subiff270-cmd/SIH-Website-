import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, CheckCircle, Volume2 } from 'lucide-react';

interface VoiceRecorderProps {
  onTranscriptionComplete: (text: string) => void;
}

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onTranscriptionComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [transcribedText, setTranscribedText] = useState('');

  useEffect(() => {
    let timer: any;
    if (isRecording) {
      timer = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingSeconds(0);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording and simulate Speech-to-Text translation
      setIsRecording(false);
      const simulatedSpeech =
        'Deep pothole formation near metro pillar line causing major traffic slowdown and danger during monsoon.';
      setTranscribedText(simulatedSpeech);
      onTranscriptionComplete(simulatedSpeech);
    } else {
      setIsRecording(true);
      setTranscribedText('');
    }
  };

  return (
    <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-cyan-400" /> Voice Note Description (AI Speech-to-Text)
        </label>
        {isRecording && (
          <span className="text-xs font-mono text-rose-400 animate-pulse flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-500" /> REC 00:0{recordingSeconds}
          </span>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={toggleRecording}
          className={`p-3 rounded-full transition-all duration-300 flex items-center justify-center ${
            isRecording
              ? 'bg-rose-500 text-white shadow-[0_0_20px_rgba(244,63,94,0.6)] animate-pulse'
              : 'bg-slate-800 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/30'
          }`}
        >
          {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        {isRecording ? (
          <div className="flex-1 flex items-center gap-1 h-8">
            {[40, 75, 30, 90, 50, 85, 20, 95, 60, 45, 80].map((h, idx) => (
              <motion.div
                key={idx}
                animate={{ height: ['20%', `${h}%`, '20%'] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: idx * 0.05 }}
                className="flex-1 bg-cyan-400 rounded-full"
              />
            ))}
          </div>
        ) : (
          <div className="flex-1 text-xs text-slate-400 italic">
            {transcribedText ? (
              <span className="text-slate-200 not-italic flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> "{transcribedText}"
              </span>
            ) : (
              'Click mic to record verbal complaint details (Supports Hindi, English, Tamil, Marathi)...'
            )}
          </div>
        )}
      </div>
    </div>
  );
};
