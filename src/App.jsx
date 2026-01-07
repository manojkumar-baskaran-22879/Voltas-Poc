// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import {
//   LayoutDashboard,
//   ClipboardList,
//   Menu,
//   Search,
//   X,
//   Calculator,   // For Estimations
//   Package,      // For Stock
//   RotateCcw,    // For Sales Return
//   FileWarning,  // For Defective Challan
//   Wrench,       // For Work Order
//   Truck         // For Order Receiving
// } from 'lucide-react';

// import Dashboard from './components/Dashboard';
// import ServiceRequest from './components/service-request/ServiceRequest';
// import Estimations from './components/estimations/Estimations';
// import AgencyStock from './components/agency/AgencyStock';
// import SalesReturn from './components/sales-return/SalesReturn';
// import DefectiveChallan from './components/defective-challan/DefectiveChallan';
// import WorkOrder from './components/work-order/WorkOrder';
// import OrderReceiving from './components/order/OrderReceiving';

// function App() {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <Router>
//       <div className="flex h-screen bg-slate-50 overflow-hidden">

//         {/* 1. MOBILE SIDEBAR OVERLAY */}
//         {isSidebarOpen && (
//           <div
//             className="fixed inset-0 bg-black/50 z-20 lg:hidden"
//             onClick={() => setSidebarOpen(false)}
//           />
//         )}

//         {/* 2. SIDEBAR NAVIGATION */}
//         <aside className={`
//           fixed lg:static inset-y-0 left-0 z-30 w-64 bg-blue-900 text-white 
//           transition-transform duration-300 ease-in-out
//           ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
//         `}>
//           <div className="flex items-center justify-between p-6 border-b border-blue-800">
//             <span className="text-xl font-bold tracking-wide">VOLTAS</span>
//             <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-blue-300 hover:text-white">
//               <X size={24} />
//             </button>
//           </div>

//           <nav className="p-4 space-y-2">
//             <Link to="/"><NavItem icon={LayoutDashboard} label="Dashboard" active /></Link>

//             <Link to="/service-requests"><NavItem icon={ClipboardList} label="Service Requests" /></Link>

//             <Link to="/estimations"><NavItem icon={Calculator} label="Estimations" /></Link>

//             <Link to="/agency-stock"><NavItem icon={Package} label="Agency Wise Stock" /></Link>

//             <Link to="/sales-return"><NavItem icon={RotateCcw} label="Sales Return Order" /></Link>

//             <Link to="/defective-challan"><NavItem icon={FileWarning} label="Defective Challan" /></Link>

//             <Link to="/work-orders"><NavItem icon={Wrench} label="Work Order" /></Link>

//             <Link to="/order-receiving"><NavItem icon={Truck} label="Order Receiving" /></Link>

//           </nav>
//         </aside>

//         {/* 3. MAIN CONTENT AREA */}
//         <main className="flex-1 flex flex-col h-screen overflow-hidden">

//           {/* Top Header */}
//           <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4 lg:px-6 shrink-0">
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={() => setSidebarOpen(true)}
//                 className="p-2 -ml-2 text-slate-600 rounded-md hover:bg-slate-100 lg:hidden"
//               >
//                 <Menu size={24} />
//               </button>
//               {/* <h1 className="text-lg font-semibold text-slate-800">Dashboard</h1> */}
//             </div>

//             <div className="flex items-center gap-4">
//               <div className="hidden sm:flex items-center bg-slate-100 rounded-full px-3 py-1.5">
//                 <Search size={16} className="text-slate-400" />
//                 <input type="text" placeholder="Search..." className="bg-transparent border-none text-sm ml-2 focus:outline-none" />
//               </div>
//               <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
//                 JD
//               </div>
//             </div>
//           </header>

//           {/* Scrollable Viewport for Dashboard content */}
//           <div className="flex-1 overflow-y-auto">
//             <Routes>
//               <Route path="/" element={<Dashboard />} />
//               <Route path="/service-requests" element={<ServiceRequest />} />
//               <Route path="/estimations" element={<Estimations />} />
//               <Route path="/agency-stock" element={<AgencyStock />} />
//               <Route path="/sales-return" element={<SalesReturn />} />
//               <Route path="/defective-challan" element={<DefectiveChallan />} />
//               <Route path="/work-orders" element={<WorkOrder />} />
//               <Route path="/order-receiving" element={<OrderReceiving />} />
//             </Routes>
//           </div>
//         </main>
//       </div>
//     </Router>
//   );
// }

// function NavItem({ icon: Icon, label, active }) {
//   return (
//     <div className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${active ? 'bg-blue-800' : 'hover:bg-blue-800/50'}`}>
//       <Icon size={20} />
//       <span className="font-medium">{label}</span>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  ClipboardList,
  Menu,
  X,
  Calculator,
  Package,
  RotateCcw,
  FileWarning,
  Wrench,
  Truck,
  UserCircle, // New profile icon
  CircleUser
} from 'lucide-react';

import Dashboard from './components/dashboard/Dashboard';
import ServiceRequest from './components/service-request/ServiceRequest';
import Estimations from './components/estimations/Estimations';
import AgencyStock from './components/agency/AgencyStock';
import SalesReturn from './components/sales-return/SalesReturn';
import DefectiveChallan from './components/defective-challan/DefectiveChallan';
import WorkOrder from './components/work-order/WorkOrder';
import OrderReceiving from './components/order/OrderReceiving';

import LoginPage from './Login';

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

   const [isUserAuthenticated, setIsUserAuthenticated] = useState(null); // null = still checking

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const result = await window.catalyst.auth.isUserAuthenticated();
        setIsUserAuthenticated(result); // result should be true/false

      } catch (err) {
        console.log("UNAUTHENTICATED");
        setIsUserAuthenticated(false);
      }
    };
    authenticateUser();
  }, []);

  if (isUserAuthenticated === null) {
    return <div>Loading...</div>; // <-- prevent premature redirect
  }

  if (isUserAuthenticated === false) {
    return (
      <Router>
        <Routes>
          <Route path="*" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    )
  }

  return (
    <Router>
      <div className="flex h-screen bg-slate-50 overflow-hidden">

        {/* 1. MOBILE SIDEBAR OVERLAY */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* 2. SIDEBAR NAVIGATION */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-30 w-64 bg-blue-900 text-white 
          transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="flex items-center justify-between p-6 border-b border-blue-800">
            <span className="text-xl font-bold tracking-wide">VOLTAS</span>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-blue-300 hover:text-white">
              <X size={24} />
            </button>
          </div>

          <nav className="p-4 space-y-2">
            <Link to="/" onClick={() => setSidebarOpen(false)}>
              <NavItem icon={LayoutDashboard} label="Dashboard" />
            </Link>
            <Link to="/service-requests" onClick={() => setSidebarOpen(false)}>
              <NavItem icon={ClipboardList} label="Service Requests" />
            </Link>
            <Link to="/estimations" onClick={() => setSidebarOpen(false)}>
              <NavItem icon={Calculator} label="Estimations" />
            </Link>
            <Link to="/agency-stock" onClick={() => setSidebarOpen(false)}>
              <NavItem icon={Package} label="Agency Wise Stock" />
            </Link>
            <Link to="/sales-return" onClick={() => setSidebarOpen(false)}>
              <NavItem icon={RotateCcw} label="Sales Return Order" />
            </Link>
            <Link to="/defective-challan" onClick={() => setSidebarOpen(false)}>
              <NavItem icon={FileWarning} label="Defective Challan" />
            </Link>
            <Link to="/work-orders" onClick={() => setSidebarOpen(false)}>
              <NavItem icon={Wrench} label="Work Order" />
            </Link>
            <Link to="/order-receiving" onClick={() => setSidebarOpen(false)}>
              <NavItem icon={Truck} label="Order Receiving" />
            </Link>
          </nav>
        </aside>

        {/* 3. MAIN CONTENT AREA */}
        <main className="flex-1 flex flex-col h-screen overflow-hidden">

          {/* Adjusted Top Header: Reduced height (h-12), removed Search and Title */}
          <header className="h-12 bg-white shadow-sm flex items-center justify-between px-4 lg:px-6 shrink-0">
            <div>
              {/* Hamburger visible only on mobile */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-1 text-slate-600 rounded-md hover:bg-slate-100 lg:hidden"
              >
                <Menu size={22} />
              </button>
            </div>

             <div className="flex items-center gap-4">
              {/* Profile Icon instead of initials */}
              <button className="text-slate-400 hover:text-blue-600 transition-colors">
                <CircleUser size={28} strokeWidth={1.5} />
              </button>
            </div> 

          </header>

          {/* Scrollable Viewport */}
          <div className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/service-requests" element={<ServiceRequest />} />
              <Route path="/estimations" element={<Estimations />} />
              <Route path="/agency-stock" element={<AgencyStock />} />
              <Route path="/sales-return" element={<SalesReturn />} />
              <Route path="/defective-challan" element={<DefectiveChallan />} />
              <Route path="/work-orders" element={<WorkOrder />} />
              <Route path="/order-receiving" element={<OrderReceiving />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

function NavItem({ icon: Icon, label }) {
  // Logic to highlight active link can be added here using useLocation()
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg cursor-pointer text-blue-100 hover:bg-blue-800/50 hover:text-white transition-colors">
      <Icon size={20} />
      <span className="font-medium text-sm">{label}</span>
    </div>
  );
}

export default App;