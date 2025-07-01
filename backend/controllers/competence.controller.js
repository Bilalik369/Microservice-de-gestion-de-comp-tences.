import CompetenceSchema from "../models/Competence.model.js"



export const createCompetence = async(req , res)=>{
    try {
        const newCompetence = new CompetenceSchema(req.body);
        await newCompetence.save();

        res.status(201).json({newCompetence})
    } catch (error) {
        res.status(500).json({error : error.message})
    }
};

