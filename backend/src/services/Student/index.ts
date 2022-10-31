import { IStudent, Student } from "../../models/Student";

export class StudentService {
    async all() {
        try {
            const result = await Student.find();
            return { success: true, body: result };
        } catch (err) {
            return { success: false, body: err };
        }
    }
    async available() {
        try {
            const result = await Student.find({ assigned: false });
            return { success: true, body: result };
        } catch (err) {
            return { success: false, body: err };
        }
    }
    async one({ id }: { id: string }) {
        try {
            const result = await Student.findById(id);
            return { success: true, body: result };
        } catch (err) {
            console.log(err);
            return { success: false, body: err };
        }
    }
    async create(student: IStudent) {
        try {
            const result = await Student.create(student);
            console.log("[LOG] Created student", result);
            return { success: true, body: result };
        } catch (err) {
            console.log(err);
            return { success: false, body: err };
        }
    }
}
