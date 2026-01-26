// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// export const WorkOrderDetails = () => {
//   const { id } = useParams();
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchDetail = async () => {
//       try {
//         const authResponse = await window.catalyst.auth.generateAuthToken();
//         const response = await fetch(`https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/work_order/${id}`, {
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
//   }, [id]);

// //   if (loading) return <div className="p-10 text-center font-sans text-slate-500">Loading Order Details...</div>;

// if (loading) return (
//         <div className="flex flex-col items-center justify-center h-screen space-y-4 bg-white">
//             <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-100 border-t-[#0070BA]"></div>
//             <p className="text-gray-400 text-sm font-medium">Loading details...</p>
//         </div>
//     );
//   if (!data) return <div className="p-10 text-center">No data found.</div>;

//   return (
//     <div className="min-h-screen bg-white font-sans text-[#334155] antialiased">
//       {/* Top Header */}
//       <div className="flex items-center px-6 py-4 border-b border-slate-100">
//         <button onClick={() => navigate('/work-orders')} className="mr-4 text-[#00579c]">
//           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
//           </svg>
//         </button>
//         <h1 className="text-xl font-semibold text-slate-800 tracking-tight">Order ID: {id}</h1>
//       </div>

//       <div className="p-10 max-w-[1200px]">
//         {/* Work Order Information Section */}
//         <section className="mb-12">
//           <h2 className="text-[17px] font-bold text-slate-800 mb-6">Work Order Information</h2>
//           <div className="grid grid-cols-2 gap-x-24 gap-y-4">
//             <InfoRow label="Subject" value={data.Subject} />
//             <InfoRow label="Customer No." value={data.Customer_No} />
//             <InfoRow label="Estimation Name" value={data.Quote_Name?.name} />
//             <InfoRow label="Service Request ID" value={data.Service_Request_ID?.name} />
//             <InfoRow label="Agency" value={data.Agency?.name} />
//             <InfoRow label="Pending" value={data.Pending} />
//             <InfoRow label="Carrier" value={data.Carrier} />
//             <InfoRow label="Dealer Name" value={data.Account_Name?.name} />
//           </div>
//         </section>

//         {/* Address Information Section */}
//         <section className="mb-12">
//           <h2 className="text-[17px] font-bold text-slate-800 mb-6">Address Information</h2>
//           <div className="grid grid-cols-2 gap-x-24 gap-y-4">
//             <div className="space-y-4">
//               <InfoRow label="Billing Street" value={data.Billing_Street} />
//               <InfoRow label="Billing City" value={data.Billing_City} />
//               <InfoRow label="Billing State" value={data.Billing_State} />
//               <InfoRow label="Billing Code" value={data.Billing_Code} />
//               <InfoRow label="Billing Country" value={data.Billing_Country} />
//             </div>
//             <div className="space-y-4">
//               <InfoRow label="Shipping Street" value={data.Shipping_Street} />
//               <InfoRow label="Shipping City" value={data.Shipping_City} />
//               <InfoRow label="Shipping State" value={data.Shipping_State} />
//               <InfoRow label="Shipping Code" value={data.Shipping_Code} />
//               <InfoRow label="Shipping Country" value={data.Shipping_Country} />
//             </div>
//           </div>
//         </section>

//         {/* Ordered Items Section */}
//         <section className="mt-16">
//           <h2 className="text-[17px] font-bold text-slate-800 mb-6">Ordered Items</h2>
//           <div className="border border-slate-100 rounded-sm overflow-hidden mb-8">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="bg-[#e2efff] text-[#475b83]">
//                   <th className="px-4 py-3 text-[12px] font-bold uppercase tracking-wider border-r border-white/50">S.NO</th>
//                   <th className="px-4 py-3 text-[12px] font-bold uppercase tracking-wider border-r border-white/50">SPARES/SERVICE NAME</th>
//                   <th className="px-4 py-3 text-[12px] font-bold uppercase tracking-wider border-r border-white/50 text-center">QUANTITY</th>
//                   <th className="px-4 py-3 text-[12px] font-bold uppercase tracking-wider border-r border-white/50 text-right">LIST PRICE (RS.)</th>
//                   <th className="px-4 py-3 text-[12px] font-bold uppercase tracking-wider border-r border-white/50 text-right">AMOUNT (RS.)</th>
//                   <th className="px-4 py-3 text-[12px] font-bold uppercase tracking-wider border-r border-white/50 text-right">DISCOUNT (RS.)</th>
//                   <th className="px-4 py-3 text-[12px] font-bold uppercase tracking-wider border-r border-white/50 text-right">TAX (RS.)</th>
//                   <th className="px-4 py-3 text-[12px] font-bold uppercase tracking-wider text-right">TOTAL (RS.)</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-50">
//                 {data.Ordered_Items?.map((item, idx) => (
//                   <tr key={idx} className="text-[13px] text-slate-700">
//                     <td className="px-4 py-4">{idx + 1}</td>
//                     <td className="px-4 py-4 max-w-[280px]">{item.Product_Name?.name} ({item.Product_Name?.Product_Code})</td>
//                     <td className="px-4 py-4 text-center">{item.Quantity}</td>
//                     <td className="px-4 py-4 text-right">{item.List_Price}</td>
//                     <td className="px-4 py-4 text-right">{item.Total}</td>
//                     <td className="px-4 py-4 text-right">{item.Discount}</td>
//                     <td className="px-4 py-4 text-right">{item.Tax}</td>
//                     <td className="px-4 py-4 text-right">{item.Net_Total}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Totals Summary Card */}
//           <div className="flex justify-end pr-4">
//             <div className="bg-[#f8fbff] border border-[#e2efff] rounded-xl p-6 w-[400px] space-y-4">
//               <SummaryRow label="Sub Total (Rs.)" value={data.Sub_Total} />
//               <SummaryRow label="Discount (Rs.)" value={data.Discount} />
//               <SummaryRow label="Tax (Rs.)" value={data.Tax} />
//               <SummaryRow label="Adjustment (Rs.)" value={data.Adjustment} />
//               <div className="pt-2 border-t border-blue-100 mt-2">
//                 <SummaryRow label="Grand Total (Rs.)" value={data.Grand_Total} isBold />
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// /* Internal Helper Components for Layout */
// const InfoRow = ({ label, value }) => (
//   <div className="flex text-[14px]">
//     <span className="w-1/3 text-slate-500 font-medium">{label}</span>
//     <span className="w-[20px] text-slate-400">:</span>
//     <span className="w-2/3 text-slate-800 font-medium">{value || ''}</span>
//   </div>
// );

// const SummaryRow = ({ label, value, isBold }) => (
//   <div className="flex justify-between items-center text-[14px]">
//     <span className="text-slate-500 font-medium">{label}</span>
//     <div className="flex items-center gap-4">
//       <span className="text-slate-400">:</span>
//       <span className={`min-w-[80px] text-right ${isBold ? 'font-bold text-slate-900 text-base' : 'font-semibold text-slate-700'}`}>
//         {value}
//       </span>
//     </div>
//   </div>
// );

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const WorkOrderDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const authResponse = await window.catalyst.auth.generateAuthToken();
        const response = await fetch(`https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/work_order/${id}`, {
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
  }, [id]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
      <p className="text-slate-600 font-medium">Loading work order details...</p>
    </div>
  );

  if (!data) return <div className="p-10 text-center text-slate-500">No data found.</div>;

  return (
    <div className="bg-slate-50 min-h-screen pt-2 px-4 lg:pt-4 lg:px-8">
      {/* Header Nav */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-slate-200 rounded-full transition-colors"
          >
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800">Order ID: {id}</h2>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 mb-8">
        {/* Work Order Information */}
        <SectionHeader title="Work Order Information" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
          <InfoRow label="Subject" value={data.Subject} />
          <InfoRow label="Customer No." value={data.Customer_No} />
          <InfoRow label="Estimation Name" value={data.Quote_Name?.name} />
          <InfoRow label="Service Request ID" value={data.Service_Request_ID?.name} />
          <InfoRow label="Agency" value={data.Agency?.name} />
          <InfoRow label="Pending" value={data.Pending} />
          <InfoRow label="Carrier" value={data.Carrier} />
          <InfoRow label="Dealer Name" value={data.Account_Name?.name} />
        </div>

        {/* Address Information */}
        <SectionHeader title="Address Information" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
          <div className="space-y-0">
            <h4 className="text-sm font-bold text-blue-600/70 uppercase tracking-wider mb-2 mt-4 md:mt-0">Billing Address</h4>
            <InfoRow label="Street" value={data.Billing_Street} />
            <InfoRow label="City" value={data.Billing_City} />
            <InfoRow label="State" value={data.Billing_State} />
            <InfoRow label="Code" value={data.Billing_Code} />
            <InfoRow label="Country" value={data.Billing_Country} />
          </div>
          <div className="space-y-0 mt-6 md:mt-0">
            <h4 className="text-sm font-bold text-blue-600/70 uppercase tracking-wider mb-2">Shipping Address</h4>
            <InfoRow label="Street" value={data.Shipping_Street} />
            <InfoRow label="City" value={data.Shipping_City} />
            <InfoRow label="State" value={data.Shipping_State} />
            <InfoRow label="Code" value={data.Shipping_Code} />
            <InfoRow label="Country" value={data.Shipping_Country} />
          </div>
        </div>

        {/* Ordered Items Section */}
        <SectionHeader title="Ordered Items" />
        <div className="mt-4 overflow-x-auto rounded-xl border border-slate-100">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 text-slate-600 border-b border-slate-100">
                <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider">S.No</th>
                <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider">Spares/Service Name</th>
                <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-center">Qty</th>
                <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-right">List Price</th>
                <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-right">Amount</th>
                <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-right">Discount</th>
                <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-right">Tax</th>
                <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {data.Ordered_Items?.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-4 text-sm text-slate-500">{idx + 1}</td>
                  <td className="px-4 py-4 text-sm font-medium text-slate-900">
                    <div className="flex flex-col">
                      <span>{item.Product_Name?.name}</span>
                      <span className="text-xs text-slate-400 font-normal">{item.Product_Name?.Product_Code}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-700 text-center">{item.Quantity}</td>
                  <td className="px-4 py-4 text-sm text-slate-700 text-right">{item.List_Price}</td>
                  <td className="px-4 py-4 text-sm text-slate-700 text-right">{item.Total}</td>
                  <td className="px-4 py-4 text-sm text-slate-700 text-right">{item.Discount}</td>
                  <td className="px-4 py-4 text-sm text-slate-700 text-right">{item.Tax}</td>
                  <td className="px-4 py-4 text-sm font-bold text-slate-900 text-right">{item.Net_Total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Summary */}
        <div className="flex justify-end mt-8">
          <div className="w-full md:w-[380px] bg-blue-50/30 rounded-2xl p-6 border border-blue-100/50 space-y-3">
            <SummaryRow label="Sub Total" value={data.Sub_Total} />
            <SummaryRow label="Discount" value={data.Discount} />
            <SummaryRow label="Tax" value={data.Tax} />
            <SummaryRow label="Adjustment" value={data.Adjustment} />
            <div className="pt-3 border-t border-blue-100">
              <SummaryRow label="Grand Total" value={data.Grand_Total} isBold />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Internal Helper Components */
const SectionHeader = ({ title }) => (
  <h3 className="text-lg font-bold text-blue-900 mb-4 mt-8 first:mt-0 pb-2 border-b-2 border-blue-50">
    {title}
  </h3>
);

const InfoRow = ({ label, value }) => (
  <div className="grid grid-cols-2 py-3 text-base border-b border-slate-50 last:border-0 min-w-0">
    <span className="text-slate-500 font-medium truncate pr-2">{label}</span>
    <div className="flex gap-4 min-w-0">
      <span className="text-slate-400 shrink-0">:</span>
      <span className="text-slate-900 break-all md:break-words min-w-0">
        {value || '-'}
      </span>
    </div>
  </div>
);

const SummaryRow = ({ label, value, isBold }) => (
  <div className="flex justify-between items-center text-base">
    <span className="text-slate-600 font-medium">{label}</span>
    <div className="flex items-center gap-4">
      <span className="text-slate-400">:</span>
      <span className={`min-w-[100px] text-right ${isBold ? 'font-bold text-blue-700 text-xl' : 'font-semibold text-slate-900'}`}>
        ₹{value || '0'}
      </span>
    </div>
  </div>
);