import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ManageDash from "./Pages/ManageDash.jsx";
import ManageStaff from "./Pages/ManageStaff";
import ManageStudents from "./Pages/ManageStudents";
import ManageAttendence from "./Pages/ManageAttendence";
import ManageMarks from "./Pages/ManageMarks";
import ManageClass from "./Pages/ManageClass";
import MarkAttendence from "./Pages/MarkAttendence";
import EnterMarks from "./Pages/EnterMarks";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/ManageDash" element={<ManageDash />} />
        <Route exact path="/ManageStaff" element={<ManageStaff />} />
        <Route exact path="/ManageStudents" element={<ManageStudents />} />
        <Route exact path="/ManageAttendence" element={<ManageAttendence />} />
        <Route exact path="/ManageMarks" element={<ManageMarks />} />
        <Route exact path="/ManageClass" element={<EnterMarks />} />
      </Routes>
    </Router>
  );
}

export default App;
