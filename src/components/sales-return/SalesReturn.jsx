// import React from 'react';

// const SalesReturn = () => {
//   // Mock Data based on the Sales Return Order image
//   const returnData = [
//     { id: 'SR202300040', invoice: '34661', name: 'sbbns', reason: '', status: '' },
//     { id: 'SR202300039', invoice: '12345', name: 'wadesf', reason: 'Damaged', status: 'Claimed' },
//     { id: 'SR202300041', invoice: '121234321', name: 'wadsds', reason: 'Part Laying More than 90 D...', status: 'Accepted' },
//     { id: 'SR202300038', invoice: '1', name: 'asdf', reason: 'Part Laying More than 90 D...', status: 'Claimed' },
//     { id: 'SR202300037', invoice: '124', name: 'abc', reason: 'Part Laying More than 90 D...', status: 'In Progress' },
//     { id: 'SR202300030', invoice: 'INA2023719780', name: 'Sales Return - Condenser ...', reason: 'Damaged', status: 'In Progress' },
//     { id: 'SR202300029', invoice: 'INI2023692816', name: 'Sales Return - Remote Co...', reason: 'New part Order', status: 'In Progress' },
//     { id: 'SR202300028', invoice: 'INU2023946565', name: 'Sales Return - Condenser ...', reason: 'New part Order', status: 'In Progress' },
//     { id: 'SR202300027', invoice: 'INE2023640866', name: 'Sales Return - Condenser ...', reason: 'Damaged', status: 'Claimed' },
//     { id: 'SR202300026', invoice: 'INI2023131068', name: 'Sales Return - Remote Co...', reason: 'Part Laying More than 90 D...', status: 'Claimed' },
//     { id: 'SR202300025', invoice: 'INO2023618689', name: 'Sales Return - Condenser ...', reason: 'Part Laying More than 90 D...', status: 'In Progress' },
//   ];

//   return (
//     <div className="p-4 lg:p-6 bg-slate-50 min-h-full">
//       {/* Header Section */}
//       <div className="flex justify-between items-center mb-6 px-2">
//         <h2 className="text-xl font-bold text-slate-800">Sales Return Order</h2>
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
//                 <th className="px-6 py-4">Sales Return Order ID</th>
//                 <th className="px-6 py-4">Invoice Number</th>
//                 <th className="px-6 py-4">Sales Return Name</th>
//                 <th className="px-6 py-4">Return Reason</th>
//                 <th className="px-6 py-4">Sales Return Status</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100">
//               {returnData.map((item, idx) => (
//                 <tr key={idx} className="hover:bg-slate-50 transition-colors text-sm text-slate-600">
//                   <td className="px-6 py-4 whitespace-nowrap text-blue-500 font-medium cursor-pointer hover:underline">
//                     {item.id}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">{item.invoice}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-slate-500">
//                     {item.reason || '-'}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`px-2 py-1 rounded-md text-xs font-medium ${
//                       item.status === 'Accepted' || item.status === 'Claimed'
//                         ? 'bg-emerald-50 text-emerald-700' 
//                         : item.status === 'In Progress'
//                         ? 'bg-amber-50 text-amber-700'
//                         : 'text-slate-400'
//                     }`}>
//                       {item.status || '-'}
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

// export default SalesReturn;

import React, { useState } from 'react';

const SalesReturn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [quotedItems, setQuotedItems] = useState([{ id: Date.now() }]);

  const returnData = [
    { id: 'SR202300040', invoice: '34661', name: 'sbbns', reason: '', status: '' },
    { id: 'SR202300039', invoice: '12345', name: 'wadesf', reason: 'Damaged', status: 'Claimed' },
  ];

  const closeModal = () => {
    setIsModalOpen(false);
    setStep(1);
  };

  const addQuoteRow = () => setQuotedItems([...quotedItems, { id: Date.now() }]);
  const removeQuoteRow = (id) => setQuotedItems(quotedItems.filter(item => item.id !== id));

  return (
    <div className="p-4 lg:p-6 bg-slate-50 min-h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="text-xl font-bold text-slate-800">Sales Return Order</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#0066b2] hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors shadow-sm"
        >
          Create
        </button>
      </div>
      
      {/* Table Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#eef5ff] text-[#0066b2] text-[11px] font-bold uppercase tracking-wider border-b border-slate-100">
                <th className="px-6 py-4">Sales Return Order ID</th>
                <th className="px-6 py-4">Invoice Number</th>
                <th className="px-6 py-4">Sales Return Name</th>
                <th className="px-6 py-4">Return Reason</th>
                <th className="px-6 py-4">Sales Return Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {returnData.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors text-sm text-slate-600">
                  <td className="px-6 py-4 text-blue-500 font-medium cursor-pointer">{item.id}</td>
                  <td className="px-6 py-4">{item.invoice}</td>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4 text-slate-500">{item.reason || '-'}</td>
                  <td className="px-6 py-4">
                    <span className="bg-amber-50 text-amber-700 px-2 py-1 rounded-md text-xs font-medium">{item.status || 'In Progress'}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODAL --- */}
      {isModalOpen && (
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
              {/* STEP 1: ONLY CORE FIELDS */}
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">Subject</label>
                    <input type="text" placeholder="Subject" className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">Case</label>
                    <input type="text" placeholder="Case" className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">Agency</label>
                    <select className="w-full p-3 border border-slate-200 rounded-xl bg-white text-slate-400 text-sm outline-none"><option>Select</option></select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">Sales Return Status</label>
                    <select className="w-full p-3 border border-slate-200 rounded-xl bg-white text-slate-400 text-sm outline-none"><option>Select</option></select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">Invoice Number</label>
                    <input type="text" placeholder="Invoice Number" className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none" />
                  </div>
                </div>
              )}

              {/* STEP 2: ONLY QUOTED ITEMS */}
              {step === 2 && (
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

            {/* Footer */}
            <div className="p-5 border-t border-slate-100 flex items-center justify-between bg-white">
              <div>
                {step > 1 && (
                  <button onClick={() => setStep(step - 1)} className="text-[#0066b2] text-sm font-bold flex items-center gap-1 hover:bg-blue-50 px-3 py-2 rounded-xl"><span>‹</span> Previous</button>
                )}
              </div>
              <div className="flex gap-3">
                <button onClick={closeModal} className="px-6 py-2.5 text-[#0066b2] font-bold text-sm hover:bg-blue-50 rounded-xl">Cancel</button>
                <button 
                  onClick={() => step < 2 ? setStep(step + 1) : closeModal()}
                  className="bg-[#0066b2] hover:bg-blue-700 text-white px-10 py-2.5 rounded-full text-sm font-bold shadow-md active:scale-95"
                >
                  {step === 2 ? "Create" : "Next"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesReturn;