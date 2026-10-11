import React, { useState, useEffect } from 'react';
import { 
  Stethoscope, User, CalendarCheck, Clock, MapPin, Globe, ArrowLeft, Hospital, Lock, 
  CheckCircle, Info, Sparkles, Brain, Activity, MessageSquare 
} from 'lucide-react';
import TriageForm from './components/TriageForm';

const translations = {
  en: {
    appTitle: "GramaHealth", patientLogin: "Patient Portal", doctorLogin: "Doctor Access",
    nameLabel: "Full Name", emailLabel: "Email Address", mobileLabel: "Mobile Number", passwordLabel: "Password (4-Digit PIN)", locationLabel: "Select Location",
    enterApp: "Login to Account", findDoc: "Find a Doctor", noDocs: "No doctors available right now.",
    getToken: "Get Token", cannotBook: "Cannot Book", bookAppt: "Book Appointment",
    ageLabel: "Patient Age", symptomsLabel: "Symptoms / Reason for visit", confirmBook: "Confirm Booking",
    cancel: "Cancel", docDashboard: "Doctor Dashboard", hospName: "Hospital/Clinic Name",
    specialty: "Specialty", registerDoc: "Register as New Doctor", loginDoc: "Login to Account", logout: "Logout",
    myBookings: "My Active Bookings", registerPatient: "Register New Patient",
    loginBtn: "Login", registerBtn: "Register", 
    noAccount: "Don't have an account?", createOne: "Register here",
    hasAccount: "Already have an account?", loginHere: "Login here",
    available: "Available", delayed: "Delayed", unavailable: "Unavailable", stopBookings: "Unavailable (Stop Bookings)",
    markCompleted: "Mark as Completed", completed: "Completed", pending: "Pending",
    totalTokens: "Total Tokens", completedTokens: "Completed", pendingTokens: "Waiting",
    etaTurn: "It's your turn! Please head inside.", etaAhead: "people ahead of you.", etaWait: "Estimated wait:", etaMins: "mins",
    showAllVillages: "Search Other Villages", showMyLocation: "Back to My Location",
    
    // Landing Page Additions
    heroBadge: "🚀 Smart Clinic Capstone",
    heroTitle: "Next-Gen Outpatient Management System",
    heroSubtitle: "Revolutionizing rural healthcare access with AI-driven preliminary triage and automated virtual queues. Book a token and wait safely at home until your doctor is ready.",
    feat1Title: "AI Symptom Triage",
    feat1Desc: "Instant preliminary screening to detect clinical emergencies.",
    feat2Title: "Virtual Queueing",
    feat2Desc: "Live token tracking reduces waiting room crowding.",
    feat3Title: "Smart SMS Alerts",
    feat3Desc: "Get notified via phone exactly when to start your commute.",
    portalTitle: "Access the Platform"
  },
  te: {
    appTitle: "గ్రామ ఆరోగ్య", patientLogin: "రోగి పోర్టల్", doctorLogin: "డాక్టర్ యాక్సెస్",
    nameLabel: "పూర్తి పేరు", emailLabel: "ఈమెయిల్ చిరునామా", mobileLabel: "మొబైల్ నంబర్", passwordLabel: "పాస్వర్డ్ (4-అంకెల పిన్)", locationLabel: "ప్రాంతాన్ని ఎంచుకోండి",
    enterApp: "ఖాతాకి లాగిన్ చేయండి", findDoc: "డాక్టర్‌ను కనుగొనండి", noDocs: "ప్రస్తుతం డాక్టర్లు అందుబాటులో లేరు.",
    getToken: "టోకెన్ పొందండి", cannotBook: "బుక్ చేయలేరు", bookAppt: "అపాయింట్‌మెంట్ ఫారం",
    ageLabel: "రోగి వయస్సు", symptomsLabel: "లక్షణాలు / కారణం", confirmBook: "బుకింగ్ నిర్ధారించండి",
    cancel: "రద్దు చేయండి", docDashboard: "డాక్టర్ డాష్‌బోర్డ్", hospName: "ఆసుపత్రి / క్లినిక్ పేరు",
    specialty: "స్పెషాలిటీ (విభాగం)", registerDoc: "కొత్త డాక్టర్‌గా నమోదు చేసుకోండి", loginDoc: "ఖాతాకి లాగిన్ చేయండి", logout: "లాగ్అవుట్",
    myBookings: "నా బుకింగ్‌లు", registerPatient: "కొత్త రోగి నమోదు",
    loginBtn: "లాగిన్ చేయండి", registerBtn: "నమోదు చేయండి", 
    noAccount: "ఖాతా లేదా?", createOne: "ఇక్కడ నమోదు చేయండి",
    hasAccount: "ఇప్పటికే ఖాతా ఉందా?", loginHere: "ఇక్కడ లాగిన్ చేయండి",
    available: "అందుబాటులో ఉన్నారు", delayed: "ఆలస్యం", unavailable: "అందుబాటులో లేరు", stopBookings: "అందుబాటులో లేరు (బుకింగ్స్ ఆపండి)",
    markCompleted: "పూర్తయినట్లు మార్క్ చేయండి", completed: "పూర్తయింది", pending: "పెండింగ్",
    totalTokens: "మొత్తం టోకెన్లు", completedTokens: "పూర్తయినవి", pendingTokens: "వేచి ఉన్నారు",
    etaTurn: "మీ వంతు వచ్చేసింది! దయచేసి లోపలికి వెళ్లండి.", etaAhead: "మంది మీ ముందు ఉన్నారు.", etaWait: "అంచనా నిరీక్షణ:", etaMins: "నిమిషాలు",
    showAllVillages: "ఇతర ప్రాంతాల్లో వెతకండి", showMyLocation: "నా ప్రాంతానికి తిరిగి వెళ్లండి",
    
    // Landing Page Additions
    heroBadge: "🚀 స్మార్ట్ క్లినిక్ ప్రాజెక్ట్",
    heroTitle: "అధునాతన ఔట్ పేషెంట్ మేనేజ్‌మెంట్",
    heroSubtitle: "AI-ఆధారిత ప్రాథమిక ట్రియాజ్ మరియు ఆటోమేటెడ్ క్యూలతో గ్రామీణ ఆరోగ్య సంరక్షణను మెరుగుపరుస్తున్నాము. డాక్టర్ సిద్ధమయ్యే వరకు ఇంట్లోనే సురక్షితంగా వేచి ఉండండి.",
    feat1Title: "AI లక్షణాల ట్రియాజ్",
    feat1Desc: "అత్యవసర పరిస్థితుల కోసం తక్షణ ప్రాథమిక స్క్రీనింగ్.",
    feat2Title: "వర్చువల్ క్యూయింగ్",
    feat2Desc: "లైవ్ ట్రాకింగ్ ద్వారా ఆసుపత్రి రద్దీ తగ్గింపు.",
    feat3Title: "స్మార్ట్ SMS అలర్ట్‌లు",
    feat3Desc: "మీ వంతు వచ్చిన వెంటనే ఫోన్ ద్వారా నోటిఫికేషన్.",
    portalTitle: "ప్లాట్‌ఫారమ్‌ను యాక్సెస్ చేయండి"
  }
};

const LOCATIONS = ["Vizianagaram", "Bobbili", "Parvathipuram", "Cheepurupalli"];
const API_URL = "http://localhost:5000/api";

export default function App() {
  const [lang, setLang] = useState('en'); 
  const t = translations[lang]; 
  const [view, setView] = useState('home'); 
  const [authMode, setAuthMode] = useState('login'); 
  const [currentUser, setCurrentUser] = useState(null);
  const [authError, setAuthError] = useState(""); 
  
  const [showAllLocations, setShowAllLocations] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [bookingModal, setBookingModal] = useState(null);
  const [myAppointments, setMyAppointments] = useState([]); 
  const [doctorQueue, setDoctorQueue] = useState([]); 

  // --- LOGIC UNTOUCHED ---
  const fetchDoctors = async () => {
    try {
      const response = await fetch(`${API_URL}/doctors`);
      setDoctors(await response.json());
    } catch (err) { console.error("Failed to fetch doctors."); }
  };

  useEffect(() => {
    fetchDoctors();
    const interval = setInterval(fetchDoctors, 5000); 
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (view === 'patient_dash' && currentUser?.type === 'patient') {
      const fetchPatientAppts = async () => {
        try {
          const res = await fetch(`${API_URL}/appointments/patient/${currentUser.mobile}`, {
            headers: { 'Authorization': `Bearer ${currentUser.token}` }
          });
          setMyAppointments(await res.json());
        } catch (err) { console.error("Failed to fetch patient history"); }
      };
      fetchPatientAppts();
      const interval = setInterval(fetchPatientAppts, 5000);
      return () => clearInterval(interval);
    }
  }, [view, currentUser]);

  useEffect(() => {
    if (view === 'doctor_dash' && currentUser?.type === 'doctor') {
      const fetchQueue = async () => {
        try {
          const res = await fetch(`${API_URL}/appointments/doctor/${currentUser._id}`, {
            headers: { 'Authorization': `Bearer ${currentUser.token}` }
          });
          setDoctorQueue(await res.json());
        } catch (err) { console.error("Failed to fetch queue"); }
      };
      fetchQueue();
      const interval = setInterval(fetchQueue, 5000);
      return () => clearInterval(interval);
    }
  }, [view, currentUser]);

  const handlePatientLogin = async (e) => {
    e.preventDefault();
    setAuthError("");
    try {
      const res = await fetch(`${API_URL}/patients/login`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: e.target.name.value, mobile: e.target.mobile.value, password: e.target.password.value })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setCurrentUser({ type: 'patient', token: data.token, ...data.patient });
      setShowAllLocations(false);
      setView('patient_dash');
    } catch (err) { setAuthError(err.message); }
  };

  const handlePatientRegister = async (e) => {
    e.preventDefault();
    setAuthError("");
    try {
      const res = await fetch(`${API_URL}/patients/register`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: e.target.name.value, mobile: e.target.mobile.value, password: e.target.password.value, location: e.target.location.value })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setCurrentUser({ type: 'patient', token: data.token, ...data.patient });
      setMyAppointments([]); 
      setShowAllLocations(false);
      setView('patient_dash');
    } catch (err) { setAuthError(err.message); }
  };

  const handleDoctorLogin = async (e) => {
    e.preventDefault();
    setAuthError("");
    try {
      const res = await fetch(`${API_URL}/doctors/login`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: e.target.email.value, password: e.target.password.value })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setCurrentUser({ type: 'doctor', token: data.token, ...data.doctor });
      setView('doctor_dash');
    } catch (err) { setAuthError(err.message); }
  };

  const handleDoctorRegister = async (e) => {
    e.preventDefault();
    setAuthError("");
    try {
      const res = await fetch(`${API_URL}/doctors/register`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: e.target.name.value, email: e.target.email.value, password: e.target.password.value, specialty: e.target.specialty.value, hospital: e.target.hospital.value, location: e.target.location.value })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setDoctors([...doctors, data.doctor]); 
      setCurrentUser({ type: 'doctor', token: data.token, ...data.doctor });
      setView('doctor_dash');
    } catch (err) { setAuthError(err.message); }
  };

  const submitBooking = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/appointments/book`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${currentUser.token}` },
      body: JSON.stringify({
        patientName: currentUser.name, patientMobile: currentUser.mobile, age: e.target.age.value, symptoms: e.target.symptoms.value,
        doctorId: bookingModal._id, doctorName: bookingModal.name, hospital: bookingModal.hospital
      })
    });
    const newAppointment = await res.json();
    setMyAppointments([newAppointment, ...myAppointments]);
    setBookingModal(null);
    fetchDoctors(); 
  };

  const handleDoctorComplete = async (apptId) => {
    try {
      const res = await fetch(`${API_URL}/appointments/${apptId}/complete`, {
        method: 'PUT', headers: { 'Authorization': `Bearer ${currentUser.token}` }
      });
      if (res.ok) {
        setDoctorQueue(doctorQueue.filter(a => a._id !== apptId));
        fetchDoctors(); 
      }
    } catch (err) { console.error(err); }
  };

  const updateDoctorStatus = async (status) => {
    try {
      const res = await fetch(`${API_URL}/doctors/${currentUser._id}/status`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${currentUser.token}` },
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error("Unauthorized");
      const updatedDoc = await res.json();
      setDoctors(doctors.map(d => d._id === currentUser._id ? updatedDoc : d));
      setCurrentUser({ ...currentUser, status: updatedDoc.status });
    } catch (err) { alert(err.message); }
  };

  const logout = () => { setCurrentUser(null); setMyAppointments([]); setDoctorQueue([]); setAuthError(""); setView('home'); };

  const translateStatus = (statusString) => {
    if (statusString === 'Available') return t.available;
    if (statusString === 'Delayed') return t.delayed;
    if (statusString === 'Unavailable') return t.unavailable;
    return statusString;
  };

  // --- UI COMPONENTS ---

  const Navbar = () => (
    <nav className="bg-white border-b border-slate-200 px-4 md:px-8 py-4 sticky top-0 z-50 shadow-sm flex justify-between items-center">
      <div className="text-xl font-extrabold text-teal-700 tracking-tight flex items-center gap-2">
        <Stethoscope size={24} className="text-teal-600" /> {t.appTitle}
      </div>
      <div className="flex items-center gap-3">
        <button onClick={() => setLang(lang === 'en' ? 'te' : 'en')} className="flex items-center gap-1.5 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full transition-colors">
          <Globe size={16}/> {lang === 'en' ? 'తెలుగు' : 'English'}
        </button>
        {currentUser && (
          <button onClick={logout} className="text-sm font-medium bg-rose-50 text-rose-600 hover:bg-rose-100 px-4 py-1.5 rounded-full transition-colors">
            {t.logout}
          </button>
        )}
      </div>
    </nav>
  );

  const InputClass = "w-full border border-slate-300 bg-slate-50 p-3 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-slate-700";
  const LabelClass = "block text-sm font-semibold text-slate-700 mb-1.5";

  if (view === 'home') return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />
      
      {/* Hero Section Container */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 md:py-20 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        
        {/* Left Side: Project Description & Features */}
        <div className="space-y-8 animate-fade-in-up">
          <div className="inline-block px-4 py-1.5 bg-teal-100 text-teal-800 font-bold rounded-full text-sm tracking-wide shadow-sm">
            {t.heroBadge}
          </div>
          
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
              {t.heroTitle}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl">
              {t.heroSubtitle}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8 pt-4">
            <div className="flex gap-4 group">
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 h-fit group-hover:-translate-y-1 group-hover:shadow-md transition-all">
                <Brain className="text-teal-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">{t.feat1Title}</h3>
                <p className="text-sm text-slate-500 mt-1 leading-snug">{t.feat1Desc}</p>
              </div>
            </div>
            
            <div className="flex gap-4 group">
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 h-fit group-hover:-translate-y-1 group-hover:shadow-md transition-all">
                <Activity className="text-teal-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">{t.feat2Title}</h3>
                <p className="text-sm text-slate-500 mt-1 leading-snug">{t.feat2Desc}</p>
              </div>
            </div>

            <div className="flex gap-4 group sm:col-span-2">
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 h-fit group-hover:-translate-y-1 group-hover:shadow-md transition-all">
                <MessageSquare className="text-teal-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">{t.feat3Title}</h3>
                <p className="text-sm text-slate-500 mt-1 leading-snug">{t.feat3Desc}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Portal Access Cards */}
        <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl border border-slate-200 lg:ml-12 relative">
          {/* Decorative element */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-teal-50 rounded-full blur-2xl z-0"></div>
          
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">{t.portalTitle}</h2>
            
            <div className="space-y-6">
              <button onClick={() => {setView('patient_login'); setAuthMode('login'); setAuthError("");}} 
                className="w-full bg-teal-600 text-white p-5 rounded-2xl shadow-md hover:shadow-lg hover:bg-teal-700 hover:-translate-y-1 flex items-center justify-center gap-3 text-lg font-bold transition-all active:scale-[0.98]">
                <User size={24}/> {t.patientLogin}
              </button>
              
              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink-0 mx-4 text-slate-400 text-sm font-medium">Internal Staff</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              <button onClick={() => {setView('doctor_login'); setAuthMode('login'); setAuthError("");}} 
                className="w-full bg-slate-50 text-slate-700 border-2 border-slate-200 p-5 rounded-2xl hover:bg-slate-100 hover:border-slate-300 flex items-center justify-center gap-3 text-lg font-bold transition-all active:scale-[0.98]">
                <Hospital size={24}/> {t.doctorLogin}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );

  if (view === 'patient_login' || view === 'doctor_login') return (
    <div className="min-h-screen bg-slate-50 pb-12"><Navbar />
      <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-3xl shadow-sm border border-slate-200 mx-4">
        <button onClick={() => setView('home')} className="mb-8 text-slate-500 hover:text-teal-600 flex items-center gap-1.5 font-medium transition-colors">
          <ArrowLeft size={16}/> Back
        </button>
        
        {authError && <div className="bg-rose-50 text-rose-700 p-4 rounded-xl mb-6 text-sm font-medium border border-rose-100">{authError}</div>}

        <h2 className="text-2xl font-bold mb-6 text-slate-800 tracking-tight flex items-center gap-2">
          {authMode === 'login' ? <Lock size={20} className="text-teal-600"/> : <User size={20} className="text-teal-600"/>} 
          {authMode === 'login' ? t.loginDoc : (view === 'patient_login' ? t.registerPatient : t.registerDoc)}
        </h2>

        <form onSubmit={view === 'patient_login' ? (authMode === 'login' ? handlePatientLogin : handlePatientRegister) : (authMode === 'login' ? handleDoctorLogin : handleDoctorRegister)} className="space-y-4">
          
          {(authMode === 'register' || view === 'patient_login') && (
            <div><label className={LabelClass}>{t.nameLabel}</label><input type="text" name="name" required className={InputClass} /></div>
          )}
          
          {view === 'patient_login' ? (
            <div><label className={LabelClass}>{t.mobileLabel}</label><input type="tel" name="mobile" required className={InputClass} placeholder="10-digit number" /></div>
          ) : (
            <div><label className={LabelClass}>{t.emailLabel}</label><input type="email" name="email" required className={InputClass} /></div>
          )}

          <div><label className={LabelClass}>{t.passwordLabel}</label><input type="password" name="password" required className={InputClass} /></div>

          {authMode === 'register' && view === 'doctor_login' && (
            <>
              <div><label className={LabelClass}>{t.hospName}</label><input name="hospital" required className={InputClass} /></div>
              <div><label className={LabelClass}>{t.specialty}</label><input name="specialty" required className={InputClass} /></div>
            </>
          )}

          {authMode === 'register' && (
            <div><label className={LabelClass}>{t.locationLabel}</label>
              <select name="location" className={InputClass}>{LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}</select>
            </div>
          )}

          <button type="submit" className="w-full bg-teal-600 text-white p-4 rounded-xl font-semibold hover:bg-teal-700 transition-colors mt-2 shadow-sm">
            {authMode === 'login' ? t.loginBtn : t.registerBtn}
          </button>
        </form>

        <p className="text-center mt-8 text-sm font-medium text-slate-500">
          {authMode === 'login' ? t.noAccount : t.hasAccount} 
          <button onClick={() => {setAuthMode(authMode === 'login' ? 'register' : 'login'); setAuthError("");}} className="text-teal-600 font-bold hover:underline ml-1">
            {authMode === 'login' ? t.createOne : t.loginHere}
          </button>
        </p>
      </div>
    </div>
  );

  const displayedDoctors = showAllLocations ? doctors : doctors.filter(doc => doc.location === currentUser?.location);

  if (view === 'patient_dash') return (
    <div className="min-h-screen bg-slate-50 pb-12"><Navbar />
      <div className="max-w-4xl mx-auto mt-8 px-4">
        
        {myAppointments.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2"><CalendarCheck size={20} className="text-teal-600"/> {t.myBookings}</h2>
            <div className="grid gap-4">
              {myAppointments.map(appt => {
                const liveDoctor = doctors.find(d => d._id === appt.doctorId);
                const peopleAhead = liveDoctor ? Math.max(0, appt.tokenNumber - (liveDoctor.completedTokens || 0) - 1) : 0;
                const waitTime = peopleAhead * 10; 

                return (
                  <div key={appt._id} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <p className="text-slate-900 font-bold text-xl">{appt.doctorName}</p>
                        <p className="text-slate-500 text-sm font-medium">{appt.hospital}</p>
                      </div>
                      <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                        <div className="text-center bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                          <p className="text-slate-500 text-xs uppercase tracking-wider font-bold">Token</p>
                          <p className="text-3xl font-black text-teal-600">#{appt.tokenNumber}</p>
                        </div>
                        
                        {appt.status === 'Completed' ? (
                          <div className="flex items-center gap-1.5 text-emerald-700 font-bold bg-emerald-50 px-4 py-2.5 rounded-xl border border-emerald-200">
                            <CheckCircle size={18}/> {t.completed}
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-amber-700 font-bold bg-amber-50 px-4 py-2.5 rounded-xl border border-amber-200">
                            <Clock size={18}/> {t.pending}
                          </div>
                        )}
                      </div>
                    </div>

                    {appt.status !== 'Completed' && liveDoctor && (
                      <div className="mt-5 bg-amber-50/50 border border-amber-200/60 p-4 rounded-xl flex items-start gap-3">
                        <Info size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                          {peopleAhead === 0 ? (
                            <p className="text-amber-900 font-bold">{t.etaTurn}</p>
                          ) : (
                            <p className="text-amber-800 font-medium">
                              <strong className="text-lg">{peopleAhead}</strong> {t.etaAhead} {t.etaWait} <strong className="text-lg">~{waitTime} {t.etaMins}</strong>.
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="mb-10">
          <button 
            onClick={() => setView('triage')} 
            className="w-full bg-slate-900 text-white p-5 rounded-2xl shadow-sm hover:shadow-md hover:bg-slate-800 flex items-center justify-center gap-3 text-lg font-bold transition-all"
          >
            <Sparkles size={24} className="text-teal-400" />
            {lang === 'en' ? "AI Symptom Triage" : "AI లక్షణాల చెకర్"}
          </button>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <MapPin size={24} className="text-teal-600"/> 
            {showAllLocations ? t.findDoc : `${t.findDoc} in ${currentUser.location}`}
          </h2>
          <button 
            onClick={() => setShowAllLocations(!showAllLocations)}
            className="text-sm bg-white border border-slate-300 text-slate-700 font-semibold py-2 px-4 rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
          >
            {showAllLocations ? t.showMyLocation : t.showAllVillages}
          </button>
        </div>

        {displayedDoctors.length === 0 ? <p className="text-slate-500 bg-white p-6 rounded-2xl border border-slate-200 text-center">{t.noDocs}</p> : (
          <div className="grid md:grid-cols-2 gap-4">
            {displayedDoctors.map(doc => (
              <div key={doc._id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-teal-300 transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{doc.name}</h3>
                    <p className="text-teal-700 font-semibold text-sm mb-3">{doc.specialty}</p>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-slate-600 text-sm flex items-center gap-1.5"><Hospital size={14}/>{doc.hospital}</span>
                      <span className="text-slate-600 text-sm flex items-center gap-1.5"><MapPin size={14}/>{doc.location}</span>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 
                    ${doc.status === 'Available' ? 'bg-emerald-100 text-emerald-700' : 
                      doc.status === 'Delayed' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>
                    <Clock size={12} /> {translateStatus(doc.status)}
                  </div>
                </div>
                <div className="mt-5 flex justify-between items-center border-t border-slate-100 pt-5">
                  <span className="text-sm font-medium text-slate-500">{t.pendingTokens}: <span className="font-bold text-slate-800">{doc.tokens - (doc.completedTokens || 0)}</span></span>
                  <button onClick={() => setBookingModal(doc)} disabled={doc.status === 'Unavailable'} 
                    className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors ${doc.status === 'Unavailable' ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-teal-600 text-white hover:bg-teal-700 shadow-sm'}`}>
                    {doc.status === 'Unavailable' ? t.cannotBook : t.getToken}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {bookingModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-xl">
            <h3 className="text-xl font-bold mb-6 text-slate-900">{t.bookAppt}</h3>
            <div className="mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <p className="font-semibold text-slate-800">{bookingModal.name}</p>
              <p className="text-sm text-slate-500">{bookingModal.hospital}</p>
            </div>
            <form onSubmit={submitBooking} className="space-y-4">
              <div><label className={LabelClass}>{t.nameLabel}</label><input type="text" defaultValue={currentUser.name} className={`${InputClass} opacity-70`} readOnly/></div>
              <div><label className={LabelClass}>{t.ageLabel}</label><input name="age" type="number" required className={InputClass} /></div>
              <div><label className={LabelClass}>{t.symptomsLabel}</label><textarea name="symptoms" required className={InputClass} rows="3"></textarea></div>
              <div className="flex gap-3 mt-8">
                <button type="button" onClick={() => setBookingModal(null)} className="w-1/2 p-3 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 transition-colors">{t.cancel}</button>
                <button type="submit" className="w-1/2 bg-teal-600 text-white p-3 rounded-xl font-semibold hover:bg-teal-700 shadow-sm transition-colors">{t.confirmBook}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  if (view === 'triage') return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <Navbar />
      <div className="max-w-2xl mx-auto mt-8 px-4">
        <button onClick={() => setView('patient_dash')} className="mb-6 text-slate-500 hover:text-teal-600 flex items-center gap-1.5 font-medium transition-colors">
          <ArrowLeft size={16}/> Back to Dashboard
        </button>
        <TriageForm />
      </div>
    </div>
  );

  const activeDocData = doctors.find(d => d._id === currentUser?._id);
  
  if (view === 'doctor_dash' && activeDocData) return (
    <div className="min-h-screen bg-slate-50 pb-12"><Navbar />
      <div className="max-w-4xl mx-auto mt-8 px-4">
        
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 mb-8">
          <div className="flex justify-between items-start mb-6 border-b border-slate-100 pb-6">
            <div>
              <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{activeDocData.name}</h3>
              <p className="text-slate-500 mt-1 font-medium">{activeDocData.hospital} • {activeDocData.location}</p>
            </div>
            
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Set Status</span>
              <div className="flex bg-slate-100 p-1 rounded-xl">
                <button onClick={() => updateDoctorStatus('Available')} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeDocData.status === 'Available' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>{t.available}</button>
                <button onClick={() => updateDoctorStatus('Delayed')} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeDocData.status === 'Delayed' ? 'bg-white text-amber-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>{t.delayed}</button>
                <button onClick={() => updateDoctorStatus('Unavailable')} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeDocData.status === 'Unavailable' ? 'bg-white text-rose-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Stop</button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <p className="text-slate-500 font-semibold text-sm mb-1">{t.totalTokens}</p>
              <p className="text-3xl font-black text-slate-800">{activeDocData.tokens}</p>
            </div>
            <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100/50">
              <p className="text-emerald-700 font-semibold text-sm mb-1">{t.completedTokens}</p>
              <p className="text-3xl font-black text-emerald-600">{activeDocData.completedTokens || 0}</p>
            </div>
            <div className="bg-amber-50/50 p-5 rounded-2xl border border-amber-100/50">
              <p className="text-amber-700 font-semibold text-sm mb-1">{t.pendingTokens}</p>
              <p className="text-3xl font-black text-amber-600">
                {activeDocData.tokens - (activeDocData.completedTokens || 0)}
              </p>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold mb-4 text-slate-800 tracking-tight flex items-center gap-2">
          <Clock size={20} className="text-teal-600"/> Live Patient Queue
        </h3>
        
        {doctorQueue.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl text-center border border-slate-200 border-dashed">
            <CheckCircle size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500 text-lg font-medium">Queue is empty. Great job!</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {doctorQueue.map((appt, idx) => (
              <div key={appt._id} className={`bg-white border-l-4 ${idx === 0 ? 'border-l-teal-500 bg-teal-50/10' : 'border-l-slate-300'} border-t border-r border-b border-slate-200 p-6 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center transition-all`}>
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-sm font-bold border border-slate-200">
                      #{appt.tokenNumber}
                    </span>
                    {idx === 0 && <span className="text-xs font-bold text-teal-600 uppercase tracking-wider bg-teal-50 px-2 py-0.5 rounded animate-pulse">Next Up</span>}
                  </div>
                  <p className="text-2xl font-bold text-slate-900 mt-2">{appt.patientName}</p>
                  <div className="text-sm text-slate-600 mt-2 flex gap-4">
                    <p><span className="font-semibold text-slate-400">Age:</span> {appt.age}</p>
                    <p><span className="font-semibold text-slate-400">Symptoms:</span> {appt.symptoms}</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => handleDoctorComplete(appt._id)}
                  className="w-full md:w-auto bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 font-semibold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle size={18} />
                  Mark Complete
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}