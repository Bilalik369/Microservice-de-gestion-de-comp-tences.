import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, Save, X } from 'lucide-react';
import StatusBadge from './StatusBadge';

const CompetenceCard = ({ competence, onEdit, onDelete, onUpdateEvaluation, isEditing }) => {
  const [editingSousCompetences, setEditingSousCompetences] = useState([]);

  useEffect(() => {
    if (isEditing) {
      setEditingSousCompetences([...competence.sousCompetences]);
    }
  }, [isEditing, competence.sousCompetences]);

  const handleSousCompetenceStatusChange = (index, newStatus) => {
    setEditingSousCompetences((prev) =>
      prev.map((sc, i) => (i === index ? { ...sc, statut: newStatus } : sc))
    );
  };

  const handleSave = () => {
    onUpdateEvaluation(competence._id, editingSousCompetences);
  };

  const handleCancel = () => {
    onEdit(null);
    setEditingSousCompetences([]);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              {competence.code}
            </span>
            <h3 className="text-xl font-semibold text-gray-900">{competence.nom}</h3>
          </div>
          <StatusBadge status={competence.statutGlobal} />
        </div>

        <div className="flex gap-2">
          {!isEditing ? (
            <>
              <button
                onClick={() => onEdit(competence._id)}
                className="text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(competence._id)}
                className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="text-green-600 hover:text-green-700 p-2 rounded-lg hover:bg-green-50"
              >
                <Save className="w-4 h-4" />
              </button>
              <button
                onClick={handleCancel}
                className="text-gray-600 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-50"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-gray-700">Sous-compétences:</h4>
        {(isEditing ? editingSousCompetences : competence.sousCompetences).map((sc, index) => (
          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-700">{sc.nom}</span>
            {isEditing ? (
              <select
                value={sc.statut}
                onChange={(e) => handleSousCompetenceStatusChange(index, e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="non validée">Non validée</option>
                <option value="validée">Validée</option>
              </select>
            ) : (
              <StatusBadge status={sc.statut} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompetenceCard;
