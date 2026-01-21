import React, { useState, useEffect } from 'react';
import AgencyStockModal from './AgencyStockModal';
import { Link } from 'react-router-dom';

const AgencyStock = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stockData, setStockData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStockData = async () => {
    setIsLoading(true);
    const apiUrl = "https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/agency_wise_stock?fields=Name,Agency,Agency_Name,Stock_Details,Spares_Service_Category&page=1&per_page=200";
    
    try {
      const authResponse = await window.catalyst.auth.generateAuthToken();
      
      const apiResponse = await fetch(apiUrl, {
        headers: {
          Authorization: `${authResponse.access_token}`,
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

  // Helper for Category Pill Styling (similar to getStatusStyles)
  // const getCategoryStyles = (category) => {
  //   return 'bg-amber-50 text-amber-700 border-amber-100'; // Using the amber theme from ServiceRequest
  // };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-600 font-medium">Loading...</p>
      </div>
    );
  }

  return (
    <div className="px-4 pb-8 bg-slate-50/50 min-h-screen">
      {/* Header section styled like ServiceRequest */}
      <div className="flex justify-between items-center py-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Agency Wise Stock</h2>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#0066b2] hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors shadow-sm"
        >
          Create
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide">Agency Wise Stock Name</th>
                <th className="px-6 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide">Agency ID</th>
                <th className="px-6 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide">Agency Name</th>
                <th className="px-6 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide">Part Name</th>
                <th className="px-6 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide">Spares/Service Category</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {error ? (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-rose-600 font-medium text-sm">
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
                  <tr key={item.id || idx} className="hover:bg-slate-50/80 transition-colors group">
                    {/* <td className="px-6 py-5 whitespace-nowrap">
                      <span className="text-blue-600 font-bold text-sm hover:text-blue-800 transition-colors duration-200 cursor-pointer">
                        {item.Name || '-'}
                      </span>
                    </td> */}
                    <td className="px-6 py-5 whitespace-nowrap">
                      <Link
                        to={`/agency-stock/${item.id}`}
                        className="text-blue-600 font-bold text-sm hover:text-blue-800 transition-colors duration-200"
                      >
                        {item.Name || '-'}
                      </Link>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-slate-900">
                      {item.Agency?.name || '-'}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-600 font-medium">
                      {item.Agency_Name || '-'}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-700">
                      {item.Stock_Details?.name || '-'}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-700">
                      {/* <span className={`px-3 py-1 rounded-md text-[12px] font-bold border ${getCategoryStyles(item.Spares_Service_Category)}`}> */}
                        {item.Spares_Service_Category || 'NA'}
                      {/* </span> */}
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