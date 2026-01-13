// import React, { useState, useEffect } from 'react';
// import AgencyStockModal from './AgencyStockModal';

// const AgencyStock = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [stockData, setStockData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // --- API FETCH LOGIC ---
//   const fetchStockData = async () => {
//     setIsLoading(true);
//     const apiUrl = "https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/agency_wise_stock?fields=Name,Agency,Agency_Name,Stock_Details,Spares_Service_Category&page=1&per_page=200";
    
//     try {
//       var auth = window.catalyst.auth;
//         await window.catalyst.auth.generateAuthToken().then(async (response) => {
//         console.log("SUCCESS: " + JSON.stringify(response));
//         try {
//         setIsLoading(true);
//         const apiResponse = await fetch(apiUrl,{
//           headers: {
//                         Authorization: `${response.access_token}`,
//                         "Content-Type": "application/json",
//                     },
//                     method: 'GET',
//         });
//         if (!apiResponse.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const result = await apiResponse.json();
//         // The API returns an object with a "data" array
//         setStockData(result.data || []);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//         //const token = response.access_token; 
//         //setToken(token);
//   })
//   .catch((err) => {
//     console.error("ERROR1: " + JSON.stringify(err));
//     console.log("E1: "+err.message);
//     console.log("E2: "+err);
//   });
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStockData();
//   }, []);

//   const handleCreateStock = (formData) => {
//     console.log("Creating stock with data:", formData);
//     // After successful creation, you might want to re-fetch the data:
//     // fetchStockData();
//   };

//   return (
//     <div className="p-4 lg:p-6 bg-slate-50 min-h-full">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6 px-2">
//         <h2 className="text-xl font-bold text-slate-800">Agency Wise Stock</h2>
//         <button 
//           onClick={() => setIsModalOpen(true)}
//           className="bg-[#0066b2] hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors shadow-sm"
//         >
//           Create
//         </button>
//       </div>
      
//       {/* Table Section */}
//       <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="bg-[#eef5ff] text-[#0066b2] text-[11px] font-bold uppercase tracking-wider border-b border-slate-100">
//                 <th className="px-6 py-4">Agency Wise Stock Name</th>
//                 <th className="px-6 py-4">Agency</th>
//                 <th className="px-6 py-4">Agency Name</th>
//                 <th className="px-6 py-4">Part Name</th>
//                 <th className="px-6 py-4">Spares/Service Category</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100">
//               {isLoading ? (
//                 <tr>
//                   <td colSpan="5" className="px-6 py-10 text-center text-slate-400">
//                     <div className="flex flex-col items-center gap-2">
//                       <div className="w-6 h-6 border-2 border-[#0066b2] border-t-transparent rounded-full animate-spin"></div>
//                       <span>Loading stock data...</span>
//                     </div>
//                   </td>
//                 </tr>
//               ) : error ? (
//                 <tr>
//                   <td colSpan="5" className="px-6 py-10 text-center text-red-500 font-medium">
//                     Error: {error}
//                   </td>
//                 </tr>
//               ) : stockData.length === 0 ? (
//                 <tr>
//                   <td colSpan="5" className="px-6 py-10 text-center text-slate-400">
//                     No records found.
//                   </td>
//                 </tr>
//               ) : (
//                 stockData.map((item, idx) => (
//                   <tr key={idx} className="hover:bg-slate-50 transition-colors text-sm text-slate-600">
//                     <td className="px-6 py-4 text-blue-500 font-medium cursor-pointer hover:underline">
//                       {item.Name || "N/A"}
//                     </td>
//                     <td className="px-6 py-4">{item.Agency || "N/A"}</td>
//                     <td className="px-6 py-4">{item.Agency_Name || "N/A"}</td>
//                     <td className="px-6 py-4">{item.Stock_Details || "N/A"}</td>
//                     <td className="px-6 py-4">
//                       <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-md text-xs font-medium">
//                         {item.Spares_Service_Category || "Uncategorized"}
//                       </span>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Reusable Stepper Modal */}
//       <AgencyStockModal 
//         isOpen={isModalOpen} 
//         onClose={() => setIsModalOpen(false)} 
//         onSubmit={handleCreateStock}
//       />
//     </div>
//   );
// };

// export default AgencyStock;

import React, { useState, useEffect } from 'react';
import AgencyStockModal from './AgencyStockModal';

const AgencyStock = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stockData, setStockData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStockData = async () => {
    setIsLoading(true);
    const apiUrl = "https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/agency_wise_stock?fields=Name,Agency,Agency_Name,Stock_Details,Spares_Service_Category&page=1&per_page=200";
    
    try {
      // 1. Generate the Auth Token
      const authResponse = await window.catalyst.auth.generateAuthToken();
      
      // 2. Fetch the Data using the token
      const apiResponse = await fetch(apiUrl, {
        headers: {
          Authorization: `${authResponse.access_token}`, // Standard Bearer format
          "Content-Type": "application/json",
        },
        method: 'GET',
      });

      if (!apiResponse.ok) {
        throw new Error(`Error ${apiResponse.status}: ${apiResponse.statusText}`);
      }

      const result = await apiResponse.json();
      setStockData(result.data || []);
    } catch (err) {
      console.error("Fetch Error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStockData();
  }, []);

  const handleCreateStock = (formData) => {
    console.log("Creating stock with data:", formData);
  };

  return (
    <div className="p-4 lg:p-6 bg-slate-50 min-h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="text-xl font-bold text-slate-800">Agency Wise Stock</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#0066b2] hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors shadow-sm"
        >
          Create
        </button>
      </div>
      
      {/* Table Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#eef5ff] text-[#0066b2] text-[11px] font-bold uppercase tracking-wider border-b border-slate-100">
                <th className="px-6 py-4">Agency Wise Stock Name</th>
                <th className="px-6 py-4">Agency ID</th>
                <th className="px-6 py-4">Agency Name</th>
                <th className="px-6 py-4">Part Name</th>
                <th className="px-6 py-4">Spares/Service Category</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-6 h-6 border-2 border-[#0066b2] border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-slate-400 text-sm">Loading stock data...</span>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-red-500 font-medium text-sm">
                    Error: {error}
                  </td>
                </tr>
              ) : stockData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-slate-400 text-sm">
                    No records found.
                  </td>
                </tr>
              ) : (
                stockData.map((item, idx) => (
                  <tr key={item.id || idx} className="hover:bg-slate-50 transition-colors text-sm text-slate-600">
                    <td className="px-6 py-4 text-blue-500 font-medium cursor-pointer hover:underline">
                      {item.Name || "N/A"}
                    </td>
                    {/* Accessing .name property of the Agency object */}
                    <td className="px-6 py-4">
                      {item.Agency?.name || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      {item.Agency_Name || "N/A"}
                    </td>
                    {/* Accessing .name property of the Stock_Details object */}
                    <td className="px-6 py-4">
                      {item.Stock_Details?.name || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-md text-[11px] font-semibold uppercase">
                        {item.Spares_Service_Category || "N/A"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AgencyStockModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleCreateStock}
      />
    </div>
  );
};

export default AgencyStock;