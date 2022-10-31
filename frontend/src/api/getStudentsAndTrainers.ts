import { toast } from "react-toastify";
import { API_URL } from "../config";

const studentsEndpoint = API_URL + "/student/available";
const trainersEndpoint = API_URL + "/trainer/available";

export const getStudentsAndTrainers = async () => {
    try {
        const studentsRequest = await fetch(studentsEndpoint);
        const trainersRequest = await fetch(trainersEndpoint);

        const studentsResponse = await studentsRequest.json();
        const trainersResponse = await trainersRequest.json();

        console.log({ students: studentsResponse, trainers: trainersResponse });

        if (studentsResponse.success && trainersResponse.success) {
            return {
                students: studentsResponse.body.map(({ _id, lastname }: any) => {
                    return { value: _id, text: lastname };
                }),
                trainers: trainersResponse.body.map(({ _id, lastname, max, cur }: any) => {
                    return { value: _id, text: `${lastname} [${cur}/${max}]` };
                }),
            };
        }
    } catch (err) {
        toast.error("Wystąpił błąd");
        console.error(err);
    }
};
