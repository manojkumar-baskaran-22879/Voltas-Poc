// import React, { useState, useEffect } from 'react';

// const EstimationModal = ({ isOpen, onClose }) => {
//   const [step, setStep] = useState(1);
//   const [quotedItems, setQuotedItems] = useState([{ id: Date.now(), product: '', qty: 0 }]);
  
//   // API Data States
//   const [apiData, setApiData] = useState({
//     serviceRequests: [],
//     agencies: [],
//     contacts: [],
//     dealers: [],
//     products: []
//   });

//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (isOpen) {
//       fetchAllData();
//     }
//   }, [isOpen]);

//   const fetchAllData = async () => {
//     setIsLoading(true);
//     try {
//       const baseUrl = "https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service";
//       const authResponse = await window.catalyst.auth.generateAuthToken();
      
//       const [res1, res2, res3, res4, res5] = await Promise.all([
//         fetch(`${baseUrl}/service_request?fields=Name&page=1&per_page=50`,
//           {
//             headers:{
//                         Authorization: `${authResponse.access_token}`,
//                         "Content-Type": "application/json",
//                     },
//                     method: 'GET',}
//                 ).then(r => r.json()),
//         fetch(`${baseUrl}/agency_wise_stock?fields=Agency&page=1&per_page=50`,
//           {
//             headers:{
//                         Authorization: `${authResponse.access_token}`,
//                         "Content-Type": "application/json",
//                     },
//                     method: 'GET',}).then(r => r.json()),
//         fetch(`${baseUrl}/contacts?fields=First_Name,Last_Name&page=1&per_page=50`,
//           {
//             headers:{
//                         Authorization: `${authResponse.access_token}`,
//                         "Content-Type": "application/json",
//                     },
//                     method: 'GET',}).then(r => r.json()),
//         fetch(`${baseUrl}/products?fields=Product_Name&page=1&per_page=50`,
//           {
//             headers:{
//                         Authorization: `${authResponse.access_token}`,
//                         "Content-Type": "application/json",
//                     },
//                     method: 'GET',}).then(r => r.json()),
//         fetch(`${baseUrl}/dealers?fields=Account_Name&page=1&per_page=50`,
//           {
//             headers:{
//                         Authorization: `${authResponse.access_token}`,
//                         "Content-Type": "application/json",
//                     },
//                     method: 'GET',}).then(r => r.json()),
//       ]);

//       setApiData({
//         serviceRequests: res1.data || [],
//         agencies: res2.data || [],
//         contacts: res3.data || [],
//         products: res4.data || [],
//         dealers: res5.data || []
//       });
//     } catch (error) {
//       console.error("Error fetching dropdown data:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   // Shared select style to handle scrolling and long text
//   const selectStyle = "w-full p-2.5 border border-slate-200 rounded-xl text-sm bg-white text-slate-700 outline-none focus:border-blue-400 appearance-none cursor-pointer overflow-y-auto";

//   const handleClose = () => {
//     setStep(1);
//     onClose();
//   };

//   const addQuoteRow = () => {
//     setQuotedItems([...quotedItems, { id: Date.now(), product: '', qty: 0 }]);
//   };

//   const removeQuoteRow = (id) => {
//     if (quotedItems.length > 1) {
//       setQuotedItems(quotedItems.filter(item => item.id !== id));
//     }
//   };

//   const handleFinalSubmit = () => {
//     console.log("Submitting estimation...");
//     handleClose();
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[1px] p-4">
//       <div className="bg-white w-full max-w-[600px] rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        
//         {/* Modal Header */}
//         <div className="p-6 pb-4 border-b border-slate-100">
//           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Step {step} of 3</p>
//           <h3 className="text-lg font-bold text-slate-800">
//             {step === 1 && "Estimation Information"}
//             {step === 2 && "Address Information"}
//             {step === 3 && "Quoted Items"}
//           </h3>
//           <div className="mt-4 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
//             <div className="bg-[#0066b2] h-full transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }} />
//           </div>
//         </div>

//         {/* Scrollable Form Body */}
//         <div className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar">
//           {isLoading ? (
//             <div className="flex items-center justify-center h-40 text-sm text-slate-500">Loading options...</div>
//           ) : (
//             <>
//               {step === 1 && (
//                 <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
//                   <div className="space-y-1">
//                     <label className="text-xs font-bold text-slate-700">Subject</label>
//                     <input type="text" placeholder="Subject" className="w-full p-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-400" />
//                   </div>

//                   {/* 1) Service Request ID */}
//                   <div className="space-y-1">
//                     <label className="text-xs font-bold text-slate-700">Service Request ID</label>
//                     <select className={selectStyle}>
//                       <option value="">Select Request</option>
//                       {apiData.serviceRequests.map(item => <option key={item.id} value={item.id}>{item.Name}</option>)}
//                     </select>
//                   </div>

//                   {/* 2) Agency */}
//                   <div className="space-y-1">
//                     <label className="text-xs font-bold text-slate-700">Agency</label>
//                     <select className={selectStyle}>
//                       <option value="">Select Agency</option>
//                       {apiData.agencies.map(item => <option key={item.id} value={item.id}>{item.Agency?.name}</option>)}
//                     </select>
//                   </div>

//                   <div className="space-y-1">
//                     <label className="text-xs font-bold text-slate-700">Estimation Stage</label>
//                     <select className={selectStyle}>
//                       <option>Draft</option>
//                       <option>Sent</option>
//                       <option>Confirmed</option>
//                     </select>
//                   </div>

//                   {/* 3) Contact Name */}
//                   <div className="space-y-1">
//                     <label className="text-xs font-bold text-slate-700">Contact Name</label>
//                     <select className={selectStyle}>
//                       <option value="">Select Contact</option>
//                       {apiData.contacts.map(item => (
//                         <option key={item.id} value={item.id}>{`${item.First_Name} ${item.Last_Name}`}</option>
//                       ))}
//                     </select>
//                   </div>

//                   {/* 4) Dealer Name */}
//                   <div className="space-y-1">
//                     <label className="text-xs font-bold text-slate-700">Dealer Name</label>
//                     <select className={selectStyle}>
//                       <option value="">Select Dealer</option>
//                       {apiData.dealers.map(item => <option key={item.id} value={item.id}>{item.Account_Name}</option>)}
//                     </select>
//                   </div>
//                 </div>
//               )}

