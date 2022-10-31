import Express from "express";
import http from "http";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "./config";
import studentRouter from "./routes/Student";
import trainerRouter from "./routes/Trainer";

mongoose.connect(config.dbUrl);
const db = mongoose.connection;

const app = Express();
app.use(cors());
app.use(Express.json());
app.use("/trainer", trainerRouter);
app.use("/student", studentRouter);

// Add 404 handler
app.use(function (_req: Express.Request, res: Express.Response) {
    res.status(404).send("Not found");
});
// Start server (app.listen can also be used)

db.once("open", function () {
    console.log("Connected successfully");
    http.createServer(app).listen(config.port, () => console.log(`Running at http://localhost:${config.port}/`));
});
