
import { useState, useEffect } from "react"
import Loading from "../Loading"
import { Link } from "react-router-dom"
import { getObjectByUrl, deleteObjectByUrl } from "../../fetch"
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const JobDetail = ({ currentObj, setCurrentObj, triggerListUpdate }) => {

  const [recruiter, setRecruiter] = useState([])
  const [company, setCompany] = useState([])
  const [applications, setApplications] = useState([])

  // Load the corresponding objects
  useEffect(() => {
    const loadObjects = async () => {
      const recruiterObjPromise = getObjectByUrl(currentObj.recruiter)
      const companyObjPromise = getObjectByUrl(currentObj.company)
      const applicationListPromise = currentObj.applications.map((url) => getObjectByUrl(url))
      const [recruiterObj, companyObj, ...applicationList] = await Promise.all([recruiterObjPromise, companyObjPromise, ...applicationListPromise])
      setRecruiter(recruiterObj)
      setCompany(companyObj)
      setApplications(applicationList)
    }
    if (Object.keys(currentObj).length) {
      loadObjects()
    }
  }, [currentObj])

  // Delete the current object
  const deleteObj = async () => {
    await deleteObjectByUrl(currentObj.url, setCurrentObj)
    triggerListUpdate()
  }

  return (
    <>
      {Object.keys(currentObj).length
        ?
        <div className="details">
          <div className="details-summary">
            <Link to="/jobs/edit"><AiOutlineEdit className="icon"></AiOutlineEdit></Link>
            <p>Job for: <Link to="/companies" onClick={() => setCurrentObj(company)}>{company.name}</Link></p>
            <AiOutlineDelete className="icon" onClick={deleteObj} />
          </div>
          <p className="element">{currentObj.description}</p>
          <div className="element">
            <h3>Requirements: </h3>
            <ul>{currentObj.requirements.map((requirement, index) => <li key={index}>{requirement}</li>)}</ul>
          </div>
          <p className="element">Recruiter: <Link to="/recruiters" onClick={() => setCurrentObj(recruiter)}>{recruiter.name}</Link></p>
          <div className="details-horizontal element">
            <p>Published: {new Date(currentObj.published).toLocaleDateString()}</p>
            <p>Deadline: {new Date(currentObj.deadline).toLocaleDateString()}</p>
          </div>
          <p className="element">Salary range: ${currentObj.salaryMin}-${currentObj.salaryMax}</p>
          <div className="element">
            <h3>Applications: </h3>
            <ul>{applications.map((application, index) => <li key={index}><Link to="/applications" onClick={() => setCurrentObj(application)}>{application.text}</Link></li>)}</ul>
          </div>
        </div>
        :
        <Loading />
      }
    </>
  )
}

export default JobDetail
