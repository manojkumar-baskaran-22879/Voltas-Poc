// import React from 'react';

// const AgencyStock = () => {
//   // Mock Data based on the Agency Wise Stock image
//   const stockData = [
//     { id: '10115', agencyCode: 'AG-00019', agencyName: 'Shine AC services', partName: 'Routine Maintenance', category: 'Service' },
//     { id: '10116', agencyCode: 'AG-00019', agencyName: 'Shine AC services', partName: 'Preventive Maintenance', category: 'Service' },
//     { id: '10114', agencyCode: 'AG-0002', agencyName: 'Prime Air conditioning serv...', partName: 'Preventive Maintenance', category: 'Service' },
//     { id: '10113', agencyCode: 'AG-00017', agencyName: 'Lucky Cooling systems', partName: 'Relay Switches', category: 'Spare Parts' },
//     { id: '10112', agencyCode: 'AG-00018', agencyName: 'Honeywell AC services', partName: 'Relay Switches', category: 'Spare Parts' },
//     { id: '10111', agencyCode: 'AG-00019', agencyName: 'Shine AC services', partName: 'Relay Switches', category: 'Spare Parts' },
//     { id: '10110', agencyCode: 'AG-00020', agencyName: 'Supreme Air conditioning...', partName: 'Relay Switches', category: 'Spare Parts' },
//     { id: '10109', agencyCode: 'AG-00021', agencyName: 'Excellent Cooling systems', partName: 'Relay Switches', category: 'Spare Parts' },
//     { id: '10108', agencyCode: 'AG-00022', agencyName: 'Swiss Cooling & Heating', partName: 'Relay Switches', category: 'Spare Parts' },
//     { id: '10107', agencyCode: 'AG-00023', agencyName: 'Star Cooling services', partName: 'Relay Switches', category: 'Spare Parts' },
//     { id: '10106', agencyCode: 'AG-0001', agencyName: 'Ultima cooling solutions', partName: 'Relay Switches', category: 'Spare Parts' },
//   ];

//   return (
//     <div className="p-4 lg:p-6 bg-slate-50 min-h-full">
//       {/* Page Header */}
//       <div className="flex justify-between items-center mb-6 px-2">
//         <h2 className="text-xl font-bold text-slate-800">Agency Wise Stock</h2>
//         <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors shadow-sm">
//           Create
//         </button>
//       </div>
      
//       {/* Data Table Container */}
//       <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="bg-blue-50/50 text-blue-600 text-[11px] font-bold uppercase tracking-wider border-b border-slate-100">
//                 <th className="px-6 py-4">Agency Wise Stock Name</th>
//                 <th className="px-6 py-4">Agency</th>
//                 <th className="px-6 py-4">Agency Name</th>
//                 <th className="px-6 py-4">Part Name</th>
//                 <th className="px-6 py-4">Spares/Service Category</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100">
//               {stockData.map((item, idx) => (
//                 <tr key={idx} className="hover:bg-slate-50 transition-colors text-sm text-slate-600">
//                   <td className="px-6 py-4 whitespace-nowrap text-blue-500 font-medium cursor-pointer hover:underline">
//                     {item.id}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">{item.agencyCode}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{item.agencyName}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{item.partName}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`px-2 py-1 rounded-md text-xs font-medium ${
//                       item.category === 'Service' 
//                         ? 'bg-blue-50 text-blue-700' 
//                         : 'bg-slate-100 text-slate-700'
//                     }`}>
//                       {item.category}
//                     </span>
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

// export default AgencyStock;

import React, { useState } from 'react';

const AgencyStock = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);

  // Mock Table Data
  const stockData = [
    { id: '10115', agencyCode: 'AG-00019', agencyName: 'Shine AC services', partName: 'Routine Maintenance', category: 'Service' },
    { id: '10116', agencyCode: 'AG-00019', agencyName: 'Shine AC services', partName: 'Preventive Maintenance', category: 'Service' },
    { id: '10114', agencyCode: 'AG-0002', agencyName: 'Prime Air conditioning serv...', partName: 'Preventive Maintenance', category: 'Service' },
  ];

  const closeModal = () => {
    setIsModalOpen(false);
    setStep(1);
  };

  return (
    <div className="p-4 lg:p-6 bg-slate-50 min-h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="text-xl font-bold text-slate-800">Agency Wise Stock</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#0066b2] hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors shadow-sm"
        >
          Create
        </button>
      </div>
      
      {/* Main Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#eef5ff] text-[#0066b2] text-[11px] font-bold uppercase tracking-wider border-b border-slate-100">
                <th className="px-6 py-4">Agency Wise Stock Name</th>
                <th className="px-6 py-4">Agency</th>
                <th className="px-6 py-4">Agency Name</th>
                <th className="px-6 py-4">Part Name</th>
                <th className="px-6 py-4">Spares/Service Category</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stockData.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors text-sm text-slate-600">
                  <td className="px-6 py-4 text-blue-500 font-medium cursor-pointer hover:underline">{item.id}</td>
                  <td className="px-6 py-4">{item.agencyCode}</td>
                  <td className="px-6 py-4">{item.agencyName}</td>
                  <td className="px-6 py-4">{item.partName}</td>
                  <td className="px-6 py-4">
                    <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-md text-xs font-medium">{item.category}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- STEPPER MODAL --- */}
      {isModalOpen && (
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

            {/* Modal Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar bg-white">
              {/* STEP 1: PRIMARY INFO */}
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

              {/* STEP 2: CONTACT DETAILS */}
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

              {/* STEP 3: CATEGORY & DESCRIPTION */}
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
                <button onClick={closeModal} className="px-6 py-2.5 text-[#0066b2] font-bold text-sm hover:bg-blue-50 rounded-xl">
                  Cancel
                </button>
                <button 
                  onClick={() => step < 3 ? setStep(step + 1) : closeModal()}
                  className="bg-[#0066b2] hover:bg-blue-700 text-white px-10 py-2.5 rounded-full text-sm font-bold shadow-md transition-all active:scale-95"
                >
                  {step === 3 ? "Create" : "Next"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgencyStock;