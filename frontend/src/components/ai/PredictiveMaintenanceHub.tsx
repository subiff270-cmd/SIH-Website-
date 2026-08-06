import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  CloudRain, 
  Users, 
  Activity, 
  Clock, 
  Sun, 
  Wrench, 
  ShieldAlert, 
  Brain, 
  BarChart3, 
  Map, 
  Layers, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Database,
  Cpu
} from 'lucide-react';

interface PredictedRiskZone {
  id: string;
  zoneName: string;
  ward: string;
  predictedDefect: string;
  riskScore: number;
  timeframeDays: number;
  factors: {
    roadAgeYears: number;
    rainfallMm: number;
    trafficVolumePerDay: number;
    populationDensity: number;
    lastMaintenanceDate: string;
  };
  recommendedPreventativeAction: string;
  estCostSavings: string;
}

export const PredictiveMaintenanceHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'high_risk_zones' | 'ml_models' | 'preventive_guide'>('high_risk_zones');
  const [selectedZoneId, setSelectedZoneId] = useState<string>('zone_1');

  // Simulated AI Time Series & ML Predicted High-Risk Zones
  const predictedZones: PredictedRiskZone[] = [
    {
      id: 'zone_1',
      zoneName: 'Outer Ring Road - Junction 14',
      ward: 'Ward 14 - Central Municipal Division',
      predictedDefect: 'Severe Asphalt Pothole Cavity',
      riskScore: 94,
      timeframeDays: 12,
      factors: {
        roadAgeYears: 6.8,
        rainfallMm: 145.2,
        trafficVolumePerDay: 48500,
        populationDensity: 12400,
        lastMaintenanceDate: '18 months ago'
      },
      recommendedPreventativeAction: 'Dispatch Cold-Mix Micro-Surfacing Crew to seal asphalt micro-cracks before monsoon surge.',
      estCostSavings: '₹1,45,000 (Prevents full road excavation)'
    },
    {
      id: 'zone_2',
      zoneName: 'Subroto Park Underpass Drain',
      ward: 'Ward 22 - South Division',
      predictedDefect: 'Clogged Stormwater Drain Flood Spill',
      riskScore: 89,
      timeframeDays: 7,
      factors: {
        roadAgeYears: 4.2,
        rainfallMm: 210.0,
        trafficVolumePerDay: 32000,
        populationDensity: 9800,
        lastMaintenanceDate: '24 months ago'
      },
      recommendedPreventativeAction: 'Deploy Hydro-Jetting Vacuum Truck to clear silt build-up before forecasted heavy rainfall.',
      estCostSavings: '₹3,80,000 (Prevents underpass vehicle submergence)'
    },
    {
      id: 'zone_3',
      zoneName: 'Vasant Kunj Main Water Line',
      ward: 'Ward 31 - South-West Division',
      predictedDefect: 'High-Pressure Pipeline Rupture',
      riskScore: 82,
      timeframeDays: 18,
      factors: {
        roadAgeYears: 9.1,
        rainfallMm: 65.0,
        trafficVolumePerDay: 18000,
        populationDensity: 15600,
        lastMaintenanceDate: '36 months ago'
      },
      recommendedPreventativeAction: 'Perform Ultrasonic Acoustic Leak Testing & pressure valve throttling.',
      estCostSavings: '₹5,20,000 (Prevents 40,000L clean water loss)'
    }
  ];

  const currentZone = predictedZones.find((z) => z.id === selectedZoneId) || predictedZones[0];

  return (
    <div className="space-y-8 text-slate-100">
      
      {/* ═══ HEADER BANNER ═══ */}
      <div className="glass-card p-6 md:p-8 rounded-3xl border border-cyan-500/30 shadow-glowCyan relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" /> Predictive AI Forecasting Engine
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold font-display">
              Predictive Civic Maintenance
            </h2>
            <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
              Instead of waiting for citizens to report broken roads, CivicAI analyzes <strong>historical complaints, rainfall, traffic density, road age, and weather forecasts</strong> to predict high-risk civic failure zones before defects occur.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 self-stretch md:self-auto justify-between md:justify-end font-mono">
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block uppercase">PREDICTED RISKS</span>
              <span className="text-2xl font-bold text-amber-400">14 Zones</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-emerald-500/30 text-center">
              <span className="text-[10px] text-slate-400 block uppercase">PREVENTIVE SAVINGS</span>
              <span className="text-2xl font-bold text-emerald-400">64% Budget</span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ TABS SWITCHER ═══ */}
      <div className="flex items-center justify-center sm:justify-start gap-2 border-b border-slate-800 pb-3 font-mono text-xs overflow-x-auto">
        <button
          onClick={() => setActiveTab('high_risk_zones')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'high_risk_zones'
              ? 'bg-cyan-500 text-black font-bold shadow-glowCyan'
              : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
          }`}
        >
          <ShieldAlert className="w-4 h-4" /> High-Risk Forecast Zones
        </button>

        <button
          onClick={() => setActiveTab('ml_models')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'ml_models'
              ? 'bg-cyan-500 text-black font-bold shadow-glowCyan'
              : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
          }`}
        >
          <Brain className="w-4 h-4" /> Machine Learning Architecture
        </button>

        <button
          onClick={() => setActiveTab('preventive_guide')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'preventive_guide'
              ? 'bg-cyan-500 text-black font-bold shadow-glowCyan'
              : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
          }`}
        >
          <Wrench className="w-4 h-4" /> Preventive Maintenance Guide
        </button>
      </div>

      {/* ═══ TAB 1: HIGH-RISK FORECAST ZONES ═══ */}
      {activeTab === 'high_risk_zones' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Risk Zones List */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              AI Risk Priority Queue (7-30 Day Window)
            </h3>

            {predictedZones.map((zone) => (
              <motion.div
                key={zone.id}
                whileHover={{ scale: 1.01 }}
                onClick={() => setSelectedZoneId(zone.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                  selectedZoneId === zone.id
                    ? 'bg-slate-900 border-cyan-500 shadow-glowCyan'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-300">
                    {zone.zoneName}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-mono font-bold">
                    Risk {zone.riskScore}%
                  </span>
                </div>

                <p className="text-xs text-white font-bold font-display">{zone.predictedDefect}</p>

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1">
                  <span>Ward: {zone.ward.split('-')[0]}</span>
                  <span className="text-amber-400 font-bold">Failure Expected in ~{zone.timeframeDays} Days</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column: AI Risk Factor Telemetry & Preventive Action */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card p-6 rounded-3xl border border-cyan-500/30 space-y-6">
              
              <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">SELECTED AI HIGH-RISK ZONE</span>
                  <h3 className="text-2xl font-bold text-white font-display mt-0.5">{currentZone.zoneName}</h3>
                  <p className="text-xs text-slate-400 font-mono">{currentZone.ward}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">FAILURE TIMEFRAME</span>
                  <span className="text-xl font-extrabold text-amber-400 font-mono">Within {currentZone.timeframeDays} Days</span>
                </div>
              </div>

              {/* 7 Predictive Input Features Grid */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold text-slate-300 flex items-center gap-2">
                  <Database className="w-4 h-4 text-cyan-400" /> 7 Machine Learning Input Variables Analyzed
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-[9px] text-slate-400 block flex items-center gap-1">
                      <Clock className="w-3 h-3 text-cyan-400" /> ROAD AGE
                    </span>
                    <span className="text-slate-100 font-bold">{currentZone.factors.roadAgeYears} Years</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-[9px] text-slate-400 block flex items-center gap-1">
                      <CloudRain className="w-3 h-3 text-blue-400" /> RAINFALL
                    </span>
                    <span className="text-slate-100 font-bold">{currentZone.factors.rainfallMm} mm</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-[9px] text-slate-400 block flex items-center gap-1">
                      <Activity className="w-3 h-3 text-purple-400" /> TRAFFIC LOAD
                    </span>
                    <span className="text-slate-100 font-bold">{currentZone.factors.trafficVolumePerDay.toLocaleString()} veh/day</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-[9px] text-slate-400 block flex items-center gap-1">
                      <Users className="w-3 h-3 text-emerald-400" /> POPULATION
                    </span>
                    <span className="text-slate-100 font-bold">{currentZone.factors.populationDensity.toLocaleString()} /km²</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-[9px] text-slate-400 block flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-amber-400" /> HISTORICAL ISSUES
                    </span>
                    <span className="text-slate-100 font-bold">18 Complaints (3 yrs)</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-[9px] text-slate-400 block flex items-center gap-1">
                      <Wrench className="w-3 h-3 text-rose-400" /> LAST MAINTENANCE
                    </span>
                    <span className="text-slate-100 font-bold">{currentZone.factors.lastMaintenanceDate}</span>
                  </div>
                </div>
              </div>

              {/* Recommended Preventive Action Box */}
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between text-emerald-300 font-bold">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Recommended Preventive Action
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-300">
                    Estimated Savings: {currentZone.estCostSavings}
                  </span>
                </div>
                <p className="text-slate-200 text-xs leading-relaxed">
                  {currentZone.recommendedPreventativeAction}
                </p>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ═══ TAB 2: MACHINE LEARNING ARCHITECTURE EXPLANATION ═══ */}
      {activeTab === 'ml_models' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono text-xs">
            
            {/* Model 1: Time Series Forecasting */}
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 w-fit">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white font-display">1. Time Series Forecasting</h3>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Uses <strong>Prophet & ARIMA models</strong> to analyze multi-year seasonal defect patterns. Predicts spike periods in pothole formation and drain overflows matching historical monsoon timelines.
              </p>
            </div>

            {/* Model 2: Random Forest Classification */}
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/30 w-fit">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white font-display">2. Random Forest Classification</h3>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Ensemble of 500+ decision trees classifying infrastructure health based on road age, asphalt material grade, heavy truck volume, and sub-surface moisture content.
              </p>
            </div>

            {/* Model 3: XGBoost Gradient Boosting */}
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 w-fit">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white font-display">3. XGBoost Gradient Boosting</h3>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                High-precision gradient boosted decision trees for real-time risk scoring (0-100), outputting failure probabilities for every municipal road segment.
              </p>
            </div>

            {/* Model 4: LSTM Recurrent Neural Networks */}
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 w-fit">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white font-display">4. LSTM Neural Networks</h3>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Long Short-Term Memory (LSTM) deep learning networks process continuous IoT water sensor streams and weather forecasts to predict pipe burst pressure spikes.
              </p>
            </div>

            {/* Model 5: GIS Spatial Heatmaps */}
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-3 lg:col-span-2">
              <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/30 w-fit">
                <Map className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white font-display">5. GIS Geospatial Heatmaps</h3>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Renders interactive 3D spatial risk heatmaps over city maps. Overlays municipal ward boundaries with dynamic color-coded hazard zones for instant officer decision-making.
              </p>
            </div>

          </div>
        </div>
      )}

      {/* ═══ TAB 3: PREVENTIVE MAINTENANCE GUIDE ═══ */}
      {activeTab === 'preventive_guide' && (
        <div className="glass-card p-6 md:p-8 rounded-3xl border border-cyan-500/30 space-y-6 text-xs font-mono">
          <h3 className="text-2xl font-bold text-white font-display flex items-center gap-2">
            <Wrench className="w-6 h-6 text-cyan-400" /> How Municipalities Perform Preventive Maintenance with AI
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[11px] leading-relaxed">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-cyan-300 font-bold text-sm block">💰 60% Maintenance Cost Reduction</span>
              <p className="text-slate-300">
                Fixing a small asphalt micro-crack costs ~₹3,000. Waiting until it turns into a massive pothole cavity requiring full road excavation costs &gt;₹45,000. AI predictive alerts allow cities to perform micro-surfacing before structural collapse.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-emerald-300 font-bold text-sm block">🚗 Zero Road Accident Fatalities</span>
              <p className="text-slate-300">
                Preventative maintenance clears hazardous road cavities and unlit streetlamp corridors before drivers encounter them, dramatically reducing road accidents and traffic jams.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
