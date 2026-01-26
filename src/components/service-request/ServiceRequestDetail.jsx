import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ServiceRequestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const auth = window.catalyst.auth;
        const response = await auth.generateAuthToken();
        
        const API_URL = `https://voltasservicemanagement-773793963.development.catalystserverless.com/server/service/service_request/${id}`;
        
        const apiResponse = await fetch(API_URL, {
          headers: {
            Authorization: `${response.access_token}`,
            "Content-Type": "application/json",
          },
          method: 'GET',
        });

        if (!apiResponse.ok) throw new Error('Failed to fetch details');
        
        const result = await apiResponse.json();
        setData(result.data[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-600 font-medium">Loading service request details...</p>
      </div>
    );
  }
  if (error) return <div className="p-10 text-center text-red-500 font-medium">Error: {error}</div>;
  if (!data) return <div className="p-10 text-center text-slate-500">No data found.</div>;

  const formatValue = (val) => {
    if (!val) return '-';
    if (typeof val === 'object') return val.name || '-';
    return val;
  };

  // Increased text-sm to text-base for better readability
  const DataRow = ({ label, value }) => (
    <div className="grid grid-cols-2 py-3 text-base border-b border-slate-50 last:border-0 min-w-0">
      <span className="text-slate-500 font-medium truncate pr-2">{label}</span>
      <div className="flex gap-4 min-w-0">
        <span className="text-slate-400 shrink-0">:</span>
        <span className="text-slate-900 break-all md:break-words min-w-0">{formatValue(value)}</span>
      </div>
    </div>
  );

  // Increased title size to text-lg
  const SectionHeader = ({ title }) => (
    <h3 className="text-lg font-bold text-blue-900 mb-4 mt-8 first:mt-0 pb-2 border-b-2 border-blue-50">
      {title}
    </h3>
  );

  return (
    /* Changed p-4 lg:p-8 to pt-2 (reduced top padding) */
    <div className="bg-slate-50 min-h-screen pt-2 px-4 lg:pt-4 lg:px-8">
      {/* Header Nav - Reduced mb-6 to mb-4 */}
      {/* <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-slate-200 rounded-full transition-colors"
          >
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-2xl font-bold text-slate-800">{data.Name}</h2>
        </div>
        <button 
          onClick={() => navigate(`/service-request/edit/${id}`)}
          className="bg-blue-600 text-white px-8 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
        >
          Edit
        </button>
      </div> */}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
  <div className="flex items-center gap-4">
    <button 
      onClick={() => navigate('/service-requests')}
      className="p-2 hover:bg-slate-200 rounded-full transition-colors"
    >
      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <h2 className="text-xl md:text-2xl font-bold text-slate-800 break-all">{data.Name}</h2>
  </div>
  
  <button 
    onClick={() => navigate(`/service-request/edit/${id}`)}
    className="w-full sm:w-auto bg-blue-600 text-white px-8 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md text-center"
  >
    Edit
  </button>
</div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-8">
        {/* Service Request Information */}
        <SectionHeader title="Service Request Information" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
          <div>
            <DataRow label="Agency ID" value={data.Agency?.name} />
            <DataRow label="Agency Name" value={data.Agency_Name} />
            <DataRow label="Technician" value={data.Technician?.name} />
            <DataRow label="Helper First Name" value={data.Helper_First_Name} />
            <DataRow label="Helper Last Name" value={data.Helper_Last_Name} />
            <DataRow label="Service Request Status" value={data.Service_Request_Status} />
            <DataRow label="Number 1" value={""} />
          </div>
          <div>
            <DataRow label="Service Request Name" value={data.Service_Request_Name_1} />
            <DataRow label="Service Request Type" value={data.Service_Request_Type} />
            <DataRow label="Service Request Sub Type" value={data.Service_Request_Sub_Type} />
            <DataRow label="Escalation" value={data.Escalation} />
            <DataRow label="Severity" value={data.Severity} />
            <DataRow label="Service Request Owner" value={data.Owner?.name} />
          </div>
        </div>

        {/* Customer Information */}
        <SectionHeader title="Customer Information" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
          <div>
            <DataRow label="Contact Name" value={data.Contact_Name?.name} />
            <DataRow label="Customer Email" value={data.Customer_Email} />
            <DataRow label="Phone" value={data.Phone} />
            <DataRow label="Customer Type" value={data.Customer_Type} />
            <DataRow label="Customer Sub Type" value={data.Customer_Sub_Type} />
          </div>
          <div>
            <div className="grid grid-cols-2 py-3 text-base border-b border-slate-50">
              <span className="text-slate-500 font-medium">Street</span>
              <div className="flex gap-4">
                  <span className="text-slate-400">:</span>
                  <span className="text-slate-900">{data?.Street || '-'}</span>
              </div>
            </div>
            <DataRow label="City" value={data.City} />
            <DataRow label="State" value={data.State} />
            <DataRow label="Zip Code" value={data.Zip_Code} />
            <DataRow label="District" value={""} />
            <DataRow label="Country" value={data.Country} />
          </div>
        </div>

        {/* Product Information */}
        <SectionHeader title="Product Information" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
          <div>
            <DataRow label="Product Code" value={data.Product_Code?.name} />
            <DataRow label="Product Category" value={data.Product_Category} />
            <DataRow label="Unit Status" value={data.Unit_Status} />
            <DataRow label="Dealer Name" value={data.Dealer_Name} />
          </div>
          <div>
            <DataRow label="Product Name" value={data.Product_Name} />
            <DataRow label="Product Group" value={data.Product_Group} />
            <DataRow label="Purchased Date" value={data.Purchased_Date} />
            <DataRow label="Purchased From" value={data.Purchased_From} />
            <DataRow label="Dealer Type" value={data.Dealer_Type} />
          </div>
        </div>

        {/* Visit Information */}
        <SectionHeader title="Visit Information" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
          <div>
            <DataRow label="Appointment Date and Time" value={data.Appointment_Date_and_Time} />
            <DataRow label="payment Status" value={data.payment_Status} />
          </div>
          <div>
            <DataRow label="Actual Start Date and Time" value={data.Actual_Start_Date_and_Time} />
            <DataRow label="Actual End Date and Time" value={data.Actual_End_Date_and_Time} />
            <DataRow label="Visit Status" value={data.Visit_Status} />
          </div>
        </div>

        {/* Resolution Status */}
        <SectionHeader title="Resolution Status" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
          <div>
            <DataRow label="Fault Group" value={data.Fault_Group} />
            <DataRow label="Action Taken" value={data.Action_Taken} />
          </div>
          <div>
            <DataRow label="Product/Service Name" value={data.Product_Service_Name} />
            <DataRow label="Description" value={data.Description} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceRequestDetail;