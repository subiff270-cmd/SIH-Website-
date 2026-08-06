import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, AlertTriangle, CheckCircle2, ShieldCheck, ArrowRight, Building, Ban, Zap, Star } from 'lucide-react';
import { AIAnalysisResult } from '../../types';
import { AISeverityExplanationWidget } from './AISeverityExplanationWidget';

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

  const isFake = analysis?.isFake;
  const isDuplicate = analysis?.duplicateMatchFound;
  const priorityScore = analysis?.priorityScore || (analysis?.urgencyIndex ? analysis.urgencyIndex * 10 : 85);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className={`relative w-full max-w-3xl rounded-3xl bg-slate-900/90 border shadow-glowCyan overflow-hidden flex flex-col md:flex-row ${
            isFake ? 'border-rose-500/80 shadow-[0_0_40px_rgba(244,63,94,0.6)]' : 'border-cyan-500/40'
          }`}
        >
          {/* Left Image View with Laser Scanner Animation */}
          <div className="relative w-full md:w-1/2 bg-black min-h-[320px] flex items-center justify-center overflow-hidden">
            <img src={imageUrl} alt="Uploaded Defect" className="w-full h-full object-cover opacity-80" />

            {/* Laser Line Scan Effect */}
            {isAnalyzing && (
              <>
                <motion.div
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#06B6D4] z-10"
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                />
                <div className="absolute inset-0 bg-cyan-500/10 backdrop-hue-rotate-90 pointer-events-none" />
                <div className="absolute flex flex-col items-center gap-2 text-cyan-300 font-mono text-xs z-20">
                  <Cpu className="w-8 h-8 animate-spin" />
                  <span>YOLOv8 Neural Detection & Fake Filter Check...</span>
                </div>
              </>
            )}

            {/* Bounding Box Highlights (When Analysis Complete) */}
            {!isAnalyzing && analysis && !isFake && (
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

            {/* Fake Detection Overlay Stamp */}
            {!isAnalyzing && isFake && (
              <div className="absolute inset-0 bg-rose-950/70 flex flex-col items-center justify-center p-4 text-center z-20">
                <Ban className="w-16 h-16 text-rose-500 animate-bounce mb-2" />
                <span className="text-sm font-extrabold text-rose-300 font-mono uppercase tracking-wider">
                  REJECTED BY AI TRASH FILTER
                </span>
                <span className="text-[11px] text-rose-200 font-mono mt-1 max-w-xs">
                  Non-civic photo detected. Image contains no municipal infrastructure defect.
                </span>
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
                {analysis && !isFake && (
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {analysis.confidenceScore}% Confidence
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold text-white font-display mb-1">
                {isAnalyzing
                  ? 'Running AI Classification...'
                  : isFake
                  ? '⚠️ Fake Complaint Rejected'
                  : `AI Detected: ${analysis?.detectedCategory.replace('_', ' ')}`}
              </h3>

              {isAnalyzing ? (
                <p className="text-xs text-slate-400 font-mono">
                  Executing computer vision object detection, fake photo filter, geospatial proximity check, and department matrix routing...
                </p>
              ) : isFake ? (
                <div className="p-3.5 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-300 space-y-1 text-xs font-mono mt-3">
                  <div className="flex items-center gap-2 font-bold text-rose-200">
                    <AlertTriangle className="w-4 h-4" /> Fake / Non-Civic Image Detected
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    {analysis.fakeReason || 'AI analysis determined this upload is not a municipal defect. Submission blocked to keep triage clean.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-3 mt-3 text-xs">
                  {/* Severity & Priority Score */}
                  <div className="grid grid-cols-2 gap-2 font-mono">
                    <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
                      <span className="text-[10px] text-slate-400 block">SEVERITY LEVEL</span>
                      <span className={`font-bold text-sm ${
                        analysis?.severityScore === 'DANGEROUS' || analysis?.severityScore === 'CRITICAL' 
                          ? 'text-rose-400' 
                          : 'text-amber-400'
                      }`}>
                        {analysis?.severityScore || 'DANGEROUS'}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-800/80 border border-cyan-500/30">
                      <span className="text-[10px] text-slate-400 block">PRIORITY SCORE</span>
                      <div className="flex items-center gap-1.5">
                        <Zap className="w-4 h-4 text-amber-400 animate-pulse" />
                        <span className="font-extrabold text-sm text-cyan-300">
                          {priorityScore}/100
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Priority Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono text-slate-400">
                      <span>Priority Rank</span>
                      <span className="text-cyan-300 font-bold">{priorityScore >= 85 ? '🚨 High Priority Urgent SLA' : 'Standard Queue'}</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${priorityScore}%` }}
                        transition={{ duration: 1 }}
                        className={`h-full rounded-full ${
                          priorityScore >= 85 ? 'bg-gradient-to-r from-amber-500 to-rose-500 shadow-glowRose' : 'bg-cyan-400'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Auto Department Route */}
                  <div className="p-3 rounded-xl bg-slate-800/60 border border-cyan-500/30 flex items-center gap-3">
                    <Building className="w-5 h-5 text-cyan-400 shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-400 font-mono block">SMART AUTO-ROUTED DEPARTMENT</span>
                      <span className="text-xs font-semibold text-slate-100">{analysis?.suggestedDepartment}</span>
                    </div>
                  </div>

                  {/* Duplicate Check Alert & Fraud Cancellation */}
                  {isDuplicate ? (
                    <div className="p-3.5 rounded-2xl bg-rose-500/20 border-2 border-rose-500/60 text-rose-300 space-y-1.5 font-mono">
                      <div className="flex items-center gap-2 font-bold text-xs text-rose-200">
                        <AlertTriangle className="w-4 h-4 text-rose-400 animate-bounce" />
                        DUPLICATE COMPLAINT DETECTED — REWARD CANCELLED
                      </div>
                      <p className="text-[11px] leading-relaxed text-rose-200/90">
                        {analysis?.duplicateCancelReason || `This defect was already reported nearby or matches an existing photo. Merged into Master Ticket #${analysis.parentTicketId}.`}
                      </p>
                      <div className="p-2 rounded-xl bg-slate-950/80 border border-rose-500/40 text-[10px] text-rose-300 flex items-center justify-between font-bold">
                        <span>Citizen Reward Points Status:</span>
                        <span className="text-rose-400 uppercase bg-rose-500/20 px-2 py-0.5 rounded">0 Pts (Duplicate Submission Cancelled)</span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 flex items-center justify-between font-mono text-xs">
                      <span className="flex items-center gap-1.5 font-bold">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        Original Defect Confirmed
                      </span>
                      <span className="text-[10px] font-bold bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-300">+50 Pts Reward Granted</span>
                    </div>
                  )}

                  {/* AI Summary */}
                  <p className="text-slate-300 text-[11px] font-mono italic bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                    "{analysis?.aiSummary}"
                  </p>

                  {/* ═══ SPATIAL MEASUREMENT & SEVERITY MATRIX BREAKDOWN ═══ */}
                  <div className="pt-2">
                    <AISeverityExplanationWidget
                      spatialData={analysis?.spatialEstimation}
                      category={analysis?.detectedCategory}
                      priorityScore={priorityScore}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-mono hover:bg-slate-700"
              >
                {isFake ? 'Dismiss' : 'Cancel / Change Photo'}
              </button>
              {onConfirmSubmit && !isAnalyzing && !isFake && (
                <button
                  onClick={onConfirmSubmit}
                  className="btn-neon px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold font-mono shadow-glowCyan flex items-center gap-1.5"
                >
                  Confirm & Route to {analysis?.suggestedDepartment?.split(' ')[0]} <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
