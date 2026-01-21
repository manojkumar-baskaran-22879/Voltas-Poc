import React, { useState, useEffect } from 'react';

const EstimationModal = ({ isOpen, onClose, editData, refreshData }) => {
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

  // Effect to handle Modal Opening and Data Population
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      fetchAllData();
      
      if (editData) {
        // Populate form with existing data for Editing
        setFormData({
          Subject: editData.Subject || '',
          Service_Request_ID: editData.Service_Request_ID?.id || '',
          Agency: editData.Agency?.id || '',
          Quote_Stage: editData.Quote_Stage || 'Draft',
          Team: editData.Team || '',
          Contact_Name: editData.Contact_Name?.id || '',
          Account_Name: editData.Account_Name?.id || '',
          Billing_Street: editData.Billing_Street || '',
          Billing_City: editData.Billing_City || '',
          Billing_State: editData.Billing_State || '',
          Billing_Code: editData.Billing_Code || '',
          Billing_Country: editData.Billing_Country || '',
          Shipping_Street: editData.Shipping_Street || '',
          Shipping_City: editData.Shipping_City || '',
          Shipping_State: editData.Shipping_State || '',
          Shipping_Code: editData.Shipping_Code || '',
          Shipping_Country: editData.Shipping_Country || ''
        });

        // Populate Quoted Items
        if (editData.Quoted_Items && editData.Quoted_Items.length > 0) {
          setQuotedItems(editData.Quoted_Items.map((item, idx) => ({
            id: item.id || Date.now() + idx,
            product_id: item.Product_Name?.id || '',
            qty: item.Quantity || 1
          })));
        }
      } else {
        // Reset for New Estimation
        setFormData({
          Subject: '', Service_Request_ID: '', Agency: '', Quote_Stage: 'Draft',
          Team: '', Contact_Name: '', Account_Name: '',
          Billing_Street: '', Billing_City: '', Billing_State: '', Billing_Code: '', Billing_Country: '',
          Shipping_Street: '', Shipping_City: '', Shipping_State: '', Shipping_Code: '', Shipping_Country: ''
        });
        setQuotedItems([{ id: Date.now(), product_id: '', qty: 1 }]);
      }
    }
  }, [isOpen, editData]);

  const fetchAllData = async () => {
    try {
      const baseUrl = "https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service";
      const authResponse = await window.catalyst.auth.generateAuthToken();
      setToken(authResponse.access_token);

      const headers = { Authorization: `${authResponse.access_token}`, "Content-Type": "application/json" };

      const [res1, res2, res3, res4, res5] = await Promise.all([
        fetch(`${baseUrl}/service_request?fields=Name&page=1&per_page=50`, { headers }).then(r => r.json()),
        fetch(`${baseUrl}/agency_wise_stock?fields=Agency&page=1&per_page=50`, { headers }).then(r => r.json()),
        fetch(`${baseUrl}/contacts?fields=First_Name,Last_Name&page=1&per_page=50`, { headers }).then(r => r.json()),
        fetch(`${baseUrl}/products?fields=Product_Name&page=1&per_page=50`, { headers }).then(r => r.json()),
        fetch(`${baseUrl}/dealers?fields=Account_Name&page=1&per_page=50`, { headers }).then(r => r.json()),
      ]);

      setApiData({
        serviceRequests: res1.data || [],
        agencies: (res2.data || []).map(a => ({ ...a, id: String(a.id) })),
        contacts: res3.data || [], 
        products: res4.data || [], 
        dealers: res5.data || []
      });
    } catch (e) { console.error("Fetch error", e); }
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    
    const payload = {
      data: [{
        ...formData,
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
          ...(editData ? { id: item.id } : { id: index + 1 }), // Preserve ID if editing
          Product_Name: {
            id: item.product_id,
            name: apiData.products.find(p => p.id === item.product_id)?.Product_Name
          },
          Quantity: parseInt(item.qty)
        }))
      }]
    };

    try {
      const method = editData ? 'PUT' : 'POST';
      const url = editData 
        ? `https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/estimations/${editData.id}`
        : `https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/estimations`;

      const response = await fetch(url, {
        method: method,
        headers: { Authorization: `${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();

      if (result.status === "success" || (result.data && result.data[0]?.status === "success")) {
        //alert(editData ? "Estimation Updated Successfully!" : "Estimation Created Successfully!");
        if (refreshData) refreshData();
        onClose();
      }
    } catch (error) {
      console.error("Submission error:", error);
      //alert("Error saving estimation");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const inputClass = "w-full p-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all";
  const selectClass = "w-full p-2.5 border border-slate-200 rounded-xl text-sm bg-white text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-[600px] rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header & Progress */}
        <div className="pt-6 px-6 border-b bg-slate-50/50">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Step {step} of 3</p>
              <h3 className="text-xl font-bold text-slate-800">{editData ? 'Edit' : 'Create'}</h3>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
          </div>
          <div className="w-full bg-slate-200 h-1.5 rounded-full mb-4">
            <div className="bg-blue-600 h-full rounded-full transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }}></div>
          </div>
        </div>

        {/* Scrollable Form */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Subject</label>
                <input type="text" value={formData.Subject} className={inputClass} onChange={e => setFormData({...formData, Subject: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Service Request</label>
                  <select value={formData.Service_Request_ID} className={selectClass} onChange={e => setFormData({...formData, Service_Request_ID: e.target.value})}>
                    <option value="">Select Request...</option>
                    {apiData.serviceRequests.map(r => <option key={r.id} value={r.id}>{r.Name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Agency</label>
                  <select value={formData.Agency} className={selectClass} onChange={e => setFormData({...formData, Agency: e.target.value})}>
                    <option value="">Select Agency...</option>
                    {apiData.agencies.map(a => <option key={String(a.Agency.id)} value={String(a.Agency.id)}>{a.Agency?.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Contact</label>
                  <select value={formData.Contact_Name} className={selectClass} onChange={e => setFormData({...formData, Contact_Name: e.target.value})}>
                    <option value="">Select Contact...</option>
                    {apiData.contacts.map(c => <option key={c.id} value={c.id}>{c.First_Name} {c.Last_Name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Dealer</label>
                  <select value={formData.Account_Name} className={selectClass} onChange={e => setFormData({...formData, Account_Name: e.target.value})}>
                    <option value="">Select Dealer...</option>
                    {apiData.dealers.map(d => <option key={d.id} value={d.id}>{d.Account_Name}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
             <div className="grid grid-cols-2 gap-x-4 gap-y-4 animate-in fade-in duration-300">
                {Object.keys(formData).filter(k => k.includes('Billing') || k.includes('Shipping')).map(field => (
                  <div key={field} className={field.includes('Street') ? 'col-span-2' : ''}>
                    <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">{field.replace('_', ' ')}</label>
                    <input type="text" value={formData[field]} className={inputClass} onChange={e => setFormData({...formData, [field]: e.target.value})} />
                  </div>
                ))}
             </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex justify-between items-center border-b pb-2">
                <h4 className="font-bold text-slate-700">Line Items</h4>
                <button onClick={() => setQuotedItems([...quotedItems, {id: Date.now(), product_id: '', qty: 1}])} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-xs font-bold hover:bg-blue-100">+ Add Row</button>
              </div>
              <div className="space-y-3">
                {quotedItems.map((item, idx) => (
                    <div key={item.id} className="flex gap-2 items-center bg-slate-50 p-3 rounded-xl border border-slate-100 group">
                        <div className="flex-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Product</label>
                            <select value={item.product_id} className={selectClass} onChange={e => {
                                const newItems = [...quotedItems];
                                newItems[idx].product_id = e.target.value;
                                setQuotedItems(newItems);
                            }}>
                                <option value="">Select product...</option>
                                {apiData.products.map(p => <option key={p.id} value={p.id}>{p.Product_Name}</option>)}
                            </select>
                        </div>
                        <div className="w-24">
                            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Qty</label>
                            <input type="number" value={item.qty} className={inputClass} onChange={e => {
                                const newItems = [...quotedItems];
                                newItems[idx].qty = e.target.value;
                                setQuotedItems(newItems);
                            }} />
                        </div>
                        <button onClick={() => setQuotedItems(quotedItems.filter(i => i.id !== item.id))} className="mt-5 p-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">&times;</button>
                    </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-slate-50 flex justify-between items-center">
          <button onClick={() => step > 1 && setStep(step - 1)} className={`text-slate-500 font-bold text-sm ${step === 1 ? 'invisible' : ''}`}>Back</button>
          <div className="flex gap-3">
            <button onClick={onClose} className="px-4 text-slate-400 font-bold">Cancel</button>
            <button 
              onClick={() => step < 3 ? setStep(step + 1) : handleFinalSubmit()}
              disabled={isSubmitting}
              className="bg-[#0066b2] text-white px-8 py-2.5 rounded-full font-bold disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : step === 3 ? (editData ? "Update" : "Create") : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimationModal;