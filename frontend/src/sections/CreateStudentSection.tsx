import React, { useState } from "react";
import { createStudent } from "../api/createStudent";
import Card from "../components/Card/Card";
import FormField from "../components/FormField/FormField";

const CreateStudentSection = () => {
    const [student, setStudent] = useState("");

    return (
        <Card header="Utwórz ucznia">
            <FormField
                value={student}
                setValue={(e) => setStudent(e.currentTarget.value)}
                label="Nazwisko ucznia"
                id="create_student"
            />
            <button
                className="btn default"
                onClick={() => {
                    createStudent(student);
                    setStudent("");
                }}
            >
                Utwórz ucznia
            </button>
        </Card>
    );
};

export default CreateStudentSection;
