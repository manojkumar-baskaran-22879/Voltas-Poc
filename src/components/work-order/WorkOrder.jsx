import React, { useState, useEffect } from 'react';
import { WorkOrderModal } from './WorkOrderModal';

const WorkOrder = () => {
  const [view, setView] = useState('list'); 
  const [workOrderData, setWorkOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/work_order?fields=Owner,SO_Number,Contact_Name,Account_Name,Subject&page=1&per_page=200";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const authResponse = await window.catalyst.auth.generateAuthToken();
        const apiResponse = await fetch(API_URL, {
          headers: {
            Authorization: `${authResponse.access_token}`, // Ensure Bearer is prefixed if required by your API
            "Content-Type": "application/json",
          },
          method: 'GET',
        });

        if (!apiResponse.ok) {
          throw new Error(`Error ${apiResponse.status}: ${apiResponse.statusText}`);
        }

        const result = await apiResponse.json();
        setWorkOrderData(result.data || []); 
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative min-h-screen font-sans">
      {/* BACKGROUND CONTENT */}
      <div className={`p-6 bg-slate-50 min-h-screen transition-all duration-500 ${view !== 'list' ? 'blur-[3px] brightness-90 pointer-events-none' : ''}`}>
        <div className="flex justify-between items-center mb-6 px-2">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">Work Order</h2>
          <button 
            onClick={() => setView('step1')}
            className="bg-[#00579c] hover:bg-[#004a85] text-white px-8 py-2 rounded-full text-sm font-bold shadow-md active:scale-95 transition-all"
          >
            Create
          </button>
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="p-10 text-center text-slate-500">Loading work orders...</div>
          ) : error ? (
            <div className="p-10 text-center text-red-500 font-medium">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#f8fafc] text-[#718ebf] text-[11px] font-bold uppercase tracking-widest border-b border-slate-100">
                    <th className="px-6 py-4">Work Order Owner</th>
                    <th className="px-6 py-4">Work Order Number</th>
                    <th className="px-6 py-4">Contact Name</th>
                    <th className="px-6 py-4 underline">Dealer Name</th>
                    <th className="px-6 py-4">Subject</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {workOrderData.map((item) => (
                    <tr key={item.id} className="text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                      {/* Accessing item.Owner.name */}
                      <td className="px-6 py-4">{item.Owner?.name || '-'}</td>
                      
                      <td className="px-6 py-4 text-blue-500 font-medium cursor-pointer hover:underline">
                        {item.SO_Number}
                      </td>
                      
                      {/* Accessing item.Contact_Name.name */}
                      <td className="px-6 py-4">{item.Contact_Name?.name || '-'}</td>
                      
                      {/* Accessing item.Account_Name.name */}
                      <td className="px-6 py-4 italic text-slate-500">
                        {item.Account_Name?.name || '-'}
                      </td>
                      
                      <td className="px-6 py-4">{item.Subject}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* REUSABLE MODAL COMPONENT */}
      {view !== 'list' && (
        <WorkOrderModal 
          currentStep={view} 
          onClose={() => setView('list')} 
          onStepChange={(step) => setView(step)} 
        />
      )}
    </div>
  );
};

export default WorkOrder;