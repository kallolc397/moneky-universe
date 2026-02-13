
import React, { useState } from 'react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  dedication: string;
  onUpdateDedication: (text: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ 
  isOpen, onClose, dedication, onUpdateDedication 
}) => {
  const [localDedication, setLocalDedication] = useState(dedication);
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      onUpdateDedication(localDedication);
      setIsSaving(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/90 backdrop-blur-2xl">
      <div className="glass w-full max-w-lg rounded-[2.5rem] p-10 border-white/10 animate-fade-in-up relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-violet-500 to-orange-500" />
        
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-2xl font-serif text-white italic">Monkey's Control Room</h2>
            <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mt-1">Dedicated to the one and only Puchku</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-white/40 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-8">
          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-widest text-pink-500 font-bold">Personal Dedication Message</label>
            <textarea 
              value={localDedication}
              onChange={(e) => setLocalDedication(e.target.value)}
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-1 focus:ring-pink-500/50 transition-all placeholder:text-white/20 resize-none font-light italic"
              placeholder="e.g. For my favorite Puchku..."
            />
          </div>

          <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-500">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6V11.114A4.369 4.369 0 0015 11c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                   </svg>
                </div>
                <div>
                   <p className="text-xs text-white/80 font-medium">Song: "Monkey's Choice"</p>
                   <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1">Source: public/song.mp3</p>
                </div>
             </div>
          </div>
        </div>

        <div className="mt-12 flex gap-4">
          <button 
            disabled={isSaving}
            onClick={onClose}
            className="flex-1 py-4 glass rounded-2xl text-white/60 hover:text-white transition-all font-medium text-sm disabled:opacity-50"
          >
            Cancel
          </button>
          <button 
            disabled={isSaving}
            onClick={handleSave}
            className="flex-1 py-4 bg-gradient-to-r from-pink-600 to-violet-600 rounded-2xl text-white font-bold text-sm shadow-xl shadow-pink-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : 'Update Dedication'}
          </button>
        </div>
        
        <p className="text-center mt-8 text-[9px] text-white/10 uppercase tracking-[0.3em] italic">
          Admin access: For the Monkey only.
        </p>
      </div>
    </div>
  );
};
