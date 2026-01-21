import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react'; // Optional: for the back icon

const SalesReturnDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDetails = async () => {
    setLoading(true);
    const apiUrl = `https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/sales_return_order/${id}`;
    
    try {
      const authResponse = await window.catalyst.auth.generateAuthToken();
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `${authResponse.access_token}`,
          "Content-Type": "application/json",
        },
        method: 'GET',
      });

      if (!response.ok) throw new Error("Failed to fetch details");

      const result = await response.json();
      setData(result.data[0]); // Taking the first object from the data array
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !data) {
    return <div className="p-8 text-rose-500">Error: {error || "Record not found"}</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)} 
            className="p-1 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ChevronLeft size={20} className="text-blue-600" />
          </button>
          <h1 className="text-lg font-semibold text-slate-800">{data.id}</h1>
        </div>
        <button className="bg-[#0066b2] hover:bg-blue-700 text-white px-6 py-1.5 rounded-md text-sm font-medium transition-colors">
          Edit
        </button>
      </div>

      <div className="max-w-7xl mx-auto p-8">
        {/* Sales Return Order Information Section */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Sales Return Order Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-20">
            {/* Left Column */}
            <div className="space-y-4">
              <DetailRow label="Invoice Number" value={data.Invoice_Number} />
              <DetailRow label="Return Reason" value={data.Return_Reason} />
              <DetailRow label="Email" value={data.Email} />
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <DetailRow label="Sales Return Name" value={data.Sales_Return_Name} />
              <DetailRow label="GRN Number" value={data.GRN_Number} />
              <DetailRow label="Sales Return Status" value={data.Sales_Return_Status} />
              <DetailRow label="Secondary Email" value={data.Secondary_Email} />
              <div className="flex items-start">
                <span className="w-40 text-slate-500 text-sm">Email Opt Out</span>
                <span className="text-slate-400 mr-4">:</span>
                <input 
                  type="checkbox" 
                  checked={data.Email_Opt_Out} 
                  readOnly 
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Product Details Section */}
        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Product Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-20">
            <div className="space-y-4">
              <DetailRow label="Part Number" value={data.Part_Number} />
              <DetailRow label="Part Quantity" value={data.Part_Quantity} />
            </div>
            <div className="space-y-4">
              <DetailRow label="Part Name" value={data.Part_Name} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

// Reusable Detail Row Component for layout consistency
const DetailRow = ({ label, value }) => (
  <div className="flex items-start">
    <span className="w-40 text-slate-500 text-sm">{label}</span>
    <span className="text-slate-400 mr-4">:</span>
    <span className="text-slate-900 text-sm font-medium">{value || '-'}</span>
  </div>
);

export default SalesReturnDetails;