import React from 'react';

const SalesReturn = () => {
  // Mock Data based on the Sales Return Order image
  const returnData = [
    { id: 'SR202300040', invoice: '34661', name: 'sbbns', reason: '', status: '' },
    { id: 'SR202300039', invoice: '12345', name: 'wadesf', reason: 'Damaged', status: 'Claimed' },
    { id: 'SR202300041', invoice: '121234321', name: 'wadsds', reason: 'Part Laying More than 90 D...', status: 'Accepted' },
    { id: 'SR202300038', invoice: '1', name: 'asdf', reason: 'Part Laying More than 90 D...', status: 'Claimed' },
    { id: 'SR202300037', invoice: '124', name: 'abc', reason: 'Part Laying More than 90 D...', status: 'In Progress' },
    { id: 'SR202300030', invoice: 'INA2023719780', name: 'Sales Return - Condenser ...', reason: 'Damaged', status: 'In Progress' },
    { id: 'SR202300029', invoice: 'INI2023692816', name: 'Sales Return - Remote Co...', reason: 'New part Order', status: 'In Progress' },
    { id: 'SR202300028', invoice: 'INU2023946565', name: 'Sales Return - Condenser ...', reason: 'New part Order', status: 'In Progress' },
    { id: 'SR202300027', invoice: 'INE2023640866', name: 'Sales Return - Condenser ...', reason: 'Damaged', status: 'Claimed' },
    { id: 'SR202300026', invoice: 'INI2023131068', name: 'Sales Return - Remote Co...', reason: 'Part Laying More than 90 D...', status: 'Claimed' },
    { id: 'SR202300025', invoice: 'INO2023618689', name: 'Sales Return - Condenser ...', reason: 'Part Laying More than 90 D...', status: 'In Progress' },
  ];

  return (
    <div className="p-4 lg:p-6 bg-slate-50 min-h-full">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="text-xl font-bold text-slate-800">Sales Return Order</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors shadow-sm">
          Create
        </button>
      </div>
      
      {/* Table Container */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-50/50 text-blue-600 text-[11px] font-bold uppercase tracking-wider border-b border-slate-100">
                <th className="px-6 py-4">Sales Return Order ID</th>
                <th className="px-6 py-4">Invoice Number</th>
                <th className="px-6 py-4">Sales Return Name</th>
                <th className="px-6 py-4">Return Reason</th>
                <th className="px-6 py-4">Sales Return Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {returnData.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors text-sm text-slate-600">
                  <td className="px-6 py-4 whitespace-nowrap text-blue-500 font-medium cursor-pointer hover:underline">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.invoice}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-500">
                    {item.reason || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                      item.status === 'Accepted' || item.status === 'Claimed'
                        ? 'bg-emerald-50 text-emerald-700' 
                        : item.status === 'In Progress'
                        ? 'bg-amber-50 text-amber-700'
                        : 'text-slate-400'
                    }`}>
                      {item.status || '-'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesReturn;