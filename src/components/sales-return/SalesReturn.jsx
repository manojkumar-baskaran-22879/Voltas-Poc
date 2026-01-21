// import React, { useState, useEffect } from 'react';
// import CreateSalesReturnModal from './CreateSalesReturnModal';

// const SalesReturn = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // API Integration
//   const fetchData = async () => {
//     setLoading(true);
//     const apiUrl = 'https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/sales_return_order?fields=Name,Invoice_Number,Return_Reason,Sales_Return_Status,Sales_Return_Name&page=1&per_page=200';
//     try {
//       const authResponse = await window.catalyst.auth.generateAuthToken();
      
//       // 2. Fetch the Data using the token
//       const apiResponse = await fetch(apiUrl, {
//         headers: {
//           Authorization: `${authResponse.access_token}`, // Standard Bearer format
//           "Content-Type": "application/json",
//         },
//         method: 'GET',
//       });

//       if (!apiResponse.ok) {
//         throw new Error(`Error ${apiResponse.status}: ${apiResponse.statusText}`);
//       }

//       const result = await apiResponse.json();
//       setData(result.data || []);
//     } catch (error) {
//       console.error("Error fetching sales returns:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div className="p-4 lg:p-6 bg-slate-50 min-h-screen">
//       <div className="flex justify-between items-center mb-6 px-2">
//         <h2 className="text-xl font-bold text-slate-800">Sales Return Order</h2>
//         <button 
//           onClick={() => setIsModalOpen(true)}
//           className="bg-[#0066b2] hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors shadow-sm"
//         >
//           Create
//         </button>
//       </div>
      
//       <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="bg-[#eef5ff] text-[#0066b2] text-[11px] font-bold uppercase tracking-wider border-b border-slate-100">
//                 <th className="px-6 py-4">Sales Return Order ID</th>
//                 <th className="px-6 py-4">Invoice Number</th>
//                 <th className="px-6 py-4">Sales Return Name</th>
//                 <th className="px-6 py-4">Return Reason</th>
//                 <th className="px-6 py-4">Sales Return Status</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100">
//               {loading ? (
//                 <tr>
//                   <td colSpan="5" className="px-6 py-10 text-center text-slate-400 italic">Loading records...</td>
//                 </tr>
//               ) : data.length === 0 ? (
//                 <tr>
//                   <td colSpan="5" className="px-6 py-10 text-center text-slate-400">No records found</td>
//                 </tr>
//               ) : (
//                 data.map((item, idx) => (
//                   <tr key={idx} className="hover:bg-slate-50 transition-colors text-sm text-slate-600">
//                     <td className="px-6 py-4 text-blue-500 font-medium cursor-pointer">{item.Name}</td>
//                     <td className="px-6 py-4">{item.Invoice_Number}</td>
//                     <td className="px-6 py-4">{item.Sales_Return_Name}</td>
//                     <td className="px-6 py-4 text-slate-500">{item.Return_Reason || '-'}</td>
//                     <td className="px-6 py-4">
//                       <span className={`px-2 py-1 rounded-md text-xs font-medium ${
//                         item.Sales_Return_Status === 'Claimed' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
//                       }`}>
//                         {item.Sales_Return_Status || 'In Progress'}
//                       </span>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <CreateSalesReturnModal 
//         isOpen={isModalOpen} 
//         onClose={() => setIsModalOpen(false)} 
//         onSuccess={fetchData} // Refresh table after create
//       />
//     </div>
//   );
// };

// export default SalesReturn;

import React, { useState, useEffect } from 'react';
import CreateSalesReturnModal from './CreateSalesReturnModal';
import { Link } from 'react-router-dom';

const SalesReturn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API Integration
  const fetchData = async () => {
    setLoading(true);
    const apiUrl = 'https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/sales_return_order?fields=Name,Invoice_Number,Return_Reason,Sales_Return_Status,Sales_Return_Name&page=1&per_page=200';
    try {
      const authResponse = await window.catalyst.auth.generateAuthToken();
      
      const apiResponse = await fetch(apiUrl, {
        headers: {
          Authorization: `${authResponse.access_token}`,
          "Content-Type": "application/json",
        },
        method: 'GET',
      });

      if (!apiResponse.ok) {
        throw new Error(`Error ${apiResponse.status}: ${apiResponse.statusText}`);
      }

      const result = await apiResponse.json();
      setData(result.data || []);
    } catch (error) {
      console.error("Error fetching sales returns:", error);
      setError(error.message);
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
      {/* Header section styled like ServiceRequest/AgencyStock */}
      <div className="flex justify-between items-center py-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Sales Return Order</h2>
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
                <th className="px-6 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide">Sales Return Order ID</th>
                <th className="px-6 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide">Invoice Number</th>
                <th className="px-6 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide">Sales Return Name</th>
                <th className="px-6 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide">Return Reason</th>
                <th className="px-6 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide">Sales Return Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {error ? (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-rose-600 font-medium text-sm">
                    Error: {error}
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-slate-400 text-sm">
                    No records found.
                  </td>
                </tr>
              ) : (
                data.map((item, idx) => (
                  <tr key={item.id || idx} className="hover:bg-slate-50/80 transition-colors group">
                    {/* <td className="px-6 py-5 whitespace-nowrap">
                      <span className="text-blue-600 font-bold text-sm hover:text-blue-800 transition-colors duration-200 cursor-pointer">
                        {item.Name || '-'}
                      </span>
                    </td> */}

                    <td className="px-6 py-5 whitespace-nowrap">
                      <Link
                        to={`/sales-return/${item.id}`} // Ensure your App.js route matches this
                        className="text-blue-600 font-bold text-sm hover:text-blue-800 transition-colors duration-200"
                      >
                        {item.Name || '-'}
                      </Link>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-slate-900">
                      {item.Invoice_Number || '-'}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-600 font-medium">
                      {item.Sales_Return_Name || '-'}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-700">
                      {item.Return_Reason || '-'}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-md text-[12px] font-bold border ${
                        item.Sales_Return_Status === 'Claimed' 
                          ? 'bg-green-50 text-green-700 border-green-100' 
                          : 'bg-amber-50 text-amber-700 border-amber-100'
                      }`}>
                        {item.Sales_Return_Status || 'In Progress'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CreateSalesReturnModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchData}
      />
    </div>
  );
};

export default SalesReturn;