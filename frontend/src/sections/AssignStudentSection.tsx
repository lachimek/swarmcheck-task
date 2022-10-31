import React, { useEffect, useState } from "react";
import { assignStudent } from "../api/assignStudent";
import { getStudentsAndTrainers } from "../api/getStudentsAndTrainers";
import Card from "../components/Card/Card";
import FormField from "../components/FormField/FormField";

interface Option {
    value: string;
    text: string;
}

const AssignStudentSection = () => {
    const [selectedStudent, setSelectedStudent] = useState("");
    const [selectedTrainer, setSelectedTrainer] = useState("");
    const [students, setStudents] = useState<Option[]>([{ value: "", text: "" }]);
    const [trainers, setTrainers] = useState<Option[]>([{ value: "", text: "" }]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getStudentsAndTrainers();
            if (data) {
                setStudents(data.students);
                setTrainers(data.trainers);
                setSelectedStudent(data.students[0].value);
                setSelectedTrainer(data.trainers[0].value);
            }
        };
        fetchData();
    }, []);

    return (
        <Card header="Przypisz ucznia do trenera">
            <FormField
                value={selectedStudent}
                setValue={(e) => setSelectedStudent(e.currentTarget.value)}
                label="Wybierz ucznia"
                id="select_student"
                options={students}
            />
            <FormField
                value={selectedTrainer}
                setValue={(e) => setSelectedTrainer(e.currentTarget.value)}
                label="Wybierz trenera"
                id="select_trainer"
                options={trainers}
            />
            <button className="btn default" onClick={() => assignStudent(selectedStudent, selectedTrainer)}>
                przypisz ucznia
            </button>
        </Card>
    );
};

export default AssignStudentSection;
