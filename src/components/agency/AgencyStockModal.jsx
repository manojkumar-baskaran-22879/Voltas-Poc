// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AgencyStockModal = ({ isOpen, onClose, onSubmit }) => {
//   const navigate = useNavigate();
//   const [step, setStep] = useState(1);
//   const [loading, setLoading] = useState(false);
  
//   // Data for Dropdowns
//   const [agencies, setAgencies] = useState([]);
//   const [products, setProducts] = useState([]);

//   // Form State
//   const [formData, setFormData] = useState({
//     Part_Name: '', // Holds Product ID
//     Part_Name_Label: '',
//     Email: '',
//     Agency: '', // Holds Agency ID
//     Agency_Label: '',
//     Secondary_Email: '',
//     Email_Opt_Out: false,
//     Usage_Unit: '',
//     Quantity_In_Stock: '',
//     Quantity_Ordered: '',
//     Re_Order_Level: '',
//     Quantity_In_Demand: '',
//     Row_Number: '',
//     Shelf_Number: '',
//     Pallet_Number: '',
//     Bay_Number: ''
//   });

//   // Fetch Dropdown Data
//   useEffect(() => {
//     if (isOpen) {
//       fetchAgencies();
//       fetchProducts();
//     }
//   }, [isOpen]);

//   const fetchAgencies = async () => {
//     try {
//       const authResponse = await window.catalyst.auth.generateAuthToken();
//       const response = await fetch('https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/agency_wise_stock?fields=Agency&page=1&per_page=50',
//         {headers: {
//                     Authorization: `${authResponse.access_token}`,
//                     "Content-Type": "application/json",
//                 },
//                 method: 'GET'}
//       );
//       const result = await response.json();
//       // Extract unique agencies based on ID
//       const uniqueAgencies = Array.from(new Map(result.data.map(item => [item.Agency.id, item.Agency])).values());
//       setAgencies(uniqueAgencies);
//     } catch (error) {
//       console.error("Error fetching agencies:", error);
//     }
//   };

//   const fetchProducts = async () => {
//     try {
//       const authResponse = await window.catalyst.auth.generateAuthToken();
//       const response = await fetch('https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/products?fields=Product_Name&page=1&per_page=50',
//         {headers: {
//                     Authorization: `${authResponse.access_token}`,
//                     "Content-Type": "application/json",
//                 },
//                 method: 'GET'}
//       );
//       const result = await response.json();
//       setProducts(result.data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
    
//     if (name === "Agency") {
//         const selectedAgency = agencies.find(a => a.id === value);
//         setFormData(prev => ({ ...prev, Agency: value, Agency_Label: selectedAgency?.name || '' }));
//     } else if (name === "Part_Name") {
//         const selectedProd = products.find(p => p.id === value);
//         setFormData(prev => ({ ...prev, Part_Name: value, Part_Name_Label: selectedProd?.Product_Name || '' }));
//     } else {
//         setFormData(prev => ({
//             ...prev,
//             [name]: type === 'checkbox' ? checked : value
//         }));
//     }
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     const authResponse = await window.catalyst.auth.generateAuthToken();
//     const payload = {
//       data: [{
//         Email_Opt_Out: formData.Email_Opt_Out,
//         Usage_Unit: formData.Usage_Unit,
//         Stock_Details: {
//           id: formData.Part_Name,
//           name: formData.Part_Name_Label
//         },
//         Agency: {
//           id: formData.Agency,
//           name: formData.Agency_Label
//         },
//         Email: formData.Email,
//         Secondary_Email: formData.Secondary_Email,
//         Quantity_In_Stock: formData.Quantity_In_Stock,
//         Quantity_Ordered: formData.Quantity_Ordered,
//         Re_Order_Level: formData.Re_Order_Level,
//         Quantity_In_Demand: formData.Quantity_In_Demand,
//         Row_Number: formData.Row_Number,
//         Shelf_Number: formData.Shelf_Number,
//         Pallet_Number: formData.Pallet_Number,
//         Bay_Number: formData.Bay_Number
//       }]
//     };

//     try {
//       const response = await fetch('https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/agency_wise_stock/', {
//         method: 'POST',
//         headers: { 
//           'Content-Type': 'application/json',
//           Authorization: `${authResponse.access_token}`
//         },
//         body: JSON.stringify(payload)
//       });

//       if (response.ok) {
//         onSubmit?.();
//         handleClose();
//         navigate('/agency-stock');
//       } else {
//         alert("Failed to create stock record.");
//       }
//     } catch (error) {
//       console.error("Submission error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleNext = () => {
//     if (step < 3) setStep(step + 1);
//     else handleSubmit();
//   };

//   const handleClose = () => {
//     setStep(1);
//     setFormData({}); // Reset form
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px] p-4">
//       <div className="bg-white w-full max-w-[550px] rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
        
//         {/* Modal Header */}
//         <div className="p-6 border-b border-slate-100">
//           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Step {step} of 3</p>
//           <h3 className="text-lg font-bold text-slate-700">
//             {step === 2 ? "Stock Information" : step === 3 ? "Stock Location" : "Agency Wise Stock Information"}
//           </h3>
//           <div className="mt-3 w-full bg-slate-100 h-1 rounded-full overflow-hidden">
//             <div 
//               className="bg-[#0066b2] h-full transition-all duration-500" 
//               style={{ width: `${(step / 3) * 100}%` }}
//             />
//           </div>
//         </div>

//         {/* Modal Body */}
//         <div className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar bg-white">
//           {/* STEP 1: General Info */}
//           {step === 1 && (
//             <div className="space-y-4 animate-in fade-in duration-300">
//               <div className="space-y-1.5">
//                 <label className="text-sm font-semibold text-slate-700">Part Name</label>
//                 <select 
//                     name="Part_Name"
//                     value={formData.Part_Name}
//                     onChange={handleInputChange}
//                     className="w-full p-3 border border-slate-200 rounded-xl bg-white text-slate-700 text-sm outline-none"
//                 >
//                     <option value="">Select Part</option>
//                     {products.map(p => <option key={p.id} value={p.id}>{p.Product_Name}</option>)}
//                 </select>
//               </div>
//               <div className="space-y-1.5">
//                 <label className="text-sm font-semibold text-slate-700">Email</label>
//                 <input name="Email" value={formData.Email} onChange={handleInputChange} type="email" placeholder="Email" className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none" />
//               </div>
//               <div className="space-y-1.5">
//                 <label className="text-sm font-semibold text-slate-700">Agency</label>
//                 <select 
//                     name="Agency"
//                     value={formData.Agency}
//                     onChange={handleInputChange}
//                     className="w-full p-3 border border-slate-200 rounded-xl bg-white text-slate-700 text-sm outline-none"
//                 >
//                     <option value="">Select Agency</option>
//                     {agencies.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
//                 </select>
//               </div>
//               <div className="space-y-1.5">
//                 <label className="text-sm font-semibold text-slate-700">Secondary Email</label>
//                 <input name="Secondary_Email" value={formData.Secondary_Email} onChange={handleInputChange} type="email" placeholder="Secondary Email" className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none" />
//               </div>
//               <div className="flex items-center gap-3 pt-2">
//                 <label className="text-sm font-semibold text-slate-700">Email Opt Out</label>
//                 <input name="Email_Opt_Out" checked={formData.Email_Opt_Out} onChange={handleInputChange} type="checkbox" className="w-5 h-5 border-slate-300 rounded focus:ring-blue-500" />
//               </div>
//             </div>
//           )}

//           {/* STEP 2: Stock Information */}
//           {step === 2 && (
//             <div className="space-y-4 animate-in fade-in duration-300">
//               <div className="space-y-1.5">
//                 <label className="text-sm font-semibold text-slate-700">Usage Unit</label>
//                 <select name="Usage_Unit" value={formData.Usage_Unit} onChange={handleInputChange} className="w-full p-3 border border-slate-200 rounded-xl bg-white text-slate-700 text-sm outline-none">
//                   <option value="">Select Unit</option>
//                   <option value="Dozen">Dozen</option>
//                   <option value="Box">Box</option>
//                   <option value="Unit">Unit</option>
//                 </select>
//               </div>
//               <div className="space-y-1.5">
//                 <label className="text-sm font-semibold text-slate-700">Quantity In Stock</label>
//                 <input name="Quantity_In_Stock" value={formData.Quantity_In_Stock} onChange={handleInputChange} type="number" placeholder="0" className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none" />
//               </div>
//               <div className="space-y-1.5">
//                 <label className="text-sm font-semibold text-slate-700">Quantity Ordered</label>
//                 <input name="Quantity_Ordered" value={formData.Quantity_Ordered} onChange={handleInputChange} type="number" placeholder="0" className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none" />
//               </div>
//               <div className="space-y-1.5">
//                 <label className="text-sm font-semibold text-slate-700">Re Order Level</label>
//                 <input name="Re_Order_Level" value={formData.Re_Order_Level} onChange={handleInputChange} type="number" placeholder="0" className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none" />
//               </div>
//               <div className="space-y-1.5">
//                 <label className="text-sm font-semibold text-slate-700">Quantity In Demand</label>
//                 <input name="Quantity_In_Demand" value={formData.Quantity_In_Demand} onChange={handleInputChange} type="number" placeholder="0" className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none" />
//               </div>
//             </div>
//           )}

//           {/* STEP 3: Stock Location */}
//           {step === 3 && (
//             <div className="space-y-4 animate-in fade-in duration-300">
//               <div className="space-y-1.5">
//                 <label className="text-sm font-semibold text-slate-700">Row Number</label>
//                 <input name="Row_Number" value={formData.Row_Number} onChange={handleInputChange} type="text" placeholder="Row Number" className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none" />
//               </div>
//               <div className="space-y-1.5">
//                 <label className="text-sm font-semibold text-slate-700">Shelf Number</label>
//                 <input name="Shelf_Number" value={formData.Shelf_Number} onChange={handleInputChange} type="text" placeholder="Shelf Number" className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none" />
//               </div>
//               <div className="space-y-1.5">
//                 <label className="text-sm font-semibold text-slate-700">Pallet Number</label>
//                 <input name="Pallet_Number" value={formData.Pallet_Number} onChange={handleInputChange} type="text" placeholder="Pallet Number" className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none" />
//               </div>
//               <div className="space-y-1.5">
//                 <label className="text-sm font-semibold text-slate-700">Bay Number</label>
//                 <input name="Bay_Number" value={formData.Bay_Number} onChange={handleInputChange} type="text" placeholder="Bay Number" className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none" />
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Modal Footer */}
//         <div className="p-5 border-t border-slate-100 flex items-center justify-between bg-white">
//           <div>
//             {step > 1 && (
//               <button 
//                 onClick={() => setStep(step - 1)}
//                 className="text-[#0066b2] text-sm font-bold flex items-center gap-1 px-4 py-2 hover:bg-blue-50 rounded-xl transition-colors"
//               >
//                 <span className="text-lg">‹</span> Previous
//               </button>
//             )}
//           </div>
//           <div className="flex gap-3">
//             <button onClick={handleClose} className="px-6 py-2.5 text-[#0066b2] font-bold text-sm hover:bg-blue-50 rounded-xl">
//               Cancel
//             </button>
//             <button 
//               onClick={handleNext}
//               disabled={loading}
//               className="bg-[#0066b2] hover:bg-blue-700 text-white px-10 py-2.5 rounded-full text-sm font-bold shadow-md transition-all active:scale-95 disabled:opacity-50"
//             >
//               {loading ? "Saving..." : (step === 3 ? "Create" : "Next")}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AgencyStockModal;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AgencyStockModal = ({ isOpen, onClose, onSuccess, editData }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [agencies, setAgencies] = useState([]);
  const [products, setProducts] = useState([]);

  const initialState = {
    Part_Name: '',
    Part_Name_Label: '',
    Email: '',
    Agency: '',
    Agency_Label: '',
    Secondary_Email: '',
    Email_Opt_Out: false,
    Usage_Unit: '',
    Quantity_In_Stock: '',
    Quantity_Ordered: '',
    Re_Order_Level: '',
    Quantity_In_Demand: '',
    Row_Number: '',
    Shelf_Number: '',
    Pallet_Number: '',
    Bay_Number: ''
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (isOpen) {
      fetchAgencies();
      fetchProducts();
      if (editData) {
        setFormData({
          Part_Name: editData.Stock_Details?.id || '',
          Part_Name_Label: editData.Stock_Details?.name || '',
          Email: editData.Email || '',
          Agency: editData.Agency?.id || '',
          Agency_Label: editData.Agency?.name || '',
          Secondary_Email: editData.Secondary_Email || '',
          Email_Opt_Out: !!editData.Email_Opt_Out,
          Usage_Unit: editData.Usage_Unit || '',
          Quantity_In_Stock: editData.Quantity_In_Stock || '',
          Quantity_Ordered: editData.Quantity_Ordered || '',
          Re_Order_Level: editData.Re_Order_Level || '',
          Quantity_In_Demand: editData.Quantity_In_Demand || '',
          Row_Number: editData.Row_Number || '',
          Shelf_Number: editData.Shelf_Number || '',
          Pallet_Number: editData.Pallet_Number || '',
          Bay_Number: editData.Bay_Number || ''
        });
      } else {
        setFormData(initialState);
      }
    }
  }, [isOpen, editData]);

  const fetchAgencies = async () => {
    try {
      const authResponse = await window.catalyst.auth.generateAuthToken();
      const response = await fetch('https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/agency_wise_stock?fields=Agency&page=1&per_page=50', {
        headers: { Authorization: authResponse.access_token }
      });
      const result = await response.json();
      const uniqueAgencies = Array.from(new Map(result.data.map(item => [item.Agency.id, item.Agency])).values());
      setAgencies(uniqueAgencies);
    } catch (error) { console.error("Error fetching agencies:", error); }
  };

  const fetchProducts = async () => {
    try {
      const authResponse = await window.catalyst.auth.generateAuthToken();
      const response = await fetch('https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/products?fields=Product_Name&page=1&per_page=50', {
        headers: { Authorization: authResponse.access_token }
      });
      const result = await response.json();
      setProducts(result.data);
    } catch (error) { console.error("Error fetching products:", error); }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "Agency") {
      const selected = agencies.find(a => a.id === value);
      setFormData(prev => ({ ...prev, Agency: value, Agency_Label: selected?.name || '' }));
    } else if (name === "Part_Name") {
      const selected = products.find(p => p.id === value);
      setFormData(prev => ({ ...prev, Part_Name: value, Part_Name_Label: selected?.Product_Name || '' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const authResponse = await window.catalyst.auth.generateAuthToken();
      const isEdit = !!editData;
      
      const payload = {
        data: [{
          ...(isEdit && { id: editData.id }),
          Email_Opt_Out: formData.Email_Opt_Out,
          Usage_Unit: formData.Usage_Unit,
          Stock_Details: { id: formData.Part_Name, name: formData.Part_Name_Label },
          Agency: { id: formData.Agency, name: formData.Agency_Label },
          Email: formData.Email,
          Secondary_Email: formData.Secondary_Email,
          Quantity_In_Stock: formData.Quantity_In_Stock,
          Quantity_Ordered: formData.Quantity_Ordered,
          Re_Order_Level: formData.Re_Order_Level,
          Quantity_In_Demand: formData.Quantity_In_Demand,
          Row_Number: formData.Row_Number,
          Shelf_Number: formData.Shelf_Number,
          Pallet_Number: formData.Pallet_Number,
          Bay_Number: formData.Bay_Number
        }]
      };

      const url = isEdit 
        ? `https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/agency_wise_stock/${editData.id}`
        : 'https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/agency_wise_stock/';

      const response = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: authResponse.access_token 
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok) {
        onSuccess?.();
        handleClose();
        if (!isEdit) navigate(`/agency-stock/${result.data[0].details.id}`);
      } else {
        alert(`Failed to ${isEdit ? 'update' : 'create'} record.`);
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => step < 3 ? setStep(step + 1) : handleSubmit();
  const handleClose = () => { setStep(1); setFormData(initialState); onClose(); };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px] p-4">
      <div className="bg-white w-full max-w-[550px] rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">STEP {step} OF 3</p>
          <h3 className="text-xl font-bold text-slate-800">
            {step === 1 ? "Stock Information" : step === 2 ? "Stock Information" : "Stock Location"}
          </h3>
          <div className="mt-3 w-full bg-slate-100 h-1 rounded-full overflow-hidden">
            <div className="bg-[#0066b2] h-full transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }} />
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white custom-scrollbar">
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Part Name</label>
                <select name="Part_Name" value={formData.Part_Name} onChange={handleInputChange} className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none bg-white">
                  <option value="">Select Part</option>
                  {products.map(p => <option key={p.id} value={p.id}>{p.Product_Name}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Email</label>
                <input name="Email" value={formData.Email} onChange={handleInputChange} type="email" placeholder="Email" className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Agency</label>
                <select name="Agency" value={formData.Agency} onChange={handleInputChange} className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none bg-white">
                  <option value="">Select Agency</option>
                  {agencies.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <label className="text-sm font-semibold text-slate-700">Email Opt Out</label>
                <input name="Email_Opt_Out" checked={formData.Email_Opt_Out} onChange={handleInputChange} type="checkbox" className="w-5 h-5 border-slate-300 rounded text-[#0066b2]" />
              </div>
            </div>
          )}

          {/* STEP 2 - REDESIGNED TO MATCH IMAGES */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-base font-medium text-slate-900">Usage Unit</label>
                <div className="relative">
                  <select 
                    name="Usage_Unit" 
                    value={formData.Usage_Unit} 
                    onChange={handleInputChange} 
                    className="w-full p-4 border border-slate-200 rounded-2xl text-slate-500 text-base outline-none bg-white appearance-none pr-10"
                  >
                    <option value="">Select</option>
                    <option value="Dozen">Dozen</option>
                    <option value="Box">Box</option>
                    <option value="Unit">Unit</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-base font-medium text-slate-900">Quantity In Stock</label>
                <input 
                  name="Quantity_In_Stock" 
                  value={formData.Quantity_In_Stock} 
                  onChange={handleInputChange} 
                  type="number" 
                  placeholder="Quantity In Stock" 
                  className="w-full p-4 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 text-base outline-none focus:border-blue-500" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-base font-medium text-slate-900">Quantity Ordered</label>
                <input 
                  name="Quantity_Ordered" 
                  value={formData.Quantity_Ordered} 
                  onChange={handleInputChange} 
                  type="number" 
                  placeholder="Quantity Ordered" 
                  className="w-full p-4 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 text-base outline-none focus:border-blue-500" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-base font-medium text-slate-900">Re Order Level</label>
                <input 
                  name="Re_Order_Level" 
                  value={formData.Re_Order_Level} 
                  onChange={handleInputChange} 
                  type="number" 
                  placeholder="Re Order Level" 
                  className="w-full p-4 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 text-base outline-none focus:border-blue-500" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-base font-medium text-slate-900">Quantity In Demand</label>
                <input 
                  name="Quantity_In_Demand" 
                  value={formData.Quantity_In_Demand} 
                  onChange={handleInputChange} 
                  type="number" 
                  placeholder="Quantity In Demand" 
                  className="w-full p-4 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 text-base outline-none focus:border-blue-500" 
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Row Number</label>
                <input name="Row_Number" value={formData.Row_Number} onChange={handleInputChange} type="text" className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Shelf Number</label>
                <input name="Shelf_Number" value={formData.Shelf_Number} onChange={handleInputChange} type="text" className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Pallet Number</label>
                <input name="Pallet_Number" value={formData.Pallet_Number} onChange={handleInputChange} type="text" className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Bay Number</label>
                <input name="Bay_Number" value={formData.Bay_Number} onChange={handleInputChange} type="text" className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none" />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 flex items-center justify-between bg-white">
          <button 
            onClick={() => setStep(prev => prev - 1)} 
            disabled={step === 1} 
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-base transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-[#0066b2] bg-slate-50 hover:bg-slate-100'}`}
          >
            <span>‹</span> Previous
          </button>
          
          <div className="flex gap-4 items-center">
            <button onClick={handleClose} className="px-6 py-2 text-[#0066b2] font-semibold text-lg hover:underline transition-all">
              Cancel
            </button>
            <button 
              onClick={handleNext} 
              disabled={loading} 
              className="bg-[#3471b6] hover:bg-[#285a94] text-white px-10 py-3 rounded-full text-lg font-bold shadow-lg transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? "Saving..." : (step === 3 ? (editData ? "Update" : "Create") : "Next")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgencyStockModal;