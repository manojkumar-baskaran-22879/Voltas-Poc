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
          // Appointment_Date_and_Time: data.Appointment_Date_and_Time || '',
          // Actual_Start_Date_and_Time: data.Actual_Start_Date_and_Time || '',
          // Actual_End_Date_and_Time: data.Actual_End_Date_and_Time || '',

          Appointment_Date_and_Time: formatDateTimeForInput(data.Appointment_Date_and_Time),
          Actual_Start_Date_and_Time: formatDateTimeForInput(data.Actual_Start_Date_and_Time),
          Actual_End_Date_and_Time: formatDateTimeForInput(data.Actual_End_Date_and_Time),
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

  const handleSubmit = async () => {
  setLoading(true);
  try {
    const auth = window.catalyst.auth;
    const { access_token } = await auth.generateAuthToken();

    // Construct the payload based on your sample
    const payload = {
      data: [{
        id: id, // The record ID from useParams
        Agency: formData.Agency_ID ? { id: formData.Agency_ID } : null,
        Technician: formData.Technician ? { id: formData.Technician } : null,
        Contact_Name: formData.Contact_Name ? { id: formData.Contact_Name } : null,
        Product_Code: formData.Product_Code ? { id: formData.Product_Code } : null,
        Product_Service_Name: formData.Product_Service_Name ? { id: formData.Product_Service_Name } : {},
        
        Helper_First_Name: formData.Helper_First_Name,
        Helper_Last_Name: formData.Helper_Last_Name,
        Service_Request_Status: formData.Service_Request_Status,
        Service_Request_Name_1: formData.Service_Request_Name,
        Service_Request_Type: formData.Service_Request_Type,
        Service_Request_Sub_Type: formData.Service_Request_Sub_Type,
        Escalation: formData.Escalation,
        Severity: formData.Severity,
        
        // Formatting dates back (ensuring they aren't "undefined:00")
        Appointment_Date_and_Time: formData.Appointment_Date_and_Time ? `${formData.Appointment_Date_and_Time}:00` : null,
        Actual_Start_Date_and_Time: formData.Actual_Start_Date_and_Time ? `${formData.Actual_Start_Date_and_Time}:00` : null,
        Actual_End_Date_and_Time: formData.Actual_End_Date_and_Time ? `${formData.Actual_End_Date_and_Time}:00` : null,
        
        Payment_Status: formData.Payment_Status,
        Visit_Status: formData.Visit_Status,
        Fault_Group: formData.Fault_Group,
        Action_Taken: formData.Action_Taken,
        Description: formData.Description
      }]
    };

    const response = await fetch(
      `https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/service_request/${id}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': access_token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    );

    if (response.ok) {
      // Navigate to the view page
      navigate(`/service-request/${id}`);
    } else {
      const errorData = await response.json();
      console.error("Update Failed:", errorData);
      alert("Failed to update the record. Check console for details.");
    }
  } catch (err) {
    console.error("Critical Error during update:", err);
  } finally {
    setLoading(false);
  }
};

  // if (loading) return <div className="p-20 text-center text-blue-600 font-bold animate-pulse">Loading all fields and API data...</div>;

  // if (loading) {
  //   return (
  //     <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50/80 backdrop-blur-sm">
  //       {/* Animated Spinner */}
  //       <div className="relative w-20 h-20">
  //         <div className="absolute top-0 left-0 w-full h-full border-8 border-slate-200 rounded-full"></div>
  //         <div className="absolute top-0 left-0 w-full h-full border-8 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
  //       </div>
        
  //       {/* Loading Text */}
  //       {/* <p className="mt-6 text-slate-600 font-bold tracking-widest uppercase text-xs animate-pulse">
  //         Synchronizing Data...
  //       </p> */}
  //     </div>
  //   );
  // }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-600 font-medium">Loading service request details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-slate-50 min-h-screen">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        
        {/* Header */}
        <div className="p-8 bg-white border-b border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Edit Service Request</h1>
            <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase">Step {currentStep}/5</span>
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
                <Select label="SR Type" name="Service_Request_Type" value={formData.Service_Request_Type} onChange={handleInputChange} options={['Technical', 'Query']} />
                <Select label="SR Sub Type" name="Service_Request_Sub_Type" value={formData.Service_Request_Sub_Type} onChange={handleInputChange} options={['Repair', 'Installation', 'Maintenance']} />
                <Select label="Escalation" name="Escalation" value={formData.Escalation} onChange={handleInputChange} options={['Normal', 'Medium', 'High']} />
                <Select label="Severity" name="Severity" value={formData.Severity} onChange={handleInputChange} options={['Normal', 'Low', 'High']} />
              </div>
            </div>
          )}

          {/* STEP 2: CUSTOMER INFORMATION */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in slide-in-from-right-5">
              <Dropdown label="Contact Name" name="Contact_Name" value={formData.Contact_Name} options={options.contacts} labelKey="fullName" onChange={handleInputChange} />
              {/* <p className="text-slate-400 text-sm italic">Additional contact details are pulled automatically based on the selection above.</p> */}
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
                <Select label="Payment Status" name="Payment_Status" value={formData.Payment_Status} onChange={handleInputChange} options={['Paid', 'Not Paid']} />
                <Select label="Visit Status" name="Visit_Status" value={formData.Visit_Status} onChange={handleInputChange} options={['Scheduled', 'Un Scheduled', 'Completed']} />
              </div>
            </div>
          )}

          {/* STEP 5: RESOLUTION */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-in slide-in-from-right-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* <Input label="Fault Group" name="Fault_Group" value={formData.Fault_Group} onChange={handleInputChange} /> */}
                <Select label="Fault Group" name="Fault_Group" value={formData.Fault_Group} onChange={handleInputChange} options={['Accessories', 'Workshop', 'Sensor', 'AMC', 'Coil', 'Condensor Coil', 'Service']} />
                <Select label="Action Taken" name="Action_Taken" value={formData.Action_Taken} onChange={handleInputChange} options={['Part Replaced', 'Pair Repaired', 'Full Repaired']} />
              </div>
              <Dropdown label="Product Service Name" name="Product_Service_Name" value={formData.Product_Service_Name} options={options.serviceProducts} labelKey="Product_Name" onChange={handleInputChange} />
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
             {/* <button 
                onClick={() => currentStep < 5 ? setCurrentStep(s => s + 1) : console.log("Updating Record...", formData)}
                className="bg-blue-600 text-white px-10 py-3 rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition-all transform active:scale-95"
              >
                {currentStep === 5 ? 'Save Changes' : 'Next'}
              </button> */}
              <button 
                onClick={() => currentStep < 5 ? setCurrentStep(s => s + 1) : handleSubmit()}
                className="bg-blue-600 text-white px-10 py-3 rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition-all transform active:scale-95"
              >
                {currentStep === 5 ? 'Save' : 'Next'}
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

// const Dropdown = ({ label, name, value, options, labelKey, onChange }) => (
//   <div className="w-full">
//     <label className="block text-slate-500 text-xs font-bold mb-2 uppercase tracking-widest">{label}</label>
//     <select name={name} value={value} onChange={onChange} className="w-full p-4 border border-slate-200 rounded-2xl bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none appearance-none transition-all">
//       <option value="">Select {label}</option>
//       {options.map(opt => <option key={opt.id} value={opt.id}>{opt[labelKey]}</option>)}
//     </select>
//   </div>
// );

const Dropdown = ({ label, name, value, options, labelKey, onChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  // Find the label for the currently selected ID
  const selectedOption = options.find(opt => String(opt.id) === String(value));
  const displayValue = selectedOption ? selectedOption[labelKey] : `Select ${label}`;

  const handleSelect = (optionId) => {
    // We simulate a real event object so your handleInputChange works without modification
    onChange({
      target: {
        name: name,
        value: optionId
      }
    });
    setIsOpen(false);
  };

  return (
    <div className="w-full relative">
      <label className="block text-slate-500 text-xs font-bold mb-2 uppercase tracking-widest">
        {label}
      </label>
      
      {/* Trigger Button */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 border border-slate-200 rounded-2xl bg-slate-50 hover:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all cursor-pointer flex justify-between items-center"
      >
        <span className={!selectedOption ? "text-slate-400" : "text-slate-800"}>
          {displayValue}
        </span>
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Overlay to close when clicking outside */}
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
          
          <ul className="absolute z-20 w-full mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl overflow-y-auto max-h-[220px] scrollbar-thin scrollbar-thumb-slate-200">
            {options.length === 0 ? (
              <li className="p-4 text-slate-400 text-sm">No options available</li>
            ) : (
              options.map((opt) => (
                <li 
                  key={opt.id}
                  onClick={() => handleSelect(opt.id)}
                  className="p-4 hover:bg-blue-50 cursor-pointer text-slate-700 text-sm border-b border-slate-50 last:border-none transition-colors"
                >
                  {opt[labelKey]}
                </li>
              ))
            )}
          </ul>
        </>
      )}
    </div>
  );
};

const formatDateTimeForInput = (dateString) => {
  if (!dateString) return '';
  // This takes "2024-01-03T20:00:00+05:30" and returns "2024-01-03T20:00"
  return dateString.split('.')[0].substring(0, 16);
};


export default ServiceRequestEdit;