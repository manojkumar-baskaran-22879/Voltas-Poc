import React, { useState } from 'react';

const AgencyStockModal = ({ isOpen, onClose, onSubmit }) => {
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      // Logic for final submission
      onSubmit?.();
      handleClose();
    }
  };

  const handleClose = () => {
    setStep(1); // Reset for next time it opens
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px] p-4">
      <div className="bg-white w-full max-w-[550px] rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Step {step} of 3</p>
          <h3 className="text-lg font-bold text-slate-700">Agency Wise Stock Information</h3>
          <div className="mt-3 w-full bg-slate-100 h-1 rounded-full overflow-hidden">
            <div 
              className="bg-[#0066b2] h-full transition-all duration-500" 
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar bg-white">
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Part Name</label>
                <select className="w-full p-3 border border-slate-200 rounded-xl bg-white text-slate-400 text-sm outline-none"><option>Select</option></select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Email</label>
                <input type="email" placeholder="Email" className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Agency</label>
                <select className="w-full p-3 border border-slate-200 rounded-xl bg-white text-slate-400 text-sm outline-none"><option>Select</option></select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Secondary Email</label>
                <input type="email" placeholder="Secondary Email" className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none" />
              </div>
              <div className="flex items-center gap-3 pt-2">
                <label className="text-sm font-semibold text-slate-700">Email Opt Out</label>
                <input type="checkbox" className="w-5 h-5 border-slate-300 rounded focus:ring-blue-500" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Phone</label>
                <input type="text" placeholder="Phone" className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Mobile</label>
                <input type="text" placeholder="Mobile" className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Other Phone</label>
                <input type="text" placeholder="Other Phone" className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Assistant Phone</label>
                <input type="text" placeholder="Assistant Phone" className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Fax</label>
                <input type="text" placeholder="Fax" className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none" />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Assistant</label>
                <input type="text" placeholder="Assistant" className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Spares/Service Category</label>
                <select className="w-full p-3 border border-slate-200 rounded-xl bg-white text-slate-400 text-sm outline-none">
                  <option>Select</option>
                  <option>Spare Parts</option>
                  <option>Service</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Description</label>
                <textarea placeholder="Description" rows={4} className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none resize-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Skype ID</label>
                <input type="text" placeholder="Skype ID" className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none" />
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t border-slate-100 flex items-center justify-between bg-white">
          <div>
            {step > 1 && (
              <button 
                onClick={() => setStep(step - 1)}
                className="text-[#0066b2] text-sm font-bold flex items-center gap-1 px-4 py-2 hover:bg-blue-50 rounded-xl transition-colors"
              >
                <span>‹</span> Previous
              </button>
            )}
          </div>
          <div className="flex gap-3">
            <button onClick={handleClose} className="px-6 py-2.5 text-[#0066b2] font-bold text-sm hover:bg-blue-50 rounded-xl">
              Cancel
            </button>
            <button 
              onClick={handleNext}
              className="bg-[#0066b2] hover:bg-blue-700 text-white px-10 py-2.5 rounded-full text-sm font-bold shadow-md transition-all active:scale-95"
            >
              {step === 3 ? "Create" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgencyStockModal;