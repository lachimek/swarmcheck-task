import { Request, Response } from "express";
import { IStudent } from "../../models/Student";
import { StudentService } from "../../services/Student";

const StudentServiceInstance = new StudentService();

interface StudentRequest extends Request {
    body: IStudent;
}

export async function getStudents(_req: Request, res: Response) {
    try {
        const students = await StudentServiceInstance.all();
        return res.send(students);
    } catch (err) {
        res.status(500).send(err);
    }
}

export async function getAvailableStudents(_req: Request, res: Response) {
    try {
        const students = await StudentServiceInstance.available();
        return res.send(students);
    } catch (err) {
        res.status(500).send(err);
    }
}

export async function createStudent(req: StudentRequest, res: Response) {
    try {
        const createdStudent = await StudentServiceInstance.create(req.body);
        return res.send(createdStudent);
    } catch (err) {
        res.status(500).send(err);
    }
}
