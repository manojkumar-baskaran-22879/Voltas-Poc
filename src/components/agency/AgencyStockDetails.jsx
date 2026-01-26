// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// const AgencyStockDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         setLoading(true);
//         const authResponse = await window.catalyst.auth.generateAuthToken();
//         const response = await fetch(
//           `https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/agency_wise_stock/${id}`,
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
//       <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
//         <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
//         <p className="text-slate-600 font-medium">Loading details...</p>
//       </div>
//     );
//   }

//   if (error) return <div className="p-8 text-red-500 text-center">Error: {error}</div>;
//   if (!data) return <div className="p-8 text-center">No record found.</div>;

//   // Helper to render label-value pairs
//   const InfoRow = ({ label, value, type = "text" }) => (
//     <div className="flex items-start py-2 text-sm">
//       <div className="w-1/3 text-slate-500">{label}</div>
//       <div className="w-4 text-slate-400">:</div>
//       <div className="w-2/3 font-medium text-slate-900">
//         {type === "checkbox" ? (
//           <input type="checkbox" checked={value} readOnly className="h-4 w-4 rounded border-gray-300 text-blue-600" />
//         ) : (
//           value || '-'
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Header */}
//       <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
//         <div className="flex items-center gap-4">
//           <button onClick={() => navigate(-1)} className="text-slate-600 hover:text-slate-900">
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
//             </svg>
//           </button>
//           <h1 className="text-xl font-semibold text-slate-800">{id}</h1>
//         </div>
//         <button className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
//           Edit
//         </button>
//       </div>

//       <div className="max-w-7xl mx-auto px-8 py-8 space-y-12">
//         {/* Section 1: Agency Wise Stock Information */}
//         <section>
//           <h2 className="text-lg font-bold text-slate-800 mb-6">Agency Wise Stock Information</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24">
//             <div className="space-y-1">
//               <InfoRow label="Agency Wise Stock Name" value={data.Name} />
//               <InfoRow label="Part Name" value={data.Stock_Details?.name} />
//               <InfoRow label="Spares/Service Category" value={data.Spares_Service_Category} />
//               <InfoRow label="Email" value={data.Email} />
//             </div>
//             <div className="space-y-1">
//               <InfoRow label="Agency" value={data.Agency?.name} />
//               <InfoRow label="Agency Name" value={data.Agency_Name} />
//               <InfoRow label="Secondary Email" value={data.Secondary_Email} />
//               <InfoRow label="Email Opt Out" value={data.Email_Opt_Out} type="checkbox" />
//             </div>
//           </div>
//         </section>

//         {/* Section 2: Stock Information */}
//         <section>
//           <h2 className="text-lg font-bold text-slate-800 mb-6">Stock Information</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24">
//             <div className="space-y-1">
//               <InfoRow label="Usage Unit" value={data.Usage_Unit} />
//               <InfoRow label="Quantity In Stock" value={data.Quantity_In_Stock} />
//             </div>
//             <div className="space-y-1">
//               <InfoRow label="Quantity Ordered" value={data.Quantity_Ordered} />
//               <InfoRow label="Re Order Level" value={data.Re_Order_Level} />
//               <InfoRow label="Quantity In Demand" value={data.Quantity_In_Demand} />
//             </div>
//           </div>
//         </section>

//         {/* Section 3: Stock Location */}
//         <section>
//           <h2 className="text-lg font-bold text-slate-800 mb-6">Stock Location</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24">
//             <div className="space-y-1">
//               <InfoRow label="Row Number" value={data.Row_Number} />
//               <InfoRow label="Shelf Number" value={data.Shelf_Number} />
//             </div>
//             <div className="space-y-1">
//               <InfoRow label="Pallet Number" value={data.Pallet_Number} />
//               <InfoRow label="Bay Number" value={data.Bay_Number} />
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default AgencyStockDetails;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AgencyStockModal from './AgencyStockModal';

const AgencyStockDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const authResponse = await window.catalyst.auth.generateAuthToken();
      const response = await fetch(
        `https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/agency_wise_stock/${id}`,
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

  const InfoRow = ({ label, value, type = "text" }) => (
    <div className="flex items-start py-2 text-sm">
      <div className="w-1/3 text-slate-500">{label}</div>
      <div className="w-4 text-slate-400">:</div>
      <div className="w-2/3 font-medium text-slate-900">
        {type === "checkbox" ? (
          <input type="checkbox" checked={!!value} readOnly className="h-4 w-4 rounded border-gray-300 text-blue-600" />
        ) : (
          value || '-'
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-600 font-medium">Loading details...</p>
      </div>
    );
  }

  if (error) return <div className="p-8 text-red-500 text-center">Error: {error}</div>;
  if (!data) return <div className="p-8 text-center">No record found.</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-slate-600 hover:text-slate-900">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold text-slate-800">{data.Name || id}</h1>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Edit
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8 space-y-12">
        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-6">Agency Wise Stock Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24">
            <div className="space-y-1">
              <InfoRow label="Agency Wise Stock Name" value={data.Name} />
              <InfoRow label="Part Name" value={data.Stock_Details?.name} />
              <InfoRow label="Spares/Service Category" value={data.Spares_Service_Category} />
              <InfoRow label="Email" value={data.Email} />
            </div>
            <div className="space-y-1">
              <InfoRow label="Agency" value={data.Agency?.name} />
              <InfoRow label="Agency Name" value={data.Agency_Name} />
              <InfoRow label="Secondary Email" value={data.Secondary_Email} />
              <InfoRow label="Email Opt Out" value={data.Email_Opt_Out} type="checkbox" />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-6">Stock Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24">
            <div className="space-y-1">
              <InfoRow label="Usage Unit" value={data.Usage_Unit} />
              <InfoRow label="Quantity In Stock" value={data.Quantity_In_Stock} />
            </div>
            <div className="space-y-1">
              <InfoRow label="Quantity Ordered" value={data.Quantity_Ordered} />
              <InfoRow label="Re Order Level" value={data.Re_Order_Level} />
              <InfoRow label="Quantity In Demand" value={data.Quantity_In_Demand} />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-6">Stock Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24">
            <div className="space-y-1">
              <InfoRow label="Row Number" value={data.Row_Number} />
              <InfoRow label="Shelf Number" value={data.Shelf_Number} />
            </div>
            <div className="space-y-1">
              <InfoRow label="Pallet Number" value={data.Pallet_Number} />
              <InfoRow label="Bay Number" value={data.Bay_Number} />
            </div>
          </div>
        </section>
      </div>

      {/* Modal for Edit */}
      <AgencyStockModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        editData={data} 
        onSuccess={fetchDetails} 
      />
    </div>
  );
};

export default AgencyStockDetails;