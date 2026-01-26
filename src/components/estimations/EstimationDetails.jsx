import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Edit2, Loader2, Info, MapPin, Box } from 'lucide-react';
import EstimationModal from './EstimationModal';

const EstimationDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // State Management
    const [data, setData] = useState(null);
    const [blueprint, setBlueprint] = useState(null);
    const [loading, setLoading] = useState(true);
    const [transitionLoading, setTransitionLoading] = useState(null);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // API URLs
    const apiUrl = `https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/estimations/${id}`;
    const blueprintUrl = `${apiUrl}/actions/blueprint`;

    const fetchAllData = useCallback(async () => {
        try {
            setLoading(true);
            const tokenResponse = await window.catalyst.auth.generateAuthToken();
            const headers = {
                Authorization: `${tokenResponse.access_token}`,
                "Content-Type": "application/json",
            };

            const [detailsRes, blueprintRes] = await Promise.all([
                fetch(apiUrl, { headers, method: 'GET' }),
                fetch(blueprintUrl, { headers, method: 'GET' })
            ]);

            if (!detailsRes.ok) throw new Error('Failed to fetch estimation details');
            
            const detailsResult = await detailsRes.json();
            setData(detailsResult.data?.[0] || null);

            if (blueprintRes.ok) {
                const blueprintResult = await blueprintRes.json();
                setBlueprint(blueprintResult.blueprint || null);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [apiUrl, blueprintUrl]);

    useEffect(() => {
        if (id) fetchAllData();
    }, [id, fetchAllData]);

    const handleTransition = async (transitionId, transitionName) => {
        try {
            setTransitionLoading(transitionId);
            const tokenResponse = await window.catalyst.auth.generateAuthToken();
            const payload = { blueprint: [{ transition_id: transitionId }] };

            const response = await fetch(blueprintUrl, {
                method: 'PUT',
                headers: {
                    Authorization: `${tokenResponse.access_token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error(`Failed to process transition: ${transitionName}`);
            await fetchAllData();
        } catch (err) {
            alert(`Error: ${err.message}`);
        } finally {
            setTransitionLoading(null);
        }
    };

    // --- Helper Components ---
    const InfoRow = ({ label, value, label2, value2 }) => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 mb-5">
            <div className="flex flex-col sm:flex-row sm:items-start lg:items-center">
                <span className="text-[13px] font-medium text-gray-500 w-full sm:w-40 shrink-0 uppercase tracking-wide">{label}</span>
                <div className="flex items-center">
                    <span className="hidden sm:block text-gray-300 mx-3">:</span>
                    <span className="text-sm text-gray-900 font-semibold">{value || "-"}</span>
                </div>
            </div>
            {label2 && (
                <div className="flex flex-col sm:flex-row sm:items-start lg:items-center">
                    <span className="text-[13px] font-medium text-gray-500 w-full sm:w-40 shrink-0 uppercase tracking-wide">{label2}</span>
                    <div className="flex items-center">
                        <span className="hidden sm:block text-gray-300 mx-3">:</span>
                        <span className="text-sm text-gray-900 font-semibold">{value2 || "-"}</span>
                    </div>
                </div>
            )}
        </div>
    );

    const formatCurrency = (num) => {
        return new Intl.NumberFormat('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(num || 0);
    };

    if (loading && !data) return (
        <div className="flex flex-col items-center justify-center h-screen space-y-4 bg-white">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-100 border-t-[#0070BA]"></div>
            <p className="text-gray-400 text-sm font-medium">Loading details...</p>
        </div>
    );

    if (error) return (
        <div className="p-10 text-center min-h-screen bg-gray-50 flex flex-col items-center justify-center">
            <div className="bg-red-50 text-red-600 px-6 py-4 rounded-xl border border-red-100 mb-4 shadow-sm">
                <p className="font-bold">Error encountered</p>
                <p className="text-sm">{error}</p>
            </div>
            <button onClick={() => navigate(-1)} className="text-[#0070BA] font-semibold hover:underline">Return to List</button>
        </div>
    );

    return (
        <div className="bg-[#F8FAFC] min-h-screen pb-12 font-sans">
            {/* Header Section (Not Fixed) */}
            <header className="bg-white border-b border-gray-200 px-4 py-6 md:px-8">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => navigate('/estimations')} 
                            className="bg-gray-50 p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100 transition-all active:scale-95"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <div>
                            {/* <span className="text-[11px] font-black text-gray-400 uppercase tracking-[0.15em]">Estimation Document</span> */}
                            <h1 className="text-xl md:text-2xl font-black text-gray-900 leading-none mt-1">{data.Quote_Number}</h1>
                        </div>
                    </div>
                    <button 
                        onClick={() => setIsModalOpen(true)} 
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#0070BA] hover:bg-[#005fa3] text-white px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-md active:translate-y-0.5"
                    >
                        <Edit2 size={16} />
                        Edit
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-4 md:p-8 space-y-6">
                
                {/* Workflow & Status Card */}
                {/* <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                        <Info size={16} className="text-[#0070BA]" />
                        <h2 className="text-[12px] font-black text-gray-600 uppercase tracking-widest">Workflow Actions</h2>
                    </div>
                    <div className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
                            <div className="space-y-2">
                                <span className="text-[13px] font-bold text-gray-400 uppercase tracking-tighter">Current Stage</span>
                                <div className="flex items-center gap-2.5 bg-amber-50 px-4 py-2 rounded-xl border border-amber-100 w-fit">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                                    </span>
                                    <span className="text-xs font-black text-amber-700 uppercase">
                                        {blueprint?.process_info?.field_value || data.Quote_Stage}
                                    </span>
                                </div>
                            </div>

                            <div className="flex-1 space-y-3">
                                <span className="text-[13px] font-bold text-gray-400 uppercase tracking-tighter">Available Transitions</span>
                                <div className="flex flex-wrap gap-3">
                                    {blueprint?.transitions?.length > 0 ? (
                                        blueprint.transitions.map((transition) => (
                                            <button 
                                                key={transition.id} 
                                                disabled={transitionLoading !== null}
                                                onClick={() => handleTransition(transition.id, transition.name)}
                                                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white disabled:opacity-50 px-5 py-2.5 rounded-xl text-xs font-black transition-all shadow-sm active:scale-95"
                                            >
                                                {transitionLoading === transition.id && <Loader2 size={14} className="animate-spin" />}
                                                {transition.name}
                                            </button>
                                        ))
                                    ) : (
                                        <div className="text-xs text-gray-400 font-medium italic py-2">No actions available for this stage.</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}

                {blueprint && blueprint.status !== "error" && (
    <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <Info size={16} className="text-[#0070BA]" />
            <h2 className="text-[12px] font-black text-gray-600 uppercase tracking-widest">Workflow Actions</h2>
        </div>
        <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
                <div className="space-y-2">
                    <span className="text-[13px] font-bold text-gray-400 uppercase tracking-tighter">Current Stage</span>
                    <div className="flex items-center gap-2.5 bg-amber-50 px-4 py-2 rounded-xl border border-amber-100 w-fit">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                        </span>
                        <span className="text-xs font-black text-amber-700 uppercase">
                            {blueprint?.process_info?.field_value || data.Quote_Stage}
                        </span>
                    </div>
                </div>

                <div className="flex-1 space-y-3">
                    <span className="text-[13px] font-bold text-gray-400 uppercase tracking-tighter">Available Transitions</span>
                    <div className="flex flex-wrap gap-3">
                        {blueprint?.transitions?.length > 0 ? (
                            blueprint.transitions.map((transition) => (
                                <button 
                                    key={transition.id} 
                                    disabled={transitionLoading !== null}
                                    onClick={() => handleTransition(transition.id, transition.name)}
                                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white disabled:opacity-50 px-5 py-2.5 rounded-xl text-xs font-black transition-all shadow-sm active:scale-95"
                                >
                                    {transitionLoading === transition.id && <Loader2 size={14} className="animate-spin" />}
                                    {transition.name}
                                </button>
                            ))
                        ) : (
                            <div className="text-xs text-gray-400 font-medium italic py-2">No actions available for this stage.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </section>
)}

                {/* Main Information */}
                <div className="grid grid-cols-1 gap-6">
                    <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-8 border-b border-gray-50 pb-4">
                            <Box size={18} className="text-[#0070BA]" />
                            <h2 className="text-[12px] font-black text-gray-600 uppercase tracking-widest">Estimation Details</h2>
                        </div>
                        <InfoRow label="Owner" value={data.Owner?.name} label2="Contact" value2={data.Contact_Name?.name} />
                        <InfoRow label="Subject" value={data.Subject} label2="Dealer" value2={data.Account_Name?.name} />
                        <InfoRow label="Service Req ID" value={data.Service_Request_ID?.name} label2="Agency" value2={data.Agency?.name} />
                        <InfoRow label="Team" value={data.Team} />
                    </section>

                    <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-8 border-b border-gray-50 pb-4">
                            <MapPin size={18} className="text-[#0070BA]" />
                            <h2 className="text-[12px] font-black text-gray-600 uppercase tracking-widest">Address Information</h2>
                        </div>
                        <InfoRow label="Billing" value={`${data.Billing_Street || ''}, ${data.Billing_City || ''}, ${data.Billing_State || ''}`} />
                        <InfoRow label="Shipping" value={`${data.Shipping_Street || ''}, ${data.Shipping_City || ''}, ${data.Shipping_State || ''}`} />
                    </section>
                </div>

                {/* Quoted Items */}
                <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-50">
                        <h2 className="text-[12px] font-black text-gray-600 uppercase tracking-widest">Line Items</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[900px]">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase">Item</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase text-right">Quantity</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase text-right">List Price</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase text-right">Discount</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase text-right">Tax</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {data.Quoted_Items?.map((item, idx) => (
                                    <tr key={item.id || idx} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-5">
                                            <p className="text-sm font-bold text-gray-900">{item.Product_Name?.name}</p>
                                            <p className="text-[11px] text-gray-400 font-medium">Line {idx + 1}</p>
                                        </td>
                                        <td className="px-6 py-5 text-sm font-semibold text-gray-700 text-right">{item.Quantity}</td>
                                        <td className="px-6 py-5 text-sm font-semibold text-gray-700 text-right">₹{formatCurrency(item.List_Price)}</td>
                                        <td className="px-6 py-5 text-sm font-bold text-red-500 text-right">-{formatCurrency(item.Discount)}</td>
                                        <td className="px-6 py-5 text-sm font-semibold text-gray-700 text-right">₹{formatCurrency(item.Tax)}</td>
                                        <td className="px-6 py-5 text-sm font-black text-[#0070BA] text-right">₹{formatCurrency(item.Net_Total)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-8 bg-gray-50/80 border-t border-gray-100 flex justify-end">
                        <div className="w-full max-w-sm space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500 font-bold uppercase tracking-tight">Sub Total</span>
                                <span className="text-gray-900 font-bold">₹{formatCurrency(data.Sub_Total)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-red-500 font-bold uppercase tracking-tight">Total Discount</span>
                                <span className="text-red-500 font-bold">- ₹{formatCurrency(data.Discount)}</span>
                            </div>
                            <div className="flex justify-between text-sm border-b border-gray-200 pb-4">
                                <span className="text-gray-500 font-bold uppercase tracking-tight">Total Tax</span>
                                <span className="text-gray-900 font-bold">₹{formatCurrency(data.Tax)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-black text-gray-900">Grand Total</span>
                                <span className="text-2xl font-black text-[#0070BA]">₹{formatCurrency(data.Grand_Total)}</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <EstimationModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                editData={data} 
                refreshData={fetchAllData} 
            />
        </div>
    );
};

export default EstimationDetails;