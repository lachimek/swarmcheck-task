import React, { useState } from "react";
import { createTrainer } from "../api/createTrainer";
import Card from "../components/Card/Card";
import FormField from "../components/FormField/FormField";

const CreateTrainerSection = () => {
    const [trainer, setTrainer] = useState("");
    const [capacity, setCapacity] = useState(0);

    const handleCapacityChange = (e: React.FormEvent<HTMLInputElement>) => {
        const regExp = /[a-zA-Z]/g;
        if (!regExp.test(e.currentTarget.value)) {
            setCapacity(Number(e.currentTarget.value));
        }
    };

    return (
        <Card header="Utwórz Trenera">
            <FormField
                value={trainer}
                setValue={(e) => setTrainer(e.currentTarget.value)}
                label="Nazwisko trenera"
                id="create_trainer"
            />
            <FormField
                value={capacity.toString()}
                setValue={handleCapacityChange}
                label="Limit uczniów"
                id="trainer_capacity"
            />
            <button
                className="btn default"
                onClick={() => {
                    createTrainer(trainer, capacity);
                    setTrainer("");
                    setCapacity(0);
                }}
            >
                Utwórz trenera
            </button>
        </Card>
    );
};

export default CreateTrainerSection;