//               {step === 2 && (
//                 <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
//                   <div className="grid grid-cols-1 gap-4">
//                     {['Billing Street', 'Billing City', 'Billing State', 'Billing Code', 'Billing Country'].map(label => (
//                       <div key={label} className="space-y-1">
//                         <label className="text-xs font-bold text-slate-700">{label}</label>
//                         <input type="text" placeholder={label.toLowerCase()} className="w-full p-2.5 border border-slate-200 rounded-xl text-sm outline-none" />
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {step === 3 && (
//                 <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
//                   <div className="flex justify-between items-center">
//                     <h4 className="text-sm font-bold text-slate-800">Add Quotes</h4>
//                     <button onClick={addQuoteRow} className="bg-[#0066b2] text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-md hover:bg-blue-700">
//                       <span className="text-base">+</span> Add
//                     </button>
//                   </div>
//                   <div className="space-y-3">
//                     {quotedItems.map((item) => (
//                       <div key={item.id} className="p-4 border border-slate-100 rounded-2xl bg-slate-50/50 flex items-center gap-3">
//                         <div className="flex-1">
//                           {/* 5) Product Name Dropdown */}
//                           <select className={selectStyle}>
//                             <option value="">Select Product</option>
//                             {apiData.products.map(p => (
//                               <option key={p.id} value={p.id}>{p.Product_Name}</option>
//                             ))}
//                           </select>
//                         </div>
//                         <div className="w-20">
//                           <input type="number" defaultValue={0} className="w-full p-2.5 border border-slate-200 rounded-xl text-sm text-center outline-none" />
//                         </div>
//                         <button onClick={() => removeQuoteRow(item.id)} className="text-slate-400 hover:text-red-500 transition-colors px-2">
//                           —
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </>
//           )}
//         </div>

//         {/* Modal Footer */}
//         <div className="p-5 border-t border-slate-100 flex items-center justify-between bg-white">
//           <div>
//             {step > 1 && (
//               <button onClick={() => setStep(step - 1)} className="flex items-center gap-1 text-[#0066b2] text-sm font-bold hover:underline">
//                 <span className="text-lg">‹</span> Previous
//               </button>
//             )}
//           </div>
//           <div className="flex gap-3">
//             <button onClick={handleClose} className="px-6 py-2.5 text-[#0066b2] font-bold text-sm hover:bg-blue-50 rounded-xl transition-colors">
//               Cancel
//             </button>
//             <button 
//               disabled={isLoading}
//               onClick={() => step < 3 ? setStep(step + 1) : handleFinalSubmit()}
//               className="bg-[#0066b2] hover:bg-blue-700 disabled:bg-slate-300 text-white px-10 py-2.5 rounded-full text-sm font-bold transition-all shadow-md active:scale-95"
//             >
//               {step === 3 ? "Create" : "Next"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EstimationModal;

import React, { useState, useEffect } from 'react';

const EstimationModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [token, setToken] = useState('');
  
  // 1. Form State
  const [formData, setFormData] = useState({
    Subject: '',
    Service_Request_ID: '',
    Agency: '',
    Quote_Stage: 'Draft',
    Team: '',
    Contact_Name: '',
    Account_Name: '',
    Billing_Street: '', Billing_City: '', Billing_State: '', Billing_Code: '', Billing_Country: '',
    Shipping_Street: '', Shipping_City: '', Shipping_State: '', Shipping_Code: '', Shipping_Country: ''
  });

  const [quotedItems, setQuotedItems] = useState([{ id: Date.now(), product_id: '', qty: 1 }]);

  // 2. API Options Data
  const [apiData, setApiData] = useState({
    serviceRequests: [], agencies: [], contacts: [], dealers: [], products: []
  });

  useEffect(() => {
    if (isOpen) fetchAllData();
  }, [isOpen]);

  const fetchAllData = async () => {
    try {
      const baseUrl = "https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service";
      
      const authResponse = await window.catalyst.auth.generateAuthToken();

      setToken(authResponse.access_token);

      const [res1, res2, res3, res4, res5] = await Promise.all([
        fetch(`${baseUrl}/service_request?fields=Name&page=1&per_page=50`,{
            headers:{
                        Authorization: `${authResponse.access_token}`,
                        "Content-Type": "application/json",
                    },
                    method: 'GET',}).then(r => r.json()),
        fetch(`${baseUrl}/agency_wise_stock?fields=Agency&page=1&per_page=50`,{
            headers:{
                        Authorization: `${authResponse.access_token}`,
                        "Content-Type": "application/json",
                    },
                    method: 'GET',}).then(r => r.json()),
        fetch(`${baseUrl}/contacts?fields=First_Name,Last_Name&page=1&per_page=50`,{
            headers:{
                        Authorization: `${authResponse.access_token}`,
                        "Content-Type": "application/json",
                    },
                    method: 'GET',}).then(r => r.json()),
        fetch(`${baseUrl}/products?fields=Product_Name&page=1&per_page=50`,{
            headers:{
                        Authorization: `${authResponse.access_token}`,
                        "Content-Type": "application/json",
                    },
                    method: 'GET',}).then(r => r.json()),
        fetch(`${baseUrl}/dealers?fields=Account_Name&page=1&per_page=50`,{
            headers:{
                        Authorization: `${authResponse.access_token}`,
                        "Content-Type": "application/json",
                    },
                    method: 'GET',}).then(r => r.json()),
      ]);
      setApiData({
        serviceRequests: res1.data, //agencies: res2.data,
        agencies: res2.data.map(a => ({
  ...a,
  id: String(a.id)
})),
        contacts: res3.data, products: res4.data, dealers: res5.data
      });
      console.log("Fetched API Data:", {res2});
      //console.log("Fetched API Datasss:",{res2.data});
    } catch (e) { console.error("Fetch error", e); }
  };

  // 3. Submit Handler
  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    
    // Constructing the payload based on your sample
    const payload = {
      data: [{
        ...formData,
        // Map simple IDs to the required {id, name} objects
        Service_Request_ID: { 
            id: formData.Service_Request_ID, 
            name: apiData.serviceRequests.find(i => i.id === formData.Service_Request_ID)?.Name 
        },
        Agency: { 
            id: String(formData.Agency), 
            name: apiData.agencies.find(i => String(i.id) === String(formData.Agency))?.Agency?.name 
        },
        Account_Name: { 
            id: formData.Account_Name, 
            name: apiData.dealers.find(i => i.id === formData.Account_Name)?.Account_Name 
        },
        Contact_Name: { 
            id: formData.Contact_Name, 
            name: apiData.contacts.find(i => i.id === formData.Contact_Name)?.First_Name + " " + apiData.contacts.find(i => i.id === formData.Contact_Name)?.Last_Name 
        },
        Quoted_Items: quotedItems.map((item, index) => ({
          id: index + 1,
          Product_Name: {
            id: item.product_id,
            name: apiData.products.find(p => p.id === item.product_id)?.Product_Name
          },
          Quantity: parseInt(item.qty)
        }))
      }]
    };

    try {
      const response = await fetch("https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/estimations", {
        method: 'POST',
        headers: { Authorization: `${token}`,'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (result.data[0].status === "success") {
        alert("Estimation Created Successfully!");
        onClose();
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error creating estimation");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const inputClass = "w-full p-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-400";
  const selectClass = "w-full p-2.5 border border-slate-200 rounded-xl text-sm bg-white text-slate-700 outline-none focus:border-blue-400 max-h-40 overflow-y-auto";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-[600px] rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Step {step} of 3</p>
          <h3 className="text-lg font-bold text-slate-800">Create New Estimation</h3>
        </div>

        {/* Scrollable Form */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <label className="text-xs font-bold text-slate-600">Subject</label>
                <input type="text" className={inputClass} onChange={e => setFormData({...formData, Subject: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-600">Service Request</label>
                  <select className={selectClass} onChange={e => setFormData({...formData, Service_Request_ID: e.target.value})}>
                    <option value="">Select...</option>
                    {apiData.serviceRequests.map(r => <option key={r.id} value={r.id}>{r.Name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600">Agency</label>
                  <select className={selectClass} onChange={e => setFormData({...formData, Agency: e.target.value})}>
                    <option value="">Select...</option>
                    {apiData.agencies.map(a => <option key={String(a.Agency.id)} value={String(a.Agency.id)}>{a.Agency?.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-600">Contact</label>
                  <select className={selectClass} onChange={e => setFormData({...formData, Contact_Name: e.target.value})}>
                    <option value="">Select...</option>
                    {apiData.contacts.map(c => <option key={c.id} value={c.id}>{c.First_Name} {c.Last_Name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600">Dealer</label>
                  <select className={selectClass} onChange={e => setFormData({...formData, Account_Name: e.target.value})}>
                    <option value="">Select...</option>
                    {apiData.dealers.map(d => <option key={d.id} value={d.id}>{d.Account_Name}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
             <div className="grid grid-cols-2 gap-4 animate-in fade-in">
                {Object.keys(formData).filter(k => k.includes('Billing') || k.includes('Shipping')).map(field => (
                  <div key={field}>
                    <label className="text-xs font-bold text-slate-600">{field.replace('_', ' ')}</label>
                    <input type="text" className={inputClass} onChange={e => setFormData({...formData, [field]: e.target.value})} />
                  </div>
                ))}
             </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex justify-between items-center">
                <h4 className="font-bold">Items</h4>
                <button onClick={() => setQuotedItems([...quotedItems, {id: Date.now(), product_id: '', qty: 1}])} className="text-[#0066b2] text-xs font-bold">+ Add Row</button>
              </div>
              {quotedItems.map((item, idx) => (
                <div key={item.id} className="flex gap-2 items-end">
                  <div className="flex-1">
                    <select className={selectClass} onChange={e => {
                        const newItems = [...quotedItems];
                        newItems[idx].product_id = e.target.value;
                        setQuotedItems(newItems);
                    }}>
                      <option value="">Product...</option>
                      {apiData.products.map(p => <option key={p.id} value={p.id}>{p.Product_Name}</option>)}
                    </select>
                  </div>
                  <div className="w-20">
                    <input type="number" className={inputClass} placeholder="Qty" onChange={e => {
                        const newItems = [...quotedItems];
                        newItems[idx].qty = e.target.value;
                        setQuotedItems(newItems);
                    }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t flex justify-between items-center">
          <button onClick={() => step > 1 && setStep(step - 1)} className="text-slate-500 font-bold text-sm">Back</button>
          <div className="flex gap-3">
            <button onClick={onClose} className="px-4 text-slate-400 font-bold">Cancel</button>
            <button 
              onClick={() => step < 3 ? setStep(step + 1) : handleFinalSubmit()}
              disabled={isSubmitting}
              className="bg-[#0066b2] text-white px-8 py-2.5 rounded-full font-bold disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : step === 3 ? "Create Estimation" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimationModal;