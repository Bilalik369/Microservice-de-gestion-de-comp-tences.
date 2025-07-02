import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Plus, Search, Filter, X, Save, Trash2 } from 'lucide-react';

import competenceService from '../services/competenceService';
import StatusBadge from './StatusBadge';
import StatsCard from './StatsCard';
import CompetenceCard from './CompetenceCard';

const CompetenceManager = () => {
  const [competences, setCompetences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [formData, setFormData] = useState({
    code: '',
    nom: '',
    sousCompetences: [{ nom: '', statut: 'non validée' }]
  });

  const loadCompetences = useCallback(async () => {
    try {
      setLoading(true);
      const data = await competenceService.getAll();
      setCompetences(data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des compétences');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCompetences();
  }, [loadCompetences]);

  const filteredCompetences = useMemo(() => {
    return competences.filter(comp => {
      const matchesSearch =
        comp.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comp.code.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || comp.statutGlobal === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [competences, searchTerm, statusFilter]);

  const stats = useMemo(() => {
    return competences.reduce(
      (acc, comp) => {
        acc.total += 1;
        if (comp.statutGlobal === 'validée') acc.validees += 1;
        else acc.nonValidees += 1;
        return acc;
      },
      { total: 0, validees: 0, nonValidees: 0 }
    );
  }, [competences]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSousCompetenceChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      sousCompetences: prev.sousCompetences.map((sc, i) =>
        i === index ? { ...sc, [field]: value } : sc
      )
    }));
  };

  const addSousCompetence = () => {
    setFormData(prev => ({
      ...prev,
      sousCompetences: [...prev.sousCompetences, { nom: '', statut: 'non validée' }]
    }));
  };

  const removeSousCompetence = index => {
    setFormData(prev => ({
      ...prev,
      sousCompetences: prev.sousCompetences.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await competenceService.create(formData);
      await loadCompetences();
      resetForm();
    } catch (err) {
      setError('Erreur lors de la création de la compétence');
    }
  };

  const handleUpdateEvaluation = async (id, sousCompetences) => {
    try {
      await competenceService.updateEvaluation(id, sousCompetences);
      await loadCompetences();
      setEditingId(null);
    } catch (err) {
      setError('Erreur lors de la mise à jour');
    }
  };

  const handleDelete = async id => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette compétence ?')) {
      try {
        await competenceService.delete(id);
        await loadCompetences();
      } catch (err) {
        setError('Erreur lors de la suppression');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      code: '',
      nom: '',
      sousCompetences: [{ nom: '', statut: 'non validée' }]
    });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-sky-300">
      
      <header className="bg-sky-200 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gestion des Compétences</h1>
              <p className="text-gray-600 mt-1">Suivi et évaluation des compétences techniques</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="bg-yellow-400 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Nouvelle Compétence
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard title="Total" value={stats.total} color="border-blue-500 " />
          <StatsCard title="Validées" value={stats.validees} color="border-green-500" />
          <StatsCard title="Non Validées" value={stats.nonValidees} color="border-red-500" />
        </div>

       
        <div className="bg-sky-200 rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher par nom ou code..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Tous les statuts</option>
                <option value="validée">Validées</option>
                <option value="non validée">Non validées</option>
              </select>
            </div>
          </div>
        </div>

        
        <div className="space-y-6">
          {filteredCompetences.map(competence => (
            <CompetenceCard
              key={competence._id}
              competence={competence}
              onEdit={setEditingId}
              onDelete={handleDelete}
              onUpdateEvaluation={handleUpdateEvaluation}
              isEditing={editingId === competence._id}
            />
          ))}
        </div>

        {filteredCompetences.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucune compétence trouvée</p>
          </div>
        )}
      </div>


      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">Nouvelle Compétence</h2>
              <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Code</label>
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    placeholder="Ex: C1, C2..."
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleInputChange}
                    placeholder="Nom de la compétence"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-medium text-gray-700">Sous-compétences</label>
                  <button
                    type="button"
                    onClick={addSousCompetence}
                    className="text-blue-600 hover:text-blue-700 text-sm flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Ajouter
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.sousCompetences.map((sc, index) => (
                    <div key={index} className="flex gap-3 items-center">
                      <input
                        type="text"
                        value={sc.nom}
                        onChange={e => handleSousCompetenceChange(index, 'nom', e.target.value)}
                        placeholder="Nom de la sous-compétence"
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                      <select
                        value={sc.statut}
                        onChange={e => handleSousCompetenceChange(index, 'statut', e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="non validée">Non validée</option>
                        <option value="validée">Validée</option>
                      </select>
                      {formData.sousCompetences.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSousCompetence(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center transition-colors"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Créer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompetenceManager;
