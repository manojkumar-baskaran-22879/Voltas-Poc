import React from 'react';

const OrderReceiving = () => {
  // Mock Data based on the Order Receiving image
  const orderData = [
    { id: 'OR202300027', email: '', challanId: '', returnId: '', status: 'Partially Received' },
    { id: 'OR202300026', email: 'prateek.agarwal@exampl...', challanId: '', returnId: '', status: '' },
    { id: 'OR202300025', email: 'divya.mahajan@example.i...', challanId: '', returnId: '', status: '' },
    { id: 'OR202300024', email: 'amar.yadav@example.in', challanId: '', returnId: '', status: '' },
    { id: 'OR202300023', email: 'pooja.banerjee@example.i...', challanId: '', returnId: '', status: '' },
    { id: 'OR202300022', email: 'sneha.gupta@example.in', challanId: '', returnId: '', status: '' },
    { id: 'OR202300021', email: 'ananya.singh@example.in', challanId: '', returnId: '', status: '' },
    { id: 'OR202300020', email: 'arjun.patel@example.in', challanId: '', returnId: '', status: '' },
    { id: 'OR202300019', email: 'anjali.rawat@example.in', challanId: '', returnId: '', status: '' },
    { id: 'OR202300018', email: 'ravi.thakur@example.in', challanId: '', returnId: '', status: '' },
    { id: 'OR202300017', email: 'rohit.kumar@example.in', challanId: '', returnId: '', status: '' },
    { id: 'OR202300016', email: 'rahul.mittal@example.in', challanId: '', returnId: '', status: '' },
    { id: 'OR202300015', email: 'vikram.joshi@example.in', challanId: '', returnId: '', status: '' },
  ];

  return (
    <div className="p-4 lg:p-6 bg-slate-50 min-h-full">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="text-xl font-bold text-slate-800">Order Receiving</h2>
      </div>
      
      {/* Table Container */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-50/50 text-blue-600 text-[11px] font-bold uppercase tracking-wider border-b border-slate-100">
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Defective Challan ID</th>
                <th className="px-6 py-4">Sales Return ID</th>
                <th className="px-6 py-4">Order Receiving Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orderData.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors text-sm text-slate-600">
                  <td className="px-6 py-4 whitespace-nowrap text-blue-500 font-medium cursor-pointer hover:underline">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-500">
                    {item.email || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-400 italic text-xs">
                    {item.challanId || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-400 italic text-xs">
                    {item.returnId || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.status && (
                      <span className="px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700">
                        {item.status}
                      </span>
                    )}
                    {!item.status && <span className="text-slate-300">-</span>}
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

export default OrderReceiving;