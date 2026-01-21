// import React, { useState, useEffect } from 'react';
// import EstimationModal from './EstimationModal';
// import { useNavigate } from 'react-router-dom';

// const Estimations = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [estimations, setEstimations] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const navigate = useNavigate();

//     const apiUrl = "https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/estimations?fields=Owner,Quote_Number,Contact_Name,Account_Name,Subject&page=1&per_page=200";

//     useEffect(() => {
//         let isMounted = true; // Prevents state updates on unmounted component

//         const fetchEstimations = async () => {
//             try {
//                 setLoading(true);
                
//                 // 1. Generate Auth Token
//                 const authResponse = await window.catalyst.auth.generateAuthToken();
//                 const token = authResponse.access_token;

//                 // 2. Fetch Data
//                 const apiResponse = await fetch(apiUrl, {
//                     headers: {
//                         Authorization: `${token}`, // Added "Bearer" prefix (standard for most APIs)
//                         "Content-Type": "application/json",
//                     },
//                     method: 'GET',
//                 });

//                 if (!apiResponse.ok) {
//                     throw new Error(`Error ${apiResponse.status}: Failed to fetch estimations`);
//                 }

//                 const result = await apiResponse.json();

//                 if (isMounted) {
//                     setEstimations(result.data || []);
//                 }
//             } catch (err) {
//                 if (isMounted) {
//                     setError(err.message);
//                     console.error("Fetch Error:", err);
//                 }
//             } finally {
//                 if (isMounted) {
//                     setLoading(false);
//                 }
//             }
//         };

//         fetchEstimations();

//         return () => { isMounted = false; }; // Cleanup
//     }, []);

//     const truncateDealerName = (name) => {
//         if (!name) return "-";
//         return name.length > 25 ? `${name.substring(0, 25)}...` : name;
//     };

//     if (loading) return <div className="flex justify-center items-center h-64 text-gray-500">Loading Estimations...</div>;
//     if (error) return <div className="p-10 text-red-500 text-center bg-red-50 rounded-lg m-8">Error: {error}</div>;

//     return (
//         <div className="p-4 md:p-8 bg-white min-h-screen">
//             {/* Header Section */}
//             <div className="flex justify-between items-center mb-6">
//                 <h1 className="text-xl font-semibold text-gray-800 tracking-tight">Estimations</h1>
//                 <button 
//                     onClick={() => setIsModalOpen(true)}
//                     className="bg-[#0070BA] hover:bg-[#005fa3] text-white px-6 py-1.5 rounded-full text-sm font-medium transition-all active:scale-95"
//                 >
//                     Create
//                 </button>
//             </div>

//             {/* Table Section */}
//             <div className="border border-gray-100 rounded-sm overflow-x-auto shadow-sm">
//                 <table className="w-full text-left border-collapse min-w-[1000px]">
//                     <thead>
//                         <tr className="bg-[#E8F1FD]">
//                             {["Estimation Owner", "Estimation Number", "Contact Name", "Dealer Name", "Subject"].map((head) => (
//                                 <th key={head} className="px-6 py-3 text-[11px] font-bold text-[#4A78B3] uppercase tracking-wider border-b border-gray-200">
//                                     {head}
//                                 </th>
//                             ))}
//                         </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-100">
//                         {estimations.length > 0 ? (
//                             estimations.map((item, index) => (
//                                 <tr key={item.id || index} className="hover:bg-gray-50 transition-colors">
//                                     <td className="px-6 py-4 text-[13px] text-gray-700 font-medium whitespace-nowrap">
//                                         {item.Owner?.name || "-"}
//                                     </td>
//                                     <td
//                                         className="px-6 py-4 text-[13px] text-[#0070BA] font-medium whitespace-nowrap cursor-pointer hover:underline"
//                                         onClick={() => navigate(`/estimations/${item.id}`)}
//                                     >
//                                         {item.Quote_Number}
//                                     </td>
//                                     <td className="px-6 py-4 text-[13px] text-gray-600 whitespace-nowrap">
//                                         {item.Contact_Name?.name || "-"}
//                                     </td>
//                                     <td 
//                                         className="px-6 py-4 text-[13px] text-gray-600 whitespace-nowrap"
//                                         title={item.Account_Name?.name}
//                                     >
//                                         {truncateDealerName(item.Account_Name?.name)}
//                                     </td>
//                                     <td className="px-6 py-4 text-[13px] text-gray-600 min-w-[200px]">
//                                         {item.Subject}
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan="5" className="px-6 py-10 text-center text-gray-400">
//                                     No estimations found.
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>

//             <EstimationModal 
//                 isOpen={isModalOpen} 
//                 onClose={() => setIsModalOpen(false)} 
//             />
//         </div>
//     );
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
        let isMounted = true;

        const fetchEstimations = async () => {
            try {
                setLoading(true);
                const authResponse = await window.catalyst.auth.generateAuthToken();
                const token = authResponse.access_token;

                const apiResponse = await fetch(apiUrl, {
                    headers: {
                        Authorization: `${token}`,
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
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchEstimations();
        return () => { isMounted = false; };
    }, []);

    const truncateDealerName = (name) => {
        if (!name) return "-";
        return name.length > 25 ? `${name.substring(0, 25)}...` : name;
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen space-y-4 bg-white">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-100 border-t-[#0070BA]"></div>
            <p className="text-gray-400 text-sm font-medium">Loading...</p>
        </div>
        );
    }

    return (
        <div className="px-4 pb-8 bg-slate-50/50 min-h-screen">
            <div className="flex justify-between items-center py-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Estimations</h2>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-bold transition-all active:scale-95 shadow-sm"
                >
                    Create
                </button>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="px-6 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide">Estimation Owner</th>
                                <th className="px-6 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide">Estimation Number</th>
                                <th className="px-6 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide">Contact Name</th>
                                <th className="px-6 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide">Dealer Name</th>
                                <th className="px-6 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide">Subject</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {estimations.length > 0 ? (
                                estimations.map((item, index) => (
                                    <tr key={item.id || index} className="hover:bg-slate-50/80 transition-colors group">
                                        <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-slate-900">
                                            {item.Owner?.name || "-"}
                                        </td>
                                        <td className="px-6 py-5 whitespace-nowrap">                    
                                            <button 
                                                onClick={() => navigate(`/estimations/${item.id}`)}
                                                className="text-blue-600 font-bold text-sm hover:text-blue-800 transition-colors duration-200"
                                            >
                                                {item.Quote_Number || '-'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-600 font-medium">
                                            {item.Contact_Name?.name || '-'}
                                        </td>
                                        <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-700" title={item.Account_Name?.name}>
                                            {truncateDealerName(item.Account_Name?.name)}
                                        </td>
                                        <td className="px-6 py-5 text-sm text-slate-600 font-medium">
                                            {item.Subject || '-'}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-10 text-center text-slate-400 text-sm">
                                        No estimations found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <EstimationModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </div>
    );
};

export default Estimations;