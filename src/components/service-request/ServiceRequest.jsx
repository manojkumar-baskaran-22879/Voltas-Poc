import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ServiceRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/service_request?fields=Name,Contact_Name,Appointment_Date_and_Time,Technician,Visit_Status,Service_Request_Status&page=1&per_page=200";

  useEffect(() => {
    
    const fetchServiceRequests = async () => {
      try{
        var auth = window.catalyst.auth;
        await window.catalyst.auth.generateAuthToken().then(async (response) => {
        console.log("SUCCESS: " + JSON.stringify(response));
        try {
        setLoading(true);
        const apiResponse = await fetch(API_URL,{
          headers: {
                        Authorization: `${response.access_token}`,
                        "Content-Type": "application/json",
                    },
                    method: 'GET',
        });
        if (!apiResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await apiResponse.json();
        // The API returns an object with a "data" array
        setRequests(result.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
        //const token = response.access_token; 
        //setToken(token);
  })
  .catch((err) => {
    console.error("ERROR1: " + JSON.stringify(err));
    console.log("E1: "+err.message);
    console.log("E2: "+err);
  });
      }
      catch (err) {
        console.log("ERROR: "+JSON.stringify(err));
        console.log("E: "+err.message);
        console.log("E: "+err);
      }
      
    };

    fetchServiceRequests();
  }, []);

  // Helper to determine status dot colors
  const getStatusColor = (status) => {
    if (!status) return 'bg-slate-300'; // Gray for null/empty
    switch (status.toLowerCase()) {
      case 'closed':
      case 'completed': 
        return 'bg-emerald-500';
      case 'open': 
        return 'bg-red-500';
      case 'un assigned': 
        return 'bg-amber-500';
      case 'scheduled':
        return 'bg-blue-500';
      default: 
        return 'bg-slate-400';
    }
  };

  // Helper to format date strings
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="p-4 lg:p-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="text-xl font-bold text-slate-800">Service Requests</h2>
        {loading && <span className="text-sm text-blue-600 animate-pulse font-medium">Updating data...</span>}
      </div>
      
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-50/50 text-blue-600 text-[11px] font-bold uppercase tracking-wider border-b border-slate-100">
                <th className="px-6 py-4">Request ID</th>
                <th className="px-6 py-4">Customer Name</th>
                <th className="px-6 py-4">Appointment Date</th>
                <th className="px-6 py-4">Technician</th>
                <th className="px-6 py-4">Visit Status</th>
                <th className="px-6 py-4">Request Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading && requests.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-slate-400">Loading records...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-red-500">Error: {error}</td>
                </tr>
              ) : requests.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-slate-400">No service requests found.</td>
                </tr>
              ) : (
                requests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50 transition-colors text-sm text-slate-600">
                    <td className="px-6 py-4 font-medium text-slate-700 whitespace-nowrap">
                      {/* {req.Name || '-'} */}
                      <Link to={`/service-request/${req.id}`} className="text-blue-600 hover:underline">
                        {req.Name || '-'}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {req.Contact_Name?.name || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs">
                      {formatDate(req.Appointment_Date_and_Time)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {req.Technician?.name || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${getStatusColor(req.Visit_Status)}`} />
                        {req.Visit_Status || 'Pending'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${getStatusColor(req.Service_Request_Status)}`} />
                        {req.Service_Request_Status || 'Open'}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ServiceRequest;