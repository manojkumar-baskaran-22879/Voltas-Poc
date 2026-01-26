// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// const DefectiveChallanDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         const authResponse = await window.catalyst.auth.generateAuthToken();
//         const response = await fetch(
//           `https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/defective_challan/${id}`,
//           {
//             headers: {
//               Authorization: `${authResponse.access_token}`,
//               "Content-Type": "application/json",
//             },
//             method: 'GET',
//           }
//         );

//         if (!response.ok) throw new Error('Failed to fetch details');
        
//         const result = await response.json();
//         setData(result.data[0]);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDetails();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-white">
//         <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4"></div>
//         <p className="text-slate-500 font-medium">Loading details...</p>
//       </div>
//     );
//   }

//   if (error || !data) {
//     return <div className="p-8 text-rose-600">Error: {error || "Record not found"}</div>;
//   }

//   const InfoRow = ({ label, value }) => (
//     <div className="flex items-start py-2">
//       <span className="w-48 text-slate-500 text-sm leading-relaxed">{label}</span>
//       <span className="mx-4 text-slate-400">:</span>
//       <span className="flex-1 text-slate-900 text-sm font-medium leading-relaxed">{value || '-'}</span>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-white font-sans">
//       {/* Top Header */}
//       <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
//         <div className="flex items-center gap-4">
//           <button 
//             onClick={() => navigate(-1)} 
//             className="p-1 hover:bg-slate-100 rounded-full transition-colors"
//           >
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
//               <path d="M15 18l-6-6 6-6" />
//             </svg>
//           </button>
//           <h1 className="text-xl font-semibold text-slate-800">{data.id}</h1>
//         </div>
//         <button className="bg-[#0066b2] hover:bg-blue-700 text-white px-6 py-1.5 rounded-lg text-sm font-medium transition-colors">
//           Edit
//         </button>
//       </div>

//       <div className="max-w-7xl mx-auto p-8">
//         {/* Section 1: Defective Challan Information */}
//         <section className="mb-12">
//           <h2 className="text-lg font-bold text-slate-900 mb-6">Defective Challan Information</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
//             <div className="space-y-1">
//               <InfoRow label="Sales Order Number" value={data.Sales_Order_Number} />
//               <InfoRow label="Email" value={data.Email} />
//               <InfoRow label="Service Request ID" value={data.Service_Request_ID?.name} />
//               <InfoRow label="Agency" value={data.Agency?.name} />
//             </div>
//             <div className="space-y-1">
//               <InfoRow label="Defective Challan Name" value={data.Defective_Challan_Name_1} />
//               <InfoRow label="Defective Chalan Status" value={data.Defective_Chalan_Status} />
//               <InfoRow label="GRN Number" value={data.GRN_Number} />
//               <InfoRow label="Spare Invoice Number" value={data.Spare_Invoice_Number} />
//               <InfoRow label="Secondary Email" value={data.Secondary_Email} />
//             </div>
//           </div>
//         </section>

//         {/* Section 2: Product Details */}
//         <section>
//           <h2 className="text-lg font-bold text-slate-900 mb-6">Product Details</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
//             <div className="space-y-1">
//               <InfoRow label="Part Name" value={data.Part_Name} />
//               <InfoRow label="Part Quantity" value={data.Part_Quantity} />
//             </div>
//             <div className="space-y-1">
//               <InfoRow label="Part ID" value={data.Part_ID?.name} />
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default DefectiveChallanDetails;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CreateChallanModal from './CreateChallanModal'; // Ensure the path is correct

const DefectiveChallanDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const authResponse = await window.catalyst.auth.generateAuthToken();
      const response = await fetch(
        `https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/defective_challan/${id}`,
        {
          headers: {
            Authorization: `${authResponse.access_token}`,
            "Content-Type": "application/json",
          },
          method: 'GET',
        }
      );

      if (!response.ok) throw new Error('Failed to fetch details');
      
      const result = await response.json();
      setData(result.data[0]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-medium">Loading details...</p>
      </div>
    );
  }

  if (error || !data) {
    return <div className="p-8 text-rose-600">Error: {error || "Record not found"}</div>;
  }

  const InfoRow = ({ label, value }) => (
    <div className="flex items-start py-2">
      <span className="w-48 text-slate-500 text-sm leading-relaxed">{label}</span>
      <span className="mx-4 text-slate-400">:</span>
      <span className="flex-1 text-slate-900 text-sm font-medium leading-relaxed">{value || '-'}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Top Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)} 
            className="p-1 hover:bg-slate-100 rounded-full transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold text-slate-800">{data.Name || data.id}</h1>
        </div>
        <button 
          onClick={() => setIsEditModalOpen(true)}
          className="bg-[#0066b2] hover:bg-blue-700 text-white px-6 py-1.5 rounded-lg text-sm font-medium transition-colors"
        >
          Edit
        </button>
      </div>

      <div className="max-w-7xl mx-auto p-8">
        {/* Section 1: Defective Challan Information */}
        <section className="mb-12">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Defective Challan Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
            <div className="space-y-1">
              <InfoRow label="Sales Order Number" value={data.Sales_Order_Number} />
              <InfoRow label="Email" value={data.Email} />
              <InfoRow label="Service Request ID" value={data.Service_Request_ID?.name} />
              <InfoRow label="Agency" value={data.Agency?.name} />
            </div>
            <div className="space-y-1">
              <InfoRow label="Defective Challan Name" value={data.Defective_Challan_Name_1} />
              <InfoRow label="Defective Chalan Status" value={data.Defective_Chalan_Status} />
              <InfoRow label="GRN Number" value={data.GRN_Number} />
              <InfoRow label="Spare Invoice Number" value={data.Spare_Invoice_Number} />
              <InfoRow label="Secondary Email" value={data.Secondary_Email} />
            </div>
          </div>
        </section>

        {/* Section 2: Product Details */}
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-6">Product Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
            <div className="space-y-1">
              <InfoRow label="Part Name" value={data.Part_Name} />
              <InfoRow label="Part Quantity" value={data.Part_Quantity} />
            </div>
            <div className="space-y-1">
              <InfoRow label="Part ID" value={data.Part_ID?.name} />
            </div>
          </div>
        </section>
      </div>

      {/* Edit Modal Component */}
      <CreateChallanModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        editData={data} 
        onSuccess={() => {
          setIsEditModalOpen(false);
          fetchDetails(); // Refresh the page data
        }}
      />
    </div>
  );
};

export default DefectiveChallanDetails;