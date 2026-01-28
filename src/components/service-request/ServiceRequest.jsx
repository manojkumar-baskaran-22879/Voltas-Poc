import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ServiceRequest = ({ isAdmin }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchServiceRequests = async () => {
      try {
        const auth = window.catalyst.auth;
        const response = await auth.generateAuthToken();
        
        setLoading(true);
        
        // Construct API URL based on admin status and search term
        let API_URL = '';
        const baseUrl = "https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/service_request";
        const fields = "fields=Name,Contact_Name,Appointment_Date_and_Time,Technician,Visit_Status,Service_Request_Status&page=1&per_page=200";

        if (!isAdmin) {
          // If there is a search term, use the specific search criteria format you provided
          const criteria = searchTerm 
            ? `((Technician:equals:%27TC20230022%27)and(Name:starts_with:${searchTerm}))`
            : `(Technician:equals:%27TC20230022%27)`;
          
          API_URL = `${baseUrl}/search?criteria=${criteria}&${fields}`;
        } else {
          API_URL = `${baseUrl}?${fields}`;
        }

        const apiResponse = await fetch(API_URL, {
          headers: {
            Authorization: `${response.access_token}`,
            "Content-Type": "application/json",
          },
          method: 'GET',
        });

        if (!apiResponse.ok) throw new Error('Network response was not ok');
        const result = await apiResponse.json();
        setRequests(result.data || []);
      } catch (err) {
        setError(err.message);
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    // Debounce: Wait 500ms after user stops typing before fetching
    const delayDebounceFn = setTimeout(() => {
      fetchServiceRequests();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [isAdmin, searchTerm]);

  const getStatusStyles = (status) => {
    const s = status?.toLowerCase() || '';
    if (s === 'closed' || s === 'completed') return 'bg-emerald-50 text-emerald-700 border-emerald-100';
    if (s === 'open') return 'bg-rose-50 text-rose-700 border-rose-100';
    if (s === 'un assigned') return 'bg-amber-50 text-amber-700 border-amber-100';
    if (s === 'scheduled') return 'bg-sky-50 text-sky-700 border-sky-100';
    return 'bg-yellow-50 text-yellow-700 border-yellow-200';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: true
    });
  };

  return (
    <div className="px-4 pb-8 bg-slate-50/50 min-h-screen">
      <div className="flex justify-between items-center py-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Service Requests</h2>
        </div>
      </div>

      {/* Conditional Search Box for Non-Admins */}
      {!isAdmin && (
        <div className="mb-6">
          <div className="relative max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search by Request ID"
              className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
          <p className="text-slate-500 font-medium">Loading...</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide">Request ID</th>
                  <th className="px-6 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide">Customer Name</th>
                  <th className="px-6 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide">Appointment</th>
                  <th className="px-6 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide">Technician</th>
                  <th className="px-6 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide">Visit Status</th>
                  <th className="px-6 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide">Request Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {requests.length > 0 ? (
                  requests.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-6 py-5 whitespace-nowrap">
                        <Link 
                          to={`/service-request/${req.id}`} 
                          className="text-blue-600 font-bold text-sm hover:text-blue-800 transition-colors duration-200"
                        >
                          {req.Name || '-'}
                        </Link>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-slate-900">
                        {req.Contact_Name?.name || '-'}
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-600 font-medium">
                        {formatDate(req.Appointment_Date_and_Time)}
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-700">
                        {req.Technician?.name || '-'}
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-md text-[12px] font-bold border ${getStatusStyles(req.Visit_Status)}`}>
                          {req.Visit_Status || 'NA'}
                        </span>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-md text-[12px] font-bold border ${getStatusStyles(req.Service_Request_Status)}`}>
                          {req.Service_Request_Status || 'NA'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-10 text-center text-slate-500">
                      No service requests found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceRequest;

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// const ServiceRequest = ({ isAdmin }) => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // const API_URL = "https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/service_request?fields=Name,Contact_Name,Appointment_Date_and_Time,Technician,Visit_Status,Service_Request_Status&page=1&per_page=200";
//   let API_URL ='';
  
//   if(!isAdmin) {
//      API_URL= 'https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/service_request/search?criteria=(Technician:equals:%27TC20230022%27)&fields=Name,Contact_Name,Appointment_Date_and_Time,Technician,Visit_Status,Service_Request_Status&page=1&per_page=200';
//   }
//   else {
//      API_URL = "https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/service_request?fields=Name,Contact_Name,Appointment_Date_and_Time,Technician,Visit_Status,Service_Request_Status&page=1&per_page=200";
//   }
//   useEffect(() => {
//     const fetchServiceRequests = async () => {
//       try {
//         var auth = window.catalyst.auth;
//         await window.catalyst.auth.generateAuthToken().then(async (response) => {
//           try {
//             setLoading(true);
//             const apiResponse = await fetch(API_URL, {
//               headers: {
//                 Authorization: `${response.access_token}`,
//                 "Content-Type": "application/json",
//               },
//               method: 'GET',
//             });
//             if (!apiResponse.ok) throw new Error('Network response was not ok');
//             const result = await apiResponse.json();
//             setRequests(result.data || []);
//           } catch (err) {
//             setError(err.message);
//           } finally {
//             setLoading(false);
//           }
//         }).catch((err) => {
//           console.error("ERROR1: " + JSON.stringify(err));
//         });
//       } catch (err) {
//         console.log("ERROR: " + JSON.stringify(err));
//       }
//     };
//     fetchServiceRequests();
//   }, []);

//   // Updated Status Colors and Styles for a "Pill" look
//   const getStatusStyles = (status) => {
//     const s = status?.toLowerCase() || '';
//     if (s === 'closed' || s === 'completed') return 'bg-emerald-50 text-emerald-700 border-emerald-100';
//     if (s === 'open') return 'bg-rose-50 text-rose-700 border-rose-100';
//     if (s === 'un assigned') return 'bg-amber-50 text-amber-700 border-amber-100';
//     if (s === 'scheduled') return 'bg-sky-50 text-sky-700 border-sky-100';
//     // return 'bg-slate-50 text-slate-600 border-slate-100';
//     return 'bg-yellow-50 text-yellow-700 border-yellow-200';
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return '-';
//     const date = new Date(dateString);
//     return date.toLocaleString('en-IN', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true
//     });
//   };

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
//         <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
//         <p className="text-slate-600 font-medium">Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="px-4 pb-8 bg-slate-50/50 min-h-screen">
//       {/* Header section with tighter padding to fix the gap */}
//       <div className="flex justify-between items-center py-4">
//         <div>
//           <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Service Requests</h2>
//         </div>
//       </div>
      
//       <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="bg-slate-50 border-b border-slate-200">
//                 <th className="px-6 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide">Request ID</th>
//                 <th className="px-6 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide">Customer Name</th>
//                 <th className="px-6 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide">Appointment</th>
//                 <th className="px-6 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide">Technician</th>
//                 <th className="px-6 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide">Visit Status</th>
//                 <th className="px-6 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide">Request Status</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100">
//               {requests.map((req) => (
//                 <tr key={req.id} className="hover:bg-slate-50/80 transition-colors group">
//                   <td className="px-6 py-5 whitespace-nowrap">                    
//                     <Link 
//                       to={`/service-request/${req.id}`} 
//                       className="text-blue-600 font-bold text-sm hover:text-blue-800 transition-colors duration-200"
//                     >
//                       {req.Name || '-'}
//                     </Link>
//                   </td>
//                   <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-slate-900">
//                     {req.Contact_Name?.name || '-'}
//                   </td>
//                   <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-600 font-medium">
//                     {formatDate(req.Appointment_Date_and_Time)}
//                   </td>
//                   <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-700">
//                     {req.Technician?.name || '-'}
//                   </td>
//                   <td className="px-6 py-5 whitespace-nowrap">
//                     <span className={`px-3 py-1 rounded-md text-[12px] font-bold border ${getStatusStyles(req.Visit_Status)}`}>
//                       {req.Visit_Status || 'NA'}
//                     </span>
//                   </td>
//                   <td className="px-6 py-5 whitespace-nowrap">
//                     <span className={`px-3 py-1 rounded-md text-[12px] font-bold border ${getStatusStyles(req.Service_Request_Status)}`}>
//                       {req.Service_Request_Status || 'NA'}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ServiceRequest;

// // import React, { useState, useEffect } from 'react';
// // import { Link } from 'react-router-dom';

// // const ServiceRequest = () => {
// //   const [requests, setRequests] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [searchQuery, setSearchQuery] = useState('');

// //   // Base URLs
// //   const BASE_URL = "https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/service_request";
// //   const FIELDS = "fields=Name,Contact_Name,Appointment_Date_and_Time,Technician,Visit_Status,Service_Request_Status&page=1&per_page=200";

// //   useEffect(() => {
// //     const fetchServiceRequests = async () => {
// //       try {
// //         const auth = window.catalyst.auth;
// //         await auth.generateAuthToken().then(async (response) => {
// //           try {
// //             setLoading(true);
            
// //             // Construct URL based on whether there is a search query
// //             let finalUrl = `${BASE_URL}?${FIELDS}`;
// //             if (searchQuery.trim() !== '') {
// //               // Search API with criteria
// //               const criteria = encodeURIComponent(`((Technician:equals:'TC20230022')and(Name:starts_with:${searchQuery}))`);
// //               finalUrl = `${BASE_URL}/search?criteria=${criteria}&${FIELDS}`;
// //             }

// //             const apiResponse = await fetch(finalUrl, {
// //               headers: {
// //                 Authorization: `${response.access_token}`,
// //                 "Content-Type": "application/json",
// //               },
// //               method: 'GET',
// //             });

// //             if (!apiResponse.ok) throw new Error('Network response was not ok');
// //             const result = await apiResponse.json();
// //             setRequests(result.data || []);
// //           } catch (err) {
// //             setError(err.message);
// //           } finally {
// //             setLoading(false);
// //           }
// //         }).catch((err) => {
// //           console.error("AUTH ERROR: " + JSON.stringify(err));
// //         });
// //       } catch (err) {
// //         console.log("FETCH ERROR: " + JSON.stringify(err));
// //       }
// //     };

// //     // Debounce: Wait 500ms after user stops typing to call API
// //     const timeoutId = setTimeout(() => {
// //       fetchServiceRequests();
// //     }, 500);

// //     return () => clearTimeout(timeoutId);
// //   }, [searchQuery]); // Re-run effect when searchQuery changes

// //   const getStatusStyles = (status) => {
// //     const s = status?.toLowerCase() || '';
// //     if (s === 'closed' || s === 'completed') return 'bg-emerald-50 text-emerald-700 border-emerald-100';
// //     if (s === 'open') return 'bg-rose-50 text-rose-700 border-rose-100';
// //     if (s === 'un assigned') return 'bg-amber-50 text-amber-700 border-amber-100';
// //     if (s === 'scheduled') return 'bg-sky-50 text-sky-700 border-sky-100';
// //     return 'bg-yellow-50 text-yellow-700 border-yellow-200';
// //   };

// //   const formatDate = (dateString) => {
// //     if (!dateString) return '-';
// //     const date = new Date(dateString);
// //     return date.toLocaleString('en-IN', {
// //       day: '2-digit', month: 'short', year: 'numeric',
// //       hour: '2-digit', minute: '2-digit', hour12: true
// //     });
// //   };

// //   return (
// //     <div className="px-4 pb-8 bg-slate-50/50 min-h-screen">
// //       <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-6 gap-4">
// //         <div>
// //           <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Service Requests</h2>
// //         </div>

// //         {/* Search Box Section */}
// //         <div className="relative w-full md:w-96">
// //           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //             <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
// //             </svg>
// //           </div>
// //           <input
// //             type="text"
// //             placeholder="Search Request ID"
// //             className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all shadow-sm"
// //             value={searchQuery}
// //             onChange={(e) => setSearchQuery(e.target.value)}
// //           />
// //           {loading && searchQuery && (
// //              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
// //                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
// //              </div>
// //           )}
// //         </div>
// //       </div>

// //       <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
// //         <div className="overflow-x-auto">
// //           <table className="w-full text-left border-collapse">
// //             <thead>
// //               <tr className="bg-slate-50 border-b border-slate-200">
// //                 <th className="px-6 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide">Request ID</th>
// //                 <th className="px-6 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide">Customer Name</th>
// //                 <th className="px-6 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide">Appointment</th>
// //                 <th className="px-6 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide">Technician</th>
// //                 <th className="px-6 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide">Visit Status</th>
// //                 <th className="px-6 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide">Request Status</th>
// //               </tr>
// //             </thead>
// //             <tbody className="divide-y divide-slate-100">
// //               {requests.length > 0 ? (
// //                 requests.map((req) => (
// //                   <tr key={req.id} className="hover:bg-slate-50/80 transition-colors group">
// //                     <td className="px-6 py-5 whitespace-nowrap">
// //                       <Link to={`/service-request/${req.id}`} className="text-blue-600 font-bold text-sm hover:text-blue-800 transition-colors">
// //                         {req.Name || '-'}
// //                       </Link>
// //                     </td>
// //                     <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-slate-900">
// //                       {req.Contact_Name?.name || '-'}
// //                     </td>
// //                     <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-600 font-medium">
// //                       {formatDate(req.Appointment_Date_and_Time)}
// //                     </td>
// //                     <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-700">
// //                       {req.Technician?.name || '-'}
// //                     </td>
// //                     <td className="px-6 py-5 whitespace-nowrap">
// //                       <span className={`px-3 py-1 rounded-md text-[12px] font-bold border ${getStatusStyles(req.Visit_Status)}`}>
// //                         {req.Visit_Status || 'NA'}
// //                       </span>
// //                     </td>
// //                     <td className="px-6 py-5 whitespace-nowrap">
// //                       <span className={`px-3 py-1 rounded-md text-[12px] font-bold border ${getStatusStyles(req.Service_Request_Status)}`}>
// //                         {req.Service_Request_Status || 'NA'}
// //                       </span>
// //                     </td>
// //                   </tr>
// //                 ))
// //               ) : (
// //                 <tr>
// //                   <td colSpan="6" className="px-6 py-10 text-center text-slate-500 italic">
// //                     {loading ? "Searching..." : "No matching service requests found."}
// //                   </td>
// //                 </tr>
// //               )}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ServiceRequest;