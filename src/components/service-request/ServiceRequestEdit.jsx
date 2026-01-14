// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// const ServiceRequestEdit = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formData, setFormData] = useState({});
//   const [loading, setLoading] = useState(true);

//   // Helper to safely extract value from API (handles both objects and primitives)
//   const getSafeValue = (val) => {
//     if (!val) return '';
//     return typeof val === 'object' ? (val.id || val.name || '') : val;
//   };

//   useEffect(() => {
//     const fetchExistingData = async () => {
//       try {
//         const auth = window.catalyst.auth;
//         const response = await auth.generateAuthToken();
//         const API_URL = `https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/service_request/${id}`;
        
//         const apiResponse = await fetch(API_URL, {
//           headers: { Authorization: response.access_token },
//           method: 'GET',
//         });

//         const result = await apiResponse.json();
//         const data = result.data[0];

//         // Map API response to flat form state
//         setFormData({
//           Agency_ID: getSafeValue(data.Agency),
//           Technician: getSafeValue(data.Technician),
//           Helper_First_Name: data.Helper_First_Name || '',
//           Helper_Last_Name: data.Helper_Last_Name || '',
//           Service_Request_Status: data.Service_Request_Status || '',
//           Number_1: data.Number_1 || '',
//           Service_Request_Name: data.Service_Request_Name_1 || '',
//           Service_Request_Type: data.Service_Request_Type || '',
//           Service_Request_Sub_Type: data.Service_Request_Sub_Type || '',
//           Escalation: data.Escalation || 'Normal',
//           Severity: data.Severity || 'Normal',
//           Contact_Name: getSafeValue(data.Contact_Name),
//           Product_Code: getSafeValue(data.Product_Code),
//           Appointment_Date_and_Time: data.Appointment_Date_and_Time || '',
//           Actual_Start_Date_and_Time: data.Actual_Start_Date_and_Time || '',
//           Actual_End_Date_and_Time: data.Actual_End_Date_and_Time || '',
//           Payment_Status: data.payment_Status || '',
//           Visit_Status: data.Visit_Status || '',
//           Fault_Group: data.Fault_Group || '',
//           Action_Taken: data.Action_Taken || '',
//           Product_Service_Name: getSafeValue(data.Product_Service_Name),
//           Description: data.Description || ''
//         });
//       } catch (err) {
//         console.error("Fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchExistingData();
//   }, [id]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleUpdate = async () => {
//     // Logic for final PUT/PATCH API call goes here
//     console.log("Updating record with:", formData);
//     navigate(`/service-request/${id}`);
//   };

//   if (loading) return <div className="p-10 text-center">Loading form...</div>;

//   const InputField = ({ label, name, type = "text", isSelect = false, options = [] }) => (
//     <div className="mb-6">
//       <label className="block text-slate-700 font-medium mb-2">{label}</label>
//       {isSelect ? (
//         <select 
//           name={name} 
//           value={formData[name]} 
//           onChange={handleInputChange}
//           className="w-full p-3 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
//           style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23cbd5e1%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
//         >
//           <option value="">Select {label}</option>
//           {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
//         </select>
//       ) : (
//         <input 
//           type={type} 
//           name={name} 
//           value={formData[name]} 
//           onChange={handleInputChange}
//           placeholder={label === "Description" ? "Enter description" : ""}
//           className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       )}
//     </div>
//   );

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white min-h-screen">
//       <div className="mb-8">
//         <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Step {currentStep} of 5</p>
//         <h2 className="text-2xl font-bold text-slate-800">
//           {currentStep === 1 && "Service Request Information"}
//           {currentStep === 2 && "Customer Information"}
//           {currentStep === 3 && "Product Information"}
//           {currentStep === 4 && "Visit Information"}
//           {currentStep === 5 && "Resolution Status"}
//         </h2>
//         <div className="w-full bg-slate-100 h-1.5 mt-4 rounded-full overflow-hidden">
//           <div 
//             className="bg-blue-600 h-full transition-all duration-300" 
//             style={{ width: `${(currentStep / 5) * 100}%` }}
//           />
//         </div>
//       </div>

