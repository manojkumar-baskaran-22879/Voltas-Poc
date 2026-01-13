// import React from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { ChevronLeft } from 'lucide-react'; // Optional: for the back arrow icon

// const EstimationDetails = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();

//   // Mock Data based on your images
//   const data = {
//     quoteNumber: "591782000003424005",
//     currentState: "Negotiation",
//     estimationInfo: {
//       owner: "Vivek George",
//       subject: "aa",
//       serviceRequestId: "SR20230000112",
//       agency: "AG-00019",
//       stage: "Negotiation",
//       team: "",
//       contactName: "Vasuda Sandip",
//       dealerName: "Zoho"
//     },
//     address: {
//       billing: { street: "", city: "", state: "", code: "", country: "" },
//       shipping: { street: "", city: "", state: "", code: "", country: "" }
//     },
//     items: [
//       { sNo: 1, name: "Routine Maintenance (SC014)", qty: 1, listPrice: 3000, amount: 3000, discount: 0, tax: 0, total: 3000 }
//     ],
//     summary: { subTotal: 3000, discount: 0, tax: 0, adjustment: 0, grandTotal: 3000 }
//   };

//   const InfoRow = ({ label, value, label2, value2 }) => (
//     <div className="grid grid-cols-2 gap-8 mb-4">
//       <div className="flex items-start">
//         <span className="text-[13px] text-gray-500 w-32">{label}</span>
//         <span className="text-[13px] text-gray-500 mr-4">:</span>
//         <span className="text-[13px] text-gray-800 font-medium">{value || "-"}</span>
//       </div>
//       {label2 && (
//         <div className="flex items-start">
//           <span className="text-[13px] text-gray-500 w-32">{label2}</span>
//           <span className="text-[13px] text-gray-500 mr-4">:</span>
//           <span className="text-[13px] text-gray-800 font-medium">{value2 || "-"}</span>
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <div className="p-6 bg-white min-h-screen">
//       {/* Header */}
//       <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-6">
//         <div className="flex items-center gap-4">
//           <button onClick={() => navigate(-1)} className="text-[#0070BA]">
//             <ChevronLeft size={20} />
//           </button>
//           <h1 className="text-lg font-semibold text-gray-800">{data.quoteNumber}</h1>
//         </div>
//         <button className="bg-[#0070BA] text-white px-5 py-1 rounded text-sm font-medium">Edit</button>
//       </div>

//       {/* Estimation Configurations */}
//       <section className="mb-10">
//         <h2 className="text-sm font-bold text-gray-800 mb-4">Estimation Configurations</h2>
//         <div className="flex items-center gap-2 mb-4">
//           <span className="text-[13px] text-gray-500 w-28">Current State :</span>
//           <div className="flex items-center gap-2">
//             <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
//             <span className="text-[13px] text-gray-800">{data.currentState}</span>
//           </div>
//         </div>
//         <div className="flex items-center gap-4">
//           <span className="text-[13px] text-gray-500 w-28">Transitions :</span>
//           <button className="bg-[#4A78B3] text-white px-4 py-1.5 rounded-lg text-xs">Re- Negotiate</button>
//           <button className="bg-[#4A78B3] text-white px-4 py-1.5 rounded-lg text-xs">Hold</button>
//           <button className="bg-[#4A78B3] text-white px-4 py-1.5 rounded-lg text-xs">Estimation Accepted</button>
//         </div>
//       </section>

//       {/* Estimation Information */}
//       <section className="mb-10">
//         <h2 className="text-sm font-bold text-gray-800 mb-4">Estimation Information</h2>
//         <InfoRow label="Estimation Owner" value={data.estimationInfo.owner} label2="Contact Name" value2={data.estimationInfo.contactName} />
//         <InfoRow label="Subject" value={data.estimationInfo.subject} label2="Dealer Name" value2={data.estimationInfo.dealerName} />
//         <InfoRow label="Service Request ID" value={data.estimationInfo.serviceRequestId} />
//         <InfoRow label="Agency" value={data.estimationInfo.agency} />
//         <InfoRow label="Estimation Stage" value={data.estimationInfo.stage} />
//         <InfoRow label="Team" value={data.estimationInfo.team} />
//       </section>

