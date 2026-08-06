import React, { createContext, useContext, useState, ReactNode } from 'react';

// All supported languages
export type LangCode = 'EN' | 'HI' | 'TA' | 'TE' | 'BN' | 'MR' | 'GU' | 'KN' | 'ML';

export const languageNames: Record<LangCode, string> = {
  EN: 'English',
  HI: 'हिंदी',
  TA: 'தமிழ்',
  TE: 'తెలుగు',
  BN: 'বাংলা',
  MR: 'मराठी',
  GU: 'ગુજરાતી',
  KN: 'ಕನ್ನಡ',
  ML: 'മലയാളം',
};

// Translation keys used across the app
type TranslationKeys = {
  // Navbar & Headings
  home: string;
  cityTwin: string;
  predictiveAi: string;
  liveMap: string;
  reportIssue: string;
  signIn: string;
  signOut: string;
  switchRole: string;
  myDashboard: string;
  language: string;
  heroBadge: string;
  heroTitle: string;

  // Report Issue Page
  reportTitle: string;
  reportSubtitle: string;
  uploadPhoto: string;
  clickToChoose: string;
  demoPresets: string;
  changePhoto: string;
  runAiScanner: string;
  fullAiReport: string;
  titleLabel: string;
  titlePlaceholder: string;
  descPlaceholder: string;
  anonymousMode: string;
  anonymousDesc: string;
  submitTicket: string;
  submissionBlocked: string;
  aiScanning: string;
  notCivicIssue: string;
  fakeDetected: string;
  fakeExplain: string;
  uploadDifferent: string;
  civicConfirmed: string;
  confidence: string;
  priority: string;
  autoRouted: string;

  // Worker Dashboard
  workerPortal: string;
  workerSubtitle: string;
  assignedOrders: string;
  noTasks: string;
  noTasksDesc: string;
  uploadAfterPhoto: string;
  beforeDefect: string;
  afterRepair: string;
  runVerification: string;
  retryVerification: string;
  verificationPassed: string;
  verificationFailed: string;
  defectCleared: string;
  defectStillExists: string;
  cancelBtn: string;
  openGpsRoute: string;
  resolutionNotes: string;
  qualityScore: string;

  // Citizen Dashboard
  citizenPortal: string;
  totalReports: string;
  resolved: string;
  pending: string;
  inProgress: string;
  upvote: string;

  // Officer Dashboard
  officerPortal: string;
  approve: string;
  reject: string;
  assignWorker: string;
  filterBy: string;

  // Common
  status: string;
  category: string;
  location: string;
  date: string;
  actions: string;
  search: string;
  loading: string;
  viewDetails: string;
};

// English translations (base)
const en: TranslationKeys = {
  home: 'Home',
  cityTwin: '3D City Twin',
  predictiveAi: 'Predictive AI',
  liveMap: 'Live Map',
  reportIssue: 'Report Issue',
  signIn: 'Sign In',
  signOut: 'Sign Out',
  switchRole: 'Switch Demo Role Portal (3 Roles)',
  myDashboard: 'My Dashboard',
  language: 'Language',
  heroBadge: 'AI Powered Crowdsourced Civic Issue Triage',
  heroTitle: 'Report Local Civic Issues. AI Routes to Officers & Workers Instantaneously.',

  reportTitle: 'Report a Civic Issue',
  reportSubtitle: 'Upload your real camera photo, record voice notes, and let CivicAI auto-detect category & merge duplicates.',
  uploadPhoto: 'Defect Photo Upload (Select File from Device or Use Preset)',
  clickToChoose: 'Click to Choose Image File from Device Camera / Gallery',
  demoPresets: 'Or Click Demo Sample Defect Preset:',
  changePhoto: 'Change Photo',
  runAiScanner: 'Run AI Scanner',
  fullAiReport: 'Full AI Report →',
  titleLabel: 'Title & Additional Context',
  titlePlaceholder: 'e.g. Hazardous pothole near metro pillar line',
  descPlaceholder: 'Describe the issue (e.g. depth, traffic hazard, duration)...',
  anonymousMode: 'Anonymous Mode',
  anonymousDesc: 'Hide your citizen identity from public board',
  submitTicket: 'Submit Ticket & Route to Department',
  submissionBlocked: 'Submission Blocked — Upload Real Civic Photo',
  aiScanning: 'AI Scanning Photo...',
  notCivicIssue: 'NOT A CIVIC ISSUE',
  fakeDetected: 'Fake Complaint Detected — Submission Blocked',
  fakeExplain: 'Our AI analyzed your uploaded image and determined it is not a civic infrastructure defect. This could be a meme, AI-generated art, celebrity photo, or unrelated image. To report a real issue, please upload a genuine camera photo of the defect.',
  uploadDifferent: 'Upload a Different Photo',
  civicConfirmed: 'Civic Defect Confirmed',
  confidence: 'Confidence',
  priority: 'Priority',
  autoRouted: 'Auto-routed to',

  workerPortal: 'FIELD WORKER PORTAL',
  workerSubtitle: 'Upload repair photos. AI compares Before vs After — rejects if defect still exists.',
  assignedOrders: 'Assigned Work Orders',
  noTasks: 'No Active Tasks Assigned Yet',
  noTasksDesc: 'Citizen reports defect → Officer approves → Task appears here with GPS route!',
  uploadAfterPhoto: 'Upload After Photo & Run AI Verification',
  beforeDefect: 'Before (Defect)',
  afterRepair: 'After (Repair)',
  runVerification: 'Run AI Before/After Verification',
  retryVerification: 'Retry AI Verification',
  verificationPassed: 'AI VERIFICATION PASSED — Defect Cleared!',
  verificationFailed: 'AI VERIFICATION FAILED — Defect Still Exists!',
  defectCleared: 'Defect 100% Cleared & Surface Restored',
  defectStillExists: 'Defect still visible. Worker must complete the actual repair and upload a new photo.',
  cancelBtn: 'Cancel',
  openGpsRoute: 'Open GPS Route',
  resolutionNotes: 'Enter resolution notes...',
  qualityScore: 'Quality Score',

  citizenPortal: 'Citizen Dashboard',
  totalReports: 'Total Reports',
  resolved: 'Resolved',
  pending: 'Pending',
  inProgress: 'In Progress',
  upvote: 'Upvote',

  officerPortal: 'Officer Command Center',
  approve: 'Approve',
  reject: 'Reject',
  assignWorker: 'Assign Worker',
  filterBy: 'Filter By',

  status: 'Status',
  category: 'Category',
  location: 'Location',
  date: 'Date',
  actions: 'Actions',
  search: 'Search',
  loading: 'Loading...',
  viewDetails: 'View Details',
};

