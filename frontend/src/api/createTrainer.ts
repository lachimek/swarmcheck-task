import { toast } from "react-toastify";
import { API_URL } from "../config";

const endpoint = API_URL + "/trainer/new";

export const createTrainer = async (lastname: string, capacity: number) => {
    if (lastname === "") {
        return;
    }

    try {
        const request = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ lastname, capacity }),
        });

        const response = await request.json();

        console.log(response);

        if (response.success) {
            toast.success("Utworzono trenera: " + response.body.lastname);
            return { student: { id: response.body._id, lastname: response.body.lastname } };
        }
    } catch (err) {
        toast.error("Wystąpił błąd");
        console.error(err);
    }
};
