// import React, { useState, useEffect } from 'react';
// import EstimationModal from './EstimationModal';
// import { useNavigate, useParams } from 'react-router-dom';

// const Estimations = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//     const [estimations, setEstimations] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const navigate = useNavigate();

//     const apiUrl = "https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/estimations?fields=Owner,Quote_Number,Contact_Name,Account_Name,Subject&page=1&per_page=200";

//     useEffect(() => {
//         const fetchEstimations = async () => {
//             try {
                
//         var auth = window.catalyst.auth;
//         await window.catalyst.auth.generateAuthToken().then(async (response) => {
//         console.log("SUCCESS: " + JSON.stringify(response));
//         try {
//         setLoading(true);
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
//         setEstimations(result.data || []);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//         //const token = response.access_token; 
//         //setToken(token);
//   })
//   .catch((err) => {
//     console.error("ERROR1: " + JSON.stringify(err));
//     console.log("E1: "+err.message);
//     console.log("E2: "+err);
//   });
      
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchEstimations();
//     }, []);

//     const truncateDealerName = (name) => {
//     if (!name) return "";
//     if (name.length > 25) {
//       return name.substring(0, 25) + "...";
//     }
//     return name;
//   };

//     if (loading) return <div className="p-10 text-center">Loading Estimations...</div>;
//     if (error) return <div className="p-10 text-red-500 text-center">Error: {error}</div>;

//    return (
//     <div className="p-4 md:p-8 bg-white min-h-screen">
//       {/* Header Section */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-xl font-semibold text-gray-800 tracking-tight">Estimations</h1>
//         <button 
//           onClick={() => setIsModalOpen(true)}
//           className="bg-[#0070BA] hover:bg-[#005fa3] text-white px-6 py-1.5 rounded-full text-sm font-medium transition-all active:scale-95"
//         >
//           Create
//         </button>
//       </div>

