import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderReceiving = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const apiUrl = "https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/order_receiving?fields=Name,Email,Order_Receiving_Status,Defective_Challan_ID,Sales_Return_ID&page=1&per_page=200";

    useEffect(() => {
        let isMounted = true;

        const fetchOrders = async () => {
            try {
                setLoading(true);
                
                // Fetch Auth Token
                const authResponse = await window.catalyst.auth.generateAuthToken();
                const token = authResponse.access_token;

                const apiResponse = await fetch(apiUrl, {
                    headers: {
                        Authorization: `${token}`,
                        "Content-Type": "application/json",
                    },
                    method: 'GET',
                });

                if (!apiResponse.ok) {
                    throw new Error(`Error ${apiResponse.status}: Failed to fetch orders`);
                }

                const result = await apiResponse.json();

                if (isMounted) {
                    setOrders(result.data || []);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchOrders();
        return () => { isMounted = false; };
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen space-y-4 bg-white">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-100 border-t-[#0070BA]"></div>
                <p className="text-gray-400 text-sm font-medium">Loading...</p>
            </div>
        );
    }

    if (error) {
        return <div className="p-10 text-red-500 text-center bg-red-50 rounded-lg m-8">Error: {error}</div>;
    }

    return (
        <div className="px-4 pb-8 bg-slate-50/50 min-h-screen">
            {/* Header Section */}
            <div className="flex justify-between items-center py-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Order Receiving</h2>
                </div>
            </div>
            
            {/* Table Section */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="px-6 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide">Order ID</th>
                                <th className="px-6 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide">Email</th>
                                <th className="px-6 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide">Defective Challan ID</th>
                                <th className="px-6 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide">Sales Return ID</th>
                                <th className="px-6 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide">Order Receiving Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {orders.length > 0 ? (
                                orders.map((item, index) => (
                                    <tr key={item.id || index} className="hover:bg-slate-50/80 transition-colors group">
                                        <td className="px-6 py-5 whitespace-nowrap">                    
                                            <button 
                                                onClick={() => navigate(`/order-receiving/${item.id}`)}
                                                className="text-blue-600 font-bold text-sm hover:text-blue-800 transition-colors duration-200"
                                            >
                                                {item.Name || '-'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-600 font-medium">
                                            {item.Email || '-'}
                                        </td>
                                        <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-700">
                                            {item.Defective_Challan_ID || '-'}
                                        </td>
                                        <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-700">
                                            {item.Sales_Return_ID || '-'}
                                        </td>
                                        <td className="px-6 py-5 text-sm">
                                            {item.Order_Receiving_Status ? (
                                                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                                                    {item.Order_Receiving_Status}
                                                </span>
                                            ) : (
                                                <span className="text-slate-400">-</span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-10 text-center text-slate-400 text-sm">
                                        No records found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OrderReceiving;