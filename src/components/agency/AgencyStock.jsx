import React from 'react';

const AgencyStock = () => {
  // Mock Data based on the Agency Wise Stock image
  const stockData = [
    { id: '10115', agencyCode: 'AG-00019', agencyName: 'Shine AC services', partName: 'Routine Maintenance', category: 'Service' },
    { id: '10116', agencyCode: 'AG-00019', agencyName: 'Shine AC services', partName: 'Preventive Maintenance', category: 'Service' },
    { id: '10114', agencyCode: 'AG-0002', agencyName: 'Prime Air conditioning serv...', partName: 'Preventive Maintenance', category: 'Service' },
    { id: '10113', agencyCode: 'AG-00017', agencyName: 'Lucky Cooling systems', partName: 'Relay Switches', category: 'Spare Parts' },
    { id: '10112', agencyCode: 'AG-00018', agencyName: 'Honeywell AC services', partName: 'Relay Switches', category: 'Spare Parts' },
    { id: '10111', agencyCode: 'AG-00019', agencyName: 'Shine AC services', partName: 'Relay Switches', category: 'Spare Parts' },
    { id: '10110', agencyCode: 'AG-00020', agencyName: 'Supreme Air conditioning...', partName: 'Relay Switches', category: 'Spare Parts' },
    { id: '10109', agencyCode: 'AG-00021', agencyName: 'Excellent Cooling systems', partName: 'Relay Switches', category: 'Spare Parts' },
    { id: '10108', agencyCode: 'AG-00022', agencyName: 'Swiss Cooling & Heating', partName: 'Relay Switches', category: 'Spare Parts' },
    { id: '10107', agencyCode: 'AG-00023', agencyName: 'Star Cooling services', partName: 'Relay Switches', category: 'Spare Parts' },
    { id: '10106', agencyCode: 'AG-0001', agencyName: 'Ultima cooling solutions', partName: 'Relay Switches', category: 'Spare Parts' },
  ];

  return (
    <div className="p-4 lg:p-6 bg-slate-50 min-h-full">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="text-xl font-bold text-slate-800">Agency Wise Stock</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors shadow-sm">
          Create
        </button>
      </div>
      
      {/* Data Table Container */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-50/50 text-blue-600 text-[11px] font-bold uppercase tracking-wider border-b border-slate-100">
                <th className="px-6 py-4">Agency Wise Stock Name</th>
                <th className="px-6 py-4">Agency</th>
                <th className="px-6 py-4">Agency Name</th>
                <th className="px-6 py-4">Part Name</th>
                <th className="px-6 py-4">Spares/Service Category</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stockData.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors text-sm text-slate-600">
                  <td className="px-6 py-4 whitespace-nowrap text-blue-500 font-medium cursor-pointer hover:underline">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.agencyCode}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.agencyName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.partName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                      item.category === 'Service' 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {item.category}
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

export default AgencyStock;