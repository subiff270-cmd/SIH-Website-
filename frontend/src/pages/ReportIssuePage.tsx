import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
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
  Image as ImageIcon
} from 'lucide-react';
import { useIssues } from '../context/IssueContext';
import { VoiceRecorder } from '../components/common/VoiceRecorder';
import { OriginalGPSEngine } from '../components/common/OriginalGPSEngine';
import { AIScannerModal } from '../components/ai/AIScannerModal';
import { AIAnalysisResult, IssueCategory } from '../types';

export const ReportIssuePage: React.FC = () => {
  const navigate = useNavigate();
  const { addComplaint, runAITriage } = useIssues();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<IssueCategory>('POTHOLE');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [voiceNoteText, setVoiceNoteText] = useState('');

  // Sample presets
  const sampleImages = [
    {
      name: 'Hazardous Pothole',
      url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
      category: 'POTHOLE' as IssueCategory
    },
    {
      name: 'Solid Waste Overflow',
      url: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
      category: 'GARBAGE' as IssueCategory
    },
    {
      name: 'Pressurized Pipe Leak',
      url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
      category: 'WATER_LEAKAGE' as IssueCategory
    }
  ];

  const [selectedImageUrl, setSelectedImageUrl] = useState<string>(sampleImages[0].url);
  const [isUserUploaded, setIsUserUploaded] = useState<boolean>(false);
  const [lat, setLat] = useState<number>(28.6139);
  const [lng, setLng] = useState<number>(77.2090);
  const [address, setAddress] = useState<string>('Outer Ring Road, Near Connaught Place, New Delhi');
  const [ward, setWard] = useState<string>('Ward 14 - Central Division');
  const [city, setCity] = useState<string>('New Delhi');

  // AI Scanner state
  const [aiModalOpen, setAiModalOpen] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [aiResult, setAiResult] = useState<AIAnalysisResult | null>(null);

  // Real File Upload Handler (FileReader DataURL)
  const handleRealFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedImageUrl(event.target.result as string);
          setIsUserUploaded(true);
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              {sampleImages.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedImageUrl(img.url);
                    setCategory(img.category);
                    setIsUserUploaded(false);
                  }}
                  className={`relative rounded-xl overflow-hidden cursor-pointer border-2 transition-all h-24 ${
                    selectedImageUrl === img.url && !isUserUploaded
                      ? 'border-cyan-400 shadow-glowCyan scale-[1.02]'
                      : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                    <span className="text-[10px] font-mono font-bold text-white">{img.name}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Image Preview with AI Trigger Button */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 h-64 flex items-center justify-center">
              <img src={selectedImageUrl} alt="Target defect" className="w-full h-full object-cover" />
              <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-200 text-xs font-mono backdrop-blur-md hover:border-cyan-400"
                >
                  Change Photo
                </button>
                <button
                  type="button"
                  onClick={handleRunAiAnalysis}
                  className="btn-neon px-4 py-2 rounded-xl bg-cyan-500 text-black font-bold text-xs shadow-glowCyan flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" /> Run AI Scanner
                </button>
              </div>
            </div>
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
              className="btn-neon w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold text-sm shadow-glowCyan hover:shadow-glowBlue flex items-center justify-center gap-2"
            >
              Submit Ticket & Route to Department <ArrowRight className="w-4 h-4" />
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
