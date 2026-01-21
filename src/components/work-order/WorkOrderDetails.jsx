// import React, { useState, useEffect } from 'react';

// export const WorkOrderDetails = ({ orderId, onBack }) => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDetail = async () => {
//       try {
//         const authResponse = await window.catalyst.auth.generateAuthToken();
//         const response = await fetch(`https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/work_order/${orderId}`, {
//           headers: { Authorization: authResponse.access_token }
//         });
//         const result = await response.json();
//         setData(result.data[0]);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDetail();
//   }, [orderId]);

//   if (loading) return <div className="p-10 text-center font-sans">Loading Order Details...</div>;
//   if (!data) return <div className="p-10 text-center">No data found.</div>;

//   return (
//     <div className="min-h-screen bg-white font-sans text-slate-800">
//       {/* Top Navigation Bar */}
//       <div className="border-b border-slate-200 px-8 py-4 flex items-center justify-between bg-white sticky top-0 z-10">
//         <div className="flex items-center gap-4">
//           <button onClick={onBack} className="text-slate-400 hover:text-slate-600 transition-colors">
//             ← Back
//           </button>
//           <h1 className="text-xl font-bold tracking-tight">{data.Subject}</h1>
//           <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">{data.Status}</span>
//         </div>
//         <div className="flex gap-3">
//           <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50">Edit</button>
//           <button className="px-4 py-2 bg-[#00579c] text-white rounded-lg text-sm font-semibold shadow-md">Submit</button>
//         </div>
//       </div>

//       <div className="p-8 max-w-6xl mx-auto">
//         {/* Info Grid */}
//         <div className="grid grid-cols-2 gap-x-12 gap-y-6 mb-12">
//           <DetailItem label="Work Order Number" value={data.SO_Number} />
//           <DetailItem label="Work Order Owner" value={data.Owner?.name} />
//           <DetailItem label="Contact Name" value={data.Contact_Name?.name} />
//           <DetailItem label="Account Name" value={data.Account_Name?.name} />
//           <DetailItem label="Status" value={data.Status} />
//           <DetailItem label="Grand Total" value={`${data.$currency_symbol}${data.Grand_Total}`} isBold />
//         </div>

//         {/* Ordered Items Table */}
//         <h3 className="text-lg font-bold mb-4 border-b pb-2 border-slate-100">Ordered Items</h3>
//         <div className="border border-slate-200 rounded-xl overflow-hidden">
//           <table className="w-full text-left">
//             <thead className="bg-slate-50">
//               <tr className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
//                 <th className="px-6 py-3">Product Name</th>
//                 <th className="px-6 py-3 text-center">Quantity</th>
//                 <th className="px-6 py-3 text-right">List Price</th>
//                 <th className="px-6 py-3 text-right">Total</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100">
//               {data.Ordered_Items?.map((item, idx) => (
//                 <tr key={idx} className="text-sm">
//                   <td className="px-6 py-4 font-medium">{item.Product_Name?.name}</td>
//                   <td className="px-6 py-4 text-center">{item.Quantity}</td>
//                   <td className="px-6 py-4 text-right">{item.List_Price}</td>
//                   <td className="px-6 py-4 text-right font-bold">{item.Total}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// const DetailItem = ({ label, value, isBold }) => (
//   <div className="flex flex-col gap-1">
//     <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</span>
//     <span className={`text-sm ${isBold ? 'font-bold text-slate-900' : 'text-slate-700'}`}>{value || '-'}</span>
//   </div>
// );

import React, { useState, useEffect } from 'react';

