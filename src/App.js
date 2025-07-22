import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ApplicantPage from "./components/applicant/ApplicantPage";
import EditApplicant from "./components/applicant/EditApplicant";
import ApplicationPage from "./components/application/ApplicationPage";
import EditApplication from "./components/application/EditApplication";
import CompanyPage from "./components/company/CompanyPage";
import EditCompany from "./components/company/EditCompany";
import EmployeePage from "./components/employee/EmployeePage";
import EditEmployee from "./components/employee/EditEmployee";
import RecruiterPage from "./components/recruiter/RecruiterPage";
import EditRecruiter from "./components/recruiter/EditRecruiter";
import ReviewPage from "./components/review/ReviewPage";
import EditReview from "./components/review/EditReview";
import JobPage from "./components/job/JobPage";
import EditJob from "./components/job/EditJob";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

function App() {

  const [currentObj, setCurrentObj] = useState({})
  const [showAdd, setShowAdd] = useState(false)
  const triggerShowAdd = () => setShowAdd(!showAdd)

  // Customize back button functionality
  const navigate = useNavigate()
  window.onpopstate = () => {
    setCurrentObj({})
    navigate("/");
  }  

  return (
    <>
      <Navbar setCurrentObj={setCurrentObj} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/applicants" element={<ApplicantPage currentObj={currentObj} setCurrentObj={setCurrentObj} showAdd={showAdd} onShowAdd={triggerShowAdd} />} />
          <Route path="/applicants/edit" element={<EditApplicant currentObj={currentObj} setCurrentObj={setCurrentObj}/>} />
          <Route path="/applications" element={<ApplicationPage currentObj={currentObj} setCurrentObj={setCurrentObj} showAdd={showAdd} onShowAdd={triggerShowAdd} />} />
          <Route path="/applications/edit" element={<EditApplication currentObj={currentObj} setCurrentObj={setCurrentObj}/>} />
          <Route path="/companies" element={<CompanyPage currentObj={currentObj} setCurrentObj={setCurrentObj} showAdd={showAdd} onShowAdd={triggerShowAdd} />} />
          <Route path="/companies/edit" element={<EditCompany currentObj={currentObj} setCurrentObj={setCurrentObj}/>} />
          <Route path="/employees" element={<EmployeePage currentObj={currentObj} setCurrentObj={setCurrentObj} showAdd={showAdd} onShowAdd={triggerShowAdd} />} />
          <Route path="/employees/edit" element={<EditEmployee currentObj={currentObj} setCurrentObj={setCurrentObj}/>} />
          <Route path="/jobs" element={<JobPage currentObj={currentObj} setCurrentObj={setCurrentObj} showAdd={showAdd} onShowAdd={triggerShowAdd} />} />
          <Route path="/jobs/edit" element={<EditJob currentObj={currentObj} setCurrentObj={setCurrentObj}/>} />
          <Route path="/recruiters" element={<RecruiterPage currentObj={currentObj} setCurrentObj={setCurrentObj} showAdd={showAdd} onShowAdd={triggerShowAdd} />} />
          <Route path="/recruiters/edit" element={<EditRecruiter currentObj={currentObj} setCurrentObj={setCurrentObj}/>} />
          <Route path="/reviews" element={<ReviewPage currentObj={currentObj} setCurrentObj={setCurrentObj} showAdd={showAdd} onShowAdd={triggerShowAdd} />} />
          <Route path="/reviews/edit" element={<EditReview currentObj={currentObj} setCurrentObj={setCurrentObj}/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
