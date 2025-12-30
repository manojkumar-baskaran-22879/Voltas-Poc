import React from 'react';

const DefectiveChallan = () => {
  // Mock Data based on the Defective Challan image
  const challanData = [
    { id: 'DC20230038', name: '', orderNum: '', grn: '', status: '' },
    { id: 'DC20230036', name: 'Web Test', orderNum: 'TEST', grn: '', status: 'In Progress' },
    { id: 'DC20230035', name: 'yahgsb', orderNum: '62663', grn: '727727', status: 'Accepted' },
    { id: 'DC20230033', name: 'dfbgsedaw', orderNum: '12345432', grn: '12345432', status: 'Collected' },
    { id: 'DC20230037', name: 'shbbx', orderNum: '234', grn: '15553', status: 'Claimed' },
    { id: 'DC20230034', name: 'dfbgsedaw', orderNum: '12345432', grn: '12345432', status: 'Collected' },
    { id: 'DC20230031', name: '', orderNum: '123', grn: '233', status: 'In Progress' },
    { id: 'DC20230032', name: 'sdjkf', orderNum: '1234', grn: '17', status: 'Accepted' },
    { id: 'DC20230030', name: '', orderNum: '1222', grn: '1', status: 'In Progress' },
    { id: 'DC2023001', name: 'Defective Challan - Fan M...', orderNum: '1000567', grn: '60009875', status: 'Collected' },
    { id: 'DC20230025', name: 'Defective Challan - Comp...', orderNum: '1000585', grn: '6001005', status: 'Collected' },
    { id: 'DC20230024', name: 'Defective Challan - Comp...', orderNum: '1000576', grn: '6000996', status: 'Accepted' },
  ];

  // Helper to determine status color themes
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Accepted':
      case 'Collected':
        return 'bg-emerald-50 text-emerald-700';
      case 'In Progress':
        return 'bg-amber-50 text-amber-700';
      case 'Claimed':
        return 'bg-blue-50 text-blue-700';
      default:
        return 'text-slate-400';
    }
  };

  return (
    <div className="p-4 lg:p-6 bg-slate-50 min-h-full">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="text-xl font-bold text-slate-800">Defective Challan</h2>
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
                <th className="px-6 py-4">Defective Challan ID</th>
                <th className="px-6 py-4">Defective Challan Name</th>
                <th className="px-6 py-4">Sales Order Number</th>
                <th className="px-6 py-4">GRN Number</th>
                <th className="px-6 py-4">Defective Chalan Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {challanData.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors text-sm text-slate-600">
                  <td className="px-6 py-4 whitespace-nowrap text-blue-500 font-medium cursor-pointer hover:underline">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.name || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.orderNum || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.grn || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusStyle(item.status)}`}>
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

export default DefectiveChallan;