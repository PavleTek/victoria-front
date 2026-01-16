import React from "react";

const Quotations: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Quotations</h1>
        <p className="text-gray-600">Manage and create quotations for your clients</p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-500">Quotations content will be displayed here.</p>
      </div>
    </div>
  );
};

export default Quotations;

