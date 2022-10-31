import { Request, Response } from "express";
import { IAssignStudent, ITrainer } from "../../models/Trainer";
import { TrainerService } from "../../services/Trainer";

const TrainerServiceInstance = new TrainerService();

interface TrainerRequest extends Request {
    body: ITrainer;
}

interface AssignStudentRequest extends Request {
    body: IAssignStudent;
}

interface DeleteTrainerRequest extends Request {
    params: { id: string };
}

interface UpdateTrainerRequest extends Request {
    params: { id: string };
    body: ITrainer;
}

export async function getTrainers(_req: Request, res: Response) {
    try {
        const trainers = await TrainerServiceInstance.all();
        return res.send(trainers);
    } catch (err) {
        res.status(500).send(err);
    }
}

export async function getAvailableTrainers(_req: Request, res: Response) {
    try {
        const trainers = await TrainerServiceInstance.available();
        return res.send(trainers);
    } catch (err) {
        res.status(500).send(err);
    }
}

export async function createTrainer(req: TrainerRequest, res: Response) {
    try {
        const createdTrainer = await TrainerServiceInstance.create(req.body);
        return res.send(createdTrainer);
    } catch (err) {
        res.status(500).send(err);
    }
}

export async function deleteTrainer(req: DeleteTrainerRequest, res: Response) {
    try {
        const reasignedTrainer = await TrainerServiceInstance.delete(req.params.id);
        return res.send(reasignedTrainer);
    } catch (err) {
        res.status(500).send(err);
    }
}

export async function updateTrainer(req: UpdateTrainerRequest, res: Response) {
    try {
        const upatedTrainer = await TrainerServiceInstance.update(req.params.id, req.body);
        return res.send(upatedTrainer);
    } catch (err) {
        res.status(500).send(err);
    }
}

export async function assignStudentToTrainer(req: AssignStudentRequest, res: Response) {
    try {
        const createdTrainer = await TrainerServiceInstance.assign(req.body);
        return res.send(createdTrainer);
    } catch (err) {
        res.status(500).send(err);
    }
}
