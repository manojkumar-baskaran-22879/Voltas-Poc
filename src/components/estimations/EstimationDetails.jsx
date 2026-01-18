// import React, { useState, useEffect, useCallback } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ChevronLeft, Edit2 } from 'lucide-react';
// import EstimationModal from './EstimationModal';

// const EstimationDetails = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [data, setData] = useState(null);
//     const [blueprint, setBlueprint] = useState(null); // State for Blueprint API
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const apiUrl = `https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/estimations/${id}`;
//     const blueprintUrl = `${apiUrl}/actions/blueprint`;

//     /**
//      * Fetches the main estimation details and the blueprint/workflow data
//      */
//     const fetchAllData = useCallback(async () => {
//         try {
//             setLoading(true);
//             const tokenResponse = await window.catalyst.auth.generateAuthToken();
//             const headers = {
//                 Authorization: `${tokenResponse.access_token}`,
//                 "Content-Type": "application/json",
//             };

//             // Fetch both Detail and Blueprint concurrently
//             const [detailsRes, blueprintRes] = await Promise.all([
//                 fetch(apiUrl, { headers, method: 'GET' }),
//                 fetch(blueprintUrl, { headers, method: 'GET' })
//             ]);

//             if (!detailsRes.ok) throw new Error('Failed to fetch estimation details');
            
//             const detailsResult = await detailsRes.json();
//             setData(detailsResult.data?.[0] || null);

//             // If blueprint exists, set it
//             if (blueprintRes.ok) {
//                 const blueprintResult = await blueprintRes.json();
//                 setBlueprint(blueprintResult.blueprint || null);
//             }
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     }, [apiUrl, blueprintUrl]);

//     useEffect(() => {
//         if (id) fetchAllData();
//     }, [id, fetchAllData]);

//     // --- Helper Components & Utils ---
//     const InfoRow = ({ label, value, label2, value2 }) => (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
//             <div className="flex items-start">
//                 <span className="text-[13px] text-gray-500 w-32 shrink-0">{label}</span>
//                 <span className="text-[13px] text-gray-400 mr-4">:</span>
//                 <span className="text-[13px] text-gray-800 font-medium">{value || "-"}</span>
//             </div>
//             {label2 && (
//                 <div className="flex items-start">
//                     <span className="text-[13px] text-gray-500 w-32 shrink-0">{label2}</span>
//                     <span className="text-[13px] text-gray-400 mr-4">:</span>
//                     <span className="text-[13px] text-gray-800 font-medium">{value2 || "-"}</span>
//                 </div>
//             )}
//         </div>
//     );

//     const formatCurrency = (num) => {
//         return new Intl.NumberFormat('en-IN', {
//             minimumFractionDigits: 2,
//             maximumFractionDigits: 2
//         }).format(num || 0);
//     };

//     if (loading && !data) return (
//         <div className="flex flex-col items-center justify-center h-screen space-y-4">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0070BA]"></div>
//             <p className="text-gray-500 text-sm">Fetching Estimation Details...</p>
//         </div>
//     );

//     if (error) return (
//         <div className="p-10 text-center">
//             <div className="bg-red-50 text-red-600 p-4 rounded-md inline-block">
//                 <strong>Error:</strong> {error}
//             </div>
//             <button onClick={() => navigate(-1)} className="block mx-auto mt-4 text-[#0070BA] underline">Go Back</button>
//         </div>
//     );

//     if (!data) return <div className="p-10 text-center text-gray-500">No data found for this ID.</div>;

//     return (
//         <div className="p-4 md:p-8 bg-white min-h-screen">
//             {/* Header */}
//             <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-6">
//                 <div className="flex items-center gap-4">
//                     <button 
//                         onClick={() => navigate('/estimations')} 
//                         className="text-[#0070BA] hover:bg-blue-50 p-2 rounded-full transition-colors"
//                     >
//                         <ChevronLeft size={22} />
//                     </button>
//                     <div>
//                         <p className="text-[10px] uppercase text-gray-400 font-bold tracking-widest">Estimation Number</p>
//                         <h1 className="text-xl font-semibold text-gray-900 leading-tight">{data.Quote_Number}</h1>
//                     </div>
//                 </div>
//                 <button 
//                     onClick={() => setIsModalOpen(true)} 
//                     className="flex items-center gap-2 bg-[#0070BA] hover:bg-[#005fa3] text-white px-5 py-1.5 rounded text-sm font-medium transition-colors"
//                 >
//                     <Edit2 size={14} />
//                     Edit
//                 </button>
//             </div>

