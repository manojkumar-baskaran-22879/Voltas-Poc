import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react'; // Optional: for the back icon

const OrderReceivingDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                setLoading(true);
                const authResponse = await window.catalyst.auth.generateAuthToken();
                const token = authResponse.access_token;

                const response = await fetch(
                    `https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/order_receiving/${id}`,
                    {
                        headers: {
                            Authorization: `${token}`,
                            "Content-Type": "application/json",
                        },
                        method: 'GET',
                    }
                );

                if (!response.ok) throw new Error("Failed to fetch order details");

                const result = await response.json();
                if (result.data && result.data.length > 0) {
                    setOrder(result.data[0]);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen space-y-4 bg-white">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-100 border-t-[#0070BA]"></div>
                <p className="text-gray-400 text-sm font-medium">Loading Details...</p>
            </div>
        );
    }

    if (error || !order) {
        return <div className="p-10 text-red-500 text-center">{error || "Order not found"}</div>;
    }

    // Helper to render Info Rows
    const InfoRow = ({ label, value }) => (
        <div className="flex py-3 border-b border-transparent">
            <div className="w-1/3 text-slate-500 text-sm">{label}</div>
            <div className="w-4 text-slate-400 text-sm">:</div>
            <div className="w-2/3 text-slate-900 text-sm font-medium">{value || "-"}</div>
        </div>
    );

    return (
        <div className="bg-white min-h-screen">
            {/* Header / Back Button */}
            <div className="flex items-center px-6 py-4 border-b border-slate-100">
                <button 
                    onClick={() => navigate(-1)} 
                    className="mr-4 p-1 hover:bg-slate-100 rounded-full transition-colors"
                >
                    <ChevronLeft className="w-5 h-5 text-[#0070BA]" />
                </button>
                <h1 className="text-lg font-bold text-slate-800">{order.id}</h1>
            </div>

            <div className="max-w-5xl px-8 py-8">
                {/* Section: Information */}
                <div className="mb-10">
                    <h2 className="text-base font-bold text-slate-800 mb-6">Order Receiving Information</h2>
                    <div className="max-w-2xl">
                        <InfoRow label="Sales Return Order ID" value={order.Name} />
                        <InfoRow label="Email" value={order.Email} />
                        <InfoRow label="Defective Challan_ID" value={order.Defective_Challan_ID} />
                        <InfoRow label="Sales Return ID" value={order.Sales_Return_ID} />
                        <InfoRow label="SAP Order ID" value={order.SAP_Order_ID} />
                        <InfoRow label="Order Receiving Status" value={order.Order_Receiving_Status} />
                    </div>
                </div>

                {/* Section: Product Details */}
                <div>
                    <h2 className="text-base font-bold text-slate-800 mb-6">Product Details</h2>
                    <div className="max-w-2xl">
                        <InfoRow label="Part Number" value={order.Part_Number} />
                        <InfoRow label="Part Name" value={order.Part_Name} />
                        <InfoRow label="Part Quantity" value={order.Part_Quantity} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderReceivingDetails;