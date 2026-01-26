// import React, { useState, useEffect } from 'react';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate
// } from 'react-router-dom';

// import {
//   LayoutDashboard,
//   ClipboardList,
//   Menu,
//   X,
//   Calculator,
//   Package,
//   RotateCcw,
//   FileWarning,
//   Wrench,
//   Truck,
//   CircleUser
// } from 'lucide-react';

// import Dashboard from './components/dashboard/Dashboard';
// import ServiceRequest from './components/service-request/ServiceRequest';
// import Estimations from './components/estimations/Estimations';
// import EstimationDetails from './components/estimations/EstimationDetails';
// import AgencyStock from './components/agency/AgencyStock';
// import SalesReturn from './components/sales-return/SalesReturn';
// import DefectiveChallan from './components/defective-challan/DefectiveChallan';
// import WorkOrder from './components/work-order/WorkOrder';
// import OrderReceiving from './components/order/OrderReceiving';

// import ServiceRequestDetail from './components/service-request/ServiceRequestDetail';
// import ServiceRequestEdit from './components/service-request/ServiceRequestEdit';
// //import EstimationDetails from './components/estimations/EstimationDetails';

// import LoginPage from './Login';

// /* =======================
//    MAIN APP
// ======================= */
// function App() {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(null);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         await window.catalyst.auth.isUserAuthenticated();
//         setIsAuthenticated(true);
//       } catch {
//         setIsAuthenticated(false);
//       }
//     };
//     checkAuth();
//   }, []);

//   /* ---- AUTH LOADING STATE ---- */
//   if (isAuthenticated === null) {
//     return (
//       <div className="h-screen flex items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <Router>
//       {isAuthenticated ? (
//         /* =======================
//            PRIVATE ROUTES
//         ======================= */
//         <Routes>
//           <Route
//             path="/*"
//             element={
//               <AppLayout
//                 isSidebarOpen={isSidebarOpen}
//                 setSidebarOpen={setSidebarOpen}
//               />
//             }
//           />
//           {/* Prevent access to login after auth */}
//           <Route path="/login" element={<Navigate to="/" replace />} />
//         </Routes>
//       ) : (
//         /* =======================
//            PUBLIC ROUTES
//         ======================= */
//         <Routes>
//           <Route path="/login" element={<LoginPage />} />
//           {/* Catch all → login */}
//           <Route path="*" element={<Navigate to="/login" replace />} />
//         </Routes>
//       )}
//     </Router>
//   );
// }

// /* =======================
//    APP LAYOUT (AUTH ONLY)
// ======================= */
// function AppLayout({ isSidebarOpen, setSidebarOpen }) {
//   return (
//     <div className="flex h-screen bg-slate-50 overflow-hidden">

//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-20 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside className={`
//         fixed lg:static inset-y-0 left-0 z-30 w-64 bg-blue-900 text-white
//         transition-transform duration-300
//         ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
//       `}>
//         <div className="flex items-center justify-between p-6 border-b border-blue-800">
//           <span className="text-xl font-bold">VOLTAS</span>
//           <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
//             <X />
//           </button>
//         </div>

//         <nav className="p-4 space-y-2">
//           <NavLink icon={LayoutDashboard} label="Dashboard" to="/" />
//           <NavLink icon={ClipboardList} label="Service Requests" to="/service-requests" />
//           <NavLink icon={Calculator} label="Estimations" to="/estimations" />
//           <NavLink icon={Package} label="Agency Wise Stock" to="/agency-stock" />
//           <NavLink icon={RotateCcw} label="Sales Return Order" to="/sales-return" />
//           <NavLink icon={FileWarning} label="Defective Challan" to="/defective-challan" />
//           <NavLink icon={Wrench} label="Work Order" to="/work-orders" />
//           <NavLink icon={Truck} label="Order Receiving" to="/order-receiving" />
//         </nav>
//       </aside>

//       {/* Main */}
//       <main className="flex-1 flex flex-col overflow-hidden">
//         <header className="h-12 bg-white shadow-sm flex items-center justify-between px-4">
//           <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
//             <Menu />
//           </button>
//           <CircleUser size={26} className="text-slate-500" />
//         </header>

//         <div className="flex-1 overflow-y-auto">
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/service-requests" element={<ServiceRequest />} />
//             <Route path="/estimations" element={<Estimations />} />
//             <Route path="/estimations/:id" element={<EstimationDetails />} />
//             <Route path="/agency-stock" element={<AgencyStock />} />
//             <Route path="/sales-return" element={<SalesReturn />} />
//             <Route path="/defective-challan" element={<DefectiveChallan />} />
//             <Route path="/work-orders" element={<WorkOrder />} />
//             <Route path="/order-receiving" element={<OrderReceiving />} />
//             <Route path="/estimations/:id" element={<EstimationDetails />} />
//             <Route path="/service-request/:id" element={<ServiceRequestDetail />} />
//             <Route path="/service-request/edit/:id" element={<ServiceRequestEdit />} />
//             <Route path="/dashboard" element={<Dashboard />} />
//           </Routes>
//         </div>
//       </main>
//     </div>
//   );
// }

// /* =======================
//    NAV ITEM
// ======================= */
// import { Link } from 'react-router-dom';

// function NavLink({ icon: Icon, label, to }) {
//   return (
//     <Link
//       to={to}
//       className="flex items-center gap-3 p-3 rounded-lg text-blue-100 hover:bg-blue-800/50"
//     >
//       <Icon size={20} />
//       <span className="text-sm font-medium">{label}</span>
//     </Link>
//   );
// }

// export default App;


import React, { useState, useEffect, useRef } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link
} from 'react-router-dom';

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
  CircleUser,
  LogOut
} from 'lucide-react';

/* --- Component Imports --- */
import Dashboard from './components/dashboard/Dashboard';
import ServiceRequest from './components/service-request/ServiceRequest';
import Estimations from './components/estimations/Estimations';
import EstimationDetails from './components/estimations/EstimationDetails';
import AgencyStock from './components/agency/AgencyStock';
import SalesReturn from './components/sales-return/SalesReturn';
import DefectiveChallan from './components/defective-challan/DefectiveChallan';
import WorkOrder from './components/work-order/WorkOrder';
import OrderReceiving from './components/order/OrderReceiving';
import ServiceRequestDetail from './components/service-request/ServiceRequestDetail';
import ServiceRequestEdit from './components/service-request/ServiceRequestEdit';
import LoginPage from './Login';
import AgencyStockDetails from './components/agency/AgencyStockDetails';
import SalesReturnDetails from './components/sales-return/SalesReturnDetails';
import DefectiveChallanDetails from './components/defective-challan/DefectiveChallanDetails';
import { WorkOrderDetails } from './components/work-order/WorkOrderDetails';
import OrderReceivingDetails from './components/order/OrderReceivingDetails';

/* =======================
   MAIN APP
======================= */
function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await window.catalyst.auth.isUserAuthenticated();
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  // if (isAuthenticated === null) {
  //   return (
  //     <div className="h-screen flex items-center justify-center bg-slate-50 font-sans">
  //       <div className="animate-pulse text-blue-900 font-medium">Loading...</div>
  //     </div>
  //   );
  // }

  if (isAuthenticated === null) {
        return (
            <div className="flex flex-col items-center justify-center h-screen space-y-4 bg-white">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-100 border-t-[#0070BA]"></div>
            <p className="text-gray-400 text-sm font-medium">Loading...</p>
        </div>
        );
    }

  return (
    <Router>
      {isAuthenticated ? (
        <Routes>
          <Route
            path="/*"
            element={
              <AppLayout
                isSidebarOpen={isSidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
            }
          />
          <Route path="/login" element={<Navigate to="/" replace />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </Router>
  );
}

/* =======================
   APP LAYOUT (AUTH ONLY)
======================= */
function AppLayout({ isSidebarOpen, setSidebarOpen }) {
  const [isProfileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Replace with: window.catalyst.auth.signOut('/');
    console.log("Logging out...");
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-blue-900 text-white
        transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between p-6 border-b border-blue-800">
          <span className="text-xl font-bold tracking-tight">VOLTAS</span>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden hover:bg-blue-800 p-1 rounded">
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-8 overflow-y-auto h-[calc(100vh-80px)]">
          <NavLink icon={LayoutDashboard} label="Dashboard" to="/" />
          <NavLink icon={ClipboardList} label="Service Requests" to="/service-requests" />
          <NavLink icon={Calculator} label="Estimations" to="/estimations" />
          <NavLink icon={Package} label="Agency Wise Stock" to="/agency-stock" />
          <NavLink icon={RotateCcw} label="Sales Return Order" to="/sales-return" />
          <NavLink icon={FileWarning} label="Defective Challan" to="/defective-challan" />
          <NavLink icon={Wrench} label="Work Order" to="/work-orders" />
          <NavLink icon={Truck} label="Order Receiving" to="/order-receiving" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* Header */}
        <header className="h-14 bg-white shadow-sm border-b border-slate-200 flex items-center justify-between px-6 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)} 
              className="lg:hidden text-slate-600 hover:bg-slate-100 p-1 rounded"
            >
              <Menu size={24} />
            </button>
            {/* <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider hidden sm:block">
              Internal Portal
            </h2> */}
          </div>

          {/* Profile Dropdown Container */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setProfileOpen(!isProfileOpen)}
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-100 transition-colors"
            >
              <CircleUser size={28} className="text-slate-600" />
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-lg shadow-xl py-2 z-50 animate-in fade-in zoom-in duration-150">
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-normal">Account</p>
                  <p className="text-sm font-medium text-slate-700 truncate">testaccounttest@gmail.com</p>
                </div>
                
                <div className="py-1">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Dynamic Route Content */}
        <div className="flex-1 overflow-y-auto bg-slate-50 p-4 lg:p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/service-requests" element={<ServiceRequest />} />
            <Route path="/estimations" element={<Estimations />} />
            <Route path="/estimations/:id" element={<EstimationDetails />} />
            <Route path="/agency-stock" element={<AgencyStock />} />
            <Route path="/agency-stock/:id" element={<AgencyStockDetails />} />
            <Route path="/sales-return" element={<SalesReturn />} />
            <Route path="/sales-return/:id" element={<SalesReturnDetails />} />
            <Route path="/defective-challan" element={<DefectiveChallan />} />
            <Route path="/defective-challan/:id" element={<DefectiveChallanDetails />} />
            <Route path="/work-orders" element={<WorkOrder />} />
            <Route path="/work-order/:id" element={<WorkOrderDetails />} />
            <Route path="/order-receiving" element={<OrderReceiving />} />
            <Route path="/order-receiving/:id" element={<OrderReceivingDetails />} />
            <Route path="/service-request/:id" element={<ServiceRequestDetail />} />
            <Route path="/service-request/edit/:id" element={<ServiceRequestEdit />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

/* =======================
   NAV ITEM
======================= */
function NavLink({ icon: Icon, label, to }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 p-3 rounded-lg text-blue-100 hover:bg-white/10 transition-colors group"
    >
      <Icon size={20} className="group-hover:text-white transition-colors" />
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}

export default App;