//       <div className="min-h-[400px]">
//         {currentStep === 1 && (
//           <>
//             <InputField label="Agency ID" name="Agency_ID" isSelect options={["AG-0003"]} />
//             <InputField label="Technician" name="Technician" isSelect options={["TC20230022"]} />
//             <InputField label="Helper First Name" name="Helper_First_Name" />
//             <InputField label="Helper Last Name" name="Helper_Last_Name" />
//             <InputField label="Service Request Status" name="Service_Request_Status" isSelect options={["Open", "Closed"]} />
//             <InputField label="Number 1" name="Number_1" type="number" />
//             <InputField label="Service Request Name" name="Service_Request_Name" />
//             <InputField label="Service Request Type" name="Service_Request_Type" isSelect options={["Technical"]} />
//             <InputField label="Service Request Sub Type" name="Service_Request_Sub_Type" isSelect options={["Breakdown", "Dismantling"]} />
//             <InputField label="Escalation" name="Escalation" isSelect options={["Normal", "High"]} />
//             <InputField label="Severity" name="Severity" isSelect options={["Normal", "Critical"]} />
//           </>
//         )}

//         {currentStep === 2 && (
//           <InputField label="Contact Name" name="Contact_Name" isSelect options={["Nisha Mohandas"]} />
//         )}

//         {currentStep === 3 && (
//           <InputField label="Product Code" name="Product_Code" isSelect options={["VOL202300099"]} />
//         )}

//         {currentStep === 4 && (
//           <>
//             <InputField label="Appointment Date and Time" name="Appointment_Date_and_Time" type="datetime-local" />
//             <InputField label="Actual Start Date & Time" name="Actual_Start_Date_and_Time" type="datetime-local" />
//             <InputField label="Actual End Date and Time" name="Actual_End_Date_and_Time" type="datetime-local" />
//             <InputField label="Payment Status" name="Payment_Status" isSelect options={["Paid", "Pending"]} />
//             <InputField label="Visit Status" name="Visit_Status" isSelect options={["Completed", "Cancelled"]} />
//           </>
//         )}

//         {currentStep === 5 && (
//           <>
//             <InputField label="Fault Group" name="Fault_Group" isSelect options={["Coil", "Accessories"]} />
//             <InputField label="Action Taken" name="Action_Taken" isSelect options={["Part Replaced", "Cleaned"]} />
//             <InputField label="Product Service Name" name="Product_Service_Name" isSelect options={["Air Filters"]} />
//             <InputField label="Description" name="Description" />
//           </>
//         )}
//       </div>

//       <div className="flex justify-between items-center mt-12 pt-6 border-t border-slate-100">
//         <div>
//           {currentStep > 1 && (
//             <button 
//               onClick={() => setCurrentStep(s => s - 1)}
//               className="text-blue-600 font-bold px-6 py-2 rounded-full hover:bg-blue-50 transition-colors"
//             >
//               &lt; Previous
//             </button>
//           )}
//         </div>
//         <div className="flex gap-4">
//           <button 
//             onClick={() => navigate(-1)}
//             className="text-blue-600 font-bold px-8 py-2 rounded-full hover:bg-blue-50 transition-colors"
//           >
//             Cancel
//           </button>
//           {currentStep < 5 ? (
//             <button 
//               onClick={() => setCurrentStep(s => s + 1)}
//               className="bg-blue-600 text-white font-bold px-10 py-2 rounded-full shadow-lg shadow-blue-200 hover:bg-blue-700"
//             >
//               Next
//             </button>
//           ) : (
//             <button 
//               onClick={handleUpdate}
//               className="bg-blue-600 text-white font-bold px-10 py-2 rounded-full shadow-lg shadow-blue-200 hover:bg-blue-700"
//             >
//               Update
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ServiceRequestEdit;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ServiceRequestEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(true);
  
  // Options for API-driven dropdowns
  const [options, setOptions] = useState({
    agencies: [],
    technicians: [],
    purchasedProducts: [],
    contacts: [],
    serviceProducts: []
  });

  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const auth = window.catalyst.auth;
        const { access_token } = await auth.generateAuthToken();
        const headers = { Authorization: access_token };
        const baseUrl = "https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service";

        const endpoints = {
          main: `${baseUrl}/service_request/${id}`,
          agencies: `${baseUrl}/agency_wise_stock?fields=Agency&page=1&per_page=50`,
          techs: `${baseUrl}/technician?fields=Name&page=1&per_page=50`,
          purchased: `${baseUrl}/purchased_products?fields=Name&page=1&per_page=50`,
          contacts: `${baseUrl}/contacts?fields=First_Name,Last_Name&page=1&per_page=50`,
          products: `${baseUrl}/products?fields=Product_Name&page=1&per_page=50`
        };

        const responses = await Promise.all(Object.values(endpoints).map(url => fetch(url, { headers })));
        const [mainJ, agencyJ, techJ, purchasedJ, contactJ, productJ] = await Promise.all(responses.map(r => r.json()));

        // Process Unique Agencies
        const uniqueAgencies = Array.from(new Set(agencyJ.data.map(item => item.Agency.id)))
          .map(id => agencyJ.data.find(item => item.Agency.id === id).Agency);

        setOptions({
          agencies: uniqueAgencies,
          technicians: techJ.data,
          purchasedProducts: purchasedJ.data,
          contacts: contactJ.data.map(c => ({ id: c.id, fullName: `${c.First_Name} ${c.Last_Name}`.trim() })),
          serviceProducts: productJ.data
        });

        const data = mainJ.data[0];
        setFormData({
          // Step 1: Basic Info
          Agency_ID: data.Agency?.id || '',
          Technician: data.Technician?.id || '',
          Helper_First_Name: data.Helper_First_Name || '',
          Helper_Last_Name: data.Helper_Last_Name || '',
          Service_Request_Status: data.Service_Request_Status || '',
          Service_Request_Name: data.Service_Request_Name_1 || '',
          Service_Request_Type: data.Service_Request_Type || '',
          Service_Request_Sub_Type: data.Service_Request_Sub_Type || '',
          Escalation: data.Escalation || 'Normal',
          Severity: data.Severity || 'Low',
          
          // Step 2: Customer
          Contact_Name: data.Contact_Name?.id || '',
          
          // Step 3: Product
          Product_Code: data.Product_Code?.id || '',
          
          // Step 4: Visit Info
          Appointment_Date_and_Time: data.Appointment_Date_and_Time || '',
          Actual_Start_Date_and_Time: data.Actual_Start_Date_and_Time || '',
          Actual_End_Date_and_Time: data.Actual_End_Date_and_Time || '',
          Payment_Status: data.Payment_Status || '',
          Visit_Status: data.Visit_Status || '',
          
          // Step 5: Resolution
          Fault_Group: data.Fault_Group || '',
          Action_Taken: data.Action_Taken || '',
          Product_Service_Name: data.Product_Service_Name?.id || '',
          Description: data.Description || ''
        });

      } catch (err) {
        console.error("Initialization Failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (loading) return <div className="p-20 text-center text-blue-600 font-bold animate-pulse">Loading all fields and API data...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-slate-50 min-h-screen">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        
        {/* Header */}
        <div className="p-8 bg-white border-b border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Edit Service Request</h1>
            <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase">Step {currentStep} / 5</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-blue-600 h-full transition-all duration-500" style={{ width: `${(currentStep / 5) * 100}%` }} />
          </div>
        </div>

        <div className="p-8 min-h-[500px]">
          
          {/* STEP 1: SERVICE INFORMATION */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Dropdown label="Agency" name="Agency_ID" value={formData.Agency_ID} options={options.agencies} labelKey="name" onChange={handleInputChange} />
                <Dropdown label="Technician" name="Technician" value={formData.Technician} options={options.technicians} labelKey="Name" onChange={handleInputChange} />
                <Input label="Helper First Name" name="Helper_First_Name" value={formData.Helper_First_Name} onChange={handleInputChange} />
                <Input label="Helper Last Name" name="Helper_Last_Name" value={formData.Helper_Last_Name} onChange={handleInputChange} />
                <Select label="Status" name="Service_Request_Status" value={formData.Service_Request_Status} onChange={handleInputChange} options={['Open', 'In Progress', 'On Hold', 'Completed', 'Closed']} />
                <Input label="SR Name" name="Service_Request_Name" value={formData.Service_Request_Name} onChange={handleInputChange} />
                <Select label="Type" name="Service_Request_Type" value={formData.Service_Request_Type} onChange={handleInputChange} options={['Repair', 'Installation', 'Maintenance']} />
                <Select label="Escalation" name="Escalation" value={formData.Escalation} onChange={handleInputChange} options={['Normal', 'Medium', 'High']} />
              </div>
            </div>
          )}

          {/* STEP 2: CUSTOMER INFORMATION */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in slide-in-from-right-5">
              <Dropdown label="Contact Name" name="Contact_Name" value={formData.Contact_Name} options={options.contacts} labelKey="fullName" onChange={handleInputChange} />
              <p className="text-slate-400 text-sm italic">Additional contact details are pulled automatically based on the selection above.</p>
            </div>
          )}

          {/* STEP 3: PRODUCT INFORMATION */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in slide-in-from-right-5">
              <Dropdown label="Purchased Product Code" name="Product_Code" value={formData.Product_Code} options={options.purchasedProducts} labelKey="Name" onChange={handleInputChange} />
            </div>
          )}

          {/* STEP 4: VISIT INFORMATION */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in slide-in-from-right-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Appointment Time" name="Appointment_Date_and_Time" type="datetime-local" value={formData.Appointment_Date_and_Time} onChange={handleInputChange} />
                <Input label="Actual Start" name="Actual_Start_Date_and_Time" type="datetime-local" value={formData.Actual_Start_Date_and_Time} onChange={handleInputChange} />
                <Input label="Actual End" name="Actual_End_Date_and_Time" type="datetime-local" value={formData.Actual_End_Date_and_Time} onChange={handleInputChange} />
                <Select label="Payment Status" name="Payment_Status" value={formData.Payment_Status} onChange={handleInputChange} options={['Pending', 'Paid', 'Partial']} />
                <Select label="Visit Status" name="Visit_Status" value={formData.Visit_Status} onChange={handleInputChange} options={['Scheduled', 'Arrived', 'In-Progress', 'Departed']} />
              </div>
            </div>
          )}

          {/* STEP 5: RESOLUTION */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-in slide-in-from-right-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Fault Group" name="Fault_Group" value={formData.Fault_Group} onChange={handleInputChange} />
                <Input label="Action Taken" name="Action_Taken" value={formData.Action_Taken} onChange={handleInputChange} />
              </div>
              <Dropdown label="Product/Service Used" name="Product_Service_Name" value={formData.Product_Service_Name} options={options.serviceProducts} labelKey="Product_Name" onChange={handleInputChange} />
              <div>
                <label className="block text-slate-500 text-xs font-bold mb-2 uppercase tracking-widest">Final Description</label>
                <textarea name="Description" value={formData.Description} onChange={handleInputChange} className="w-full p-4 border border-slate-200 rounded-2xl bg-slate-50 focus:ring-4 focus:ring-blue-100 outline-none h-32 transition-all" />
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
          <button onClick={() => setCurrentStep(s => s - 1)} disabled={currentStep === 1} className="text-slate-400 font-bold hover:text-blue-600 disabled:opacity-0 transition-all">Back</button>
          <div className="flex gap-4">
             <button onClick={() => navigate(-1)} className="text-slate-500 font-bold px-4">Cancel</button>
             <button 
                onClick={() => currentStep < 5 ? setCurrentStep(s => s + 1) : console.log("Updating Record...", formData)}
                className="bg-blue-600 text-white px-10 py-3 rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition-all transform active:scale-95"
              >
                {currentStep === 5 ? 'Save Changes' : 'Next Step'}
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub-components for Form Clarity ---

const Input = ({ label, name, value, onChange, type = "text" }) => (
  <div className="w-full">
    <label className="block text-slate-500 text-xs font-bold mb-2 uppercase tracking-widest">{label}</label>
    <input type={type} name={name} value={value} onChange={onChange} className="w-full p-4 border border-slate-200 rounded-2xl bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all" />
  </div>
);

const Select = ({ label, name, value, onChange, options }) => (
  <div className="w-full">
    <label className="block text-slate-500 text-xs font-bold mb-2 uppercase tracking-widest">{label}</label>
    <select name={name} value={value} onChange={onChange} className="w-full p-4 border border-slate-200 rounded-2xl bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none appearance-none transition-all">
      <option value="">Select {label}</option>
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

const Dropdown = ({ label, name, value, options, labelKey, onChange }) => (
  <div className="w-full">
    <label className="block text-slate-500 text-xs font-bold mb-2 uppercase tracking-widest">{label}</label>
    <select name={name} value={value} onChange={onChange} className="w-full p-4 border border-slate-200 rounded-2xl bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none appearance-none transition-all">
      <option value="">Select {label}</option>
      {options.map(opt => <option key={opt.id} value={opt.id}>{opt[labelKey]}</option>)}
    </select>
  </div>
);

export default ServiceRequestEdit;