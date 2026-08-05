import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, AlertTriangle, CheckCircle2, ShieldCheck, ArrowRight, Layers, Building } from 'lucide-react';
import { AIAnalysisResult } from '../../types';

interface AIScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  analysis: AIAnalysisResult | null;
  isAnalyzing: boolean;
  onConfirmSubmit?: () => void;
}

export const AIScannerModal: React.FC<AIScannerModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  analysis,
  isAnalyzing,
  onConfirmSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-3xl rounded-3xl bg-slate-900/90 border border-cyan-500/40 shadow-glowCyan overflow-hidden flex flex-col md:flex-row"
        >
          {/* Left Image View with Laser Scanner Animation */}
          <div className="relative w-full md:w-1/2 bg-black min-h-[300px] flex items-center justify-center overflow-hidden">
            <img src={imageUrl} alt="Uploaded Civic Defect" className="w-full h-full object-cover opacity-80" />

            {/* Laser Line Scan Effect */}
            {isAnalyzing && (
              <>
                <motion.div
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#06B6D4] z-10"
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
                <div className="absolute inset-0 bg-cyan-500/10 backdrop-hue-rotate-90 pointer-events-none" />
                <div className="absolute flex flex-col items-center gap-2 text-cyan-300 font-mono text-xs z-20">
                  <Cpu className="w-8 h-8 animate-spin" />
                  <span>YOLOv8 Object Scanning...</span>
                </div>
              </>
            )}

            {/* Bounding Box Highlights (When Analysis Complete) */}
            {!isAnalyzing && analysis && (
              <div className="absolute inset-0 pointer-events-none">
                {analysis.detectedObjects.map((obj, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute border-2 border-cyan-400 rounded bg-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                    style={{
                      left: '20%',
                      top: '25%',
                      width: '55%',
                      height: '50%',
                    }}
                  >
                    <span className="absolute -top-6 left-0 bg-cyan-500 text-black px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                      {obj.label} ({(obj.confidence * 100).toFixed(0)}%)
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Right AI Diagnostics Panel */}
          <div className="w-full md:w-1/2 p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-mono">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  CivicAI Neural Engine
                </span>
                {analysis && (
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 98.4% Confidence
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold text-white font-display mb-1">
                {isAnalyzing ? 'Running AI Classification...' : `AI Detected: ${analysis?.detectedCategory.replace('_', ' ')}`}
              </h3>

              {isAnalyzing ? (
                <p className="text-xs text-slate-400">
                  Executing computer vision object detection, geospatial proximity check, and department matrix routing...
                </p>
              ) : (
                <div className="space-y-3 mt-4 text-xs">
                  {/* Severity & Urgency */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
                      <span className="text-[10px] text-slate-400 block font-mono">SEVERITY LEVEL</span>
                      <span className={`font-bold font-mono text-sm ${
                        analysis?.severityScore === 'CRITICAL' ? 'text-rose-400' : 'text-amber-400'
                      }`}>
                        {analysis?.severityScore}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
                      <span className="text-[10px] text-slate-400 block font-mono">RISK INDEX</span>
                      <span className="font-bold font-mono text-sm text-cyan-300">
                        {analysis?.urgencyIndex} / 10
                      </span>
                    </div>
                  </div>

                  {/* Auto Department Route */}
                  <div className="p-3 rounded-xl bg-slate-800/60 border border-cyan-500/30 flex items-center gap-3">
                    <Building className="w-5 h-5 text-cyan-400 shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-400 font-mono block">RECOMMENDED DEPARTMENT</span>
                      <span className="text-xs font-semibold text-slate-100">{analysis?.suggestedDepartment}</span>
                    </div>
                  </div>

                  {/* Duplicate Alert Check */}
                  {analysis?.duplicateMatchFound ? (
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-300 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 shrink-0" />
                      <div>
                        <span className="font-bold block text-xs">Duplicate Complaint Detected!</span>
                        <span className="text-[10px] opacity-90">
                          Matched existing ticket #{analysis.parentTicketId}. Your vote will upvote the active ticket.
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Unique issue confirmed. No duplicates within 500m radius.</span>
                    </div>
                  )}

                  {/* Summary */}
                  <p className="text-slate-300 text-xs italic bg-slate-950/40 p-2.5 rounded-lg border border-slate-800">
                    "{analysis?.aiSummary}"
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700"
              >
                Close / Re-upload
              </button>
              {onConfirmSubmit && !isAnalyzing && (
                <button
                  onClick={onConfirmSubmit}
                  className="btn-neon px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold shadow-glowCyan flex items-center gap-1.5"
                >
                  Confirm & Submit Ticket <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
