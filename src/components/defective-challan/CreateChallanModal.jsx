// import React, { useState } from 'react';
// import { ChevronLeft, ChevronDown } from 'lucide-react';

// const FormField = ({ label, placeholder, isSelect = false }) => (
//   <div className="mb-5">
//     <label className="block text-[13px] font-bold text-slate-800 mb-2">{label}</label>
//     <div className="relative">
//       {isSelect ? (
//         <>
//           <select className="w-full p-3.5 bg-white border border-slate-200 rounded-2xl text-slate-400 text-sm outline-none appearance-none cursor-pointer focus:border-blue-500">
//             <option>{placeholder || 'Select'}</option>
//           </select>
//           <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={18} />
//         </>
//       ) : (
//         <input 
//           type="text" 
//           placeholder={placeholder} 
//           className="w-full p-3.5 bg-white border border-slate-200 rounded-2xl text-slate-600 text-sm outline-none focus:border-blue-500 placeholder:text-slate-300" 
//         />
//       )}
//     </div>
//   </div>
// );

// const CreateChallanModal = ({ isOpen, onClose, onCreate }) => {
//   const [step, setStep] = useState(1);

//   if (!isOpen) return null;

//   const handleNext = () => setStep(2);
//   const handleBack = () => setStep(1);
//   const handleSubmit = () => {
//     // Perform any creation logic here
//     onCreate(); 
//     setStep(1); // Reset for next time
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-[6px] transition-all duration-300">
//       <div className="bg-white w-full max-w-[550px] rounded-[24px] shadow-2xl border border-white overflow-hidden animate-in zoom-in-95 duration-300">
        
//         {/* STEP PROGRESS BAR */}
//         <div className="px-10 pt-10 pb-2">
//           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
//             Step {step} of 2
//           </p>
//           <h2 className="text-[20px] font-bold text-slate-800 mb-6">
//             {step === 1 ? 'Defective Challan Information' : 'Product Details'}
//           </h2>
//           <div className="w-full bg-slate-100 h-[3px] rounded-full relative">
//             <div 
//               className={`absolute left-0 top-0 h-full bg-[#00579c] transition-all duration-700 ease-in-out ${step === 1 ? 'w-1/2' : 'w-full'}`}
//             />
//           </div>
//         </div>

//         {/* FORM BODY */}
//         <div className="px-10 py-6 max-h-[55vh] overflow-y-auto custom-scrollbar">
//           {step === 1 ? (
//             <>
//               <FormField label="Sales Order Number" placeholder="Sales Order Number" />
//               <FormField label="Email" placeholder="Email" />
//               <FormField label="Service Request ID" placeholder="Select" isSelect />
//               <FormField label="GRN Number" placeholder="GRN Number" />
//               <FormField label="Spare Invoice Number" placeholder="Spare Invoice Number" />
//               <FormField label="Secondary Email" placeholder="Secondary Email" />
//               <FormField label="Agency" placeholder="Select" isSelect />
//               <FormField label="Defective Challan Name" placeholder="Defective Challan Name" />
//               <FormField label="Defective Chalan Status" placeholder="Select" isSelect />
//             </>
//           ) : (
//             <>
//               <FormField label="Part Name" placeholder="Select Product" isSelect />
//               <FormField label="Part ID" placeholder="Part ID" />
//               <FormField label="Part Quantity" placeholder="Part Quantity" />
//             </>
//           )}
//         </div>

//         {/* FOOTER NAVIGATION */}
//         <div className="px-10 py-8 flex justify-between items-center bg-white">
//           <div className="w-1/3">
//             {step === 2 && (
//               <button 
//                 onClick={handleBack}
//                 className="flex items-center gap-1.5 text-[#00579c] text-sm font-bold bg-[#f1f6fa] px-5 py-2.5 rounded-full hover:bg-[#e2edf7] transition-colors"
//               >
//                 <ChevronLeft size={16} strokeWidth={3} /> Previous
//               </button>
//             )}
//           </div>
          
//           <div className="flex gap-6 items-center">
//             <button 
//               onClick={onClose}
//               className="text-[#00579c] text-sm font-bold hover:underline underline-offset-4"
//             >
//               Cancel
//             </button>
//             <button 
//               onClick={step === 1 ? handleNext : handleSubmit}
//               className="bg-[#00579c] hover:bg-[#004a85] text-white px-10 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-blue-100 transition-all active:scale-95"
//             >
//               {step === 1 ? 'Next' : 'Create'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateChallanModal;


import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronDown } from 'lucide-react';

const FormField = ({ label, placeholder, isSelect = false, options = [], value, onChange, name }) => (
  <div className="mb-5">
    <label className="block text-[13px] font-bold text-slate-800 mb-2">{label}</label>
    <div className="relative">
      {isSelect ? (
        <>
          <select 
            name={name}
            value={value}
            onChange={onChange}
            className="w-full p-3.5 bg-white border border-slate-200 rounded-2xl text-slate-600 text-sm outline-none appearance-none cursor-pointer focus:border-blue-500"
          >
            <option value="">{placeholder || 'Select'}</option>
            {options.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={18} />
        </>
      ) : (
        <input 
          type="text" 
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder} 
          className="w-full p-3.5 bg-white border border-slate-200 rounded-2xl text-slate-600 text-sm outline-none focus:border-blue-500 placeholder:text-slate-300" 
        />
      )}
    </div>
  </div>
);

const CreateChallanModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState({
    agencies: [],
    serviceRequests: [],
    products: []
  });

  const [formData, setFormData] = useState({
    salesOrder: '',
    email: '',
    serviceRequestId: '',
    grnNumber: '',
    spareInvoice: '',
    secondaryEmail: '',
    agencyId: '',
    challanName: '',
    challanStatus: 'Claimed',
    productId: '', // Part_ID in payload
    partName: '',   // Part_Name in payload
    partQuantity: ''
  });

  useEffect(() => {
    if (isOpen) {
      fetchOptions();
    }
  }, [isOpen]);

  const fetchOptions = async () => {
    try {
      const authResponse = await window.catalyst.auth.generateAuthToken();
      const [srRes, agencyRes, prodRes] = await Promise.all([
        fetch('https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/service_request?fields=Name&page=1&per_page=50',{
          headers: {
                    Authorization: `${authResponse.access_token}`,
                    "Content-Type": "application/json",
                },
                method: 'GET'
        }),
        fetch('https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/agency_wise_stock?fields=Agency&page=1&per_page=50',
          {
            headers: {
                    Authorization: `${authResponse.access_token}`,
                    "Content-Type": "application/json",
                },
                method: 'GET'
          }
        ),
        fetch('https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/products?fields=Product_Name&page=1&per_page=50',
          {
            headers: {
                    Authorization: `${authResponse.access_token}`,
                    "Content-Type": "application/json",
                },
                method: 'GET'
          }
        )
      ]);

      const srData = await srRes.json();
      const agencyData = await agencyRes.json();
      const prodData = await prodRes.json();

      setOptions({
        serviceRequests: srData.data.map(item => ({ id: item.id, label: item.Name })),
        // Filter unique agencies by name/id since the API returns duplicate Agency objects
        agencies: Array.from(new Map(agencyData.data.map(item => [item.Agency.id, item.Agency])).values())
                  .map(a => ({ id: a.id, label: a.name })),
        products: prodData.data.map(item => ({ id: item.id, label: item.Product_Name }))
      });
    } catch (error) {
      console.error("Error fetching dropdown options:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    // Construct payload based on sample
    const selectedAgency = options.agencies.find(a => a.id === formData.agencyId);
    const selectedSR = options.serviceRequests.find(s => s.id === formData.serviceRequestId);
    const selectedProduct = options.products.find(p => p.id === formData.productId);

    const payload = {
      data: [{
        Defective_Challan_Name_1: formData.challanName,
        Defective_Chalan_Status: formData.challanStatus,
        Part_ID: { id: selectedProduct?.id, name: selectedProduct?.label },
        Part_Quantity: formData.partQuantity,
        Part_Name: formData.partName,
        Secondary_Email: formData.secondaryEmail,
        Spare_Invoice_Number: formData.spareInvoice,
        GRN_Number: formData.grnNumber,
        Sales_Order_Number: formData.salesOrder,
        Email: formData.email,
        Service_Request_ID: { id: selectedSR?.id, name: selectedSR?.label },
        Agency: { id: selectedAgency?.id, name: selectedAgency?.label }
      }]
    };

    try {
      const authResponse = await window.catalyst.auth.generateAuthToken();
      const response = await fetch('https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/defective_challan/', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `${authResponse.access_token}`
         },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        // Navigate and Refresh
        window.location.href = '/defective-challan';
      } else {
        alert("Failed to create challan");
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-[6px]">
      <div className="bg-white w-full max-w-[550px] rounded-[24px] shadow-2xl border border-white overflow-hidden">
        
        <div className="px-10 pt-10 pb-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Step {step} of 2</p>
          <h2 className="text-[20px] font-bold text-slate-800 mb-6">
            {step === 1 ? 'Defective Challan Information' : 'Product Details'}
          </h2>
          <div className="w-full bg-slate-100 h-[3px] rounded-full relative">
            <div className={`absolute left-0 top-0 h-full bg-[#00579c] transition-all duration-700 ${step === 1 ? 'w-1/2' : 'w-full'}`} />
          </div>
        </div>

        <div className="px-10 py-6 max-h-[55vh] overflow-y-auto custom-scrollbar">
          {step === 1 ? (
            <>
              <FormField name="salesOrder" label="Sales Order Number" placeholder="Sales Order Number" value={formData.salesOrder} onChange={handleInputChange} />
              <FormField name="email" label="Email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
              <FormField name="serviceRequestId" label="Service Request ID" placeholder="Select SR" isSelect options={options.serviceRequests} value={formData.serviceRequestId} onChange={handleInputChange} />
              <FormField name="grnNumber" label="GRN Number" placeholder="GRN Number" value={formData.grnNumber} onChange={handleInputChange} />
              <FormField name="spareInvoice" label="Spare Invoice Number" placeholder="Spare Invoice Number" value={formData.spareInvoice} onChange={handleInputChange} />
              <FormField name="secondaryEmail" label="Secondary Email" placeholder="Secondary Email" value={formData.secondaryEmail} onChange={handleInputChange} />
              <FormField name="agencyId" label="Agency" placeholder="Select Agency" isSelect options={options.agencies} value={formData.agencyId} onChange={handleInputChange} />
              <FormField name="challanName" label="Defective Challan Name" placeholder="Defective Challan Name" value={formData.challanName} onChange={handleInputChange} />
              <FormField name="challanStatus" label="Defective Chalan Status" isSelect options={[{id: 'Claimed', label: 'Claimed'}, {id: 'Pending', label: 'Pending'}]} value={formData.challanStatus} onChange={handleInputChange} />
            </>
          ) : (
            <>
              <FormField name="productId" label="Part Name (Product)" placeholder="Select Product" isSelect options={options.products} value={formData.productId} onChange={handleInputChange} />
              <FormField name="partName" label="Part Name (Custom)" placeholder="Enter Part Name" value={formData.partName} onChange={handleInputChange} />
              <FormField name="partQuantity" label="Part Quantity" placeholder="Part Quantity" value={formData.partQuantity} onChange={handleInputChange} />
            </>
          )}
        </div>

        <div className="px-10 py-8 flex justify-between items-center bg-white">
          <div className="w-1/3">
            {step === 2 && (
              <button onClick={() => setStep(1)} className="flex items-center gap-1.5 text-[#00579c] text-sm font-bold bg-[#f1f6fa] px-5 py-2.5 rounded-full">
                <ChevronLeft size={16} strokeWidth={3} /> Previous
              </button>
            )}
          </div>
          
          <div className="flex gap-6 items-center">
            <button onClick={onClose} className="text-[#00579c] text-sm font-bold hover:underline">Cancel</button>
            <button 
              onClick={step === 1 ? () => setStep(2) : handleSubmit}
              disabled={loading}
              className="bg-[#00579c] hover:bg-[#004a85] text-white px-10 py-2.5 rounded-full text-sm font-bold shadow-lg disabled:opacity-50"
            >
              {loading ? 'Creating...' : (step === 1 ? 'Next' : 'Create')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateChallanModal;