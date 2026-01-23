// import React, { useState } from 'react';

// const CreateSalesReturnModal = ({ isOpen, onClose, onSuccess }) => {
//   const [step, setStep] = useState(1);
//   const [quotedItems, setQuotedItems] = useState([{ id: Date.now() }]);

//   const addQuoteRow = () => setQuotedItems([...quotedItems, { id: Date.now() }]);
//   const removeQuoteRow = (id) => setQuotedItems(quotedItems.filter(item => item.id !== id));

//   const handleClose = () => {
//     setStep(1);
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px] p-4">
//       <div className="bg-white w-full max-w-[550px] rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        
//         <div className="p-6 border-b border-slate-100">
//           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Step {step} of 2</p>
//           <h3 className="text-lg font-bold text-slate-700">
//             {step === 1 ? "Sales Return Information" : "Quoted Items"}
//           </h3>
//           <div className="mt-3 w-full bg-slate-100 h-1 rounded-full overflow-hidden">
//             <div className="bg-[#0066b2] h-full transition-all duration-500" style={{ width: `${(step / 2) * 100}%` }} />
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto p-6 space-y-5">
//           {step === 1 ? (
//             <div className="space-y-4 animate-in fade-in duration-300">
//               {/* Form Fields */}
//               {["Subject", "Case", "Invoice Number"].map((label) => (
//                 <div key={label} className="space-y-1.5">
//                   <label className="text-sm font-semibold text-slate-700">{label}</label>
//                   <input type="text" placeholder={label} className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100" />
//                 </div>
//               ))}
//               <div className="space-y-1.5">
//                 <label className="text-sm font-semibold text-slate-700">Sales Return Status</label>
//                 <select className="w-full p-3 border border-slate-200 rounded-xl bg-white text-slate-400 text-sm outline-none">
//                   <option>Select</option>
//                 </select>
//               </div>
//             </div>
//           ) : (
//             <div className="space-y-6 animate-in fade-in duration-300">
//               <div className="flex justify-between items-center">
//                 <h4 className="text-sm font-bold text-slate-800">Add Quoted Items</h4>
//                 <button onClick={addQuoteRow} className="bg-[#0066b2] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-sm">+ Add</button>
//               </div>
//               <div className="space-y-3">
//                 {quotedItems.map((item) => (
//                   <div key={item.id} className="p-4 border border-slate-100 rounded-2xl bg-slate-50/50 flex items-center gap-3">
//                     <select className="flex-1 p-2.5 border border-slate-200 rounded-xl text-sm bg-white text-slate-400 outline-none"><option>Select Product</option></select>
//                     <input type="number" defaultValue={0} className="w-20 p-2.5 border border-slate-200 rounded-xl text-sm text-center outline-none" />
//                     <button onClick={() => removeQuoteRow(item.id)} className="text-slate-400 hover:text-red-500 font-bold px-2">—</button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="p-5 border-t border-slate-100 flex items-center justify-between bg-white">
//           <div>
//             {step > 1 && (
//               <button onClick={() => setStep(step - 1)} className="text-[#0066b2] text-sm font-bold flex items-center gap-1 hover:bg-blue-50 px-3 py-2 rounded-xl"><span>‹</span> Previous</button>
//             )}
//           </div>
//           <div className="flex gap-3">
//             <button onClick={handleClose} className="px-6 py-2.5 text-[#0066b2] font-bold text-sm hover:bg-blue-50 rounded-xl">Cancel</button>
//             <button 
//               onClick={() => step < 2 ? setStep(step + 1) : handleClose()}
//               className="bg-[#0066b2] hover:bg-blue-700 text-white px-10 py-2.5 rounded-full text-sm font-bold shadow-md active:scale-95"
//             >
//               {step === 2 ? "Create" : "Next"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateSalesReturnModal;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateSalesReturnModal = ({ isOpen, onClose, onSuccess }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // State for all form fields
  const [formData, setFormData] = useState({
    Invoice_Number: '',
    Return_Reason: '',
    Email: '',
    Sales_Return_Name: '',
    GRN_Number: '',
    Sales_Return_Status: '',
    Secondary_Email: '',
    Email_Opt_Out: false,
    Part_Name: '',
    Part_Number: '',
    Part_Quantity: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCreate = async () => {
    setLoading(true);
    try {
      const authResponse = await window.catalyst.auth.generateAuthToken();
      const response = await fetch('https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/sales_return_order/', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `${authResponse.access_token}`
         },
        body: JSON.stringify({ data: [formData] })
      });

      if (response.ok) {
        handleClose();
        // Navigate and refresh logic
        navigate('/sales-return');
        if (onSuccess) onSuccess(); 
      } else {
        console.error("Failed to create sales return");
      }
    } catch (error) {
      console.error("Error calling API:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setFormData({
      Invoice_Number: '', Return_Reason: '', Email: '', Sales_Return_Name: '',
      GRN_Number: '', Sales_Return_Status: '', Secondary_Email: '',
      Email_Opt_Out: false, Part_Name: '', Part_Number: '', Part_Quantity: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px] p-4">
      <div className="bg-white w-full max-w-[650px] rounded-3xl shadow-2xl flex flex-col max-h-[95vh] overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Step {step} of 2</p>
          <h3 className="text-lg font-bold text-slate-700">
            {step === 1 ? "Sales Return Order Information" : "Address Information"}
          </h3>
          <div className="mt-3 w-full bg-slate-100 h-1 rounded-full overflow-hidden">
            <div className="bg-[#0066b2] h-full transition-all duration-500" style={{ width: `${(step / 2) * 100}%` }} />
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {step === 1 ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-sm font-semibold text-slate-700">Invoice Number</label>
                  <input name="Invoice_Number" value={formData.Invoice_Number} onChange={handleChange} placeholder="Invoice Number" className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Return Reason</label>
                  <select name="Return_Reason" value={formData.Return_Reason} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-xl bg-white text-sm outline-none">
                    <option value="">Select</option>
                    <option value="Part laying More than 90 days">Part laying More than 90 days</option>
                    <option value="Damaged">Damaged</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Email</label>
                  <input name="Email" value={formData.Email} onChange={handleChange} placeholder="Email" className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Sales Return Name</label>
                  <input name="Sales_Return_Name" value={formData.Sales_Return_Name} onChange={handleChange} placeholder="Sales Return Name" className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">GRN Number</label>
                  <input name="GRN_Number" value={formData.GRN_Number} onChange={handleChange} placeholder="GRN Number" className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Sales Return Status</label>
                  <select name="Sales_Return_Status" value={formData.Sales_Return_Status} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-xl bg-white text-sm outline-none">
                    <option value="">Select</option>
                    <option value="Claimed">Claimed</option>
                    <option value="Accepted">Accepted</option>
                    <option value="In Progress">In Progress</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Secondary Email</label>
                  <input name="Secondary_Email" value={formData.Secondary_Email} onChange={handleChange} placeholder="Secondary Email" className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none" />
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <input type="checkbox" name="Email_Opt_Out" checked={formData.Email_Opt_Out} onChange={handleChange} className="w-4 h-4 rounded border-gray-300" />
                  <label className="text-sm font-semibold text-slate-700">Email Opt Out</label>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-slate-700">Part Name</label>
                <input name="Part_Name" value={formData.Part_Name} onChange={handleChange} placeholder="Part Name" className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none" />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">Part Number</label>
                <input name="Part_Number" value={formData.Part_Number} onChange={handleChange} placeholder="Part Number" className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none" />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">Part Quantity</label>
                <input name="Part_Quantity" value={formData.Part_Quantity} onChange={handleChange} placeholder="Part Quantity" className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none" />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-slate-100 flex items-center justify-between bg-white">
          <div>
            {step > 1 && (
              <button onClick={() => setStep(step - 1)} className="text-[#0066b2] text-sm font-bold flex items-center gap-1 hover:bg-blue-50 px-3 py-2 rounded-xl transition-colors">
                <span>‹</span> Previous
              </button>
            )}
          </div>
          <div className="flex gap-3">
            <button onClick={handleClose} className="px-6 py-2.5 text-[#0066b2] font-bold text-sm hover:bg-blue-50 rounded-xl">Cancel</button>
            <button 
              onClick={() => step < 2 ? setStep(step + 1) : handleCreate()}
              disabled={loading}
              className="bg-[#0066b2] hover:bg-blue-700 text-white px-10 py-2.5 rounded-full text-sm font-bold shadow-md active:scale-95 disabled:bg-slate-400"
            >
              {loading ? "Creating..." : (step === 2 ? "Create" : "Next")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSalesReturnModal;