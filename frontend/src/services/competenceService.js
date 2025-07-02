const API_BASE_URL = 'http://localhost:3500/api';

const competenceService = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/competences`);
    if (!response.ok) throw new Error('Erreur lors de la récupération');
    return response.json();
  },

  create: async (competence) => {
    const response = await fetch(`${API_BASE_URL}/competences`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(competence),
    });
    if (!response.ok) throw new Error('Erreur lors de la création');
    return response.json();
  },

  updateEvaluation: async (id, sousCompetences) => {
    const response = await fetch(`${API_BASE_URL}/competences/${id}/evaluation`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sousCompetences }),
    });
    if (!response.ok) throw new Error('Erreur lors de la mise à jour');
    return response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/competences/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erreur lors de la suppression');
    return response.json();
  },
};

export default competenceService;
