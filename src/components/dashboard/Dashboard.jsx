// import React from 'react';
// import { Clock, Check } from 'lucide-react';
// import LoginPage from '../../Login';
// import UserProfile from './UserProfile';
// import { useEffect, useState } from 'react';

// const Dashboard = () => {

//   const [isFetching, setIsFetching] = useState(true);
//     const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
//     const [userDetails, setUserDetails] = useState({
//         firstName: "",
//         lastName: "",
//         mailid: "",
//         timeZone: "",
//         createdTime: "",
//     });

//   useEffect(() => {
//         window.catalyst.auth
//             .isUserAuthenticated()
//             .then((result) => {
//                 setUserDetails({
//                     firstName: result.content.first_name,
//                     lastName: result.content.last_name,
//                     mailid: result.content.email_id,
//                     timeZone: result.content.time_zone,
//                     createdTime: result.content.created_time,
//                 });
//                 setIsUserAuthenticated(true);
//             })
//             .catch((err) => { })
//             .finally(() => {
//                 setIsFetching(false);
//             });
//     }, []);

//   const aspects = [
//     { label: "Reliable Legacy", text: "Voltas has a strong history and reputation in cooling solutions." },
//     { label: "Innovative Technology", text: "Known for advanced and innovative cooling technologies." },
//     { label: "Wide Product Range", text: "Offers diverse products like ACs, refrigerators, and more." },
//     { label: "Quality and Durability", text: "Products are known for their quality and lasting performance." },
//     { label: "Energy Efficiency", text: "Focuses on energy-efficient appliances." },
//     { label: "Good Customer Service", text: "Provides decent after-sales support." },
//     { label: "Trusted Brand", text: "Voltas is a well-regarded and trusted brand." },
//   ];

//   return (
//     // Reduced outer padding and max-width for a tighter fit
    
//     <div className="p-3 lg:p-5 max-w-6xl mx-auto space-y-5">
//       <h2 className="text-xl font-bold text-slate-800 px-1">Dashboards</h2>

//       {/* Top Cards - Adjusted gap to 4 */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="bg-white p-6 py-8 rounded-[2rem] border border-slate-100 flex items-center gap-6 shadow-sm">
//           <div className="p-4 bg-sky-50 rounded-full">
//             <Clock className="text-sky-400" size={32} />
//           </div>
//           <div>
//             <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Pending Request</p>
//             <p className="text-4xl font-bold text-slate-700">40</p>
//           </div>
//         </div>

//         <div className="bg-white p-6 py-8 rounded-[2rem] border border-slate-100 flex items-center gap-6 shadow-sm">
//           <div className="p-4 bg-emerald-50 rounded-full">
//             <Check className="text-emerald-500" size={32} />
//           </div>
//           <div>
//             <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Completed Request</p>
//             <p className="text-4xl font-bold text-slate-700">37</p>
//           </div>
//         </div>
//       </div>

//       {/* Aspects Section - White background and larger rounding to match image */}
//       <div className="bg-white border border-slate-100 rounded-[2rem] p-8 lg:p-10 shadow-sm">
//         <h3 className="text-xl font-bold text-slate-800 mb-6">Aspects</h3>
//         <ul className="space-y-3">
//           {aspects.map((item, idx) => (
//             <li key={idx} className="flex gap-3 text-slate-500 text-[15px]">
//               <span className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
//               <span className="leading-relaxed">
//                 <span className="font-bold text-slate-700">{item.label} :</span> {item.text}
//               </span>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Self Solutions Section */}
//       <div className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-sm">
//         <div className="p-6 px-8 border-b border-slate-50">
//           <h3 className="text-xl font-bold text-slate-800">Self Solutions</h3>
//         </div>
//         <div className="divide-y divide-slate-50">
//           {["Product Manuals", "Technical Specifications", "Troubleshooting Guides", "Warranty Information"].map((item, idx) => (
//             <div key={idx} className="p-5 px-8 hover:bg-slate-50 cursor-pointer transition-colors text-slate-600 font-medium">
//               {item}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from 'react';
import { Clock, CheckCircle2, CalendarDays, BarChart3, RefreshCcw } from 'lucide-react';

const Dashboard = () => {
  const [counts, setCounts] = useState({ 
    pending: 0, 
    completed: 0,
    monthly: 0,
    yearly: 0 
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchCounts = async () => {
    setIsLoading(true);
    try {
      const endpoints = [
        'dealer_open_request_count',
        'dealer_closed_request_count',
        'dealer_monthly_request_count',
        'dealer_yearly_request_count'
      ];

      const authResponse = await window.catalyst.auth.generateAuthToken();
      const token = authResponse.access_token;

      const results = await Promise.all(
        endpoints.map(path => 
          fetch(`https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/dashboard/${path}`,{headers: {Authorization: `${token}`,'Content-Type': 'application/json'}})
          .then(res => res.json())
          .catch(() => ({ count: 0 }))
        )
      );

      setCounts({
        pending: results[0].count || 0,
        completed: results[1].count || 0,
        monthly: results[2].count || 0,
        yearly: results[3].count || 0
      });
    } catch (error) {
      console.error("Error fetching counts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  return (
    // Removed mx-auto and max-w to ensure left alignment and full width
    <div className="min-h-screen bg-[#F8FAFC] p-6 lg:p-10 w-full">
      <div className="w-full">
        
        {/* Header Section - Left aligned */}
        <div className="flex items-center justify-between mb-8 w-full">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Service Overview</h1>
            {/* <p className="text-slate-500 font-medium">Performance Metrics</p> */}
          </div>
          
          <button 
            onClick={fetchCounts}
            className="p-3 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md active:scale-95 transition-all text-slate-600 hover:text-indigo-600 group mr-4"
            title="Refresh Data"
          >
            <RefreshCcw size={20} className={isLoading ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"} />
          </button>
        </div>

        {/* Stats Grid - 2 per row on web, left aligned, filling available width */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full">
          
          <StatCard 
            title="Pending" 
            value={counts.pending} 
            loading={isLoading} 
            icon={<Clock className="text-amber-500" size={24} />} 
            bgColor="bg-amber-50"
            accent="bg-amber-100 text-amber-700"
            label="Live"
          />

          <StatCard 
            title="Completed" 
            value={counts.completed} 
            loading={isLoading} 
            icon={<CheckCircle2 className="text-emerald-500" size={24} />} 
            bgColor="bg-emerald-50"
            accent="bg-emerald-100 text-emerald-700"
            label="Total"
          />

          <StatCard 
            title="This Month" 
            value={counts.monthly} 
            loading={isLoading} 
            icon={<CalendarDays className="text-blue-500" size={24} />} 
            bgColor="bg-blue-50"
            accent="bg-blue-100 text-blue-700"
            label="Current"
          />

          <StatCard 
            title="This Year" 
            value={counts.yearly} 
            loading={isLoading} 
            icon={<BarChart3 className="text-violet-500" size={24} />} 
            bgColor="bg-violet-50"
            accent="bg-violet-100 text-violet-700"
            label="Annual"
          />

        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, loading, icon, bgColor, accent, label }) => (
  <div className="group bg-white p-8 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/30 transition-all hover:shadow-indigo-100">
    <div className="space-y-5">
      <div className="flex justify-between items-start">
        <div className={`p-4 ${bgColor} rounded-2xl`}>
          {icon}
        </div>
        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider ${accent}`}>
          {label}
        </span>
      </div>
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.15em]">{title}</p>
        {loading ? (
          <div className="h-12 w-24 bg-slate-100 animate-pulse rounded-xl mt-2" />
        ) : (
          <h2 className="text-5xl font-black text-slate-800 mt-1 tracking-tight">{value}</h2>
        )}
      </div>
    </div>
  </div>
);

export default Dashboard;