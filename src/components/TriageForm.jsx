import React, { useState } from 'react';

function TriageForm() {
    const [symptoms, setSymptoms] = useState('');
    const [department, setDepartment] = useState('');
    const [departmentTe, setDepartmentTe] = useState(''); 
    const [isLoading, setIsLoading] = useState(false);

    // LOGIC IS UNTOUCHED
    const handleSymptomSubmit = async (text) => {
        if (!text.trim()) return; 
        setIsLoading(true);
        
        try {
            const response = await fetch('http://localhost:5678/webhook/ai-triage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ symptomText: text })
            });

            if (!response.ok) throw new Error("n8n Webhook failed");

            let rawText = await response.text();
            
            // Clean up unwanted characters or leading equals signs
            rawText = rawText.replace(/^=/, '').replace(/```/g, '').trim();

            // Split the response by lines
            const lines = rawText.split('\n');
            let englishDept = "";
            let teluguDept = "";

            lines.forEach(line => {
                if (line.toLowerCase().includes('english department:')) {
                    englishDept = line.replace(/english department:/i, '').trim();
                } else if (line.toLowerCase().includes('telugu department:')) {
                    teluguDept = line.replace(/telugu department:/i, '').trim();
                }
            });

            // Fallback if formatting varies slightly
            if (!englishDept) englishDept = rawText;

            setDepartment(englishDept);
            setDepartmentTe(teluguDept); 

        } catch (error) {
            console.error("Error asking Groq AI:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-8 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
            {/* Header Section */}
            <div className="flex items-center space-x-3 border-b border-slate-100 pb-4 mb-6">
                <div className="bg-teal-50 p-2 rounded-lg">
                    <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                        AI Symptom Triage
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">Smart preliminary screening system</p>
                </div>
            </div>
            
            {/* Input Section */}
            <div className="space-y-4">
                <label className="block text-sm font-semibold text-slate-700">
                    Describe patient symptoms (English or Telugu)
                </label>
                <textarea 
                    value={symptoms} 
                    onChange={(e) => setSymptoms(e.target.value)} 
                    placeholder="e.g., Severe chest pain and shortness of breath..."
                    className="w-full border border-slate-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all resize-none shadow-sm text-slate-700 placeholder-slate-400"
                    rows="4"
                />
                
                <button 
                    onClick={() => handleSymptomSubmit(symptoms)}
                    disabled={isLoading}
                    className={`w-full text-white p-4 rounded-xl font-bold transition-all flex justify-center items-center gap-2 shadow-md ${
                        isLoading 
                            ? 'bg-teal-400 cursor-not-allowed' 
                            : 'bg-teal-600 hover:bg-teal-700 hover:shadow-lg active:scale-[0.99]'
                    }`}
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Analyzing Urgency...
                        </>
                    ) : (
                        "Analyze & Assign Department"
                    )}
                </button>
            </div>

            {/* Results Section */}
            {department && (
                <div className="mt-6 bg-emerald-50 border border-emerald-200 p-6 rounded-xl text-center animate-fade-in-up">
                    <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                        Triage Complete
                    </span>
                    <h3 className="text-emerald-900 font-medium mb-1">Recommended Route</h3>
                    <p className="text-emerald-700 text-3xl font-black tracking-tight">{department}</p>
                    <p className="text-emerald-600 text-lg font-bold mt-2">{departmentTe}</p>
                </div>
            )}
        </div>
    );
}

export default TriageForm;