import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronDown, Plus, Minus, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FormField = ({ label, placeholder, isSelect = false, options = [], value, onChange }) => (
  <div className="mb-4">
    <label className="block text-[13px] font-bold text-slate-800 mb-2">{label}</label>
    <div className="relative">
      {isSelect ? (
        <>
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-600 text-sm outline-none appearance-none cursor-pointer focus:border-blue-500"
          >
            <option value="">{placeholder || 'Select'}</option>
            {options.map((opt, idx) => (
              <option key={idx} value={opt.id || opt.value || opt}>
                {opt.label || opt.text || opt}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={16} />
        </>
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-600 text-sm outline-none focus:border-blue-500 placeholder:text-slate-300"
        />
      )}
    </div>
  </div>
);

export const WorkOrderModal = ({ currentStep, onClose, onStepChange }) => {
  const [apiData, setApiData] = useState({
    serviceRequests: [],
    agencies: [],
    products: [],
    estimations: []
  });

  const [isLoading, setIsLoading] = useState(false);
  const [quotedItems, setQuotedItems] = useState([{ productId: '', quantity: 0 }]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    subject: '',
    customerNo: '',
    estimationName: '', // This will store the ID
    serviceRequestId: '', // This will store the ID
    agency: '', // This will store the ID
    pending: '',
    billingStreet: '',
    billingCity: '',
    billingState: '',
    billingCode: '',
    billingCountry: '',
    shippingStreet: '',
    shippingCity: '',
    shippingState: '',
    shippingCode: '',
    shippingCountry: ''
  });

  const stepNumber = currentStep === 'step1' ? 1 : currentStep === 'step2' ? 2 : 3;

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const baseUrl = "https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service";
        const authResponse = await window.catalyst.auth.generateAuthToken();
        const headers = { Authorization: `${authResponse.access_token}`, "Content-Type": "application/json" };

        const [res1, res2, res4, res6] = await Promise.all([
          fetch(`${baseUrl}/service_request?fields=Name&page=1&per_page=50`, { headers }).then(r => r.json()),
          fetch(`${baseUrl}/agency_wise_stock?fields=Agency&page=1&per_page=50`, { headers }).then(r => r.json()),
          fetch(`${baseUrl}/products?fields=Product_Name&page=1&per_page=50`, { headers }).then(r => r.json()),
          fetch(`${baseUrl}/estimations?fields=Subject&page=1&per_page=50`, { headers }).then(r => r.json()),
        ]);

        setApiData({
          serviceRequests: res1.data || [],
          agencies: res2.data || [],
          products: res4.data || [],
          estimations: res6.data || []
        });
      } catch (e) { console.error("Fetch error", e); }
    };
    fetchAllData();
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const baseUrl = "https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/work_order/";
      const authResponse = await window.catalyst.auth.generateAuthToken();
      
      const payload = {
        data: [{
          Subject: formData.subject,
          Customer_No: formData.customerNo,
          Quote_Name: { id: formData.estimationName },
          Service_Request_ID: { id: formData.serviceRequestId },
          Agency: { id: formData.agency },
          Pending: formData.pending,
          Billing_Street: formData.billingStreet,
          Billing_City: formData.billingCity,
          Billing_State: formData.billingState,
          Billing_Code: formData.billingCode,
          Billing_Country: formData.billingCountry,
          Shipping_Street: formData.shippingStreet,
          Shipping_City: formData.shippingCity,
          Shipping_State: formData.shippingState,
          Shipping_Code: formData.shippingCode,
          Shipping_Country: formData.shippingCountry,
          Ordered_Items: quotedItems.map(item => ({
            Product_Name: { id: item.productId },
            Quantity: Number(item.quantity)
          }))
        }]
      };

      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: { 
          Authorization: `${authResponse.access_token}`, 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok) {
        navigate(`/work-order/${result.data[0].details.id}`);
      } else {
        alert("Failed to create Work Order");
      }
    } catch (error) {
      console.error("Submission error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddItem = () => setQuotedItems([...quotedItems, { productId: '', quantity: 0 }]);
  const handleRemoveItem = (index) => quotedItems.length > 1 && setQuotedItems(quotedItems.filter((_, i) => i !== index));
  const updateItem = (index, field, value) => {
    const newItems = [...quotedItems];
    newItems[index][field] = value;
    setQuotedItems(newItems);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/10 backdrop-blur-[6px]">
      <div className="bg-white w-full max-w-[580px] rounded-[28px] shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-10 pt-10 pb-2">
          <div className="flex justify-between items-start">
            <h2 className="text-[20px] font-bold text-slate-800">
              {currentStep === 'step1' && 'Work Order Information'}
              {currentStep === 'step2' && 'Address Information'}
              {currentStep === 'step3' && 'Quoted Items'}
            </h2>
            <button onClick={onClose} className="text-slate-300"><X size={24} /></button>
          </div>
          <div className="w-full bg-slate-100 h-1 mt-6 rounded-full relative">
            <div className="absolute left-0 top-0 h-full bg-[#00579c] transition-all" style={{ width: `${(stepNumber / 3) * 100}%` }} />
          </div>
        </div>

        <div className="px-10 py-6 max-h-[55vh] overflow-y-auto">
          {currentStep === 'step1' && (
            <>
              <FormField label="Subject" placeholder="Subject" value={formData.subject} onChange={(v) => setFormData({ ...formData, subject: v })} />
              <FormField label="Customer No" placeholder="Customer No" value={formData.customerNo} onChange={(v) => setFormData({ ...formData, customerNo: v })} />
              <FormField
                label="Estimation Name"
                isSelect
                options={apiData.estimations.map(e => ({ label: e.Subject, id: e.id }))}
                value={formData.estimationName}
                onChange={(v) => setFormData({ ...formData, estimationName: v })}
              />
              <FormField
                label="Service Request ID"
                isSelect
                options={apiData.serviceRequests.map(s => ({ label: s.Name, id: s.id }))}
                value={formData.serviceRequestId}
                onChange={(v) => setFormData({ ...formData, serviceRequestId: v })}
              />
              <FormField
                label="Agency"
                isSelect
                options={apiData.agencies.map(a => ({ label: a.Agency.name, id: a.Agency.id }))}
                value={formData.agency}
                onChange={(v) => setFormData({ ...formData, agency: v })}
              />
              <FormField label="Pending" placeholder="Pending" value={formData.pending} onChange={(v) => setFormData({ ...formData, pending: v })} />
            </>
          )}

          {currentStep === 'step2' && (
            <div className="space-y-2">
              <FormField label="Billing Street" placeholder="Billing street" value={formData.billingStreet} onChange={(v) => setFormData({ ...formData, billingStreet: v })} />
              <FormField label="Billing City" placeholder="Billing city" value={formData.billingCity} onChange={(v) => setFormData({ ...formData, billingCity: v })} />
              <FormField label="Billing State" placeholder="Billing state" value={formData.billingState} onChange={(v) => setFormData({ ...formData, billingState: v })} />
              <FormField label="Billing Code" placeholder="Billing code" value={formData.billingCode} onChange={(v) => setFormData({ ...formData, billingCode: v })} />
              <FormField label="Billing Country" placeholder="Billing country" value={formData.billingCountry} onChange={(v) => setFormData({ ...formData, billingCountry: v })} />
              <div className="pt-4 border-t border-slate-50 mt-4">
                <FormField label="Shipping Street" placeholder="Shipping street" value={formData.shippingStreet} onChange={(v) => setFormData({ ...formData, shippingStreet: v })} />
                <FormField label="Shipping City" placeholder="Shipping city" value={formData.shippingCity} onChange={(v) => setFormData({ ...formData, shippingCity: v })} />
                <FormField label="Shipping State" placeholder="Shipping state" value={formData.shippingState} onChange={(v) => setFormData({ ...formData, shippingState: v })} />
                <FormField label="Shipping Code" placeholder="Shipping code" value={formData.shippingCode} onChange={(v) => setFormData({ ...formData, shippingCode: v })} />
                <FormField label="Shipping Country" placeholder="Shipping country" value={formData.shippingCountry} onChange={(v) => setFormData({ ...formData, shippingCountry: v })} />
              </div>
            </div>
          )}

          {currentStep === 'step3' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-800 text-sm">Add Ordered</h3>
                <button onClick={handleAddItem} className="flex items-center gap-1 bg-[#00579c] text-white px-3 py-1.5 rounded-full text-xs font-bold">
                  <Plus size={14} /> Add
                </button>
              </div>
              {quotedItems.map((item, index) => (
                <div key={index} className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3 border border-slate-100 mb-3">
                  <div className="flex-grow relative">
                    <select
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 text-sm outline-none appearance-none"
                      value={item.productId}
                      onChange={(e) => updateItem(index, 'productId', e.target.value)}
                    >
                      <option value="">Select Product</option>
                      {apiData.products.map((p, i) => (
                        <option key={i} value={p.id}>{p.Product_Name}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={14} />
                  </div>
                  <div className="w-24">
                    <input type="number" value={item.quantity} onChange={(e) => updateItem(index, 'quantity', e.target.value)} className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-center text-sm" />
                  </div>
                  <button onClick={() => handleRemoveItem(index)} className="text-slate-400 hover:text-red-500"><Minus size={20} /></button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Navigation Footer */}
        <div className="px-10 py-8 flex justify-between items-center bg-white border-t border-slate-50">
          <button onClick={() => onStepChange(stepNumber === 2 ? 'step1' : 'step2')} className={`${stepNumber === 1 ? 'invisible' : ''} flex items-center gap-1.5 text-[#00579c] text-sm font-bold`}>
            <ChevronLeft size={16} /> Previous
          </button>
          <div className="flex gap-6 items-center">
            <button onClick={onClose} className="text-[#00579c] text-sm font-bold" disabled={isLoading}>Cancel</button>
            <button
              onClick={() => stepNumber < 3 ? onStepChange(`step${stepNumber + 1}`) : handleSubmit()}
              disabled={isLoading}
              className="bg-[#00579c] text-white px-10 py-2.5 rounded-full text-sm font-bold flex items-center gap-2"
            >
              {isLoading && <Loader2 size={16} className="animate-spin" />}
              {currentStep === 'step3' ? 'Create' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};