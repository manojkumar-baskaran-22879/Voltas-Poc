import React, { useState } from 'react';

const CreateSalesReturnModal = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [quotedItems, setQuotedItems] = useState([{ id: Date.now() }]);

  const addQuoteRow = () => setQuotedItems([...quotedItems, { id: Date.now() }]);
  const removeQuoteRow = (id) => setQuotedItems(quotedItems.filter(item => item.id !== id));

  const handleClose = () => {
    setStep(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px] p-4">
      <div className="bg-white w-full max-w-[550px] rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        
        <div className="p-6 border-b border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Step {step} of 2</p>
          <h3 className="text-lg font-bold text-slate-700">
            {step === 1 ? "Sales Return Information" : "Quoted Items"}
          </h3>
          <div className="mt-3 w-full bg-slate-100 h-1 rounded-full overflow-hidden">
            <div className="bg-[#0066b2] h-full transition-all duration-500" style={{ width: `${(step / 2) * 100}%` }} />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {step === 1 ? (
            <div className="space-y-4 animate-in fade-in duration-300">
              {/* Form Fields */}
              {["Subject", "Case", "Invoice Number"].map((label) => (
                <div key={label} className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">{label}</label>
                  <input type="text" placeholder={label} className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100" />
                </div>
              ))}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Sales Return Status</label>
                <select className="w-full p-3 border border-slate-200 rounded-xl bg-white text-slate-400 text-sm outline-none">
                  <option>Select</option>
                </select>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-slate-800">Add Quoted Items</h4>
                <button onClick={addQuoteRow} className="bg-[#0066b2] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-sm">+ Add</button>
              </div>
              <div className="space-y-3">
                {quotedItems.map((item) => (
                  <div key={item.id} className="p-4 border border-slate-100 rounded-2xl bg-slate-50/50 flex items-center gap-3">
                    <select className="flex-1 p-2.5 border border-slate-200 rounded-xl text-sm bg-white text-slate-400 outline-none"><option>Select Product</option></select>
                    <input type="number" defaultValue={0} className="w-20 p-2.5 border border-slate-200 rounded-xl text-sm text-center outline-none" />
                    <button onClick={() => removeQuoteRow(item.id)} className="text-slate-400 hover:text-red-500 font-bold px-2">—</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-5 border-t border-slate-100 flex items-center justify-between bg-white">
          <div>
            {step > 1 && (
              <button onClick={() => setStep(step - 1)} className="text-[#0066b2] text-sm font-bold flex items-center gap-1 hover:bg-blue-50 px-3 py-2 rounded-xl"><span>‹</span> Previous</button>
            )}
          </div>
          <div className="flex gap-3">
            <button onClick={handleClose} className="px-6 py-2.5 text-[#0066b2] font-bold text-sm hover:bg-blue-50 rounded-xl">Cancel</button>
            <button 
              onClick={() => step < 2 ? setStep(step + 1) : handleClose()}
              className="bg-[#0066b2] hover:bg-blue-700 text-white px-10 py-2.5 rounded-full text-sm font-bold shadow-md active:scale-95"
            >
              {step === 2 ? "Create" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSalesReturnModal;