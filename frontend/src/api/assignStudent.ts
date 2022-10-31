import { toast } from "react-toastify";
import { API_URL } from "../config";

const endpoint = API_URL + "/trainer/assign";

export const assignStudent = async (studentId: string, trainerId: string) => {
    console.log("fired", studentId, trainerId);
    if (studentId === "" || trainerId === "") {
        return;
    }

    try {
        const request = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ studentId, trainerId }),
        });

        const response = await request.json();

        console.log(response);

        if (response.success) {
            toast.success("Przypisano ucznia do trenera");
        }
    } catch (err) {
        console.error(err);
    }
};
