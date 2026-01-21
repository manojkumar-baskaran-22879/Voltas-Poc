// import React, { useState, useEffect } from 'react';
// import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';
// import CreateChallanModal from './CreateChallanModal';

// const DefectiveChallan = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [challans, setChallans] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const API_URL = "https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/defective_challan?fields=Name,Defective_Challan_Name_1,Sales_Order_Number,GRN_Number,Defective_Chalan_Status&page=1&per_page=200";

//   const fetchData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const authResponse = await window.catalyst.auth.generateAuthToken();
//       const apiResponse = await fetch(API_URL,{
//           headers: {
//             Authorization: `${authResponse.access_token}`, // Ensure Bearer is prefixed if required by your API
//             "Content-Type": "application/json",
//           },
//           method: 'GET',
//         });
//       if (!apiResponse.ok) throw new Error('Failed to fetch data');
//       const result = await apiResponse.json();
//       setChallans(result.data || []);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const getStatusStyle = (status) => {
//     switch (status) {
//       case 'Accepted':
//       case 'Collected':
//         return 'bg-emerald-50 text-emerald-600 border border-emerald-100';
//       case 'In Progress':
//         return 'bg-amber-50 text-amber-600 border border-amber-100';
//       case 'Claimed':
//         return 'bg-blue-50 text-blue-600 border border-blue-100';
//       default:
//         return 'bg-slate-50 text-slate-500 border border-slate-100';
//     }
//   };

//   return (
//     <div className="relative min-h-screen font-sans bg-slate-50">
//       <div className="p-4 md:p-8">
//         {/* Header Section */}
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Defective Challan</h1>
//             <p className="text-sm text-slate-500 mt-1">Manage and track your hardware returns</p>
//           </div>
//           <div className="flex gap-3">
//             <button 
//               onClick={fetchData}
//               className="p-2.5 text-slate-500 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-all active:rotate-180 duration-500"
//               title="Refresh Data"
//             >
//               <RefreshCw size={18} />
//             </button>
//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="bg-[#00579c] hover:bg-[#004a85] text-white px-8 py-2.5 rounded-full text-sm font-bold shadow-md transition-all active:scale-95"
//             >
//               Create
//             </button>
//           </div>
//         </div>

//         {/* Table/Content Section */}
//         <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
//           {loading ? (
//             <div className="flex flex-col items-center justify-center py-20">
//               <Loader2 className="animate-spin text-[#00579c] mb-4" size={40} />
//               <p className="text-slate-500 font-medium">Fetching records...</p>
//             </div>
//           ) : error ? (
//             <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
//               <AlertCircle className="text-red-400 mb-4" size={40} />
//               <h3 className="text-slate-800 font-bold text-lg">Oops! Something went wrong</h3>
//               <p className="text-slate-500 mb-6">{error}</p>
//               <button onClick={fetchData} className="text-[#00579c] font-bold underline">Try Again</button>
//             </div>
//           ) : (
//             <div className="overflow-x-auto w-full touch-pan-x">
//               <table className="w-full text-left min-w-[700px]">
//                 <thead>
//                   <tr className="bg-[#f8fafc] text-[#718ebf] text-[11px] font-bold uppercase tracking-widest border-b border-slate-100">
//                     <th className="px-6 py-5">Challan ID</th>
//                     <th className="px-6 py-5">Name</th>
//                     <th className="px-6 py-5 whitespace-nowrap">Order Num</th>
//                     <th className="px-6 py-5">GRN Number</th>
//                     <th className="px-6 py-5">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-slate-50">
//                   {challans.length > 0 ? (
//                     challans.map((item) => (
//                       <tr key={item.id} className="text-sm text-slate-600 hover:bg-slate-50 transition-colors group">
//                         <td className="px-6 py-5 text-[#3b82f6] font-semibold whitespace-nowrap cursor-pointer hover:underline">
//                           {item.Name || '---'}
//                         </td>
//                         <td className="px-6 py-5 whitespace-nowrap font-medium text-slate-700">
//                           {item.Defective_Challan_Name_1 || '---'}
//                         </td>
//                         <td className="px-6 py-5 whitespace-nowrap text-slate-500">
//                           {item.Sales_Order_Number || '---'}
//                         </td>
//                         <td className="px-6 py-5 whitespace-nowrap text-slate-500">
//                           {item.GRN_Number || '---'}
//                         </td>
//                         <td className="px-6 py-5">
//                           <span className={`px-3 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider ${getStatusStyle(item.Defective_Chalan_Status)}`}>
//                             {item.Defective_Chalan_Status || 'Pending'}
//                           </span>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="5" className="px-6 py-20 text-center text-slate-400 italic">No records found.</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>

//       <CreateChallanModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onCreate={() => {
//           console.log("New Challan Request Sent");
//           fetchData(); // Refresh list after creation
//         }}
//       />
//     </div>
//   );
// };

// export default DefectiveChallan;

import React, { useState, useEffect } from 'react';
import CreateChallanModal from './CreateChallanModal';
import { Link } from 'react-router-dom';

const DefectiveChallan = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [challans, setChallans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/defective_challan?fields=Name,Defective_Challan_Name_1,Sales_Order_Number,GRN_Number,Defective_Chalan_Status&page=1&per_page=200";

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const authResponse = await window.catalyst.auth.generateAuthToken();
      const apiResponse = await fetch(API_URL, {
        headers: {
          Authorization: `${authResponse.access_token}`,
          "Content-Type": "application/json",
        },
        method: 'GET',
      });
      if (!apiResponse.ok) throw new Error(`Error ${apiResponse.status}: ${apiResponse.statusText}`);
      const result = await apiResponse.json();
      setChallans(result.data || []);
    } catch (err) {
      console.error("Error fetching challans:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-600 font-medium">Loading...</p>
      </div>
    );
  }

  return (
    <div className="px-4 pb-8 bg-slate-50/50 min-h-screen">
      {/* Header section styled like SalesReturn */}
      <div className="flex justify-between items-center py-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Defective Challan</h2>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#0066b2] hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors shadow-sm"
        >
          Create
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide">Challan ID</th>
                <th className="px-6 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide">Name</th>
                <th className="px-6 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide">Order Num</th>
                <th className="px-6 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide">GRN Number</th>
                <th className="px-6 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {error ? (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-rose-600 font-medium text-sm">
                    Error: {error}
                  </td>
                </tr>
              ) : challans.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-slate-400 text-sm">
                    No records found.
                  </td>
                </tr>
              ) : (
                challans.map((item, idx) => (
                  <tr key={item.id || idx} className="hover:bg-slate-50/80 transition-colors group">
                    {/* <td className="px-6 py-5 whitespace-nowrap">
                      <span className="text-blue-600 font-bold text-sm hover:text-blue-800 transition-colors duration-200 cursor-pointer">
                        {item.Name || '-'}
                      </span>
                    </td> */}
                    <td className="px-6 py-5 whitespace-nowrap">
                      <Link
                        to={`/defective-challan/${item.id}`}
                        className="text-blue-600 font-bold text-sm hover:text-blue-800 transition-colors duration-200"
                      >
                        {item.Name || '-'}
                      </Link>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-slate-900">
                      {item.Defective_Challan_Name_1 || '-'}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-600 font-medium">
                      {item.Sales_Order_Number || '-'}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-700">
                      {item.GRN_Number || '-'}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-md text-[12px] font-bold border ${
                        item.Defective_Chalan_Status === 'Accepted' || item.Defective_Chalan_Status === 'Collected'
                          ? 'bg-green-50 text-green-700 border-green-100' 
                          : item.Defective_Chalan_Status === 'Claimed'
                          ? 'bg-blue-50 text-blue-700 border-blue-100'
                          : 'bg-amber-50 text-amber-700 border-amber-100'
                      }`}>
                        {item.Defective_Chalan_Status || 'In Progress'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CreateChallanModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onCreate={fetchData}
      />
    </div>
  );
};

export default DefectiveChallan;