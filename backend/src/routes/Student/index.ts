import { Router } from "express";
import { createStudent, getAvailableStudents, getStudents } from "../../controllers/Student";

const studentRouter = Router();

studentRouter.get("/", getStudents);
studentRouter.get("/available", getAvailableStudents);
studentRouter.post("/new", createStudent);

export default studentRouter;