// Hindi translations
const hi: TranslationKeys = {
  home: 'होम',
  cityTwin: '3D सिटी ट्विन',
  predictiveAi: 'पूर्वानुमानित AI',
  liveMap: 'लाइव मैप',
  reportIssue: 'शिकायत दर्ज करें',
  signIn: 'साइन इन',
  signOut: 'साइन आउट',
  switchRole: 'डेमो भूमिका बदलें (3 भूमिकाएँ)',
  myDashboard: 'मेरा डैशबोर्ड',
  language: 'भाषा',
  heroBadge: 'एआई संचालित जनसहयोग नागरिक समस्या निवारण',
  heroTitle: 'स्थानीय नागरिक समस्याओं की रिपोर्ट करें। AI तुरंत अधिकारियों और कर्मचारियों को भेजता है।',

  reportTitle: 'नागरिक समस्या की रिपोर्ट करें',
  reportSubtitle: 'अपनी असली कैमरा फोटो अपलोड करें, वॉइस नोट रिकॉर्ड करें, और CivicAI को श्रेणी पहचानने दें।',
  uploadPhoto: 'दोष फोटो अपलोड (डिवाइस से फ़ाइल चुनें या प्रीसेट उपयोग करें)',
  clickToChoose: 'डिवाइस कैमरा/गैलरी से इमेज फ़ाइल चुनने के लिए क्लिक करें',
  demoPresets: 'या डेमो नमूना दोष प्रीसेट क्लिक करें:',
  changePhoto: 'फ़ोटो बदलें',
  runAiScanner: 'AI स्कैनर चलाएं',
  fullAiReport: 'पूरी AI रिपोर्ट →',
  titleLabel: 'शीर्षक और अतिरिक्त संदर्भ',
  titlePlaceholder: 'उदा. मेट्रो पिलर लाइन के पास खतरनाक गड्ढा',
  descPlaceholder: 'समस्या का वर्णन करें (उदा. गहराई, यातायात खतरा, अवधि)...',
  anonymousMode: 'गुमनाम मोड',
  anonymousDesc: 'सार्वजनिक बोर्ड से अपनी पहचान छुपाएं',
  submitTicket: 'टिकट जमा करें और विभाग को भेजें',
  submissionBlocked: 'जमा अवरुद्ध — असली नागरिक फ़ोटो अपलोड करें',
  aiScanning: 'AI फ़ोटो स्कैन कर रहा है...',
  notCivicIssue: 'यह नागरिक समस्या नहीं है',
  fakeDetected: 'फर्जी शिकायत पाई गई — जमा अवरुद्ध',
  fakeExplain: 'हमारे AI ने आपकी अपलोड की गई छवि का विश्लेषण किया और यह निर्धारित किया कि यह नागरिक बुनियादी ढांचे का दोष नहीं है। कृपया दोष की असली कैमरा फ़ोटो अपलोड करें।',
  uploadDifferent: 'एक अलग फ़ोटो अपलोड करें',
  civicConfirmed: 'नागरिक दोष की पुष्टि',
  confidence: 'विश्वसनीयता',
  priority: 'प्राथमिकता',
  autoRouted: 'स्वचालित रूप से भेजा गया',

  workerPortal: 'फील्ड वर्कर पोर्टल',
  workerSubtitle: 'मरम्मत फ़ोटो अपलोड करें। AI पहले बनाम बाद की तुलना करता है — यदि दोष अभी भी है तो अस्वीकार करता है।',
  assignedOrders: 'सौंपे गए कार्य आदेश',
  noTasks: 'अभी तक कोई सक्रिय कार्य नहीं सौंपा गया',
  noTasksDesc: 'नागरिक दोष की रिपोर्ट करता है → अधिकारी स्वीकृत करता है → कार्य यहाँ GPS मार्ग के साथ दिखाई देता है!',
  uploadAfterPhoto: 'मरम्मत फ़ोटो अपलोड करें और AI सत्यापन चलाएं',
  beforeDefect: 'पहले (दोष)',
  afterRepair: 'बाद में (मरम्मत)',
  runVerification: 'AI पहले/बाद सत्यापन चलाएं',
  retryVerification: 'AI सत्यापन पुनः प्रयास करें',
  verificationPassed: 'AI सत्यापन सफल — दोष समाप्त!',
  verificationFailed: 'AI सत्यापन विफल — दोष अभी भी मौजूद!',
  defectCleared: 'दोष 100% समाप्त और सतह बहाल',
  defectStillExists: 'दोष अभी भी दिखाई दे रहा है। कर्मचारी को वास्तविक मरम्मत पूरी करनी होगी।',
  cancelBtn: 'रद्द करें',
  openGpsRoute: 'GPS मार्ग खोलें',
  resolutionNotes: 'समाधान नोट्स दर्ज करें...',
  qualityScore: 'गुणवत्ता स्कोर',

  citizenPortal: 'नागरिक डैशबोर्ड',
  totalReports: 'कुल रिपोर्ट',
  resolved: 'हल हो गया',
  pending: 'लंबित',
  inProgress: 'प्रगति में',
  upvote: 'अपवोट',

  officerPortal: 'अधिकारी कमांड सेंटर',
  approve: 'स्वीकृत',
  reject: 'अस्वीकृत',
  assignWorker: 'कर्मचारी नियुक्त करें',
  filterBy: 'फ़िल्टर करें',

  status: 'स्थिति',
  category: 'श्रेणी',
  location: 'स्थान',
  date: 'तारीख',
  actions: 'कार्रवाई',
  search: 'खोजें',
  loading: 'लोड हो रहा है...',
  viewDetails: 'विवरण देखें',
};

// Tamil translations
const ta: TranslationKeys = {
  home: 'முகப்பு',
  cityTwin: '3D நகர டிஜிட்டல் ட்வின்',
  predictiveAi: 'முன்னறிவிப்பு AI',
  liveMap: 'நேரடி வரைபடம்',
  reportIssue: 'புகார் அளிக்கவும்',
  signIn: 'உள்நுழையவும்',
  signOut: 'வெளியேறு',
  switchRole: 'டெமோ பங்கு மாற்றவும் (3 பங்குகள்)',
  myDashboard: 'என் டாஷ்போர்டு',
  language: 'மொழி',
  heroBadge: 'AI இயங்கும் மக்கள் கூட்ட மூலக் குடிமைப் பிரச்சனை தீர்வு',
  heroTitle: 'உள்ளூர் குடிமைப் பிரச்சினைகளைப் புகாரளிக்கவும். AI உடனடியாக அதிகாரிகளுக்கும் பணியாளர்களுக்கும் அனுப்புகிறது.',

  reportTitle: 'குடிமைப் பிரச்சினையைப் புகார் செய்யுங்கள்',
  reportSubtitle: 'உங்கள் உண்மையான கேமரா புகைப்படத்தைப் பதிவேற்றுங்கள், குரல் குறிப்புகளைப் பதிவு செய்யுங்கள்.',
  uploadPhoto: 'குறைபாடு புகைப்படம் பதிவேற்றம்',
  clickToChoose: 'சாதன கேமரா / கேலரியில் இருந்து படக் கோப்பைத் தேர்ந்தெடுக்க கிளிக் செய்யவும்',
  demoPresets: 'அல்லது டெமோ மாதிரி குறைபாடு முன்னமைவைக் கிளிக் செய்யவும்:',
  changePhoto: 'புகைப்படம் மாற்று',
  runAiScanner: 'AI ஸ்கேனர் இயக்கு',
  fullAiReport: 'முழு AI அறிக்கை →',
  titleLabel: 'தலைப்பு & கூடுதல் சூழல்',
  titlePlaceholder: 'எ.கா. மெட்ரோ தூண் அருகில் ஆபத்தான குழி',
  descPlaceholder: 'சிக்கலை விவரிக்கவும் (எ.கா. ஆழம், போக்குவரத்து ஆபத்து)...',
  anonymousMode: 'அநாமதேய பயன்முறை',
  anonymousDesc: 'பொது பலகையிலிருந்து உங்கள் அடையாளத்தை மறைக்கவும்',
  submitTicket: 'டிக்கெட் சமர்ப்பித்து துறைக்கு அனுப்பவும்',
  submissionBlocked: 'சமர்ப்பிப்பு தடுக்கப்பட்டது — உண்மையான புகைப்படம் பதிவேற்றவும்',
  aiScanning: 'AI புகைப்படத்தை ஸ்கேன் செய்கிறது...',
  notCivicIssue: 'இது குடிமைப் பிரச்சினை அல்ல',
  fakeDetected: 'போலி புகார் கண்டறியப்பட்டது — சமர்ப்பிப்பு தடுக்கப்பட்டது',
  fakeExplain: 'எங்கள் AI உங்கள் படத்தை பகுப்பாய்வு செய்து இது குடிமை உள்கட்டமைப்பு குறைபாடு அல்ல என்று தீர்மானித்தது.',
  uploadDifferent: 'வேறு புகைப்படம் பதிவேற்றவும்',
  civicConfirmed: 'குடிமைக் குறைபாடு உறுதிசெய்யப்பட்டது',
  confidence: 'நம்பகத்தன்மை',
  priority: 'முன்னுரிமை',
  autoRouted: 'தானாக அனுப்பப்பட்டது',

  workerPortal: 'கள பணியாளர் போர்டல்',
  workerSubtitle: 'பழுதுபார்ப்பு புகைப்படங்களைப் பதிவேற்றவும். AI முன்/பின் ஒப்பிடுகிறது.',
  assignedOrders: 'ஒதுக்கப்பட்ட பணி ஆணைகள்',
  noTasks: 'இன்னும் செயலில் பணிகள் ஒதுக்கப்படவில்லை',
  noTasksDesc: 'குடிமகன் குறைபாட்டைப் புகாரளிக்கிறார் → அதிகாரி ஒப்புதல் → பணி இங்கே தோன்றும்!',
  uploadAfterPhoto: 'பழுதுபார்ப்பு புகைப்படம் பதிவேற்றி AI சரிபார்ப்பு இயக்கவும்',
  beforeDefect: 'முன் (குறைபாடு)',
  afterRepair: 'பின் (பழுது)',
  runVerification: 'AI முன்/பின் சரிபார்ப்பு இயக்கவும்',
  retryVerification: 'AI சரிபார்ப்பு மீண்டும் முயற்சிக்கவும்',
  verificationPassed: 'AI சரிபார்ப்பு வெற்றி — குறைபாடு நீக்கப்பட்டது!',
  verificationFailed: 'AI சரிபார்ப்பு தோல்வி — குறைபாடு இன்னும் உள்ளது!',
  defectCleared: 'குறைபாடு 100% நீக்கப்பட்டது',
  defectStillExists: 'குறைபாடு இன்னும் தெரிகிறது. பணியாளர் உண்மையான பழுதுபார்ப்பை முடிக்க வேண்டும்.',
  cancelBtn: 'ரத்துசெய்',
  openGpsRoute: 'GPS வழி திற',
  resolutionNotes: 'தீர்வு குறிப்புகள் உள்ளிடவும்...',
  qualityScore: 'தரம் மதிப்பெண்',

  citizenPortal: 'குடிமக்கள் டாஷ்போர்டு',
  totalReports: 'மொத்த புகார்கள்',
  resolved: 'தீர்வு',
  pending: 'நிலுவையில்',
  inProgress: 'முன்னேற்றத்தில்',
  upvote: 'அப்வோட்',

  officerPortal: 'அதிகாரி கமாண்ட் சென்டர்',
  approve: 'ஒப்புதல்',
  reject: 'நிராகரி',
  assignWorker: 'பணியாளர் நியமி',
  filterBy: 'வடிகட்டி',

  status: 'நிலை',
  category: 'வகை',
  location: 'இடம்',
  date: 'தேதி',
  actions: 'செயல்கள்',
  search: 'தேடு',
  loading: 'ஏற்றுகிறது...',
  viewDetails: 'விவரங்கள் காண',
};

// Telugu translations
const te: TranslationKeys = {
  home: 'హోమ్',
  cityTwin: '3D సిటీ ట్విన్',
  predictiveAi: 'అంచనా AI',
  liveMap: 'లైవ్ మ్యాప్',
  reportIssue: 'సమస్య నివేదించండి',
  signIn: 'సైన్ ఇన్',
  signOut: 'సైన్ అవుట్',
  switchRole: 'డెమో పాత్ర మార్చండి',
  myDashboard: 'నా డాష్‌బోర్డ్',
  language: 'భాష',
  heroBadge: 'AI ఆధారిత పౌర సమస్య పరిష్కారం',
  heroTitle: 'స్థానిక పౌర సమస్యలను నివేదించండి. AI తక్షణమే అధికారులకు మరియు వర్కర్లకు పంపుతుంది.',

  reportTitle: 'పౌర సమస్యను నివేదించండి',
  reportSubtitle: 'మీ నిజమైన కెమెరా ఫోటోను అప్‌లోడ్ చేయండి, వాయిస్ నోట్‌లు రికార్డ్ చేయండి.',
  uploadPhoto: 'లోపం ఫోటో అప్‌లోడ్',
  clickToChoose: 'పరికర కెమెరా / గ్యాలరీ నుండి ఇమేజ్ ఫైల్ ఎంచుకోవడానికి క్లిక్ చేయండి',
  demoPresets: 'లేదా డెమో శాంపిల్ ప్రీసెట్ క్లిక్ చేయండి:',
  changePhoto: 'ఫోటో మార్చు',
  runAiScanner: 'AI స్కానర్ రన్ చేయండి',
  fullAiReport: 'పూర్తి AI రిపోర్ట్ →',
  titleLabel: 'శీర్షిక & అదనపు సందర్భం',
  titlePlaceholder: 'ఉదా. మెట్రో స్తంభం దగ్గర ప్రమాదకరమైన గొయ్యి',
  descPlaceholder: 'సమస్యను వివరించండి...',
  anonymousMode: 'అనామక మోడ్',
  anonymousDesc: 'పబ్లిక్ బోర్డ్ నుండి మీ గుర్తింపును దాచండి',
  submitTicket: 'టిక్కెట్ సమర్పించి విభాగానికి పంపండి',
  submissionBlocked: 'సమర్పణ నిరోధించబడింది — నిజమైన ఫోటో అప్‌లోడ్ చేయండి',
  aiScanning: 'AI ఫోటో స్కాన్ చేస్తోంది...',
  notCivicIssue: 'ఇది పౌర సమస్య కాదు',
  fakeDetected: 'నకిలీ ఫిర్యాదు గుర్తించబడింది — సమర్పణ నిరోధించబడింది',
  fakeExplain: 'మా AI మీ అప్‌లోడ్ చేసిన చిత్రాన్ని విశ్లేషించింది మరియు ఇది పౌర లోపం కాదని నిర్ధారించింది.',
  uploadDifferent: 'వేరే ఫోటో అప్‌లోడ్ చేయండి',
  civicConfirmed: 'పౌర లోపం నిర్ధారించబడింది',
  confidence: 'నమ్మకం',
  priority: 'ప్రాధాన్యత',
  autoRouted: 'ఆటోమేటిక్‌గా పంపబడింది',

  workerPortal: 'ఫీల్డ్ వర్కర్ పోర్టల్',
  workerSubtitle: 'రిపేర్ ఫోటోలు అప్‌లోడ్ చేయండి. AI ముందు vs తర్వాత పోల్చుతుంది.',
  assignedOrders: 'కేటాయించిన పని ఆర్డర్‌లు',
  noTasks: 'ఇంకా క్రియాశీల పనులు కేటాయించబడలేదు',
  noTasksDesc: 'పౌరుడు లోపం నివేదిస్తాడు → అధికారి ఆమోదిస్తాడు → పని ఇక్కడ కనిపిస్తుంది!',
  uploadAfterPhoto: 'రిపేర్ ఫోటో అప్‌లోడ్ చేసి AI ధృవీకరణ చేయండి',
  beforeDefect: 'ముందు (లోపం)',
  afterRepair: 'తర్వాత (రిపేర్)',
  runVerification: 'AI ముందు/తర్వాత ధృవీకరణ రన్ చేయండి',
  retryVerification: 'AI ధృవీకరణ మళ్ళీ ప్రయత్నించండి',
  verificationPassed: 'AI ధృవీకరణ విజయవంతం — లోపం తొలగించబడింది!',
  verificationFailed: 'AI ధృవీకరణ విఫలం — లోపం ఇంకా ఉంది!',
  defectCleared: 'లోపం 100% తొలగించబడింది',
  defectStillExists: 'లోపం ఇంకా కనిపిస్తోంది. వర్కర్ నిజమైన రిపేర్ పూర్తి చేయాలి.',
  cancelBtn: 'రద్దు',
  openGpsRoute: 'GPS మార్గం తెరవండి',
  resolutionNotes: 'పరిష్కార నోట్‌లు నమోదు చేయండి...',
  qualityScore: 'నాణ్యత స్కోరు',

  citizenPortal: 'పౌరుల డాష్‌బోర్డ్',
  totalReports: 'మొత్తం నివేదికలు',
  resolved: 'పరిష్కరించబడింది',
  pending: 'పెండింగ్',
  inProgress: 'ప్రగతిలో',
  upvote: 'అప్‌వోట్',

  officerPortal: 'అధికారి కమాండ్ సెంటర్',
  approve: 'ఆమోదించు',
  reject: 'తిరస్కరించు',
  assignWorker: 'వర్కర్‌ను నియమించు',
  filterBy: 'ఫిల్టర్',

  status: 'స్థితి',
  category: 'వర్గం',
  location: 'స్థానం',
  date: 'తేదీ',
  actions: 'చర్యలు',
  search: 'శోధన',
  loading: 'లోడ్ అవుతోంది...',
  viewDetails: 'వివరాలు చూడండి',
};

