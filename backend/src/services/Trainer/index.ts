import { Student } from "../../models/Student";
import { IAssignStudent, ITrainer, Trainer } from "../../models/Trainer";

export class TrainerService {
    async all() {
        try {
            const result = await Trainer.find();
            return { success: true, body: result };
        } catch (err) {
            return { success: false, body: err };
        }
    }
    async available() {
        try {
            const result = await Trainer.find({ $where: "this.students.length < this.capacity" });
            return {
                success: true,
                body: result.map(({ _id, lastname, capacity, students, __v }) => {
                    return { _id, lastname, capacity, students, __v, max: capacity, cur: students.length };
                }),
            };
        } catch (err) {
            return { success: false, body: err };
        }
    }
    async one({ id }: { id: string }) {
        try {
            const result = await Trainer.findById(id);
            return { success: true, body: result };
        } catch (err) {
            console.log(err);
            return { success: false, body: err };
        }
    }
    async create(trainer: ITrainer) {
        try {
            const result = await Trainer.create(trainer);
            console.log("[LOG] Created trainer", result);
            return { success: true, body: result };
        } catch (err) {
            console.log(err);
            return { success: false, body: err };
        }
    }
    async delete(trainerId: string) {
        try {
            if (!trainerId) {
                throw "Trainer id was not provided";
            }
            const trainerToBeDeleted = await Trainer.findById(trainerId);
            if (!trainerToBeDeleted) {
                throw "Trainer not found";
            }

            const ammountOfStudents = trainerToBeDeleted.students.length;
            console.log(ammountOfStudents);
            const trainersWithSpace = await Trainer.find({
                $where: `this.capacity - this.students.length >= ${ammountOfStudents}`,
            });
            const omitDeletedTrainer = trainersWithSpace.filter((t) => !t._id.equals(trainerId));
            if (!trainersWithSpace || omitDeletedTrainer.length === 0) {
                throw "No other trainer has enough space for students";
            }
            omitDeletedTrainer[0].students = [...omitDeletedTrainer[0].students, ...trainerToBeDeleted.students];
            await trainerToBeDeleted.delete();
            const result = await omitDeletedTrainer[0].save();
            console.log("[LOG] Deleted trainer with id: " + trainerToBeDeleted.id);
            return {
                success: true,
                body: result,
            };
        } catch (err) {
            console.log(err);
            return { success: false, body: err };
        }
    }
    async update(id: string, trainer: ITrainer) {
        try {
            const found = await Trainer.findById(id);
            if (!found) throw "Trainer not found";

            if (trainer.lastname) {
                found.lastname = trainer.lastname;
            }
            if (trainer.capacity) {
                if (found.students.length > trainer.capacity) throw "Students overflow";
                found.capacity = trainer.capacity;
            }
            const result = await found.save();
            return { success: true, body: result };
        } catch (err) {
            return { success: false, body: err };
        }
    }
    async assign({ trainerId, studentId }: IAssignStudent) {
        try {
            const student = await Student.findById(studentId);
            const trainer = await Trainer.findById(trainerId);

            if (!student || !trainer) {
                throw "Student or Trainer not found";
            }
            if (student.assigned) {
                throw "Student already assigned";
            }
            if (trainer.capacity < trainer.students.length + 1) {
                throw "Trainer has maximum students assigned";
            }

            student.assigned = true;
            trainer.students.push(student.id);

            const savedStudent = await student.save();
            const savedTrainer = await trainer.save();

            console.log("[LOG] Assigned student to trainer", { s: student.lastname, t: trainer.lastname });
            return { success: true, body: { trainer: savedTrainer, student: savedStudent } };
        } catch (err) {
            console.log(err);
            return { success: false, body: err };
        }
    }
}
