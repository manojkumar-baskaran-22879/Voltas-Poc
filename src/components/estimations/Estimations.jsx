// import React from 'react';

// const Estimations = () => {
//   // Mock Data based on the provided Estimations image
//   const estimationData = [
//     { owner: 'Vivek George', number: '591782000002802002', contact: 'Vasuda Sandip', dealer: '', subject: 'Estimate for AC filters' },
//     { owner: 'Vivek George', number: '591782000002789007', contact: 'Vasuda Sandip', dealer: 'Panasonic Dealer- Mittal El...', subject: 'AC compressor estimate' },
//     { owner: 'Vivek George', number: '591782000002772002', contact: 'Vasuda Sandip', dealer: 'Panasonic Dealer- Mittal El...', subject: 'AC Cooling Estimate' },
//     { owner: 'Vivek George', number: '591782000002765009', contact: 'Vasuda Sandip', dealer: '', subject: 'Compressor issue estimate' },
//     { owner: 'Vivek George', number: '591782000002749002', contact: 'Vasuda Sandip', dealer: '', subject: 'AC turning on issue estima...' },
//     { owner: 'Vivek George', number: '591782000002746009', contact: 'Vasuda Sandip', dealer: '', subject: 'AC Voltage WO' },
//     { owner: 'Vivek George', number: '591782000002737002', contact: 'Sita Mamun', dealer: 'Panasonic Dealer- Prakas...', subject: 'Estimate for Sita' },
//     { owner: 'Vivek George', number: '591782000002699010', contact: 'Vasuda Sandip', dealer: '', subject: 'Air filter replacement esti...' },
//     { owner: 'Vivek George', number: '591782000002686002', contact: 'Vasuda Sandip', dealer: '', subject: 'AC issues fixing' },
//     { owner: 'Vivek George', number: '591782000002581007', contact: 'Vasuda Sandip', dealer: 'Panasonic Dealer- Great E...', subject: 'Estimate' },
//     { owner: 'Vivek George', number: '591782000002541002', contact: 'Vasuda Sandip', dealer: 'Panasonic Dealer- Great E...', subject: 'AC repair' },
//   ];

//   return (
//     <div className="p-4 lg:p-6 bg-slate-50 min-h-full">
//       {/* Header with Title and Create Button */}
//       <div className="flex justify-between items-center mb-6 px-2">
//         <h2 className="text-xl font-bold text-slate-800">Estimations</h2>
//         <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors">
//           Create
//         </button>
//       </div>
      
//       {/* Table Container */}
//       <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="bg-blue-50/50 text-blue-600 text-[11px] font-bold uppercase tracking-wider border-b border-slate-100">
//                 <th className="px-6 py-4">Estimation Owner</th>
//                 <th className="px-6 py-4">Estimation Number</th>
//                 <th className="px-6 py-4">Contact Name</th>
//                 <th className="px-6 py-4">Dealer Name</th>
//                 <th className="px-6 py-4">Subject</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100">
//               {estimationData.map((item, idx) => (
//                 <tr key={idx} className="hover:bg-slate-50 transition-colors text-sm text-slate-600">
//                   <td className="px-6 py-4 whitespace-nowrap">{item.owner}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-blue-500 hover:underline cursor-pointer font-medium">
//                     {item.number}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">{item.contact}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-slate-500 italic">
//                     {item.dealer || '-'}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap truncate max-w-[200px]">
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

// export default Estimations;

import React, { useState } from 'react';

const Estimations = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [quotedItems, setQuotedItems] = useState([{ id: Date.now(), product: '', qty: 0 }]);

  // Mock Table Data
  const estimationData = [
    { owner: 'Vivek George', number: '591782000002802002', contact: 'Vasuda Sandip', dealer: '', subject: 'Estimate for AC filters' },
    { owner: 'Vivek George', number: '591782000002789007', contact: 'Vasuda Sandip', dealer: 'Panasonic Dealer- Mittal El...', subject: 'AC compressor estimate' },
    { owner: 'Vivek George', number: '591782000002772002', contact: 'Vasuda Sandip', dealer: 'Panasonic Dealer- Mittal El...', subject: 'AC Cooling Estimate' },
  ];

  const closeModal = () => {
    setIsModalOpen(false);
    setStep(1);
  };

  const addQuoteRow = () => {
    setQuotedItems([...quotedItems, { id: Date.now(), product: '', qty: 0 }]);
  };

  const removeQuoteRow = (id) => {
    if (quotedItems.length > 1) {
      setQuotedItems(quotedItems.filter(item => item.id !== id));
    }
  };

  return (
    <div className="p-4 lg:p-6 bg-slate-50 min-h-full">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="text-xl font-bold text-slate-800">Estimations</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#0066b2] hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors shadow-sm"
        >
          Create
        </button>
      </div>
      
      {/* Estimations Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#eef5ff] text-[#0066b2] text-[11px] font-bold uppercase tracking-wider border-b border-slate-100">
                <th className="px-6 py-4">Estimation Owner</th>
                <th className="px-6 py-4">Estimation Number</th>
                <th className="px-6 py-4">Contact Name</th>
                <th className="px-6 py-4">Dealer Name</th>
                <th className="px-6 py-4">Subject</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {estimationData.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors text-sm text-slate-600">
                  <td className="px-6 py-4">{item.owner}</td>
                  <td className="px-6 py-4 text-blue-500 font-medium cursor-pointer">{item.number}</td>
                  <td className="px-6 py-4">{item.contact}</td>
                  <td className="px-6 py-4 italic text-slate-400">{item.dealer || '-'}</td>
                  <td className="px-6 py-4 truncate max-w-[200px]">{item.subject}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- CREATE ESTIMATION STEPPER MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[1px] p-4">
          <div className="bg-white w-full max-w-[600px] rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-6 pb-4 border-b border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Step {step} of 3</p>
              <h3 className="text-lg font-bold text-slate-800">
                {step === 1 && "Estimation Information"}
                {step === 2 && "Address Information"}
                {step === 3 && "Quoted Items"}
              </h3>
              <div className="mt-4 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#0066b2] h-full transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }} />
              </div>
            </div>

            {/* Scrollable Form Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* STEP 1: INFORMATION */}
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="space-y-1"><label className="text-xs font-bold text-slate-700">Subject</label><input type="text" placeholder="Subject" className="w-full p-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-400" /></div>
                  <div className="space-y-1"><label className="text-xs font-bold text-slate-700">Service Request ID</label><select className="w-full p-2.5 border border-slate-200 rounded-xl text-sm bg-white text-slate-400"><option>Select</option></select></div>
                  <div className="space-y-1"><label className="text-xs font-bold text-slate-700">Agency</label><select className="w-full p-2.5 border border-slate-200 rounded-xl text-sm bg-white text-slate-400"><option>Select</option></select></div>
                  <div className="space-y-1"><label className="text-xs font-bold text-slate-700">Estimation Stage</label><select className="w-full p-2.5 border border-slate-200 rounded-xl text-sm bg-white text-slate-400"><option>Select</option></select></div>
                  <div className="space-y-1"><label className="text-xs font-bold text-slate-700">Team</label><input type="text" placeholder="Team" className="w-full p-2.5 border border-slate-200 rounded-xl text-sm outline-none" /></div>
                  <div className="space-y-1"><label className="text-xs font-bold text-slate-700">Contact Name</label><select className="w-full p-2.5 border border-slate-200 rounded-xl text-sm bg-white text-slate-400"><option>Select</option></select></div>
                  <div className="space-y-1"><label className="text-xs font-bold text-slate-700">Dealer Name</label><select className="w-full p-2.5 border border-slate-200 rounded-xl text-sm bg-white text-slate-400"><option>Select</option></select></div>
                </div>
              )}

              {/* STEP 2: ADDRESS */}
              {step === 2 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="grid grid-cols-1 gap-4">
                    {['Billing Street', 'Billing City', 'Billing State', 'Billing Code', 'Billing Country'].map(label => (
                      <div key={label} className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">{label}</label>
                        <input type="text" placeholder={label.toLowerCase()} className="w-full p-2.5 border border-slate-200 rounded-xl text-sm outline-none" />
                      </div>
                    ))}
                    <div className="h-px bg-slate-100 my-2" />
                    {['Shipping Street', 'Shipping City', 'Shipping State', 'Shipping Code', 'Shipping Country'].map(label => (
                      <div key={label} className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">{label}</label>
                        <input type="text" placeholder={label.toLowerCase()} className="w-full p-2.5 border border-slate-200 rounded-xl text-sm outline-none" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: QUOTED ITEMS */}
              {step === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-bold text-slate-800">Add Quotes</h4>
                    <button 
                      onClick={addQuoteRow}
                      className="bg-[#0066b2] text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-md hover:bg-blue-700"
                    >
                      <span className="text-base">+</span> Add
                    </button>
                  </div>

                  <div className="space-y-3">
                    {quotedItems.map((item) => (
                      <div key={item.id} className="p-5 border border-slate-100 rounded-2xl bg-slate-50/50 flex items-center gap-3">
                        <div className="flex-1">
                          <select className="w-full p-2.5 border border-slate-200 rounded-xl text-sm bg-white text-slate-400 focus:border-blue-400 outline-none">
                            <option>Select Product</option>
                          </select>
                        </div>
                        <div className="w-24">
                          <input type="number" defaultValue={0} className="w-full p-2.5 border border-slate-200 rounded-xl text-sm text-center outline-none" />
                        </div>
                        <button 
                          onClick={() => removeQuoteRow(item.id)}
                          className="text-slate-400 hover:text-red-500 transition-colors text-xl font-medium px-2"
                        >
                          —
                        </button>
                      </div>
                    ))}
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
                    className="flex items-center gap-1 text-[#0066b2] text-sm font-bold hover:underline"
                  >
                    <span className="text-lg">‹</span> Previous
                  </button>
                )}
              </div>
              <div className="flex gap-3">
                <button onClick={closeModal} className="px-6 py-2.5 text-[#0066b2] font-bold text-sm hover:bg-blue-50 rounded-xl transition-colors">
                  Cancel
                </button>
                <button 
                  onClick={() => step < 3 ? setStep(step + 1) : closeModal()}
                  className="bg-[#0066b2] hover:bg-blue-700 text-white px-10 py-2.5 rounded-full text-sm font-bold transition-all shadow-md active:scale-95"
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

export default Estimations;