// Bengali
const bn: TranslationKeys = { ...en,
  home: 'হোম', cityTwin: '3D সিটি টুইন', predictiveAi: 'পূর্বাভাস AI', liveMap: 'লাইভ মানচিত্র', reportIssue: 'অভিযোগ দায়ের করুন',
  heroBadge: 'AI পরিচালিত নাগরিক সমস্যা সমাধান', heroTitle: 'স্থানীয় নাগরিক সমস্যাগুলি জানান। AI সঙ্গে সঙ্গে কর্মকর্তাদের কাছে পাঠায়।',
  signIn: 'সাইন ইন', signOut: 'সাইন আউট', reportTitle: 'নাগরিক সমস্যা জানান',
  submitTicket: 'টিকিট জমা দিন ও বিভাগে পাঠান', anonymousMode: 'বেনামী মোড',
  workerPortal: 'ফিল্ড ওয়ার্কার পোর্টাল', citizenPortal: 'নাগরিক ড্যাশবোর্ড',
  officerPortal: 'কর্মকর্তা কমান্ড সেন্টার', approve: 'অনুমোদন', reject: 'প্রত্যাখ্যান',
  fakeDetected: 'নকল অভিযোগ সনাক্ত — জমা বন্ধ', notCivicIssue: 'এটি নাগরিক সমস্যা নয়',
  verificationPassed: 'AI যাচাই সফল — ত্রুটি মুছে ফেলা হয়েছে!', verificationFailed: 'AI যাচাই ব্যর্থ — ত্রুটি এখনও আছে!',
};

// Marathi
const mr: TranslationKeys = { ...en,
  home: 'मुख्यपृष्ठ', cityTwin: '3D सिटी ट्विन', predictiveAi: 'पूर्वानुमान AI', liveMap: 'लाइव्ह नकाशा', reportIssue: 'तक्रार नोंदवा',
  heroBadge: 'एआय संचलित नागरिक समस्या निवारण', heroTitle: 'स्थानिक नागरी समस्यांची नोंद करा. AI त्वरित अधिकारी आणि कामगारांकडे पाठवते.',
  signIn: 'साइन इन', signOut: 'साइन आउट', reportTitle: 'नागरी समस्या नोंदवा',
  submitTicket: 'तिकीट सबमिट करा आणि विभागाला पाठवा', anonymousMode: 'अनामिक मोड',
  workerPortal: 'फील्ड कामगार पोर्टल', citizenPortal: 'नागरिक डॅशबोर्ड',
  officerPortal: 'अधिकारी कमांड सेंटर', approve: 'मंजूर', reject: 'नाकारा',
  fakeDetected: 'बनावट तक्रार आढळली — सबमिशन ब्लॉक', notCivicIssue: 'ही नागरी समस्या नाही',
  verificationPassed: 'AI पडताळणी यशस्वी — दोष दूर!', verificationFailed: 'AI पडताळणी अयशस्वी — दोष अजूनही आहे!',
};

// Gujarati
const gu: TranslationKeys = { ...en,
  home: 'હોમ', cityTwin: '3D સિટી ટ્વિન', predictiveAi: 'પૂર્વાનુમાન AI', liveMap: 'લાઇવ નકશો', reportIssue: 'ફરિયાદ નોંધાવો',
  heroBadge: 'AI સંચાલિત નાગરિક સમસ્યા નિવારણ', heroTitle: 'સ્થાનિક નાગરિક સમસ્યાઓની જાણ કરો. AI તરત જ અધિકારીઓ અને કામદારોને મોકલે છે.',
  signIn: 'સાઇન ઇન', signOut: 'સાઇન આઉટ', reportTitle: 'નાગરિક સમસ્યાની જાણ કરો',
  submitTicket: 'ટિકિટ સબમિટ કરો અને વિભાગને મોકલો', anonymousMode: 'અનામિક મોડ',
  workerPortal: 'ફિલ્ડ વર્કર પોર્ટલ', citizenPortal: 'નાગરિક ડેશબોર્ડ',
  officerPortal: 'અધિકારી કમાન્ડ સેન્ટર', approve: 'મંજૂર', reject: 'નામંજૂર',
};

