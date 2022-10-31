import { Router } from "express";
import {
    getTrainers,
    createTrainer,
    assignStudentToTrainer,
    getAvailableTrainers,
    deleteTrainer,
    updateTrainer,
} from "../../controllers/Trainer";

const trainerRouter = Router();

trainerRouter.get("/", getTrainers);
trainerRouter.get("/available", getAvailableTrainers);
trainerRouter.post("/new", createTrainer);
trainerRouter.post("/assign", assignStudentToTrainer);
trainerRouter.delete("/delete/:id", deleteTrainer);
trainerRouter.patch("/update/:id", updateTrainer);

export default trainerRouter;
