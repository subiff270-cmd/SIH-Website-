import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  UploadCloud, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  EyeOff, 
  Camera, 
  FileText, 
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Ban,
  Cpu,
  ShieldAlert,
  Image as ImageIcon
} from 'lucide-react';
import { useIssues } from '../context/IssueContext';
import { VoiceRecorder } from '../components/common/VoiceRecorder';
import { OriginalGPSEngine } from '../components/common/OriginalGPSEngine';
import { AIScannerModal } from '../components/ai/AIScannerModal';
import { AISeverityExplanationWidget } from '../components/ai/AISeverityExplanationWidget';
import { AIAnalysisResult, IssueCategory } from '../types';

// Inline scanning status types
type ScanStatus = 'idle' | 'scanning' | 'approved' | 'rejected';

export const ReportIssuePage: React.FC = () => {
  const navigate = useNavigate();
  const { addComplaint, runAITriage } = useIssues();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<IssueCategory>('POTHOLE');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [voiceNoteText, setVoiceNoteText] = useState('');

  // Sample presets for instant testing
  const sampleImages = [
    {
      name: 'Hazardous Pothole',
      url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
      category: 'POTHOLE' as IssueCategory,
      isFake: false
    },
    {
      name: 'Solid Waste Overflow',
      url: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
      category: 'GARBAGE' as IssueCategory,
      isFake: false
    },
    {
      name: 'Pressurized Pipe Leak',
      url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
      category: 'WATER_LEAKAGE' as IssueCategory,
      isFake: false
    },
    {
      name: '⚠️ Meme / Non-Civic (Fake Test)',
      url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80',
      category: 'POTHOLE' as IssueCategory,
      isFake: true
    }
  ];

  const [selectedImageUrl, setSelectedImageUrl] = useState<string>(sampleImages[0].url);
  const [isUserUploaded, setIsUserUploaded] = useState<boolean>(false);
  const [selectedPresetIsFake, setSelectedPresetIsFake] = useState<boolean>(false);
  const [lat, setLat] = useState<number>(28.6139);
  const [lng, setLng] = useState<number>(77.2090);
  const [address, setAddress] = useState<string>('Outer Ring Road, Near Connaught Place, New Delhi');
  const [ward, setWard] = useState<string>('Ward 14 - Central Division');
  const [city, setCity] = useState<string>('New Delhi');

  // AI Auto-Scan state (runs automatically on photo change)
  const [scanStatus, setScanStatus] = useState<ScanStatus>('idle');
  const [scanResult, setScanResult] = useState<AIAnalysisResult | null>(null);

  // Full AI Scanner Modal state
  const [aiModalOpen, setAiModalOpen] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [aiResult, setAiResult] = useState<AIAnalysisResult | null>(null);

  // Auto-scan every time the photo changes
  useEffect(() => {
    const autoScan = async () => {
      setScanStatus('scanning');
      setScanResult(null);

      // Simulate 1.5s AI processing delay
      await new Promise((r) => setTimeout(r, 1500));

      // If this was a preset marked as fake, trigger rejection
      if (selectedPresetIsFake) {
        const fakeResult: AIAnalysisResult = {
          isFake: true,
          fakeReason: 'AI Trash Filter: This is NOT a civic infrastructure issue. Image contains non-civic content (person / meme / AI art / celebrity). Submission blocked.',
          detectedCategory: 'NON_CIVIC_CONTENT',
          confidenceScore: 99.4,
          severityScore: 'LOW',
          priorityScore: 0,
          urgencyIndex: 0,
          suggestedDepartment: 'System Security',
          duplicateMatchFound: false,
          detectedObjects: [],
          aiSummary: 'REJECTED: This is not a civic issue.'
        };
        setScanResult(fakeResult);
        setScanStatus('rejected');
        return;
      }

      // For real uploads, run through the AI triage engine
      const result = await runAITriage(selectedImageUrl, description || 'Civic infrastructure defect', lat, lng);

      if (result.isFake) {
        setScanResult(result);
        setScanStatus('rejected');
      } else {
        setScanResult(result);
        setScanStatus('approved');
        setCategory(result.detectedCategory);
      }
    };

    autoScan();
  }, [selectedImageUrl]);

  // Real File Upload Handler
  const handleRealFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedImageUrl(event.target.result as string);
          setIsUserUploaded(true);
          setSelectedPresetIsFake(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRunAiAnalysis = async () => {
    setIsAnalyzing(true);
    setAiModalOpen(true);
    const result = await runAITriage(selectedImageUrl, description || 'Civic infrastructure defect', lat, lng);
    setAiResult(result);
    setCategory(result.detectedCategory);
    setIsAnalyzing(false);
  };

  const handleSubmitIssue = async () => {
    // Block submission if scan rejected
    if (scanStatus === 'rejected') return;

    await addComplaint({
      title: title || `Reported ${category.replace('_', ' ')}`,
      description: description || voiceNoteText || 'Reported via CivicAI camera upload.',
      category,
      imageUrl: selectedImageUrl,
      location: {
        lat,
        lng,
        address,
        ward,
        city
      },
      isAnonymous,
      voiceNoteUrl: voiceNoteText ? 'simulated_audio_note.wav' : undefined
    });

    navigate('/dashboard/citizen');
  };

  const isSubmitBlocked = scanStatus === 'rejected' || scanStatus === 'scanning';

  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Instant AI Triage Dropzone
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold font-display">Report a Civic Issue</h1>
          <p className="text-slate-400 text-xs md:text-sm">
            Upload your real camera photo, record voice notes, and let CivicAI auto-detect category & merge duplicates.
          </p>
        </div>

        {/* Main Form Container */}
        <div className="glass-card p-6 md:p-8 rounded-3xl border border-cyan-500/30 shadow-glassCard space-y-6">
          
          {/* REAL FILE UPLOAD AREA */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                <Camera className="w-4 h-4 text-cyan-400" /> Defect Photo Upload (Select File from Device or Use Preset)
              </label>
              {isUserUploaded && (
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Custom Photo Loaded
                </span>
              )}
            </div>

            {/* Hidden Input File Element */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleRealFileUpload}
              className="hidden"
            />

            {/* Drag and Drop / Pick File Box */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-cyan-500/40 hover:border-cyan-400 bg-slate-950/80 rounded-2xl p-6 text-center cursor-pointer transition-all hover:bg-slate-900/60 mb-4 flex flex-col items-center justify-center gap-2"
            >
              <UploadCloud className="w-10 h-10 text-cyan-400 animate-bounce" />
              <div className="text-xs font-bold text-slate-200">
                Click to Choose Image File from Device Camera / Gallery
              </div>
              <p className="text-[10px] text-slate-400 font-mono">
                Supports JPG, PNG, WEBP files up to 20MB. Real-time EXIF GPS extraction enabled.
              </p>
            </div>
            
            {/* Or Select Demo Sample Presets */}
            <span className="text-[10px] font-mono text-slate-400 uppercase block mb-2">
              Or Click Demo Sample Defect Preset:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {sampleImages.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedImageUrl(img.url);
                    setCategory(img.category);
                    setIsUserUploaded(false);
                    setSelectedPresetIsFake(img.isFake);
                  }}
                  className={`relative rounded-xl overflow-hidden cursor-pointer border-2 transition-all h-24 ${
                    selectedImageUrl === img.url && !isUserUploaded
                      ? img.isFake 
                        ? 'border-rose-500 shadow-[0_0_16px_rgba(244,63,94,0.5)] scale-[1.02]'
                        : 'border-cyan-400 shadow-glowCyan scale-[1.02]'
                      : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                    <span className={`text-[10px] font-mono font-bold ${img.isFake ? 'text-rose-300' : 'text-white'}`}>{img.name}</span>
                  </div>
                  {img.isFake && (
                    <div className="absolute top-1 right-1 px-1.5 py-0.5 rounded bg-rose-500/90 text-[8px] font-mono font-bold text-white">
                      FAKE TEST
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Selected Image Preview with AI Scan Status Overlay */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 h-64 flex items-center justify-center">
              <img src={selectedImageUrl} alt="Target defect" className="w-full h-full object-cover" />
              
              {/* ═══ LIVE AI AUTO-SCAN OVERLAY ═══ */}
              <AnimatePresence mode="wait">
                {/* Scanning State */}
                {scanStatus === 'scanning' && (
                  <motion.div
                    key="scanning"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-slate-950/60 flex flex-col items-center justify-center z-10"
                  >
                    <motion.div
                      className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#06B6D4]"
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
                    />
                    <Cpu className="w-10 h-10 text-cyan-400 animate-spin mb-2" />
                    <span className="text-xs font-mono text-cyan-300 font-bold">Scanning for Civic Defects...</span>
                    <span className="text-[10px] font-mono text-slate-400 mt-1">Running YOLOv8 Object Detection + Fake Image Filter</span>
                  </motion.div>
                )}

                {/* REJECTED: Fake / Non-Civic */}
                {scanStatus === 'rejected' && (
                  <motion.div
                    key="rejected"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-rose-950/80 flex flex-col items-center justify-center z-10 p-4 text-center"
                  >
                    <Ban className="w-14 h-14 text-rose-500 mb-2" />
                    <span className="text-base font-extrabold text-rose-300 font-mono uppercase tracking-wider">
                      ❌ NOT A CIVIC ISSUE
                    </span>
                    <p className="text-[11px] text-rose-200/90 font-mono mt-2 max-w-xs leading-relaxed">
                      {scanResult?.fakeReason || 'AI determined this photo does not contain a municipal infrastructure defect. Please upload a real photo of a pothole, garbage, water leak, or other civic issue.'}
                    </p>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-4 px-5 py-2 rounded-xl bg-rose-500 text-white font-bold text-xs font-mono hover:bg-rose-400 transition-all"
                    >
                      Upload a Different Photo
                    </button>
                  </motion.div>
                )}

                {/* APPROVED: Real Civic Issue */}
                {scanStatus === 'approved' && scanResult && (
                  <motion.div
                    key="approved"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950/95 via-slate-950/80 to-transparent p-4 z-10"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-emerald-400" />
                        <div>
                          <span className="text-xs font-mono font-bold text-emerald-300 block">
                            ✅ Civic Defect Confirmed — {scanResult.detectedCategory.replace('_', ' ')}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            {scanResult.confidenceScore}% Confidence • Priority {scanResult.priorityScore || scanResult.urgencyIndex * 10}/100 • Auto-routed to {scanResult.suggestedDepartment}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleRunAiAnalysis}
                        className="px-3 py-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-[10px] font-mono hover:bg-cyan-500 hover:text-black transition-all"
                      >
                        Full AI Report →
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Change Photo Button (always visible at top-right) */}
              <div className="absolute top-3 right-3 z-20">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-200 text-[10px] font-mono backdrop-blur-md hover:border-cyan-400"
                >
                  Change Photo
                </button>
              </div>
            </div>

          {/* ═══ AI SEVERITY ESTIMATION & SPATIAL MATRIX WIDGET ═══ */}
          {scanStatus === 'approved' && scanResult && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-2"
            >
              <AISeverityExplanationWidget
                spatialData={scanResult.spatialEstimation}
                category={scanResult.detectedCategory}
                priorityScore={scanResult.priorityScore || scanResult.urgencyIndex * 10}
              />
            </motion.div>
          )}

          {/* ═══ REJECTION BANNER (shown below image when fake detected) ═══ */}
          <AnimatePresence>
            {scanStatus === 'rejected' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 rounded-2xl bg-rose-500/15 border-2 border-rose-500/50 space-y-2"
              >
                <div className="flex items-center gap-2 text-rose-300">
                  <ShieldAlert className="w-5 h-5 text-rose-400" />
                  <span className="text-sm font-bold font-mono">Fake Complaint Detected — Submission Blocked</span>
                </div>
                <p className="text-xs text-rose-200/80 font-mono leading-relaxed">
                  Our AI analyzed your uploaded image and determined it is <strong>not a civic infrastructure defect</strong>. 
                  This could be a meme, AI-generated art, celebrity photo, or unrelated image. 
                  To report a real issue, please upload a genuine camera photo of the defect (pothole, garbage, water leak, etc.).
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[10px] font-mono text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded border border-rose-500/30">
                    AI Confidence: {scanResult?.confidenceScore || 99.4}%
                  </span>
                  <span className="text-[10px] font-mono text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded border border-rose-500/30">
                    Category: Non-Civic Content
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          </div>

          {/* Original GPS Geolocation & NavIC Satellite Engine Component */}
          <OriginalGPSEngine
            onLocationDetected={(loc) => {
              setLat(loc.lat);
              setLng(loc.lng);
              setAddress(loc.address);
              setWard(loc.ward);
              setCity(loc.city);
            }}
          />

          {/* Description & Voice Input */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" /> Title & Additional Context
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Hazardous pothole near metro pillar line"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-cyan-400 text-slate-100 text-sm outline-none transition-all"
              />
            </div>

            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue (e.g. depth, traffic hazard, duration)..."
              className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-cyan-400 text-slate-100 text-sm outline-none transition-all"
            />

            {/* Voice Recorder Component */}
            <VoiceRecorder
              onTranscriptionComplete={(text) => {
                setVoiceNoteText(text);
                setDescription((prev) => (prev ? `${prev}\n${text}` : text));
              }}
            />
          </div>

          {/* Anonymous Switch Toggle */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/40 border border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-slate-800 text-slate-300">
                <EyeOff className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Anonymous Mode</span>
                <span className="text-[10px] text-slate-400">Hide your citizen identity from public board</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsAnonymous(!isAnonymous)}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                isAnonymous ? 'bg-cyan-500' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  isAnonymous ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleSubmitIssue}
              disabled={isSubmitBlocked}
              className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                isSubmitBlocked
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  : 'btn-neon bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white shadow-glowCyan hover:shadow-glowBlue'
              }`}
            >
              {scanStatus === 'scanning' ? (
                <><Cpu className="w-4 h-4 animate-spin" /> AI Scanning Photo...</>
              ) : scanStatus === 'rejected' ? (
                <><Ban className="w-4 h-4" /> Submission Blocked — Upload Real Civic Photo</>
              ) : (
                <>Submit Ticket & Route to Department <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* AI Scanner Popup Modal */}
      <AIScannerModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        imageUrl={selectedImageUrl}
        analysis={aiResult}
        isAnalyzing={isAnalyzing}
        onConfirmSubmit={() => {
          setAiModalOpen(false);
          handleSubmitIssue();
        }}
      />

    </div>
  );
};
