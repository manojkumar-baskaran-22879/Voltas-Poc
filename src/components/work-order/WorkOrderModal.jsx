import React from 'react';
import { X, ChevronLeft, ChevronDown, Plus, Minus } from 'lucide-react';

const FormField = ({ label, placeholder, isSelect = false }) => (
  <div className="mb-4">
    <label className="block text-[13px] font-bold text-slate-800 mb-2">{label}</label>
    <div className="relative">
      {isSelect ? (
        <>
          <select className="w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-400 text-sm outline-none appearance-none cursor-pointer focus:border-blue-500">
            <option>{placeholder || 'Select'}</option>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={16} />
        </>
      ) : (
        <input 
          type="text" 
          placeholder={placeholder} 
          className="w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-600 text-sm outline-none focus:border-blue-500 placeholder:text-slate-300" 
        />
      )}
    </div>
  </div>
);

export const WorkOrderModal = ({ currentStep, onClose, onStepChange }) => {
  const stepNumber = currentStep === 'step1' ? 1 : currentStep === 'step2' ? 2 : 3;

  const handleNext = () => {
    if (currentStep === 'step1') onStepChange('step2');
    else if (currentStep === 'step2') onStepChange('step3');
    else onClose(); // Final Create action
  };

  const handleBack = () => {
    if (currentStep === 'step3') onStepChange('step2');
    else if (currentStep === 'step2') onStepChange('step1');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/10 backdrop-blur-[6px] transition-all">
      <div className="bg-white w-full max-w-[580px] rounded-[28px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="px-10 pt-10 pb-2">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Step {stepNumber} of 3</p>
              <h2 className="text-[20px] font-bold text-slate-800">
                {currentStep === 'step1' && 'Work Order Information'}
                {currentStep === 'step2' && 'Address Information'}
                {currentStep === 'step3' && 'Quoted Items'}
              </h2>
            </div>
            <button onClick={onClose} className="text-slate-300 hover:text-slate-500"><X size={24} /></button>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-slate-100 h-1 mt-6 rounded-full relative">
            <div 
              className="absolute left-0 top-0 h-full bg-[#00579c] transition-all duration-500"
              style={{ width: `${(stepNumber / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="px-10 py-6 max-h-[55vh] overflow-y-auto">
          {currentStep === 'step1' && (
            <>
              <FormField label="Subject" placeholder="Subject" />
              <FormField label="Service Request ID" placeholder="Select" isSelect />
              <FormField label="Agency" placeholder="Select" isSelect />
              <FormField label="Estimation Stage" placeholder="Select" isSelect />
              <FormField label="Team" placeholder="Team" />
              <FormField label="Contact Name" placeholder="Select" isSelect />
            </>
          )}

          {currentStep === 'step2' && (
            <div className="grid grid-cols-1 gap-1">
              <FormField label="Billing Street" placeholder="Billing street" />
              <FormField label="Billing City" placeholder="Billing city" />
              <FormField label="Billing State" placeholder="Billing state" />
              <FormField label="Billing Code" placeholder="Billing code" />
              <FormField label="Billing Country" placeholder="Billing country" />
              <FormField label="Shipping Street" placeholder="Shipping street" />
              <FormField label="Shipping City" placeholder="Shipping city" />
              <FormField label="Shipping State" placeholder="Shipping state" />
              <FormField label="Shipping Code" placeholder="Shipping code" />
              <FormField label="Shipping Country" placeholder="Shipping country" />
            </div>
          )}

          {currentStep === 'step3' && (
            <div>
               <div className="flex justify-between items-center mb-4">
                 <h3 className="font-bold text-slate-800 text-sm">Add Ordered</h3>
                 <button className="flex items-center gap-1 bg-[#00579c] text-white px-3 py-1.5 rounded-full text-xs font-bold">
                   <Plus size={14} /> Add
                 </button>
               </div>
               <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3 border border-slate-100">
                 <div className="flex-grow">
                    <select className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 text-sm outline-none appearance-none">
                      <option>Select Product</option>
                    </select>
                 </div>
                 <div className="w-24">
                    <input type="number" placeholder="0" className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-center text-sm" />
                 </div>
                 <button className="text-slate-400 hover:text-red-500"><Minus size={20} /></button>
               </div>
            </div>
          )}
        </div>

        {/* Navigation Footer */}
        <div className="px-10 py-8 flex justify-between items-center bg-white border-t border-slate-50">
          <div className="w-1/3">
            {currentStep !== 'step1' && (
              <button 
                onClick={handleBack}
                className="flex items-center gap-1.5 text-[#00579c] text-sm font-bold bg-[#f1f6fa] px-5 py-2.5 rounded-full hover:bg-[#e2edf7]"
              >
                <ChevronLeft size={16} strokeWidth={3} /> Previous
              </button>
            )}
          </div>
          
          <div className="flex gap-6 items-center">
            <button onClick={onClose} className="text-[#00579c] text-sm font-bold hover:underline">Cancel</button>
            <button 
              onClick={handleNext}
              className="bg-[#00579c] hover:bg-[#004a85] text-white px-10 py-2.5 rounded-full text-sm font-bold shadow-lg transition-all active:scale-95"
            >
              {currentStep === 'step3' ? 'Create' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};