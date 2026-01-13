import React, { useState } from 'react';
import { ChevronLeft, ChevronDown } from 'lucide-react';

const FormField = ({ label, placeholder, isSelect = false }) => (
  <div className="mb-5">
    <label className="block text-[13px] font-bold text-slate-800 mb-2">{label}</label>
    <div className="relative">
      {isSelect ? (
        <>
          <select className="w-full p-3.5 bg-white border border-slate-200 rounded-2xl text-slate-400 text-sm outline-none appearance-none cursor-pointer focus:border-blue-500">
            <option>{placeholder || 'Select'}</option>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={18} />
        </>
      ) : (
        <input 
          type="text" 
          placeholder={placeholder} 
          className="w-full p-3.5 bg-white border border-slate-200 rounded-2xl text-slate-600 text-sm outline-none focus:border-blue-500 placeholder:text-slate-300" 
        />
      )}
    </div>
  </div>
);

const CreateChallanModal = ({ isOpen, onClose, onCreate }) => {
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);
  const handleSubmit = () => {
    // Perform any creation logic here
    onCreate(); 
    setStep(1); // Reset for next time
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-[6px] transition-all duration-300">
      <div className="bg-white w-full max-w-[550px] rounded-[24px] shadow-2xl border border-white overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* STEP PROGRESS BAR */}
        <div className="px-10 pt-10 pb-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
            Step {step} of 2
          </p>
          <h2 className="text-[20px] font-bold text-slate-800 mb-6">
            {step === 1 ? 'Defective Challan Information' : 'Product Details'}
          </h2>
          <div className="w-full bg-slate-100 h-[3px] rounded-full relative">
            <div 
              className={`absolute left-0 top-0 h-full bg-[#00579c] transition-all duration-700 ease-in-out ${step === 1 ? 'w-1/2' : 'w-full'}`}
            />
          </div>
        </div>

        {/* FORM BODY */}
        <div className="px-10 py-6 max-h-[55vh] overflow-y-auto custom-scrollbar">
          {step === 1 ? (
            <>
              <FormField label="Sales Order Number" placeholder="Sales Order Number" />
              <FormField label="Email" placeholder="Email" />
              <FormField label="Service Request ID" placeholder="Select" isSelect />
              <FormField label="GRN Number" placeholder="GRN Number" />
              <FormField label="Spare Invoice Number" placeholder="Spare Invoice Number" />
              <FormField label="Secondary Email" placeholder="Secondary Email" />
              <FormField label="Agency" placeholder="Select" isSelect />
              <FormField label="Defective Challan Name" placeholder="Defective Challan Name" />
              <FormField label="Defective Chalan Status" placeholder="Select" isSelect />
            </>
          ) : (
            <>
              <FormField label="Part Name" placeholder="Select Product" isSelect />
              <FormField label="Part ID" placeholder="Part ID" />
              <FormField label="Part Quantity" placeholder="Part Quantity" />
            </>
          )}
        </div>

        {/* FOOTER NAVIGATION */}
        <div className="px-10 py-8 flex justify-between items-center bg-white">
          <div className="w-1/3">
            {step === 2 && (
              <button 
                onClick={handleBack}
                className="flex items-center gap-1.5 text-[#00579c] text-sm font-bold bg-[#f1f6fa] px-5 py-2.5 rounded-full hover:bg-[#e2edf7] transition-colors"
              >
                <ChevronLeft size={16} strokeWidth={3} /> Previous
              </button>
            )}
          </div>
          
          <div className="flex gap-6 items-center">
            <button 
              onClick={onClose}
              className="text-[#00579c] text-sm font-bold hover:underline underline-offset-4"
            >
              Cancel
            </button>
            <button 
              onClick={step === 1 ? handleNext : handleSubmit}
              className="bg-[#00579c] hover:bg-[#004a85] text-white px-10 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-blue-100 transition-all active:scale-95"
            >
              {step === 1 ? 'Next' : 'Create'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateChallanModal;