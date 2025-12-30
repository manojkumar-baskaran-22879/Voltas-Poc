import React from 'react';

const Estimations = () => {
  // Mock Data based on the provided Estimations image
  const estimationData = [
    { owner: 'Vivek George', number: '591782000002802002', contact: 'Vasuda Sandip', dealer: '', subject: 'Estimate for AC filters' },
    { owner: 'Vivek George', number: '591782000002789007', contact: 'Vasuda Sandip', dealer: 'Panasonic Dealer- Mittal El...', subject: 'AC compressor estimate' },
    { owner: 'Vivek George', number: '591782000002772002', contact: 'Vasuda Sandip', dealer: 'Panasonic Dealer- Mittal El...', subject: 'AC Cooling Estimate' },
    { owner: 'Vivek George', number: '591782000002765009', contact: 'Vasuda Sandip', dealer: '', subject: 'Compressor issue estimate' },
    { owner: 'Vivek George', number: '591782000002749002', contact: 'Vasuda Sandip', dealer: '', subject: 'AC turning on issue estima...' },
    { owner: 'Vivek George', number: '591782000002746009', contact: 'Vasuda Sandip', dealer: '', subject: 'AC Voltage WO' },
    { owner: 'Vivek George', number: '591782000002737002', contact: 'Sita Mamun', dealer: 'Panasonic Dealer- Prakas...', subject: 'Estimate for Sita' },
    { owner: 'Vivek George', number: '591782000002699010', contact: 'Vasuda Sandip', dealer: '', subject: 'Air filter replacement esti...' },
    { owner: 'Vivek George', number: '591782000002686002', contact: 'Vasuda Sandip', dealer: '', subject: 'AC issues fixing' },
    { owner: 'Vivek George', number: '591782000002581007', contact: 'Vasuda Sandip', dealer: 'Panasonic Dealer- Great E...', subject: 'Estimate' },
    { owner: 'Vivek George', number: '591782000002541002', contact: 'Vasuda Sandip', dealer: 'Panasonic Dealer- Great E...', subject: 'AC repair' },
  ];

  return (
    <div className="p-4 lg:p-6 bg-slate-50 min-h-full">
      {/* Header with Title and Create Button */}
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="text-xl font-bold text-slate-800">Estimations</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors">
          Create
        </button>
      </div>
      
      {/* Table Container */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-50/50 text-blue-600 text-[11px] font-bold uppercase tracking-wider border-b border-slate-100">
                <th className="px-6 py-4">Estimation Owner</th>
                <th className="px-6 py-4">Estimation Number</th>
                <th className="px-6 py-4">Contact Name</th>
                <th className="px-6 py-4">Dealer Name</th>
                <th className="px-6 py-4">Subject</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {estimationData.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors text-sm text-slate-600">
                  <td className="px-6 py-4 whitespace-nowrap">{item.owner}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-blue-500 hover:underline cursor-pointer font-medium">
                    {item.number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.contact}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-500 italic">
                    {item.dealer || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap truncate max-w-[200px]">
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

export default Estimations;