import React, { useState, useEffect } from 'react';
import { WorkOrderModal } from './WorkOrderModal';
import { WorkOrderDetails } from './WorkOrderDetails';
import { useNavigate } from 'react-router-dom';

const WorkOrder = () => {
    const [view, setView] = useState('list'); 
    const [workOrderData, setWorkOrderData] = useState([]);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const API_URL = "https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/work_order?fields=Owner,SO_Number,Contact_Name,Account_Name,Subject&page=1&per_page=200";

    useEffect(() => {
        fetchListData();
    }, []);

    const fetchListData = async () => {
        try {
            setIsLoading(true);
            const authResponse = await window.catalyst.auth.generateAuthToken();
            const apiResponse = await fetch(API_URL, {
                headers: {
                    Authorization: `${authResponse.access_token}`,
                    "Content-Type": "application/json",
                },
                method: 'GET',
            });

            if (!apiResponse.ok) throw new Error(`Error ${apiResponse.status}: Failed to fetch work orders`);
            const result = await apiResponse.json();
            setWorkOrderData(result.data || []); 
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOrderClick = (id) => {
        navigate(`/work-order/${id}`);
        // setSelectedOrderId(id);
        // setView('details');
    };

    const truncateText = (name) => {
        if (!name) return "-";
        return name.length > 25 ? `${name.substring(0, 25)}...` : name;
    };

    // if (view === 'details') {
    //     return <WorkOrderDetails orderId={selectedOrderId} onBack={() => setView('list')} />;
    // }

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <div className="w-10 h-10 border-2 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-3"></div>
                <p className="text-slate-500 text-sm font-medium tracking-tight">Loading work orders...</p>
            </div>
        );
    }

    return (
        <div className="px-4 pb-8 bg-slate-50/50 min-h-screen">
            <div className={`transition-all duration-500 ${view !== 'list' ? 'blur-md brightness-90' : ''}`}>
                
                {/* Header Section */}
                <div className="flex justify-between items-center py-4">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Work Orders</h2>
                    </div>
                    <button 
                        onClick={() => setView('step1')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-bold transition-all active:scale-95 shadow-sm focus:outline-none focus:ring-0"
                    >
                        Create
                    </button>
                </div>

                {error ? (
                    <div className="bg-white rounded-xl border border-red-100 p-20 text-center shadow-sm">
                        <div className="text-red-500 font-bold text-lg mb-2">Error</div>
                        <p className="text-slate-500 text-sm">{error}</p>
                        <button 
                            onClick={fetchListData}
                            className="mt-6 text-blue-600 font-bold text-sm underline hover:text-blue-800"
                        >
                            Try Again
                        </button>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200">
                                        <th className="px-6 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide">Work Order Owner</th>
                                        <th className="px-6 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide">Work Order Number</th>
                                        <th className="px-6 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide">Contact Name</th>
                                        <th className="px-6 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide">Dealer Name</th>
                                        <th className="px-6 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide">Subject</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {workOrderData.length > 0 ? (
                                        workOrderData.map((item, index) => (
                                            <tr key={item.id || index} className="hover:bg-slate-50/80 transition-colors group">
                                                <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-slate-900">
                                                    {item.Owner?.name || "-"}
                                                </td>
                                                <td className="px-6 py-5 whitespace-nowrap">                    
                                                    <button 
                                                        onClick={() => handleOrderClick(item.id)}
                                                        className="text-blue-600 font-bold text-sm hover:text-blue-800 transition-colors duration-200 focus:outline-none focus:ring-0"
                                                    >
                                                        {item.SO_Number || '-'}
                                                    </button>
                                                </td>
                                                <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-600 font-medium">
                                                    {item.Contact_Name?.name || '-'}
                                                </td>
                                                <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-700" title={item.Account_Name?.name}>
                                                    {truncateText(item.Account_Name?.name)}
                                                </td>
                                                <td className="px-6 py-5 text-sm text-slate-600 font-medium">
                                                    {item.Subject || '-'}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-10 text-center text-slate-400 text-sm">
                                                No work orders found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* MODAL OVERLAY */}
            {view !== 'list' && view !== 'details' && (
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