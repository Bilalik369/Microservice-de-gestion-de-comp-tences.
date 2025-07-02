import React from 'react';

const StatsCard = ({ title, value, color }) => (
  <div className={`bg-sky-200 rounded-lg shadow-md p-6 border-l-4 ${color}`}>
    <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
    <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
  </div>
);

export default StatsCard;
