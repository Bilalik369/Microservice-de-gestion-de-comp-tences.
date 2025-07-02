import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
      status === 'validée'
        ? 'bg-green-100 text-green-800'
        : 'bg-red-100 text-red-800'
    }`}
  >
    {status === 'validée' ? (
      <CheckCircle className="w-4 h-4 mr-1" />
    ) : (
      <XCircle className="w-4 h-4 mr-1" />
    )}
    {status}
  </span>
);

export default StatusBadge;
