import { Schema, model } from "mongoose";

export interface ITrainer {
    lastname: string;
    capacity: number;
    students: string[];
}

export interface IAssignStudent {
    trainerId: string;
    studentId: string;
}

const trainerShema = new Schema<ITrainer>({
    lastname: { type: String, required: true },
    capacity: { type: Number, required: true },
    students: { type: [String] },
});

export const Trainer = model<ITrainer>("Trainer", trainerShema);
