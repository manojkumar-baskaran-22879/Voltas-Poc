// import React from 'react';

// const WorkOrder = () => {
//   // Mock Data based on the Work Order image
//   const workOrderData = [
//     { owner: 'Akilavan J', number: '591782000002799079', contact: 'Vasuda Sandip', dealer: 'Zoho', subject: 'Estimate for AC filters' },
//     { owner: 'Vivek George', number: '591782000002799019', contact: 'Vasuda Sandip', dealer: 'Panasonic Dealer- Mittal El...', subject: 'AC compressor estimate' },
//     { owner: 'Vivek George', number: '591782000002774019', contact: 'Vasuda Sandip', dealer: 'Panasonic Dealer- Mittal El...', subject: 'AC Cooling Estimate' },
//     { owner: 'Vivek George', number: '591782000002766019', contact: 'Vasuda Sandip', dealer: '', subject: 'AC Voltage WO' },
//     { owner: 'Vivek George', number: '591782000002764058', contact: 'Vasuda Sandip', dealer: '', subject: 'Compressor issue estimate' },
//     { owner: 'Vivek George', number: '591782000002741019', contact: 'Sita Mamun', dealer: 'Panasonic Dealer- Prakas...', subject: 'Estimate for Sita' },
//     { owner: 'Vivek George', number: '591782000002738039', contact: 'Vasuda Sandip', dealer: '', subject: 'AC turning on issue estima...' },
//     { owner: 'Vivek George', number: '591782000002707019', contact: 'Vasuda Sandip', dealer: '', subject: 'Air filter replacement esti...' },
//     { owner: 'Vivek George', number: '591782000002691020', contact: 'Vasuda Sandip', dealer: '', subject: 'AC issues fixing' },
//     { owner: 'Vivek George', number: '591782000002596019', contact: 'Vasuda Sandip', dealer: 'Panasonic Dealer- Great E...', subject: 'Estimate' },
//     { owner: 'Vivek George', number: '591782000002545019', contact: 'Vasuda Sandip', dealer: 'Panasonic Dealer- Great E...', subject: 'AC repair' },
//   ];

//   return (
//     <div className="p-4 lg:p-6 bg-slate-50 min-h-full">
//       {/* Header Section */}
//       <div className="flex justify-between items-center mb-6 px-2">
//         <h2 className="text-xl font-bold text-slate-800">Work Order</h2>
//         <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors shadow-sm">
//           Create
//         </button>
//       </div>
      
//       {/* Table Container */}
//       <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="bg-blue-50/50 text-blue-600 text-[11px] font-bold uppercase tracking-wider border-b border-slate-100">
//                 <th className="px-6 py-4">Work Order Owner</th>
//                 <th className="px-6 py-4">Work Order Number</th>
//                 <th className="px-6 py-4">Contact Name</th>
//                 <th className="px-6 py-4">Dealer Name</th>
//                 <th className="px-6 py-4">Subject</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100">
//               {workOrderData.map((item, idx) => (
//                 <tr key={idx} className="hover:bg-slate-50 transition-colors text-sm text-slate-600">
//                   <td className="px-6 py-4 whitespace-nowrap">{item.owner}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-blue-500 font-medium cursor-pointer hover:underline">
//                     {item.number}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">{item.contact}</td>
//                   <td className="px-6 py-4 whitespace-nowrap italic text-slate-500">
//                     {item.dealer || '-'}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     {item.subject}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WorkOrder;

import React, { useState } from 'react';
import { ChevronLeft, X, ChevronDown, Plus, Minus } from 'lucide-react';

const WorkOrder = () => {
  const [view, setView] = useState('list'); // 'list', 'step1', 'step2', 'step3'

  const workOrderData = [
    { owner: 'Akilavan J', number: '591782000002799079', contact: 'Vasuda Sandip', dealer: 'Zoho', subject: 'Estimate for AC filters' },
    { owner: 'Vivek George', number: '591782000002799019', contact: 'Vasuda Sandip', dealer: 'Panasonic Dealer- Mittal El...', subject: 'AC compressor estimate' },
    { owner: 'Vivek George', number: '591782000002774019', contact: 'Vasuda Sandip', dealer: 'Panasonic Dealer- Mittal El...', subject: 'AC Cooling Estimate' },
  ];

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

  return (
    <div className="relative min-h-screen font-sans">
      {/* BACKGROUND CONTENT */}
      <div className={`p-6 bg-slate-50 min-h-screen transition-all duration-500 ${view !== 'list' ? 'blur-[3px] brightness-90 pointer-events-none' : ''}`}>
        <div className="flex justify-between items-center mb-6 px-2">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">Work Order</h2>
          <button 
            onClick={() => setView('step1')}
            className="bg-[#00579c] hover:bg-[#004a85] text-white px-8 py-2 rounded-full text-sm font-bold shadow-md active:scale-95 transition-all"
          >
            Create
          </button>
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#f8fafc] text-[#718ebf] text-[11px] font-bold uppercase tracking-widest border-b border-slate-100">
                <th className="px-6 py-4">Work Order Owner</th>
                <th className="px-6 py-4">Work Order Number</th>
                <th className="px-6 py-4">Contact Name</th>
                <th className="px-6 py-5 text-center italic text-slate-500 underline">Dealer Name</th>
                <th className="px-6 py-4">Subject</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {workOrderData.map((item, idx) => (
                <tr key={idx} className="text-sm text-slate-600">
                  <td className="px-6 py-4">{item.owner}</td>
                  <td className="px-6 py-4 text-blue-500 font-medium cursor-pointer hover:underline">{item.number}</td>
                  <td className="px-6 py-4">{item.contact}</td>
                  <td className="px-6 py-4 italic text-slate-500">{item.dealer || '-'}</td>
                  <td className="px-6 py-4">{item.subject}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* THREE-STEP MODAL */}
      {view !== 'list' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/10 backdrop-blur-[6px] transition-all">
          <div className="bg-white w-full max-w-[580px] rounded-[28px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            
            {/* Header */}
            <div className="px-10 pt-10 pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    Step {view === 'step1' ? '1' : view === 'step2' ? '2' : '3'} of 3
                  </p>
                  <h2 className="text-[20px] font-bold text-slate-800">
                    {view === 'step1' && 'Work Order Information'}
                    {view === 'step2' && 'Address Information'}
                    {view === 'step3' && 'Quoted Items'}
                  </h2>
                </div>
                <button onClick={() => setView('list')} className="text-slate-300 hover:text-slate-500"><X size={24} /></button>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-slate-100 h-1 mt-6 rounded-full relative">
                <div 
                  className="absolute left-0 top-0 h-full bg-[#00579c] transition-all duration-500"
                  style={{ width: view === 'step1' ? '33%' : view === 'step2' ? '66%' : '100%' }}
                />
              </div>
            </div>

            {/* Scrollable Body */}
            <div className="px-10 py-6 max-h-[55vh] overflow-y-auto">
              {view === 'step1' && (
                <>
                  <FormField label="Subject" placeholder="Subject" />
                  <FormField label="Service Request ID" placeholder="Select" isSelect />
                  <FormField label="Agency" placeholder="Select" isSelect />
                  <FormField label="Estimation Stage" placeholder="Select" isSelect />
                  <FormField label="Team" placeholder="Team" />
                  <FormField label="Contact Name" placeholder="Select" isSelect />
                </>
              )}

              {view === 'step2' && (
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

              {view === 'step3' && (
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
                {view !== 'step1' && (
                  <button 
                    onClick={() => setView(view === 'step3' ? 'step2' : 'step1')}
                    className="flex items-center gap-1.5 text-[#00579c] text-sm font-bold bg-[#f1f6fa] px-5 py-2.5 rounded-full hover:bg-[#e2edf7]"
                  >
                    <ChevronLeft size={16} strokeWidth={3} /> Previous
                  </button>
                )}
              </div>
              
              <div className="flex gap-6 items-center">
                <button onClick={() => setView('list')} className="text-[#00579c] text-sm font-bold hover:underline">Cancel</button>
                <button 
                  onClick={() => {
                    if (view === 'step1') setView('step2');
                    else if (view === 'step2') setView('step3');
                    else setView('list');
                  }}
                  className="bg-[#00579c] hover:bg-[#004a85] text-white px-10 py-2.5 rounded-full text-sm font-bold shadow-lg transition-all active:scale-95"
                >
                  {view === 'step3' ? 'Create' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkOrder;