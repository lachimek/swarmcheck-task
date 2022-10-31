import { Schema, model } from "mongoose";

export interface IStudent {
    lastname: string;
    assigned: boolean;
}

const studentShema = new Schema<IStudent>({
    lastname: { type: String, required: true },
    assigned: { type: Boolean, default: false },
});

export const Student = model<IStudent>("Student", studentShema);