//       {/* Responsive Table Wrapper */}
//       <div className="border border-gray-100 rounded-sm overflow-x-auto shadow-sm">
//         <table className="w-full text-left border-collapse min-w-[1000px]">
//           <thead>
//             <tr className="bg-[#E8F1FD]">
//               <th className="px-6 py-3 text-[11px] font-bold text-[#4A78B3] uppercase tracking-wider border-b border-gray-200">
//                 Estimation Owner
//               </th>
//               <th className="px-6 py-3 text-[11px] font-bold text-[#4A78B3] uppercase tracking-wider border-b border-gray-200">
//                 Estimation Number
//               </th>
//               <th className="px-6 py-3 text-[11px] font-bold text-[#4A78B3] uppercase tracking-wider border-b border-gray-200">
//                 Contact Name
//               </th>
//               <th className="px-6 py-3 text-[11px] font-bold text-[#4A78B3] uppercase tracking-wider border-b border-gray-200">
//                 Dealer Name
//               </th>
//               <th className="px-6 py-3 text-[11px] font-bold text-[#4A78B3] uppercase tracking-wider border-b border-gray-200">
//                 Subject
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {estimations.map((item, index) => (
//               <tr key={item.id || index} className="hover:bg-gray-50 transition-colors">
//                 <td className="px-6 py-4 text-[13px] text-gray-700 font-medium whitespace-nowrap">
//                   {item.Owner?.name || "-"}
//                 </td>
//                 {/* <td className="px-6 py-4 text-[13px] text-gray-600 whitespace-nowrap">
//                   {item.Quote_Number}
//                 </td> */}
//                 <td
//                   className="px-6 py-4 text-[13px] text-[#0070BA] font-medium whitespace-nowrap cursor-pointer hover:underline"
//                   onClick={() => navigate(`/estimations/${item.id}`)}
//                 >
//                   {item.Quote_Number}
//                 </td>
//                 <td className="px-6 py-4 text-[13px] text-gray-600 whitespace-nowrap">
//                   {item.Contact_Name?.name || "-"}
//                 </td>
//                 <td 
//                   className="px-6 py-4 text-[13px] text-gray-600 cursor-default whitespace-nowrap"
//                   title={item.Account_Name?.name?.length > 25 ? item.Account_Name.name : ""}
//                 >
//                   {truncateDealerName(item.Account_Name?.name)}
//                 </td>
//                 <td className="px-6 py-4 text-[13px] text-gray-600 min-w-[200px]">
//                   {item.Subject}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <EstimationModal 
//         isOpen={isModalOpen} 
//         onClose={() => setIsModalOpen(false)} 
//       />
//     </div>
//   );
// };

// export default Estimations;

import React, { useState, useEffect } from 'react';
import EstimationModal from './EstimationModal';
import { useNavigate } from 'react-router-dom';

const Estimations = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [estimations, setEstimations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const apiUrl = "https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/estimations?fields=Owner,Quote_Number,Contact_Name,Account_Name,Subject&page=1&per_page=200";

    useEffect(() => {
        let isMounted = true; // Prevents state updates on unmounted component

        const fetchEstimations = async () => {
            try {
                setLoading(true);
                
                // 1. Generate Auth Token
                const authResponse = await window.catalyst.auth.generateAuthToken();
                const token = authResponse.access_token;

                // 2. Fetch Data
                const apiResponse = await fetch(apiUrl, {
                    headers: {
                        Authorization: `${token}`, // Added "Bearer" prefix (standard for most APIs)
                        "Content-Type": "application/json",
                    },
                    method: 'GET',
                });

                if (!apiResponse.ok) {
                    throw new Error(`Error ${apiResponse.status}: Failed to fetch estimations`);
                }

                const result = await apiResponse.json();

                if (isMounted) {
                    setEstimations(result.data || []);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message);
                    console.error("Fetch Error:", err);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchEstimations();

        return () => { isMounted = false; }; // Cleanup
    }, []);

    const truncateDealerName = (name) => {
        if (!name) return "-";
        return name.length > 25 ? `${name.substring(0, 25)}...` : name;
    };

    if (loading) return <div className="flex justify-center items-center h-64 text-gray-500">Loading Estimations...</div>;
    if (error) return <div className="p-10 text-red-500 text-center bg-red-50 rounded-lg m-8">Error: {error}</div>;

    return (
        <div className="p-4 md:p-8 bg-white min-h-screen">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-semibold text-gray-800 tracking-tight">Estimations</h1>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#0070BA] hover:bg-[#005fa3] text-white px-6 py-1.5 rounded-full text-sm font-medium transition-all active:scale-95"
                >
                    Create
                </button>
            </div>

            {/* Table Section */}
            <div className="border border-gray-100 rounded-sm overflow-x-auto shadow-sm">
                <table className="w-full text-left border-collapse min-w-[1000px]">
                    <thead>
                        <tr className="bg-[#E8F1FD]">
                            {["Estimation Owner", "Estimation Number", "Contact Name", "Dealer Name", "Subject"].map((head) => (
                                <th key={head} className="px-6 py-3 text-[11px] font-bold text-[#4A78B3] uppercase tracking-wider border-b border-gray-200">
                                    {head}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {estimations.length > 0 ? (
                            estimations.map((item, index) => (
                                <tr key={item.id || index} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-[13px] text-gray-700 font-medium whitespace-nowrap">
                                        {item.Owner?.name || "-"}
                                    </td>
                                    <td
                                        className="px-6 py-4 text-[13px] text-[#0070BA] font-medium whitespace-nowrap cursor-pointer hover:underline"
                                        onClick={() => navigate(`/estimations/${item.id}`)}
                                    >
                                        {item.Quote_Number}
                                    </td>
                                    <td className="px-6 py-4 text-[13px] text-gray-600 whitespace-nowrap">
                                        {item.Contact_Name?.name || "-"}
                                    </td>
                                    <td 
                                        className="px-6 py-4 text-[13px] text-gray-600 whitespace-nowrap"
                                        title={item.Account_Name?.name}
                                    >
                                        {truncateDealerName(item.Account_Name?.name)}
                                    </td>
                                    <td className="px-6 py-4 text-[13px] text-gray-600 min-w-[200px]">
                                        {item.Subject}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-10 text-center text-gray-400">
                                    No estimations found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <EstimationModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </div>
    );
};

export default Estimations;