// Kannada
const kn: TranslationKeys = { ...en,
  home: 'ಮುಖಪುಟ', cityTwin: '3D ಸಿಟಿ ಟ್ವಿನ್', predictiveAi: 'ಪೂರ್ವಸೂಚನೆ AI', liveMap: 'ಲೈವ್ ನಕ್ಷೆ', reportIssue: 'ಸಮಸ್ಯೆ ವರದಿ ಮಾಡಿ',
  heroBadge: 'AI ಚಾಲಿತ ನಾಗರಿಕ ಸಮಸ್ಯೆ ಪರಿಹಾರ', heroTitle: 'ಸ್ಥಾನಿಕ ನಾಗರಿಕ ಸಮಸ್ಯೆಗಳನ್ನು ವರದಿ ಮಾಡಿ. AI ತಕ್ಷಣವೇ ರವಾನಿಸುತ್ತದೆ.',
  signIn: 'ಸೈನ್ ಇನ್', signOut: 'ಸೈನ್ ಔಟ್', reportTitle: 'ನಾಗರಿಕ ಸಮಸ್ಯೆಯನ್ನು ವರದಿ ಮಾಡಿ',
  submitTicket: 'ಟಿಕೆಟ್ ಸಲ್ಲಿಸಿ ಮತ್ತು ಇಲಾಖೆಗೆ ಕಳುಹಿಸಿ', anonymousMode: 'ಅನಾಮಧೇಯ ಮೋಡ್',
  workerPortal: 'ಕ್ಷೇತ್ರ ಕಾರ್ಮಿಕ ಪೋರ್ಟಲ್', citizenPortal: 'ನಾಗರಿಕ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
  officerPortal: 'ಅಧಿಕಾರಿ ಕಮಾಂಡ್ ಸೆಂಟರ್',
};

// Malayalam
const ml: TranslationKeys = { ...en,
  home: 'ഹോം', cityTwin: '3D സിറ്റി ട്വിൻ', predictiveAi: 'പ്രവചന AI', liveMap: 'ലൈവ് മാപ്പ്', reportIssue: 'പ്രശ്നം റിപ്പോർട്ട് ചെയ്യുക',
  heroBadge: 'AI അധിഷ്ഠിത പൗരപ്രശ്ന പരിഹാരം', heroTitle: 'പ്രാദേശിക പൗരപ്രശ്നങ്ങൾ റിപ്പോർട്ട് ചെയ്യുക. AI തൽക്ഷണം കൈമാറുന്നു.',
  signIn: 'സൈൻ ഇൻ', signOut: 'സൈൻ ഔട്ട്', reportTitle: 'സിവിക് പ്രശ്നം റിപ്പോർട്ട് ചെയ്യുക',
  submitTicket: 'ടിക്കറ്റ് സമർപ്പിച്ച് വകുപ്പിലേക്ക് അയയ്ക്കുക', anonymousMode: 'അജ്ഞാത മോഡ്',
  workerPortal: 'ഫീൽഡ് വർക്കർ പോർട്ടൽ', citizenPortal: 'പൗരൻ ഡാഷ്ബോർഡ്',
  officerPortal: 'ഓഫീസർ കമാൻഡ് സെന്റർ',
};

const translations: Record<LangCode, TranslationKeys> = {
  EN: en,
  HI: hi,
  TA: ta,
  TE: te,
  BN: bn,
  MR: mr,
  GU: gu,
  KN: kn,
  ML: ml,
};

interface LanguageContextType {
  lang: LangCode;
  setLang: (lang: LangCode) => void;
  t: TranslationKeys;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'EN',
  setLang: () => {},
  t: en,
});

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<LangCode>('EN');

  const t = translations[lang] || en;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
