// import React from 'react';

// const DefectiveChallan = () => {
//   // Mock Data based on the Defective Challan image
//   const challanData = [
//     { id: 'DC20230038', name: '', orderNum: '', grn: '', status: '' },
//     { id: 'DC20230036', name: 'Web Test', orderNum: 'TEST', grn: '', status: 'In Progress' },
//     { id: 'DC20230035', name: 'yahgsb', orderNum: '62663', grn: '727727', status: 'Accepted' },
//     { id: 'DC20230033', name: 'dfbgsedaw', orderNum: '12345432', grn: '12345432', status: 'Collected' },
//     { id: 'DC20230037', name: 'shbbx', orderNum: '234', grn: '15553', status: 'Claimed' },
//     { id: 'DC20230034', name: 'dfbgsedaw', orderNum: '12345432', grn: '12345432', status: 'Collected' },
//     { id: 'DC20230031', name: '', orderNum: '123', grn: '233', status: 'In Progress' },
//     { id: 'DC20230032', name: 'sdjkf', orderNum: '1234', grn: '17', status: 'Accepted' },
//     { id: 'DC20230030', name: '', orderNum: '1222', grn: '1', status: 'In Progress' },
//     { id: 'DC2023001', name: 'Defective Challan - Fan M...', orderNum: '1000567', grn: '60009875', status: 'Collected' },
//     { id: 'DC20230025', name: 'Defective Challan - Comp...', orderNum: '1000585', grn: '6001005', status: 'Collected' },
//     { id: 'DC20230024', name: 'Defective Challan - Comp...', orderNum: '1000576', grn: '6000996', status: 'Accepted' },
//   ];

//   // Helper to determine status color themes
//   const getStatusStyle = (status) => {
//     switch (status) {
//       case 'Accepted':
//       case 'Collected':
//         return 'bg-emerald-50 text-emerald-700';
//       case 'In Progress':
//         return 'bg-amber-50 text-amber-700';
//       case 'Claimed':
//         return 'bg-blue-50 text-blue-700';
//       default:
//         return 'text-slate-400';
//     }
//   };

//   return (
//     <div className="p-4 lg:p-6 bg-slate-50 min-h-full">
//       {/* Header Section */}
//       <div className="flex justify-between items-center mb-6 px-2">
//         <h2 className="text-xl font-bold text-slate-800">Defective Challan</h2>
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
//                 <th className="px-6 py-4">Defective Challan ID</th>
//                 <th className="px-6 py-4">Defective Challan Name</th>
//                 <th className="px-6 py-4">Sales Order Number</th>
//                 <th className="px-6 py-4">GRN Number</th>
//                 <th className="px-6 py-4">Defective Chalan Status</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100">
//               {challanData.map((item, idx) => (
//                 <tr key={idx} className="hover:bg-slate-50 transition-colors text-sm text-slate-600">
//                   <td className="px-6 py-4 whitespace-nowrap text-blue-500 font-medium cursor-pointer hover:underline">
//                     {item.id}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">{item.name || '-'}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{item.orderNum || '-'}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{item.grn || '-'}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusStyle(item.status)}`}>
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

// export default DefectiveChallan;

import React, { useState } from 'react';
import { ChevronLeft, X, ChevronDown } from 'lucide-react';

const DefectiveChallan = () => {
  const [view, setView] = useState('list'); // 'list', 'step1', 'step2'

  const challanData = [
    { id: 'DC20230038', name: '', orderNum: '', grn: '', status: '' },
    { id: 'DC20230036', name: 'Web Test', orderNum: 'TEST', grn: '', status: 'In Progress' },
    { id: 'DC20230035', name: 'yahgsb', orderNum: '62663', grn: '727727', status: 'Accepted' },
    { id: 'DC20230033', name: 'dfbgsedaw', orderNum: '12345432', grn: '12345432', status: 'Collected' },
    { id: 'DC20230037', name: 'shbbx', orderNum: '234', grn: '15553', status: 'Claimed' },
  ];

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

  return (
    <div className="relative min-h-screen font-sans">
      {/* BACKGROUND CONTENT */}
      <div className="p-8 bg-slate-50 min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Defective Challan</h1>
          <button 
            onClick={() => setView('step1')}
            className="bg-[#00579c] hover:bg-[#004a85] text-white px-8 py-2.5 rounded-full text-sm font-bold shadow-md transition-all active:scale-95"
          >
            Create
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#f8fafc] text-[#718ebf] text-[11px] font-bold uppercase tracking-widest border-b border-slate-100">
                <th className="px-6 py-5">Challan ID</th>
                <th className="px-6 py-5">Name</th>
                <th className="px-6 py-5">Order Num</th>
                <th className="px-6 py-5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {challanData.map((item, idx) => (
                <tr key={idx} className="text-sm text-slate-600">
                  <td className="px-6 py-5 text-[#3b82f6] font-semibold">{item.id}</td>
                  <td className="px-6 py-5">{item.name || '---'}</td>
                  <td className="px-6 py-5">{item.orderNum || '---'}</td>
                  <td className="px-6 py-5">
                    <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-500">
                      {item.status || 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* OVERLAY WITH BACKDROP BLUR */}
      {view !== 'list' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-[6px] transition-all duration-300 animate-in fade-in">
          
          {/* MODAL CONTAINER */}
          <div className="bg-white w-full max-w-[550px] rounded-[24px] shadow-2xl border border-white overflow-hidden animate-in zoom-in-95 duration-300">
            
            {/* STEP PROGRESS BAR */}
            <div className="px-10 pt-10 pb-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                {view === 'step1' ? 'Step 1 of 2' : 'Step 2 of 2'}
              </p>
              <h2 className="text-[20px] font-bold text-slate-800 mb-6">
                {view === 'step1' ? 'Defective Challan Information' : 'Product Details'}
              </h2>
              <div className="w-full bg-slate-100 h-[3px] rounded-full relative">
                <div 
                  className={`absolute left-0 top-0 h-full bg-[#00579c] transition-all duration-700 ease-in-out ${view === 'step1' ? 'w-1/2' : 'w-full'}`}
                />
              </div>
            </div>

            {/* FORM BODY */}
            <div className="px-10 py-6 max-h-[55vh] overflow-y-auto custom-scrollbar">
              {view === 'step1' ? (
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
                {view === 'step2' && (
                  <button 
                    onClick={() => setView('step1')}
                    className="flex items-center gap-1.5 text-[#00579c] text-sm font-bold bg-[#f1f6fa] px-5 py-2.5 rounded-full hover:bg-[#e2edf7] transition-colors"
                  >
                    <ChevronLeft size={16} strokeWidth={3} /> Previous
                  </button>
                )}
              </div>
              
              <div className="flex gap-6 items-center">
                <button 
                  onClick={() => setView('list')}
                  className="text-[#00579c] text-sm font-bold hover:underline underline-offset-4"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => view === 'step1' ? setView('step2') : setView('list')}
                  className="bg-[#00579c] hover:bg-[#004a85] text-white px-10 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-blue-100 transition-all active:scale-95"
                >
                  {view === 'step1' ? 'Next' : 'Create'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DefectiveChallan;