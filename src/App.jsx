
// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
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
//   UserCircle, // New profile icon
//   CircleUser
// } from 'lucide-react';

// import Dashboard from './components/dashboard/Dashboard';
// import ServiceRequest from './components/service-request/ServiceRequest';
// import Estimations from './components/estimations/Estimations';
// import AgencyStock from './components/agency/AgencyStock';
// import SalesReturn from './components/sales-return/SalesReturn';
// import DefectiveChallan from './components/defective-challan/DefectiveChallan';
// import WorkOrder from './components/work-order/WorkOrder';
// import OrderReceiving from './components/order/OrderReceiving';
// import EstimationDetails from './components/estimations/EstimationDetails';
// import ServiceRequestDetail from './components/service-request/ServiceRequestDetail';
// import ServiceRequestEdit from './components/service-request/ServiceRequestEdit';

// import LoginPage from './Login';

// function App() {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <Router>
//       <Routes>
//         {/* All Routes */}
//         <Route
//           path="/*"
//           element={<AppLayout isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />}
//         />
//       </Routes>
//     </Router>
//   );
// }

// function AppLayout({ isSidebarOpen, setSidebarOpen }) {
//   return (
//     <div className="flex h-screen bg-slate-50 overflow-hidden">
//       {/* 1. MOBILE SIDEBAR OVERLAY */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-20 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* 2. SIDEBAR NAVIGATION */}
//       <aside className={`
//         fixed lg:static inset-y-0 left-0 z-30 w-64 bg-blue-900 text-white 
//         transition-transform duration-300 ease-in-out
//         ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
//       `}>
//         <div className="flex items-center justify-between p-6 border-b border-blue-800">
//           <span className="text-xl font-bold tracking-wide">VOLTAS</span>
//           <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-blue-300 hover:text-white">
//             <X size={24} />
//           </button>
//         </div>

//         <nav className="p-4 space-y-2">
//           <Link to="/" onClick={() => setSidebarOpen(false)}>
//             <NavItem icon={LayoutDashboard} label="Dashboard" />
//           </Link>
//           <Link to="/service-requests" onClick={() => setSidebarOpen(false)}>
//             <NavItem icon={ClipboardList} label="Service Requests" />
//           </Link>
//           <Link to="/estimations" onClick={() => setSidebarOpen(false)}>
//             <NavItem icon={Calculator} label="Estimations" />
//           </Link>
//           <Link to="/agency-stock" onClick={() => setSidebarOpen(false)}>
//             <NavItem icon={Package} label="Agency Wise Stock" />
//           </Link>
//           <Link to="/sales-return" onClick={() => setSidebarOpen(false)}>
//             <NavItem icon={RotateCcw} label="Sales Return Order" />
//           </Link>
//           <Link to="/defective-challan" onClick={() => setSidebarOpen(false)}>
//             <NavItem icon={FileWarning} label="Defective Challan" />
//           </Link>
//           <Link to="/work-orders" onClick={() => setSidebarOpen(false)}>
//             <NavItem icon={Wrench} label="Work Order" />
//           </Link>
//           <Link to="/order-receiving" onClick={() => setSidebarOpen(false)}>
//             <NavItem icon={Truck} label="Order Receiving" />
//           </Link>
//         </nav>
//       </aside>

//       {/* 3. MAIN CONTENT AREA */}
//       <main className="flex-1 flex flex-col h-screen overflow-hidden">
//         {/* Adjusted Top Header: Reduced height (h-12), removed Search and Title */}
//         <header className="h-12 bg-white shadow-sm flex items-center justify-between px-4 lg:px-6 shrink-0">
//           <div>
//             {/* Hamburger visible only on mobile */}
//             <button
//               onClick={() => setSidebarOpen(true)}
//               className="p-1 text-slate-600 rounded-md hover:bg-slate-100 lg:hidden"
//             >
//               <Menu size={22} />
//             </button>
//           </div>

//           <div className="flex items-center gap-4">
//             {/* Profile Icon instead of initials */}
//             <button className="text-slate-400 hover:text-blue-600 transition-colors">
//               <CircleUser size={28} strokeWidth={1.5} />
//             </button>
//           </div>
//         </header>

//         {/* Scrollable Viewport */}
//         <div className="flex-1 overflow-y-auto">
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/service-requests" element={<ServiceRequest />} />
//             <Route path="/estimations" element={<Estimations />} />
//             <Route path="/agency-stock" element={<AgencyStock />} />
//             <Route path="/sales-return" element={<SalesReturn />} />
//             <Route path="/defective-challan" element={<DefectiveChallan />} />
//             <Route path="/work-orders" element={<WorkOrder />} />
//             <Route path="/order-receiving" element={<OrderReceiving />} />
//             <Route path="/estimations/:id" element={<EstimationDetails />} />
//             <Route path="/service-request/:id" element={<ServiceRequestDetail />} />
//             <Route path="/service-request/edit/:id" element={<ServiceRequestEdit />} />
//           </Routes>
//         </div>
//       </main>
//     </div>
//   );
// }

// function NavItem({ icon: Icon, label }) {
//   // Logic to highlight active link can be added here using useLocation()
//   return (
//     <div className="flex items-center gap-3 p-3 rounded-lg cursor-pointer text-blue-100 hover:bg-blue-800/50 hover:text-white transition-colors">
//       <Icon size={20} />
//       <span className="font-medium text-sm">{label}</span>
//     </div>
//   );
// }

// export default App;


// ------------------------------




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
// import AgencyStock from './components/agency/AgencyStock';
// import SalesReturn from './components/sales-return/SalesReturn';
// import DefectiveChallan from './components/defective-challan/DefectiveChallan';
// import WorkOrder from './components/work-order/WorkOrder';
// import OrderReceiving from './components/order/OrderReceiving';
// import EstimationDetails from './components/estimations/EstimationDetails';

// import LoginPage from './Login';

// /* =======================
//    AUTH GUARD
// ======================= */
// function ProtectedRoute({ isAuthenticated, children }) {
//   if (isAuthenticated === null) {
//     return <div className="h-screen flex items-center justify-center">Loading...</div>;
//   }

//   if (isAuthenticated === false) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }

// /* =======================
//    MAIN APP
// ======================= */
// function App() {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);
//   const [isUserAuthenticated, setIsUserAuthenticated] = useState(null);

//   useEffect(() => {
//     const authenticateUser = async () => {
//       try {
//         await window.catalyst.auth.isUserAuthenticated();
//         setIsUserAuthenticated(true);
//       } catch (err) {
//         setIsUserAuthenticated(false);
//       }
//     };
//     authenticateUser();
//   }, []);

//   return (
//     <Router>
//       <Routes>

//         {/* ---------- LOGIN (PUBLIC) ---------- */}
//         <Route
//           path="/login"
//           element={
//             isUserAuthenticated
//               ? <Navigate to="/" replace />
//               : <LoginPage />
//           }
//         />

//         {/* ---------- PROTECTED APP ---------- */}
//         <Route
//           path="/*"
//           element={
//             <ProtectedRoute isAuthenticated={isUserAuthenticated}>
//               <AppLayout
//                 isSidebarOpen={isSidebarOpen}
//                 setSidebarOpen={setSidebarOpen}
//               />
//             </ProtectedRoute>
//           }
//         />

//       </Routes>
//     </Router>
//   );
// }

// /* =======================
//    APP LAYOUT (AUTH ONLY)
// ======================= */
// function AppLayout({ isSidebarOpen, setSidebarOpen }) {
//   return (
//     <div className="flex h-screen bg-slate-50 overflow-hidden">

//       {/* Mobile Overlay */}
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

//         {/* Header */}
//         <header className="h-12 bg-white shadow-sm flex items-center justify-between px-4">
//           <button
//             onClick={() => setSidebarOpen(true)}
//             className="lg:hidden"
//           >
//             <Menu />
//           </button>

//           <CircleUser size={26} className="text-slate-500" />
//         </header>

//         {/* Pages */}
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
//     <Link to={to} className="flex items-center gap-3 p-3 rounded-lg text-blue-100 hover:bg-blue-800/50">
//       <Icon size={20} />
//       <span className="text-sm font-medium">{label}</span>
//     </Link>
//   );
// }

// export default App;


//------------------------------------

import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
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
  CircleUser
} from 'lucide-react';

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
//import EstimationDetails from './components/estimations/EstimationDetails';

import LoginPage from './Login';

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

  /* ---- AUTH LOADING STATE ---- */
  if (isAuthenticated === null) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <Router>
      {isAuthenticated ? (
        /* =======================
           PRIVATE ROUTES
        ======================= */
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
          {/* Prevent access to login after auth */}
          <Route path="/login" element={<Navigate to="/" replace />} />
        </Routes>
      ) : (
        /* =======================
           PUBLIC ROUTES
        ======================= */
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          {/* Catch all → login */}
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
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30 w-64 bg-blue-900 text-white
        transition-transform duration-300
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between p-6 border-b border-blue-800">
          <span className="text-xl font-bold">VOLTAS</span>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X />
          </button>
        </div>

        <nav className="p-4 space-y-2">
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

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-12 bg-white shadow-sm flex items-center justify-between px-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
            <Menu />
          </button>
          <CircleUser size={26} className="text-slate-500" />
        </header>

        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/service-requests" element={<ServiceRequest />} />
            <Route path="/estimations" element={<Estimations />} />
            <Route path="/estimations/:id" element={<EstimationDetails />} />
            <Route path="/agency-stock" element={<AgencyStock />} />
            <Route path="/sales-return" element={<SalesReturn />} />
            <Route path="/defective-challan" element={<DefectiveChallan />} />
            <Route path="/work-orders" element={<WorkOrder />} />
            <Route path="/order-receiving" element={<OrderReceiving />} />
            <Route path="/estimations/:id" element={<EstimationDetails />} />
            <Route path="/service-request/:id" element={<ServiceRequestDetail />} />
            <Route path="/service-request/edit/:id" element={<ServiceRequestEdit />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

/* =======================
   NAV ITEM
======================= */
import { Link } from 'react-router-dom';

function NavLink({ icon: Icon, label, to }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 p-3 rounded-lg text-blue-100 hover:bg-blue-800/50"
    >
      <Icon size={20} />
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}

export default App;
