import Competence from '../models/Competence.model.js';


const getStatutGlobal = (sousCompetences) => {
  const total = sousCompetences.length;
  const valides = sousCompetences.filter(sc => sc.statut === 'validée').length;
  return valides >= total / 2 ? 'validée' : 'non validée';
};




export const getAllCompetences = async (req, res) => {
  try {
    const competences = await Competence.find();
    const withStatus = competences.map(c => ({
      ...c.toObject(),
      statutGlobal: getStatutGlobal(c.sousCompetences),
     

    }));
    res.status(200).json(withStatus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const createCompetence = async (req, res) => {
  try {
    const newCompetence = new Competence(req.body);
    await newCompetence.save();
    res.status(201).json(newCompetence);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


export const updateSousCompetences = async (req, res) => {
  try {
    const { id } = req.params;
    const { sousCompetences } = req.body;

    const updated = await Competence.findByIdAndUpdate(
      id,
      { sousCompetences },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: "Compétence non trouvée" });

    res.status(200).json({
      ...updated.toObject(),
      statutGlobal: getStatutGlobal(updated.sousCompetences)
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteCompetence = async (req, res) => {
  try {
    const deleted = await Competence.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Compétence non trouvée" });
    res.status(200).json({ message: "Compétence supprimée" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