export const WorkOrderDetails = ({ orderId, onBack }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const authResponse = await window.catalyst.auth.generateAuthToken();
        const response = await fetch(`https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/work_order/${orderId}`, {
          headers: { Authorization: authResponse.access_token }
        });
        const result = await response.json();
        setData(result.data[0]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [orderId]);

//   if (loading) return <div className="p-10 text-center font-sans text-slate-500">Loading Order Details...</div>;

if (loading) return (
        <div className="flex flex-col items-center justify-center h-screen space-y-4 bg-white">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-100 border-t-[#0070BA]"></div>
            <p className="text-gray-400 text-sm font-medium">Loading details...</p>
        </div>
    );
  if (!data) return <div className="p-10 text-center">No data found.</div>;

  return (
    <div className="min-h-screen bg-white font-sans text-[#334155] antialiased">
      {/* Top Header */}
      <div className="flex items-center px-6 py-4 border-b border-slate-100">
        <button onClick={onBack} className="mr-4 text-[#00579c] hover:text-blue-800 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-semibold text-slate-800 tracking-tight">{data.id}</h1>
      </div>

      <div className="p-10 max-w-[1200px]">
        {/* Work Order Information Section */}
        <section className="mb-12">
          <h2 className="text-[17px] font-bold text-slate-800 mb-6">Work Order Information</h2>
          <div className="grid grid-cols-2 gap-x-24 gap-y-4">
            <InfoRow label="Subject" value={data.Subject} />
            <InfoRow label="Customer No." value={data.Customer_No} />
            <InfoRow label="Estimation Name" value={data.Quote_Name?.name} />
            <InfoRow label="Service Request ID" value={data.Service_Request_ID?.name} />
            <InfoRow label="Agency" value={data.Agency?.name} />
            <InfoRow label="Pending" value={data.Pending} />
            <InfoRow label="Carrier" value={data.Carrier} />
            <InfoRow label="Dealer Name" value={data.Account_Name?.name} />
          </div>
        </section>

        {/* Address Information Section */}
        <section className="mb-12">
          <h2 className="text-[17px] font-bold text-slate-800 mb-6">Address Information</h2>
          <div className="grid grid-cols-2 gap-x-24 gap-y-4">
            <div className="space-y-4">
              <InfoRow label="Billing Street" value={data.Billing_Street} />
              <InfoRow label="Billing City" value={data.Billing_City} />
              <InfoRow label="Billing State" value={data.Billing_State} />
              <InfoRow label="Billing Code" value={data.Billing_Code} />
              <InfoRow label="Billing Country" value={data.Billing_Country} />
            </div>
            <div className="space-y-4">
              <InfoRow label="Shipping Street" value={data.Shipping_Street} />
              <InfoRow label="Shipping City" value={data.Shipping_City} />
              <InfoRow label="Shipping State" value={data.Shipping_State} />
              <InfoRow label="Shipping Code" value={data.Shipping_Code} />
              <InfoRow label="Shipping Country" value={data.Shipping_Country} />
            </div>
          </div>
        </section>

        {/* Ordered Items Section */}
        <section className="mt-16">
          <h2 className="text-[17px] font-bold text-slate-800 mb-6">Ordered Items</h2>
          <div className="border border-slate-100 rounded-sm overflow-hidden mb-8">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#e2efff] text-[#475b83]">
                  <th className="px-4 py-3 text-[12px] font-bold uppercase tracking-wider border-r border-white/50">S.NO</th>
                  <th className="px-4 py-3 text-[12px] font-bold uppercase tracking-wider border-r border-white/50">SPARES/SERVICE NAME</th>
                  <th className="px-4 py-3 text-[12px] font-bold uppercase tracking-wider border-r border-white/50 text-center">QUANTITY</th>
                  <th className="px-4 py-3 text-[12px] font-bold uppercase tracking-wider border-r border-white/50 text-right">LIST PRICE (RS.)</th>
                  <th className="px-4 py-3 text-[12px] font-bold uppercase tracking-wider border-r border-white/50 text-right">AMOUNT (RS.)</th>
                  <th className="px-4 py-3 text-[12px] font-bold uppercase tracking-wider border-r border-white/50 text-right">DISCOUNT (RS.)</th>
                  <th className="px-4 py-3 text-[12px] font-bold uppercase tracking-wider border-r border-white/50 text-right">TAX (RS.)</th>
                  <th className="px-4 py-3 text-[12px] font-bold uppercase tracking-wider text-right">TOTAL (RS.)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {data.Ordered_Items?.map((item, idx) => (
                  <tr key={idx} className="text-[13px] text-slate-700">
                    <td className="px-4 py-4">{idx + 1}</td>
                    <td className="px-4 py-4 max-w-[280px]">{item.Product_Name?.name} ({item.Product_Name?.Product_Code})</td>
                    <td className="px-4 py-4 text-center">{item.Quantity}</td>
                    <td className="px-4 py-4 text-right">{item.List_Price}</td>
                    <td className="px-4 py-4 text-right">{item.Total}</td>
                    <td className="px-4 py-4 text-right">{item.Discount}</td>
                    <td className="px-4 py-4 text-right">{item.Tax}</td>
                    <td className="px-4 py-4 text-right">{item.Net_Total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Summary Card */}
          <div className="flex justify-end pr-4">
            <div className="bg-[#f8fbff] border border-[#e2efff] rounded-xl p-6 w-[400px] space-y-4">
              <SummaryRow label="Sub Total (Rs.)" value={data.Sub_Total} />
              <SummaryRow label="Discount (Rs.)" value={data.Discount} />
              <SummaryRow label="Tax (Rs.)" value={data.Tax} />
              <SummaryRow label="Adjustment (Rs.)" value={data.Adjustment} />
              <div className="pt-2 border-t border-blue-100 mt-2">
                <SummaryRow label="Grand Total (Rs.)" value={data.Grand_Total} isBold />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

/* Internal Helper Components for Layout */
const InfoRow = ({ label, value }) => (
  <div className="flex text-[14px]">
    <span className="w-1/3 text-slate-500 font-medium">{label}</span>
    <span className="w-[20px] text-slate-400">:</span>
    <span className="w-2/3 text-slate-800 font-medium">{value || ''}</span>
  </div>
);

const SummaryRow = ({ label, value, isBold }) => (
  <div className="flex justify-between items-center text-[14px]">
    <span className="text-slate-500 font-medium">{label}</span>
    <div className="flex items-center gap-4">
      <span className="text-slate-400">:</span>
      <span className={`min-w-[80px] text-right ${isBold ? 'font-bold text-slate-900 text-base' : 'font-semibold text-slate-700'}`}>
        {value}
      </span>
    </div>
  </div>
);