//       {/* Address Information */}
//       <section className="mb-10">
//         <h2 className="text-sm font-bold text-gray-800 mb-4">Address Information</h2>
//         <InfoRow label="Billing Street" value={data.address.billing.street} label2="Shipping Street" value2={data.address.shipping.street} />
//         <InfoRow label="Billing City" value={data.address.billing.city} label2="Shipping City" value2={data.address.shipping.city} />
//         <InfoRow label="Billing State" value={data.address.billing.state} label2="Shipping State" value2={data.address.shipping.state} />
//         <InfoRow label="Billing Code" value={data.address.billing.code} label2="Shipping Code" value2={data.address.shipping.code} />
//         <InfoRow label="Billing Country" value={data.address.billing.country} label2="Shipping Country" value2={data.address.shipping.country} />
//       </section>

//       {/* Quoted Items Table */}
//       <section className="mt-8">
//         <h2 className="text-sm font-bold text-gray-800 mb-4">Quoted Items</h2>
//         <div className="border border-gray-100 rounded-sm overflow-hidden">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="bg-[#E8F1FD]">
//                 <th className="px-4 py-2 text-[11px] font-bold text-[#4A78B3] uppercase">S.No</th>
//                 <th className="px-4 py-2 text-[11px] font-bold text-[#4A78B3] uppercase">Spares/Service Name</th>
//                 <th className="px-4 py-2 text-[11px] font-bold text-[#4A78B3] uppercase text-right">Quantity</th>
//                 <th className="px-4 py-2 text-[11px] font-bold text-[#4A78B3] uppercase text-right">List Price (Rs.)</th>
//                 <th className="px-4 py-2 text-[11px] font-bold text-[#4A78B3] uppercase text-right">Amount (Rs.)</th>
//                 <th className="px-4 py-2 text-[11px] font-bold text-[#4A78B3] uppercase text-right">Discount (Rs.)</th>
//                 <th className="px-4 py-2 text-[11px] font-bold text-[#4A78B3] uppercase text-right">Tax (Rs.)</th>
//                 <th className="px-4 py-2 text-[11px] font-bold text-[#4A78B3] uppercase text-right">Total (Rs.)</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.items.map((item) => (
//                 <tr key={item.sNo} className="border-b border-gray-50">
//                   <td className="px-4 py-3 text-[13px] text-gray-700">{item.sNo}</td>
//                   <td className="px-4 py-3 text-[13px] text-gray-700">{item.name}</td>
//                   <td className="px-4 py-3 text-[13px] text-gray-700 text-right">{item.qty}</td>
//                   <td className="px-4 py-3 text-[13px] text-gray-700 text-right">{item.listPrice}</td>
//                   <td className="px-4 py-3 text-[13px] text-gray-700 text-right">{item.amount}</td>
//                   <td className="px-4 py-3 text-[13px] text-gray-700 text-right">{item.discount}</td>
//                   <td className="px-4 py-3 text-[13px] text-gray-700 text-right">{item.tax}</td>
//                   <td className="px-4 py-3 text-[13px] text-gray-700 text-right">{item.total}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Summary Box */}
//         <div className="flex justify-end mt-6">
//           <div className="w-80 bg-[#F4F9FF] p-6 rounded-lg border border-[#E8F1FD]">
//             <div className="space-y-4">
//               {[
//                 ["Sub Total (Rs.)", data.summary.subTotal],
//                 ["Discount (Rs.)", data.summary.discount],
//                 ["Tax (Rs.)", data.summary.tax],
//                 ["Adjustment (Rs.)", data.summary.adjustment],
//                 ["Grand Total (Rs.)", data.summary.grandTotal],
//               ].map(([label, val]) => (
//                 <div key={label} className="flex justify-between items-center text-[13px] text-gray-600">
//                   <span>{label}</span>
//                   <div className="flex gap-4">
//                     <span>:</span>
//                     <span className="w-16 text-right font-medium text-gray-800">{val}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default EstimationDetails;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const EstimationDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiUrl = `https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/estimations/${id}`;

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setLoading(true);
                // Generate Catalyst Auth Token
                const response = await window.catalyst.auth.generateAuthToken();
                
                const apiResponse = await fetch(apiUrl, {
                    headers: {
                        Authorization: `${response.access_token}`,
                        "Content-Type": "application/json",
                    },
                    method: 'GET',
                });

                if (!apiResponse.ok) throw new Error('Failed to fetch estimation details');
                
                const result = await apiResponse.json();
                // API returns an array in "data"
                setData(result.data[0]); 
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchDetails();
    }, [id]);

    const InfoRow = ({ label, value, label2, value2 }) => (
        <div className="grid grid-cols-2 gap-8 mb-4">
            <div className="flex items-start">
                <span className="text-[13px] text-gray-500 w-32">{label}</span>
                <span className="text-[13px] text-gray-500 mr-4">:</span>
                <span className="text-[13px] text-gray-800 font-medium">{value || "-"}</span>
            </div>
            {label2 && (
                <div className="flex items-start">
                    <span className="text-[13px] text-gray-500 w-32">{label2}</span>
                    <span className="text-[13px] text-gray-500 mr-4">:</span>
                    <span className="text-[13px] text-gray-800 font-medium">{value2 || "-"}</span>
                </div>
            )}
        </div>
    );

    if (loading) return <div className="p-10 text-center">Loading details...</div>;
    if (error) return <div className="p-10 text-red-500 text-center">Error: {error}</div>;
    if (!data) return <div className="p-10 text-center">No data found.</div>;

    return (
        <div className="p-6 bg-white min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-6">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="text-[#0070BA] hover:bg-blue-50 p-1 rounded-full">
                        <ChevronLeft size={20} />
                    </button>
                    <h1 className="text-lg font-semibold text-gray-800">{data.Quote_Number}</h1>
                </div>
                <button className="bg-[#0070BA] text-white px-5 py-1 rounded text-sm font-medium">Edit</button>
            </div>

            {/* Estimation Configurations */}
            <section className="mb-10">
                <h2 className="text-sm font-bold text-gray-800 mb-4">Estimation Configurations</h2>
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-[13px] text-gray-500 w-28">Current State :</span>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                        <span className="text-[13px] text-gray-800">{data.Quote_Stage}</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-[13px] text-gray-500 w-28">Transitions :</span>
                    <button className="bg-[#4A78B3] text-white px-4 py-1.5 rounded-lg text-xs hover:bg-[#3a5e8c]">Re- Negotiate</button>
                    <button className="bg-[#4A78B3] text-white px-4 py-1.5 rounded-lg text-xs hover:bg-[#3a5e8c]">Hold</button>
                    <button className="bg-[#4A78B3] text-white px-4 py-1.5 rounded-lg text-xs hover:bg-[#3a5e8c]">Estimation Accepted</button>
                </div>
            </section>

            {/* Estimation Information */}
            <section className="mb-10">
                <h2 className="text-sm font-bold text-gray-800 mb-4">Estimation Information</h2>
                <InfoRow label="Estimation Owner" value={data.Owner?.name} label2="Contact Name" value2={data.Contact_Name?.name} />
                <InfoRow label="Subject" value={data.Subject} label2="Dealer Name" value2={data.Account_Name?.name} />
                <InfoRow label="Service Request ID" value={data.Service_Request_ID?.name} />
                <InfoRow label="Agency" value={data.Agency?.name} />
                <InfoRow label="Estimation Stage" value={data.Quote_Stage} />
                <InfoRow label="Team" value={data.Team} />
            </section>

            {/* Address Information */}
            <section className="mb-10">
                <h2 className="text-sm font-bold text-gray-800 mb-4">Address Information</h2>
                <InfoRow label="Billing Street" value={data.Billing_Street} label2="Shipping Street" value2={data.Shipping_Street} />
                <InfoRow label="Billing City" value={data.Billing_City} label2="Shipping City" value2={data.Shipping_City} />
                <InfoRow label="Billing State" value={data.Billing_State} label2="Shipping State" value2={data.Shipping_State} />
                <InfoRow label="Billing Code" value={data.Billing_Code} label2="Shipping Code" value2={data.Shipping_Code} />
                <InfoRow label="Billing Country" value={data.Billing_Country} label2="Shipping Country" value2={data.Shipping_Country} />
            </section>

            {/* Quoted Items Table */}
            <section className="mt-8">
                <h2 className="text-sm font-bold text-gray-800 mb-4">Quoted Items</h2>
                <div className="border border-gray-100 rounded-sm overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#E8F1FD]">
                                <th className="px-4 py-2 text-[11px] font-bold text-[#4A78B3] uppercase">S.No</th>
                                <th className="px-4 py-2 text-[11px] font-bold text-[#4A78B3] uppercase">Spares/Service Name</th>
                                <th className="px-4 py-2 text-[11px] font-bold text-[#4A78B3] uppercase text-right">Quantity</th>
                                <th className="px-4 py-2 text-[11px] font-bold text-[#4A78B3] uppercase text-right">List Price (Rs.)</th>
                                <th className="px-4 py-2 text-[11px] font-bold text-[#4A78B3] uppercase text-right">Amount (Rs.)</th>
                                <th className="px-4 py-2 text-[11px] font-bold text-[#4A78B3] uppercase text-right">Discount (Rs.)</th>
                                <th className="px-4 py-2 text-[11px] font-bold text-[#4A78B3] uppercase text-right">Tax (Rs.)</th>
                                <th className="px-4 py-2 text-[11px] font-bold text-[#4A78B3] uppercase text-right">Total (Rs.)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.Quoted_Items?.map((item, idx) => (
                                <tr key={item.id} className="border-b border-gray-50">
                                    <td className="px-4 py-3 text-[13px] text-gray-700">{idx + 1}</td>
                                    <td className="px-4 py-3 text-[13px] text-gray-700">{item.Product_Name?.name}</td>
                                    <td className="px-4 py-3 text-[13px] text-gray-700 text-right">{item.Quantity}</td>
                                    <td className="px-4 py-3 text-[13px] text-gray-700 text-right">{item.List_Price}</td>
                                    <td className="px-4 py-3 text-[13px] text-gray-700 text-right">{item.Total}</td>
                                    <td className="px-4 py-3 text-[13px] text-gray-700 text-right">{item.Discount}</td>
                                    <td className="px-4 py-3 text-[13px] text-gray-700 text-right">{item.Tax}</td>
                                    <td className="px-4 py-3 text-[13px] text-gray-700 text-right font-medium">{item.Net_Total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Summary Box */}
                <div className="flex justify-end mt-6">
                    <div className="w-80 bg-[#F4F9FF] p-6 rounded-lg border border-[#E8F1FD]">
                        <div className="space-y-4">
                            {[
                                ["Sub Total (Rs.)", data.Sub_Total],
                                ["Discount (Rs.)", data.Discount],
                                ["Tax (Rs.)", data.Tax],
                                ["Adjustment (Rs.)", data.Adjustment],
                                ["Grand Total (Rs.)", data.Grand_Total],
                            ].map(([label, val]) => (
                                <div key={label} className="flex justify-between items-center text-[13px] text-gray-600">
                                    <span>{label}</span>
                                    <div className="flex gap-4">
                                        <span>:</span>
                                        <span className="w-16 text-right font-medium text-gray-800">{val}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default EstimationDetails;