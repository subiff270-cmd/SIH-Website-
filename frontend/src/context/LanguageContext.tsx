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
  heroTitleMain: string;
  heroSub: string;
  ctaReport: string;
  ctaTrack: string;
  statTriageAcc: string;
  statResolutionSpeed: string;
  statWardsCovered: string;
  statRewards: string;

  // Homepage Sections
  twinTitle: string;
  twinSub: string;
  deptTitle: string;
  deptSub: string;
  activityTitle: string;
  activitySub: string;
  howItWorksTitle: string;
  howItWorksSub: string;
  techStackTitle: string;
  techStackSub: string;
  faqTitle: string;
  faqSub: string;
  predictiveTitle: string;
  predictiveSub: string;

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
  heroTitleMain: 'CivicAI Smart City Operating System',
  heroSub: 'Snap photos of potholes, garbage, water leaks, or broken lights. AI automatically classifies defects, verifies GPS, and dispatches municipal crews.',
  ctaReport: 'Snap Photo & Report Civic Issue',
  ctaTrack: 'View My Reported Tickets Progress →',
  statTriageAcc: 'AI TRIAGE ACCURACY',
  statResolutionSpeed: 'AVG RESOLUTION SPEED',
  statWardsCovered: 'MUNICIPAL WARDS COVERED',
  statRewards: 'REWARDS DISPATCHED',

  twinTitle: '3D Smart City Digital Twin Viewport',
  twinSub: 'Interactive WebGL 3D canvas showing active complaint beacons, department HQs, drone surveillance, and live weather conditions.',
  deptTitle: 'Department Priority Matrices & Live Incident Telemetry',
  deptSub: 'Select a municipal department to filter active complaints, track field worker deployment, and view SLA compliance stats.',
  activityTitle: 'Live Crowd Triage & Ticket Feed',
  activitySub: 'Real-time feed of citizen complaint reports being analyzed by YOLOv8 vision AI, verified by GPS, and assigned to workers.',
  howItWorksTitle: '3-Step Autonomous Civic Lifecycle',
  howItWorksSub: 'From citizen camera photo to AI verification, officer triage approval, field worker dispatch, and citizen reward points.',
  techStackTitle: 'CivicAI Neural Engine Architecture',
  techStackSub: 'Powered by computer vision object detection, GIS spatial deduplication, NLP voice triage, and 3D WebGL digital twin rendering.',
  faqTitle: 'Frequently Asked Questions',
  faqSub: 'Everything you need to know about CivicAI Smart City OS, reporting complaints, earning rewards, and officer workflows.',
  predictiveTitle: 'Predictive Civic Maintenance Hub',
  predictiveSub: 'Instead of waiting for complaints, predict future civic problems using historical complaints, rainfall, traffic density, and road age.',

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
  heroTitleMain: 'CivicAI स्मार्ट सिटी ऑपरेटिंग सिस्टम',
  heroSub: 'गड्ढों, कचरे, पानी के रिसाव या टूटी लाइटों की तस्वीरें लें। AI स्वतः दोषों को वर्गीकृत करता है, GPS की पुष्टि करता है, और कर्मचारियों को भेजता है।',
  ctaReport: 'फ़ोटो लें और नागरिक समस्या रिपोर्ट करें',
  ctaTrack: 'मेरी रिपोर्ट की गई टिकटों की प्रगति देखें →',
  statTriageAcc: 'एआई वर्गीकरण सटीकता',
  statResolutionSpeed: 'औसत समाधान गति',
  statWardsCovered: 'नगर निगम वार्ड कवर किए गए',
  statRewards: 'नागरिक पुरस्कार वितरित',

  twinTitle: '3D स्मार्ट सिटी डिजिटल ट्विन व्यूपोर्ट',
  twinSub: 'सक्रिय शिकायत बीकन, विभागीय मुख्यालय, ड्रोन निगरानी और लाइव मौसम स्थितियों को प्रदर्शित करने वाला 3D कैनवास।',
  deptTitle: 'विभाग प्राथमिकता मैट्रिक्स और लाइव घटना टेलीमेट्री',
  deptSub: 'सक्रिय शिकायतों को फ़िल्टर करने और फ़ील्ड वर्कर तैनाती को ट्रैक करने के लिए एक नगर निगम विभाग चुनें।',
  activityTitle: 'लाइव क्राउड ट्राइएज और टिकट फीड',
  activitySub: 'YOLOv8 विज़न AI द्वारा विश्लेषित और GPS द्वारा सत्यापित नागरिक शिकायत रिपोर्टों की वास्तविक समय फीड।',
  howItWorksTitle: '3-चरणीय स्वायत्त नागरिक जीवनचक्र',
  howItWorksSub: 'नागरिक कैमरा फ़ोटो से लेकर AI सत्यापन, अधिकारी अनुमोदन, वर्कर प्रेषण और पुरस्कार अंक तक।',
  techStackTitle: 'CivicAI न्यूरल इंजन आर्किटेक्चर',
  techStackSub: 'कंप्यूटर विज़न ऑब्जेक्ट डिटेक्शन, GIS स्थानिक डिड्यूप्लीकेशन और NLP द्वारा संचालित।',
  faqTitle: 'अक्सर पूछे जाने वाले प्रश्न',
  faqSub: 'CivicAI स्मार्ट सिटी OS, शिकायतों की रिपोर्ट करने और पुरस्कार अर्जित करने के बारे में सब कुछ।',
  predictiveTitle: 'पूर्वानुमानित नागरिक रखरखाव हब',
  predictiveSub: 'शिकायतों की प्रतीक्षा करने के बजाय, ऐतिहासिक डेटा, वर्षा और यातायात का उपयोग करके भविष्य की समस्याओं का पूर्वानुमान लगाएं।',

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
  heroTitleMain: 'CivicAI ஸ்மார்ட் சிட்டி இயங்குதளம்',
  heroSub: 'குழிகள், குப்பைகள், நீர் கசிவு அல்லது உடைந்த விளக்குகளைப் படம் பிடிக்கவும். AI தானாகவே குறைபாடுகளை வகைப்படுத்தி, அதிகாரிகளுக்கு அனுப்புகிறது.',
  ctaReport: 'படம் எடுத்து குடிமைப் பிரச்சினையைப் புகாரளிக்கவும்',
  ctaTrack: 'எனது புகார்களின் முன்னேற்றத்தைக் காண்க →',
  statTriageAcc: 'AI வகைப்பாடு துல்லியம்',
  statResolutionSpeed: 'சராசரி தீர்வு வேகம்',
  statWardsCovered: 'உள்ளடக்கப்பட்ட நகராட்சி வார்டுகள்',
  statRewards: 'வழங்கப்பட்ட குடிமக்கள் வெகுமதிகள்',

  twinTitle: '3D ஸ்மார்ட் சிட்டி டிஜிட்டல் ட்வின் வியூபோர்ட்',
  twinSub: 'செயலில் உள்ள புகார் பீக்கான்கள், துறை தலைமையகங்கள், ட்ரோன் கண்காணிப்பு மற்றும் நேரடி வானிலை நிலைகளைக் காட்டும் 3D கேன்வாஸ்.',
  deptTitle: 'துறை முன்னுரிமை மேட்ரிக்ஸ் & நேரடி சம்பவ அளவீடுகள்',
  deptSub: 'செயலில் உள்ள புகார்களை வடிகட்டவும், களப்பணியாளர் வரிசைப்படுத்தலைக் கண்காணிக்கவும் ஒரு நகராட்சித் துறையைத் தேர்ந்தெடுக்கவும்.',
  activityTitle: 'நேரடி மக்கள் கூட்டக் குழு & டிக்கெட் ஊட்டம்',
  activitySub: 'YOLOv8 விஷன் AI ஆல் பகுப்பாய்வு செய்யப்பட்டு, GPS ஆல் சரிபார்க்கப்பட்ட குடிமக்கள் புகார்களின் நேரடி ஊட்டம்.',
  howItWorksTitle: '3-படி தன்னாட்சி குடிமை வாழ்க்கைச் சுழற்சி',
  howItWorksSub: 'குடிமகன் கேமரா புகைப்படத்திலிருந்து AI சரிபார்ப்பு, அதிகாரி ஒப்புதல், பணியாளர் அனுப்புதல் மற்றும் வெகுமதி புள்ளிகள் வரை.',
  techStackTitle: 'CivicAI நியூரல் என்ஜின் கட்டிடக்கலை',
  techStackSub: 'கம்ப்யூட்டர் விஷன் பொருள் கண்டறிதல், GIS விண்வெளி நகல் நீக்கம் மற்றும் NLP குரல் குழு மூலம் இயக்கப்படுகிறது.',
  faqTitle: 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
  faqSub: 'CivicAI ஸ்மார்ட் சிட்டி OS, புகார்களைப் புகாரளிப்பது மற்றும் வெகுமதிகளைப் பெறுவது பற்றி நீங்கள் தெரிந்து கொள்ள வேண்டிய அனைத்தும்.',
  predictiveTitle: 'முன்னறிவிப்பு குடிமை பராமரிப்பு மையம்',
  predictiveSub: 'புகார்களுக்காகக் காத்திருப்பதற்குப் பதிலாக, வரலாற்று புகார்கள், மழைப்பொழிவு மற்றும் போக்குவரத்தைப் பயன்படுத்தி எதிர்கால சிக்கல்களைக் கணிக்கவும்.',

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
  heroTitleMain: 'CivicAI స్మార్ట్ సిటీ ఆపరేటింగ్ సిస్టమ్',
  heroSub: 'గొయ్యిలు, చెత్త, నీటి లీకేజీలు లేదా విరిగిన లైట్ల ఫోటోలు తీయండి. AI స్వయంచాలకంగా లోపాలను వర్గీకరిస్తుంది మరియు నివేదిస్తుంది.',
  ctaReport: 'ఫోటో తీసి పౌర సమస్యను నివేదించండి',
  ctaTrack: 'నా సమస్యల పురోగతిని చూడండి →',
  statTriageAcc: 'AI వర్గీకరణ ఖచ్చితత్వం',
  statResolutionSpeed: 'సగటు పరిష్కార వేగం',
  statWardsCovered: 'కవర్ చేయబడిన మున్సిపల్ వార్డులు',
  statRewards: 'పంపిణీ చేసిన పౌర బహుమతులు',

  twinTitle: '3D స్మార్ట్ సిటీ డిజిటల్ ట్విన్ వ్యూపోర్ట్',
  twinSub: 'యాక్టివ్ ఫిర్యాదు బీకన్లు, డిపార్ట్‌మెంట్ HQలు మరియు ప్రత్యక్ష వాతావరణ పరిస్థితులను చూపించే 3D కాన్వాస్.',
  deptTitle: 'డిపార్ట్‌మెంట్ ప్రాధాన్యత మ్యాట్రిక్స్ & లైవ్ ఇన్సిడెంట్ టెలిమెట్రీ',
  deptSub: 'యాక్టివ్ ఫిర్యాదులను ఫిల్టర్ చేయడానికి మరియు ఫీల్డ్ వర్కర్ విస్తరణను ట్రాక్ చేయడానికి మున్సిపల్ డిపార్ట్‌మెంట్‌ను ఎంచుకోండి.',
  activityTitle: 'లైవ్ క్రౌడ్ ట్రియాజ్ & టికెట్ ఫీడ్',
  activitySub: 'YOLOv8 విజన్ AI ద్వారా విశ్లేషించబడిన మరియు GPS ద్వారా ధృవీకరించబడిన పౌర ఫిర్యాదు నివేదికల ప్రత్యక్ష ఫీడ్.',
  howItWorksTitle: '3-దశల స్వయంప్రతిపత్తి పౌర జీవనచక్రం',
  howItWorksSub: 'పౌరుడి కెమెరా ఫోటో నుండి AI ధృవీకరణ, అధికారి ఆమోదం, వర్కర్ డిస్పాచ్ మరియు రివార్డ్ పాయింట్ల వరకు.',
  techStackTitle: 'CivicAI న్యూరల్ ఇంజిన్ ఆర్కిటెక్చర్',
  techStackSub: 'కంప్యూటర్ విజన్ ఆబ్జెక్ట్ డిటెక్షన్, GIS స్పేషియల్ డిడ్యూప్లికేషన్ మరియు NLP వాయిస్ ట్రియాజ్ ద్వారా ఆధారితం.',
  faqTitle: 'తరచుగా అడిగే ప్రశ్నలు',
  faqSub: 'CivicAI స్మార్ట్ సిటీ OS, ఫిర్యాదులను నివేదించడం మరియు రివార్డ్‌లను సంపాదించడం గురించి మీరు తెలుసుకోవలసినవన్నీ.',
  predictiveTitle: 'అంచనా పౌర నిర్వహణ హబ్',
  predictiveSub: 'ఫిర్యాదుల కోసం వేచి ఉండే బదులు, చారిత్రక డేటా, వర్షపాతం మరియు ట్రాఫిక్‌ను ఉపయోగించి భవిష్యత్తు సమస్యలను అంచనా వేయండి.',

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
  heroTitleMain: 'CivicAI স্মার্ট সিটি অপারেটিং সিস্টেম', heroSub: 'গর্ত, আবর্জনা, জল ফুটো বা ভাঙা আলোর ছবি তুলুন। AI স্বয়ংক্রিয়ভাবে শ্রেণীবদ্ধ করে।',
  ctaReport: 'ছবি তুলুন এবং নাগরিক সমস্যা জানান', ctaTrack: 'আমার টিকিটের অগ্রগতি দেখুন →',
  statTriageAcc: 'AI শ্রেণীকরণ নির্ভুলতা', statResolutionSpeed: 'গড় সমাধানের গতি', statWardsCovered: 'আওতাভুক্ত পৌর ওয়ার্ড', statRewards: 'বিতরণ করা নাগরিক পুরষ্কার',
  twinTitle: '3D স্মার্ট সিটি ডিজিটাল টুইন ভিউপোর্ট', twinSub: 'সক্রিয় অভিযোগ বীকন, বিভাগীয় সদর দপ্তর এবং সরাসরি আবহাওয়া দৃশ্য।',
  deptTitle: 'বিভাগীয় অগ্রাধিকার ম্যাট্রিক্স ও লাইভ পরিসংখ্যান', deptSub: 'সক্রিয় অভিযোগ ফিল্টার করতে একটি পৌর বিভাগ নির্বাচন করুন।',
  activityTitle: 'লাইভ ট্রায়াজ ও টিকিট ফিড', activitySub: 'YOLOv8 ভিশন AI দ্বারা বিশ্লেষিত নাগরিক অভিযোগের সরাসরি ফিড।',
  howItWorksTitle: '৩-ধাপের স্বায়ত্তশাসিত নাগরিক জীবনচক্র', howItWorksSub: 'ছবি তোলা থেকে AI যাচাইকরণ, কর্মকর্তা অনুমোদন এবং পুরস্কার পয়েন্ট পর্যন্ত।',
  techStackTitle: 'CivicAI নিউরাল ইঞ্জিন আর্কিটেকচার', techStackSub: 'কম্পিউটার ভিশন ও স্থানিক প্রযুক্তি দ্বারা চালিত।',
  faqTitle: 'সাধারণ জিজ্ঞাসা', faqSub: 'CivicAI স্মার্ট সিটি অপারেটিং সিস্টেম সম্পর্কে সবকিছু।',
  predictiveTitle: 'পূর্বাভাসমূলক নাগরিক রক্ষণাবেক্ষণ হাব', predictiveSub: 'ঐতিহাসিক উপাত্ত ও আবহাওয়া ব্যবহার করে ভবিষ্যতের সমস্যা অনুমান করুন।',
  signIn: 'সাইন ইন', signOut: 'সাইন আউট', reportTitle: 'নাগরিক সমস্যা জানান',
};

// Marathi
const mr: TranslationKeys = { ...en,
  home: 'मुख्यपृष्ठ', cityTwin: '3D सिटी ट्विन', predictiveAi: 'पूर्वानुमान AI', liveMap: 'लाइव्ह नकाशा', reportIssue: 'तक्रार नोंदवा',
  heroBadge: 'एआय संचलित नागरिक समस्या निवारण', heroTitle: 'स्थानिक नागरी समस्यांची नोंद करा. AI त्वरित अधिकारी आणि कामगारांकडे पाठवते.',
  heroTitleMain: 'CivicAI स्मार्ट सिटी ऑपरेटिंग सिस्टिम', heroSub: 'खड्डे, कचरा, पाण्याचे लिकेज किंवा तुटलेल्या दिव्यांचे फोटो काढा. AI आपोआप वर्गीकरण करते.',
  ctaReport: 'फोटो काढा आणि नागरी समस्या नोंदवा', ctaTrack: 'माझ्या तक्रारींची प्रगती पहा →',
  statTriageAcc: 'एआय वर्गीकरण अचूकता', statResolutionSpeed: 'सरासरी निवारण वेग', statWardsCovered: 'समाविष्ट नागरी वॉर्ड', statRewards: 'वितरित केलेले नागरिक पुरस्कार',
  twinTitle: '3D स्मार्ट सिटी डिजिटल ट्विन व्ह्यूपोर्ट', twinSub: 'सक्रिय तक्रार बीकन्स, विभागीय मुख्यालय आणि थेट हवामान दर्शवणारा 3D कॅनव्हास.',
  deptTitle: 'विभाग प्राधान्य मॅट्रिक्स आणि लाईव्ह टेलिमेट्री', deptSub: 'तक्रारी फिल्टर करण्यासाठी नगरपालिका विभाग निवडा.',
  activityTitle: 'लाईव्ह क्राउड ट्रायज आणि तिकीट फीड', activitySub: 'YOLOv8 व्हिजन AI द्वारे विश्लेषित नागरी तक्रारींची थेट फीड.',
  howItWorksTitle: '3-टप्प्यांची स्वायत्त नागरी जीवनचक्र', howItWorksSub: 'फोटोपासून ते AI पडताळणी, अधिकारी मंजुरी आणि पुरस्कार पॉइंटपर्यंत.',
  techStackTitle: 'CivicAI न्यूरल इंजिन आर्किटेक्चर', techStackSub: 'कॉम्प्युटर व्हिजन आणि स्थान तंत्रज्ञानाद्वारे संचलित.',
  faqTitle: 'सतत विचारले जाणारे प्रश्न', faqSub: 'CivicAI स्मार्ट सिटी OS बद्दल सर्वकाही.',
  predictiveTitle: 'पूर्वानुमानित नागरी देखभाल हब', predictiveSub: 'ऐतिहासिक डेटा आणि हवामानाचा वापर करून भविष्यातील समस्यांचा अंदाज लावा.',
  signIn: 'साइन इन', signOut: 'साइन आउट', reportTitle: 'नागरी समस्या नोंदवा',
};

// Gujarati
const gu: TranslationKeys = { ...en,
  home: 'હોમ', cityTwin: '3D સિટી ટ્વિન', predictiveAi: 'પૂર્વાનુમાન AI', liveMap: 'લાઇવ નકશો', reportIssue: 'ફરિયાદ નોંધાવો',
  heroBadge: 'AI સંચાલિત નાગરિક સમસ્યા નિવારણ', heroTitle: 'સ્થાનિક નાગરિક સમસ્યાઓની જાણ કરો. AI તરત જ અધિકારીઓ અને કામદારોને મોકલે છે.',
  heroTitleMain: 'CivicAI સ્માર્ટ સિટી ઓપરેટિંગ સિસ્ટમ', heroSub: 'ખાડાઓ, કચરો, પાણીના લીકેજ અથવા તૂટેલી લાઈટોના ફોટા પાડો. AI આપમેળે વર્ગીકૃત કરે છે.',
  ctaReport: 'ફોટો પાડો અને નાગરિક સમસ્યાની જાણ કરો', ctaTrack: 'મારી ફરિયાદોની પ્રગતિ જુઓ →',
  statTriageAcc: 'AI વર્ગીકરણ સચોટતા', statResolutionSpeed: 'સરેરાશ નિવારણ ઝડપ', statWardsCovered: 'આવરી લેવાયેલ પાલિકા વોર્ડ', statRewards: 'વિતરિત કરેલ નાગરિક ઈનામો',
  twinTitle: '3D સ્માર્ટ સિટી ડિજિટલ ટ્વિન વ્યૂપોર્ટ', twinSub: 'સક્રિય ફરિયાદ બીકન્સ, વિભાગીય વડામથક અને લાઇવ હવામાન દર્શાવતું 3D કેનવાસ.',
  deptTitle: 'વિભાગ પ્રાથમિકતા મેટ્રિક્સ અને લાઇવ આંકડા', deptSub: 'સક્રિય ફરિયાદો ફિલ્ટર કરવા માટે પાલિકા વિભાગ પસંદ કરો.',
  activityTitle: 'લાઇવ ટ્રાયઝ અને ટિકિટ ફીડ', activitySub: 'YOLOv8 વિઝન AI દ્વારા વિશ્લેષિત નાગરિક ફરિયાદોની લાઈવ ફીડ.',
  howItWorksTitle: '3-તબક્કાનું સ્વાયત્ત નાગરિક જીવનચક્ર', howItWorksSub: 'ફોટો પાડવાથી લઈને AI ચકાસણી, અધિકારી મંજૂરી અને ઈનામી પોઈન્ટ્સ સુધી.',
  techStackTitle: 'CivicAI ન્યુરલ એન્જિન આર્કિટેક્ચર', techStackSub: 'કોમ્પ્યુટર વિઝન અને સ્થાનિક ટેકનોલોજી દ્વારા સંચાલિત.',
  faqTitle: 'વારંવાર પૂછાતા પ્રશ્નો', faqSub: 'CivicAI સ્માર્ટ સિટી ઓએસ વિશે બધું જ.',
  predictiveTitle: 'પૂર્વાનુમાનિત નાગરિક જાળવણી હબ', predictiveSub: 'ઐતિહાસિક ડેટા અને હવામાનનો ઉપયોગ કરીને ભવિષ્યની સમસ્યાઓની આગાહી કરો.',
  signIn: 'સાઇન ઇન', signOut: 'સાઇન આઉટ', reportTitle: 'નાગરિક સમસ્યાની જાણ કરો',
};

// Kannada
const kn: TranslationKeys = { ...en,
  home: 'ಮುಖಪುಟ', cityTwin: '3D ಸಿಟಿ ಟ್ವಿನ್', predictiveAi: 'ಪೂರ್ವಸೂಚನೆ AI', liveMap: 'ಲೈವ್ ನಕ್ಷೆ', reportIssue: 'ಸಮಸ್ಯೆ ವರದಿ ಮಾಡಿ',
  heroBadge: 'AI ಚಾಲಿತ ನಾಗರಿಕ ಸಮಸ್ಯೆ ಪರಿಹಾರ', heroTitle: 'ಸ್ಥಾನಿಕ ನಾಗರಿಕ ಸಮಸ್ಯೆಗಳನ್ನು ವರದಿ ಮಾಡಿ. AI ತಕ್ಷಣವೇ ರವಾನಿಸುತ್ತದೆ.',
  heroTitleMain: 'CivicAI ಸ್ಮಾರ್ಟ್ ಸಿಟಿ ಆಪರೇಟಿಂಗ್ ಸಿಸ್ಟಮ್', heroSub: 'ಗುಂಡಿಗಳು, ಕಸ, ನೀರು ಸೋರಿಕೆ ಅಥವಾ ಮುರಿದ ದೀಪಗಳ ಫೋಟೋ ತೆಗೆಯಿರಿ.',
  ctaReport: 'ಫೋಟೋ ತೆಗೆದು ನಾಗರಿಕ ಸಮಸ್ಯೆಯನ್ನು ವರದಿ ಮಾಡಿ', ctaTrack: 'ನನ್ನ ದೂರುಗಳ ಪ್ರಗತಿಯನ್ನು ವೀಕ್ಷಿಸಿ →',
  statTriageAcc: 'AI ವರ್ಗೀಕರಣ ನಿಖರತೆ', statResolutionSpeed: 'ಸರಾಸರಿ ಪರಿಹಾರ ವೇಗ', statWardsCovered: 'ಒಳಪಟ್ಟ ಪುರಸಭೆ ವಾರ್ಡ್‌ಗಳು', statRewards: 'ವಿಭಾಗಿಸಿದ ನಾಗರಿಕ ಬಹುಮಾನಗಳು',
  twinTitle: '3D ಸ್ಮಾರ್ಟ್ ಸಿಟಿ ಡಿಜಿಟಲ್ ಟ್ವಿನ್ ವ್ಯೂಪೋರ್ಟ್', twinSub: 'ಸಕ್ರಿಯ ದೂರು ಬೀಕನ್‌ಗಳು, ಇಲಾಖಾ ಪ್ರಧಾನ ಕಚೇರಿಗಳು ಮತ್ತು ಲೈವ್ ಹವಾಮಾನ ಪ್ರದರ್ಶಿಸುವ 3D ಕ್ಯಾನ್ವಾಸ್.',
  deptTitle: 'ಇಲಾಖೆ ಆದ್ಯತೆಯ ಮ್ಯಾಟ್ರಿಕ್ಸ್ ಮತ್ತು ಲೈವ್ ಟೆಲಿಮೆಟ್ರಿ', deptSub: 'ಸಕ್ರಿಯ ದೂರುಗಳನ್ನು ಫಿಲ್ಟರ್ ಮಾಡಲು ಪುರಸಭೆಯ ಇಲಾಖೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.',
  activityTitle: 'ಲೈವ್ ಟ್ರಯಾಜ್ ಮತ್ತು ಟಿಕೆಟ್ ಫೀಡ್', activitySub: 'YOLOv8 ವಿಷನ್ AI ನಿಂದ ವಿಶ್ಲೇಷಿಸಲ್ಪಟ್ಟ ನಾಗರಿಕ ದೂರುಗಳ ಲೈವ್ ಫೀಡ್.',
  howItWorksTitle: '3-ಹಂತದ ಸ್ವಾಯತ್ತ ನಾಗರಿಕ ಜೀವನಚಕ್ರ', howItWorksSub: 'ಫೋಟೋ ತೆಗೆಯುವುದರಿಂದ AI ಪರಿಶೀಲನೆ, ಅಧಿಕಾರಿ ಅನುಮೋದನೆ ಮತ್ತು ಬಹುಮಾನ ಪಾಯಿಂಟ್‌ಗಳವರೆಗೆ.',
  techStackTitle: 'CivicAI ನ್ಯೂರಲ್ ಇಂಜಿನ್ ಆರ್ಕಿಟೆಕ್ಚರ್', techStackSub: 'ಕಂಪ್ಯೂಟರ್ ವಿಷನ್ ಮತ್ತು ಸ್ಥಳೀಯ ತಂತ್ರಜ್ಞಾನದಿಂದ ನಡೆಸಲ್ಪಡುತ್ತದೆ.',
  faqTitle: 'ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು', faqSub: 'CivicAI ಸ್ಮಾರ್ಟ್ ಸಿಟಿ OS ಬಗ್ಗೆ ನೀವು ತಿಳಿದುಕೊಳ್ಳಬೇಕಾದ ಎಲ್ಲವೂ.',
  predictiveTitle: 'ಪೂರ್ವಸೂಚಕ ನಾಗರಿಕ ನಿರ್ವಹಣಾ ಕೇಂದ್ರ', predictiveSub: 'ಹವಾಮಾನ ಮತ್ತು ಸಂಚಾರ ಬಳಸಿ ಭವಿಷ್ಯದ ಸಮಸ್ಯೆಗಳನ್ನು ಊಹಿಸಿ.',
  signIn: 'ಸೈನ್ ಇನ್', signOut: 'ಸೈನ್ ಔಟ್', reportTitle: 'ನಾಗರಿಕ ಸಮಸ್ಯೆಯನ್ನು ವರದಿ ಮಾಡಿ',
};