//             {/* Workflow Section - Integrated with Blueprint API */}
//             <section className="mb-10 bg-gray-50/50 p-4 rounded-lg border border-gray-100">
//                 <h2 className="text-xs font-bold text-[#4A78B3] uppercase tracking-wider mb-4">Estimation Configurations</h2>
//                 <div className="flex items-center gap-2 mb-6">
//                     <span className="text-[13px] text-gray-500 w-28">Current State :</span>
//                     <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200">
//                         <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
//                         <span className="text-[12px] font-semibold text-yellow-700 uppercase">
//                             {/* Value from Blueprint API field_value */}
//                             {blueprint?.process_info?.field_value || data.Quote_Stage}
//                         </span>
//                     </div>
//                 </div>
//                 <div className="flex flex-wrap items-center gap-3">
//                     <span className="text-[13px] text-gray-500 w-28">Transitions :</span>
//                     {/* Map buttons from Blueprint API transitions array */}
//                     {blueprint?.transitions?.length > 0 ? (
//                         blueprint.transitions.map((transition) => (
//                             <button 
//                                 key={transition.id} 
//                                 className="bg-white border border-[#4A78B3] text-[#4A78B3] hover:bg-[#4A78B3] hover:text-white px-4 py-1.5 rounded text-xs font-medium transition-all"
//                             >
//                                 {transition.name}
//                             </button>
//                         ))
//                     ) : (
//                         <span className="text-xs text-gray-400 italic">No transitions available</span>
//                     )}
//                 </div>
//             </section>

//             {/* Information Grid */}
//             <div className="grid grid-cols-1 gap-10">
//                 <section>
//                     <h2 className="text-xs font-bold text-[#4A78B3] uppercase tracking-wider mb-5 border-b pb-2">Estimation Information</h2>
//                     <InfoRow label="Estimation Owner" value={data.Owner?.name} label2="Contact Name" value2={data.Contact_Name?.name} />
//                     <InfoRow label="Subject" value={data.Subject} label2="Dealer Name" value2={data.Account_Name?.name} />
//                     <InfoRow label="Service Request ID" value={data.Service_Request_ID?.name} />
//                     <InfoRow label="Agency" value={data.Agency?.name} />
//                     <InfoRow label="Estimation Stage" value={data.Quote_Stage} />
//                     <InfoRow label="Team" value={data.Team} />
//                 </section>

//                 <section>
//                     <h2 className="text-xs font-bold text-[#4A78B3] uppercase tracking-wider mb-5 border-b pb-2">Address Information</h2>
//                     <InfoRow label="Billing Street" value={data.Billing_Street} label2="Shipping Street" value2={data.Shipping_Street} />
//                     <InfoRow label="Billing City" value={data.Billing_City} label2="Shipping City" value2={data.Shipping_City} />
//                     <InfoRow label="Billing State" value={data.Billing_State} label2="Shipping State" value2={data.Shipping_State} />
//                     <InfoRow label="Billing Code" value={data.Billing_Code} label2="Shipping Code" value2={data.Shipping_Code} />
//                     <InfoRow label="Billing Country" value={data.Billing_Country} label2="Shipping Country" value2={data.Shipping_Country} />
//                 </section>
//             </div>

//             {/* Quoted Items Table */}
//             <section className="mt-12">
//                 <h2 className="text-xs font-bold text-[#4A78B3] uppercase tracking-wider mb-5">Quoted Items</h2>
//                 <div className="border border-gray-200 rounded-md overflow-hidden shadow-sm">
//                     <table className="w-full text-left border-collapse">
//                         <thead>
//                             <tr className="bg-[#E8F1FD]">
//                                 <th className="px-4 py-3 text-[11px] font-bold text-[#4A78B3] uppercase">S.No</th>
//                                 <th className="px-4 py-3 text-[11px] font-bold text-[#4A78B3] uppercase">Spares/Service Name</th>
//                                 <th className="px-4 py-3 text-[11px] font-bold text-[#4A78B3] uppercase text-right">Quantity</th>
//                                 <th className="px-4 py-3 text-[11px] font-bold text-[#4A78B3] uppercase text-right">List Price</th>
//                                 <th className="px-4 py-3 text-[11px] font-bold text-[#4A78B3] uppercase text-right">Amount</th>
//                                 <th className="px-4 py-3 text-[11px] font-bold text-[#4A78B3] uppercase text-right">Discount</th>
//                                 <th className="px-4 py-3 text-[11px] font-bold text-[#4A78B3] uppercase text-right">Tax</th>
//                                 <th className="px-4 py-3 text-[11px] font-bold text-[#4A78B3] uppercase text-right">Total</th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-gray-100">
//                             {data.Quoted_Items?.map((item, idx) => (
//                                 <tr key={item.id || idx} className="hover:bg-gray-50 transition-colors">
//                                     <td className="px-4 py-4 text-[13px] text-gray-500">{idx + 1}</td>
//                                     <td className="px-4 py-4 text-[13px] text-gray-800 font-medium">{item.Product_Name?.name}</td>
//                                     <td className="px-4 py-4 text-[13px] text-gray-700 text-right">{item.Quantity}</td>
//                                     <td className="px-4 py-4 text-[13px] text-gray-700 text-right">{formatCurrency(item.List_Price)}</td>
//                                     <td className="px-4 py-4 text-[13px] text-gray-700 text-right">{formatCurrency(item.Total)}</td>
//                                     <td className="px-4 py-4 text-[13px] text-red-500 text-right">-{formatCurrency(item.Discount)}</td>
//                                     <td className="px-4 py-4 text-[13px] text-gray-700 text-right">{formatCurrency(item.Tax)}</td>
//                                     <td className="px-4 py-4 text-[13px] text-[#0070BA] text-right font-bold">{formatCurrency(item.Net_Total)}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>

//                 <div className="flex justify-end mt-8">
//                     <div className="w-full max-w-sm bg-[#F8FBFF] p-6 rounded-xl border border-blue-100 shadow-sm">
//                         <div className="space-y-3">
//                             <div className="flex justify-between text-[13px] text-gray-500">
//                                 <span>Sub Total</span>
//                                 <span className="text-gray-800 font-medium">₹{formatCurrency(data.Sub_Total)}</span>
//                             </div>
//                             <div className="flex justify-between text-[13px] text-red-500">
//                                 <span>Discount</span>
//                                 <span className="font-medium">- ₹{formatCurrency(data.Discount)}</span>
//                             </div>
//                             <div className="flex justify-between text-[13px] text-gray-500">
//                                 <span>Tax</span>
//                                 <span className="text-gray-800 font-medium">₹{formatCurrency(data.Tax)}</span>
//                             </div>
//                             <div className="pt-3 mt-3 border-t border-blue-200 flex justify-between">
//                                 <span className="text-sm font-bold text-gray-900">Grand Total</span>
//                                 <span className="text-lg font-bold text-[#0070BA]">₹{formatCurrency(data.Grand_Total)}</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             <EstimationModal 
//                 isOpen={isModalOpen} 
//                 onClose={() => setIsModalOpen(false)} 
//                 editData={data} 
//                 refreshData={fetchAllData} 
//             />
//         </div>
//     );
// };

// export default EstimationDetails;

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Edit2, Loader2 } from 'lucide-react';
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

    /**
     * Fetches both Record Details and Blueprint configurations
     */
    const fetchAllData = useCallback(async () => {
        try {
            setLoading(true);
            const tokenResponse = await window.catalyst.auth.generateAuthToken();
            const headers = {
                Authorization: `${tokenResponse.access_token}`,
                "Content-Type": "application/json",
            };

            // Fetch Detail and Blueprint concurrently
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

    /**
     * Handles clicking a transition button (e.g., "Share Estimation")
     */
    const handleTransition = async (transitionId, transitionName) => {
        try {
            setTransitionLoading(transitionId);
            const tokenResponse = await window.catalyst.auth.generateAuthToken();
            
            const payload = {
                blueprint: [{ transition_id: transitionId }]
            };

            const response = await fetch(blueprintUrl, {
                method: 'PUT',
                headers: {
                    Authorization: `${tokenResponse.access_token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error(`Failed to process transition: ${transitionName}`);

            // Reload the data to update the state and transitions
            await fetchAllData();
        } catch (err) {
            console.error(err);
            alert(`Error: ${err.message}`);
        } finally {
            setTransitionLoading(null);
        }
    };

    // --- Helper Components & Utils ---
    const InfoRow = ({ label, value, label2, value2 }) => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
            <div className="flex items-start">
                <span className="text-[13px] text-gray-500 w-32 shrink-0">{label}</span>
                <span className="text-[13px] text-gray-400 mr-4">:</span>
                <span className="text-[13px] text-gray-800 font-medium">{value || "-"}</span>
            </div>
            {label2 && (
                <div className="flex items-start">
                    <span className="text-[13px] text-gray-500 w-32 shrink-0">{label2}</span>
                    <span className="text-[13px] text-gray-400 mr-4">:</span>
                    <span className="text-[13px] text-gray-800 font-medium">{value2 || "-"}</span>
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

    // --- Conditional Rendering ---
    if (loading && !data) return (
        <div className="flex flex-col items-center justify-center h-screen space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0070BA]"></div>
            <p className="text-gray-500 text-sm">Fetching Estimation Details...</p>
        </div>
    );

    if (error) return (
        <div className="p-10 text-center">
            <div className="bg-red-50 text-red-600 p-4 rounded-md inline-block">
                <strong>Error:</strong> {error}
            </div>
            <button onClick={() => navigate(-1)} className="block mx-auto mt-4 text-[#0070BA] underline">Go Back</button>
        </div>
    );

    if (!data) return <div className="p-10 text-center text-gray-500">No data found for this ID.</div>;

    return (
        <div className="p-4 md:p-8 bg-white min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-6">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => navigate('/estimations')} 
                        className="text-[#0070BA] hover:bg-blue-50 p-2 rounded-full transition-colors"
                    >
                        <ChevronLeft size={22} />
                    </button>
                    <div>
                        <p className="text-[10px] uppercase text-gray-400 font-bold tracking-widest">Estimation Number</p>
                        <h1 className="text-xl font-semibold text-gray-900 leading-tight">{data.Quote_Number}</h1>
                    </div>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)} 
                    className="flex items-center gap-2 bg-[#0070BA] hover:bg-[#005fa3] text-white px-5 py-1.5 rounded text-sm font-medium transition-colors"
                >
                    <Edit2 size={14} />
                    Edit
                </button>
            </div>

            {/* Workflow Section */}
            <section className="mb-10 bg-gray-50/50 p-4 rounded-lg border border-gray-100">
                <h2 className="text-xs font-bold text-[#4A78B3] uppercase tracking-wider mb-4">Estimation Configurations</h2>
                <div className="flex items-center gap-2 mb-6">
                    <span className="text-[13px] text-gray-500 w-28">Current State :</span>
                    <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200">
                        <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                        <span className="text-[12px] font-semibold text-yellow-700 uppercase">
                            {blueprint?.process_info?.field_value || data.Quote_Stage}
                        </span>
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[13px] text-gray-500 w-28">Transitions :</span>
                    {blueprint?.transitions?.map((transition) => (
                        <button 
                            key={transition.id} 
                            disabled={transitionLoading !== null}
                            onClick={() => handleTransition(transition.id, transition.name)}
                            className="flex items-center gap-2 bg-white border border-[#4A78B3] text-[#4A78B3] hover:bg-[#4A78B3] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed px-4 py-1.5 rounded text-xs font-medium transition-all"
                        >
                            {transitionLoading === transition.id && <Loader2 size={12} className="animate-spin" />}
                            {transition.name}
                        </button>
                    ))}
                    {!blueprint?.transitions?.length && <span className="text-xs text-gray-400">No transitions available</span>}
                </div>
            </section>

            {/* Information Grid */}
            <div className="grid grid-cols-1 gap-10">
                <section>
                    <h2 className="text-xs font-bold text-[#4A78B3] uppercase tracking-wider mb-5 border-b pb-2">Estimation Information</h2>
                    <InfoRow label="Estimation Owner" value={data.Owner?.name} label2="Contact Name" value2={data.Contact_Name?.name} />
                    <InfoRow label="Subject" value={data.Subject} label2="Dealer Name" value2={data.Account_Name?.name} />
                    <InfoRow label="Service Request ID" value={data.Service_Request_ID?.name} />
                    <InfoRow label="Agency" value={data.Agency?.name} />
                    <InfoRow label="Estimation Stage" value={data.Quote_Stage} />
                    <InfoRow label="Team" value={data.Team} />
                </section>

                <section>
                    <h2 className="text-xs font-bold text-[#4A78B3] uppercase tracking-wider mb-5 border-b pb-2">Address Information</h2>
                    <InfoRow label="Billing Street" value={data.Billing_Street} label2="Shipping Street" value2={data.Shipping_Street} />
                    <InfoRow label="Billing City" value={data.Billing_City} label2="Shipping City" value2={data.Shipping_City} />
                    <InfoRow label="Billing State" value={data.Billing_State} label2="Shipping State" value2={data.Shipping_State} />
                    <InfoRow label="Billing Code" value={data.Billing_Code} label2="Shipping Code" value2={data.Shipping_Code} />
                    <InfoRow label="Billing Country" value={data.Billing_Country} label2="Shipping Country" value2={data.Shipping_Country} />
                </section>
            </div>

            {/* Quoted Items Table */}
            <section className="mt-12">
                <h2 className="text-xs font-bold text-[#4A78B3] uppercase tracking-wider mb-5">Quoted Items</h2>
                <div className="border border-gray-200 rounded-md overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#E8F1FD]">
                                <th className="px-4 py-3 text-[11px] font-bold text-[#4A78B3] uppercase">S.No</th>
                                <th className="px-4 py-3 text-[11px] font-bold text-[#4A78B3] uppercase">Spares/Service Name</th>
                                <th className="px-4 py-3 text-[11px] font-bold text-[#4A78B3] uppercase text-right">Quantity</th>
                                <th className="px-4 py-3 text-[11px] font-bold text-[#4A78B3] uppercase text-right">List Price</th>
                                <th className="px-4 py-3 text-[11px] font-bold text-[#4A78B3] uppercase text-right">Amount</th>
                                <th className="px-4 py-3 text-[11px] font-bold text-[#4A78B3] uppercase text-right">Discount</th>
                                <th className="px-4 py-3 text-[11px] font-bold text-[#4A78B3] uppercase text-right">Tax</th>
                                <th className="px-4 py-3 text-[11px] font-bold text-[#4A78B3] uppercase text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {data.Quoted_Items?.map((item, idx) => (
                                <tr key={item.id || idx} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-4 text-[13px] text-gray-500">{idx + 1}</td>
                                    <td className="px-4 py-4 text-[13px] text-gray-800 font-medium">{item.Product_Name?.name}</td>
                                    <td className="px-4 py-4 text-[13px] text-gray-700 text-right">{item.Quantity}</td>
                                    <td className="px-4 py-4 text-[13px] text-gray-700 text-right">{formatCurrency(item.List_Price)}</td>
                                    <td className="px-4 py-4 text-[13px] text-gray-700 text-right">{formatCurrency(item.Total)}</td>
                                    <td className="px-4 py-4 text-[13px] text-red-500 text-right">-{formatCurrency(item.Discount)}</td>
                                    <td className="px-4 py-4 text-[13px] text-gray-700 text-right">{formatCurrency(item.Tax)}</td>
                                    <td className="px-4 py-4 text-[13px] text-[#0070BA] text-right font-bold">{formatCurrency(item.Net_Total)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Summary Box */}
                <div className="flex justify-end mt-8">
                    <div className="w-full max-w-sm bg-[#F8FBFF] p-6 rounded-xl border border-blue-100 shadow-sm">
                        <div className="space-y-3">
                            <div className="flex justify-between text-[13px] text-gray-500">
                                <span>Sub Total</span>
                                <span className="text-gray-800 font-medium">₹{formatCurrency(data.Sub_Total)}</span>
                            </div>
                            <div className="flex justify-between text-[13px] text-red-500">
                                <span>Discount</span>
                                <span className="font-medium">- ₹{formatCurrency(data.Discount)}</span>
                            </div>
                            <div className="flex justify-between text-[13px] text-gray-500">
                                <span>Tax</span>
                                <span className="text-gray-800 font-medium">₹{formatCurrency(data.Tax)}</span>
                            </div>
                            <div className="pt-3 mt-3 border-t border-blue-200 flex justify-between">
                                <span className="text-sm font-bold text-gray-900">Grand Total</span>
                                <span className="text-lg font-bold text-[#0070BA]">₹{formatCurrency(data.Grand_Total)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modal */}
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