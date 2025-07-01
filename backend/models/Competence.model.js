import mongoose from "mongoose";

const SousCompetenceSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    trim: true
  },
  statut: {
    type: String,
    enum: ["validée", "non validée"],
    required: true
  }
});

const CompetenceSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    match: [/^C\d+$/, "Le code doit être au format C1, C2, ..."]
  },
  nom: { 
    type: String,
    required: true,
    trim: true
  },
  sousCompetences: { 
    type: [SousCompetenceSchema],
    validate: {
      validator: (array) => array.length > 0, 
      message: "Il faut au moins une sous-compétence"
    }
  }
}, { timestamps: true });

export default mongoose.model('Competence', CompetenceSchema);