// Malayalam
const ml: TranslationKeys = { ...en,
  home: 'ഹോം', cityTwin: '3D സിറ്റി ട്വിൻ', predictiveAi: 'പ്രവചന AI', liveMap: 'ലൈവ് മാപ്പ്', reportIssue: 'പ്രശ്നം റിപ്പോർട്ട് ചെയ്യുക',
  heroBadge: 'AI അധിഷ്ഠിത പൗരപ്രശ്ന പരിഹാരം', heroTitle: 'പ്രാദേശിക പൗരപ്രശ്നങ്ങൾ റിപ്പോർട്ട് ചെയ്യുക. AI തൽക്ഷണം കൈമാറുന്നു.',
  heroTitleMain: 'CivicAI സ്മാർട്ട് സിറ്റി ഓപ്പറേറ്റിംഗ് സിസ്റ്റം', heroSub: 'കുഴികൾ, മാലിന്യങ്ങൾ, ജലചോർച്ച എന്നിവയുടെ ചിത്രങ്ങൾ എടുക്കുക.',
  ctaReport: 'ചിത്രമെടുത്ത് പൗരപ്രശ്നം റിപ്പോർട്ട് ചെയ്യുക', ctaTrack: 'എന്റെ റിപ്പോർട്ടുകളുടെ പുരോഗതി കാണുക →',
  statTriageAcc: 'AI തരംതിരിക്കൽ കൃത്യത', statResolutionSpeed: 'ശരാശരി പരിഹാര വേഗത', statWardsCovered: 'ഉൾപ്പെടുത്തിയ മുൻസിപ്പൽ വാർഡുകൾ', statRewards: 'വിതരണം ചെയ്ത പൗര പുരസ്കാരങ്ങൾ',
  twinTitle: '3D സ്മാർട്ട് സിറ്റി ഡിജിറ്റൽ ട്വിൻ വ്യൂപോർട്ട്', twinSub: 'സജീവ പരാതി ബീക്കണുകൾ, വകുപ്പ് ആസ്ഥാനങ്ങൾ, ഡ്രോൺ നിരീക്ഷണം എന്നിവ കാണിക്കുന്ന 3D ക്യാൻവാസ്.',
  deptTitle: 'വകുപ്പ് മുൻഗണനാ മാട്രിക്സ് & ലൈവ് വിവരങ്ങൾ', deptSub: 'സജീവ പരാതികൾ ഫിൽട്ടർ ചെയ്യാൻ ഒരു മുൻസിപ്പൽ വകുപ്പ് തിരഞ്ഞെടുക്കുക.',
  activityTitle: 'ലൈവ് പരാതി ഫീഡ്', activitySub: 'YOLOv8 വിഷൻ AI വഴി അപഗ്രഥിച്ച പൗര പരാതികളുടെ തത്സമയ ഫീഡ്.',
  howItWorksTitle: '3-ഘട്ട സിവിക് ലൈഫ് സൈക്കിൾ', howItWorksSub: 'ചിത്രമെടുക്കൽ മുതൽ AI പരിശോധന, ഓഫീസർ അംഗീകാരം, റിവാർഡ് പോയിന്റുകൾ വരെ.',
  techStackTitle: 'CivicAI ന്യൂറൽ എഞ്ചിൻ ആർക്കിടെക്ചർ', techStackSub: 'കംപ്യൂട്ടർ വിഷൻ, ജിഐഎസ് സാങ്കേതികവിദ്യ എന്നിവയാൽ പ്രവർത്തിക്കുന്നു.',
  faqTitle: 'പതിവായി ചോദിക്കുന്ന ചോദ്യങ്ങൾ', faqSub: 'CivicAI സ്മാർട്ട് സിറ്റി OS നെക്കുറിച്ച് അറിയേണ്ടതെല്ലാം.',
  predictiveTitle: 'പ്രവചന സിവിക് മെയിന്റനൻസ് ഹബ്', predictiveSub: 'കാലാവസ്ഥയും ഗതാഗതവും ഉപയോഗിച്ച് ഭാവിയിലെ പ്രശ്നങ്ങൾ പ്രവചിക്കുക.',
  signIn: 'സൈൻ ഇൻ', signOut: 'സൈൻ ഔട്ട്', reportTitle: 'സിവിക് പ്രശ്നം റിപ്പോർട്ട് ചെയ്യുക',
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
