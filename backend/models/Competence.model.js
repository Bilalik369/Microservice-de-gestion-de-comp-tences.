import mongoose from "mongoose";





const SousCompetenceSchema  = new mongoose({
    nom :{
        type : String,
        required : true ,
        trim : true
    },

    status : {
        type : String,
        enum: ["valide " , "non valide"],
        required : true,
        
    },


})


const CompetenceSchema  = new mongoose({
    code : {
        type : String,
        required : true ,
        match: [/^C\d+$/, "Le code doit être au format C1, C2, ..."]
    },
    name : {
        type : String,
        required : true,
        trim : true,
    },

    SousCompetence : {
        type : [SousCompetenceSchema],
        validate : {
            validator :(array)=> array.legnth> 0, 
            message :  "Il faut au moins une sous-compétence"

        },

    }
} , {timestamps : true})


export default mongoose.model('Competence', CompetenceSchema);
