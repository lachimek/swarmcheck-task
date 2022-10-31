import "./App.css";
import AssignStudentSection from "./sections/AssignStudentSection";
import CreateStudentSection from "./sections/CreateStudentSection";
import CreateTrainerSection from "./sections/CreateTrainerSection";

function App() {
    return (
        <div className="App">
            <CreateStudentSection />
            <AssignStudentSection />
            <CreateTrainerSection />
        </div>
    );
}

export default App;
