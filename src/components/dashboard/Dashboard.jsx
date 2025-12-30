// import React from 'react';
// import { Clock, Check } from 'lucide-react';

// const Dashboard = () => {
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
//     <div className="p-4 lg:p-8 max-w-5xl mx-auto space-y-8">
//       <h2 className="text-2xl font-bold text-slate-800">Dashboards</h2>

//       {/* Top Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm">
//           <div className="p-3 bg-sky-50 rounded-full">
//             <Clock className="text-sky-500" size={28} />
//           </div>
//           <div>
//             <p className="text-xs font-bold text-slate-400 tracking-wider">PENDING REQUEST</p>
//             <p className="text-3xl font-bold text-slate-800">40</p>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm">
//           <div className="p-3 bg-emerald-50 rounded-full">
//             <Check className="text-emerald-500" size={28} />
//           </div>
//           <div>
//             <p className="text-xs font-bold text-slate-400 tracking-wider">COMPLETED REQUEST</p>
//             <p className="text-3xl font-bold text-slate-800">37</p>
//           </div>
//         </div>
//       </div>

//       {/* Aspects Section */}
//       <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 lg:p-8">
//         <h3 className="text-xl font-bold text-slate-800 mb-6">Aspects</h3>
//         <ul className="space-y-4">
//           {aspects.map((item, idx) => (
//             <li key={idx} className="flex gap-2 text-slate-600 leading-relaxed">
//               <span className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
//               <span>
//                 <span className="font-bold text-slate-800">{item.label} :</span> {item.text}
//               </span>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Self Solutions Section */}
//       <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
//         <div className="p-5 border-b border-slate-100">
//           <h3 className="text-xl font-bold text-slate-800">Self Solutions</h3>
//         </div>
//         <div className="divide-y divide-slate-100">
//           {["Product Manuals", "Technical Specifications", "Troubleshooting Guides", "Warranty Information"].map((item, idx) => (
//             <div key={idx} className="p-4 px-6 hover:bg-slate-50 cursor-pointer transition-colors text-slate-700">
//               {item}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React from 'react';
import { Clock, Check } from 'lucide-react';

const Dashboard = () => {
  const aspects = [
    { label: "Reliable Legacy", text: "Voltas has a strong history and reputation in cooling solutions." },
    { label: "Innovative Technology", text: "Known for advanced and innovative cooling technologies." },
    { label: "Wide Product Range", text: "Offers diverse products like ACs, refrigerators, and more." },
    { label: "Quality and Durability", text: "Products are known for their quality and lasting performance." },
    { label: "Energy Efficiency", text: "Focuses on energy-efficient appliances." },
    { label: "Good Customer Service", text: "Provides decent after-sales support." },
    { label: "Trusted Brand", text: "Voltas is a well-regarded and trusted brand." },
  ];

  return (
    // Reduced outer padding and max-width for a tighter fit
    <div className="p-3 lg:p-5 max-w-6xl mx-auto space-y-5">
      <h2 className="text-xl font-bold text-slate-800 px-1">Dashboards</h2>

      {/* Top Cards - Adjusted gap to 4 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 py-8 rounded-[2rem] border border-slate-100 flex items-center gap-6 shadow-sm">
          <div className="p-4 bg-sky-50 rounded-full">
            <Clock className="text-sky-400" size={32} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Pending Request</p>
            <p className="text-4xl font-bold text-slate-700">40</p>
          </div>
        </div>

        <div className="bg-white p-6 py-8 rounded-[2rem] border border-slate-100 flex items-center gap-6 shadow-sm">
          <div className="p-4 bg-emerald-50 rounded-full">
            <Check className="text-emerald-500" size={32} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Completed Request</p>
            <p className="text-4xl font-bold text-slate-700">37</p>
          </div>
        </div>
      </div>

      {/* Aspects Section - White background and larger rounding to match image */}
      <div className="bg-white border border-slate-100 rounded-[2rem] p-8 lg:p-10 shadow-sm">
        <h3 className="text-xl font-bold text-slate-800 mb-6">Aspects</h3>
        <ul className="space-y-3">
          {aspects.map((item, idx) => (
            <li key={idx} className="flex gap-3 text-slate-500 text-[15px]">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
              <span className="leading-relaxed">
                <span className="font-bold text-slate-700">{item.label} :</span> {item.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Self Solutions Section */}
      <div className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-sm">
        <div className="p-6 px-8 border-b border-slate-50">
          <h3 className="text-xl font-bold text-slate-800">Self Solutions</h3>
        </div>
        <div className="divide-y divide-slate-50">
          {["Product Manuals", "Technical Specifications", "Troubleshooting Guides", "Warranty Information"].map((item, idx) => (
            <div key={idx} className="p-5 px-8 hover:bg-slate-50 cursor-pointer transition-colors text-slate-600 font-medium">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;