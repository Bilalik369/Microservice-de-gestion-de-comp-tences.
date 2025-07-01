import express from "express"
import {createCompetence} from "../controllers/competence.controller.js"


const router = express.Router();



router.post("/competences" ,createCompetence );


export default router;