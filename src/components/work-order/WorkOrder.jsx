import React from 'react';

const WorkOrder = () => {
  // Mock Data based on the Work Order image
  const workOrderData = [
    { owner: 'Akilavan J', number: '591782000002799079', contact: 'Vasuda Sandip', dealer: 'Zoho', subject: 'Estimate for AC filters' },
    { owner: 'Vivek George', number: '591782000002799019', contact: 'Vasuda Sandip', dealer: 'Panasonic Dealer- Mittal El...', subject: 'AC compressor estimate' },
    { owner: 'Vivek George', number: '591782000002774019', contact: 'Vasuda Sandip', dealer: 'Panasonic Dealer- Mittal El...', subject: 'AC Cooling Estimate' },
    { owner: 'Vivek George', number: '591782000002766019', contact: 'Vasuda Sandip', dealer: '', subject: 'AC Voltage WO' },
    { owner: 'Vivek George', number: '591782000002764058', contact: 'Vasuda Sandip', dealer: '', subject: 'Compressor issue estimate' },
    { owner: 'Vivek George', number: '591782000002741019', contact: 'Sita Mamun', dealer: 'Panasonic Dealer- Prakas...', subject: 'Estimate for Sita' },
    { owner: 'Vivek George', number: '591782000002738039', contact: 'Vasuda Sandip', dealer: '', subject: 'AC turning on issue estima...' },
    { owner: 'Vivek George', number: '591782000002707019', contact: 'Vasuda Sandip', dealer: '', subject: 'Air filter replacement esti...' },
    { owner: 'Vivek George', number: '591782000002691020', contact: 'Vasuda Sandip', dealer: '', subject: 'AC issues fixing' },
    { owner: 'Vivek George', number: '591782000002596019', contact: 'Vasuda Sandip', dealer: 'Panasonic Dealer- Great E...', subject: 'Estimate' },
    { owner: 'Vivek George', number: '591782000002545019', contact: 'Vasuda Sandip', dealer: 'Panasonic Dealer- Great E...', subject: 'AC repair' },
  ];

  return (
    <div className="p-4 lg:p-6 bg-slate-50 min-h-full">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="text-xl font-bold text-slate-800">Work Order</h2>
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
                <th className="px-6 py-4">Work Order Owner</th>
                <th className="px-6 py-4">Work Order Number</th>
                <th className="px-6 py-4">Contact Name</th>
                <th className="px-6 py-4">Dealer Name</th>
                <th className="px-6 py-4">Subject</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {workOrderData.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors text-sm text-slate-600">
                  <td className="px-6 py-4 whitespace-nowrap">{item.owner}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-blue-500 font-medium cursor-pointer hover:underline">
                    {item.number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.contact}</td>
                  <td className="px-6 py-4 whitespace-nowrap italic text-slate-500">
                    {item.dealer || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.subject}
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

export default WorkOrder;