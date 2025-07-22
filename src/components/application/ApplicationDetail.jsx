
import { useState, useEffect } from "react"
import Loading from "../Loading"
import { Link } from "react-router-dom"
import { getObjectByUrl, deleteObjectByUrl } from "../../fetch"
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const ApplicationDetail = ({ currentObj, setCurrentObj, triggerListUpdate }) => {

  const [applicant, setApplicant] = useState({})
  const [job, setJob] = useState({})

  // Load the corresponding objects
  useEffect(() => {
    const loadObjects = async () => {
      const applicantObjPromise = getObjectByUrl(currentObj.applicant)
      const jobObjPromise = getObjectByUrl(currentObj.job)
      const [applicantObj, jobObj] = await Promise.all([applicantObjPromise, jobObjPromise])
      setApplicant(applicantObj)
      setJob(jobObj)
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
      {Object.keys(applicant).length
      ? 
      <div className="details">
        <div className="details-summary">
        <Link to="/applications/edit"><AiOutlineEdit className="icon"/></Link>
          <p>Application by: <Link to="/applicants" onClick={() => setCurrentObj(applicant)}>{applicant.name}</Link></p>
          <AiOutlineDelete className="icon" onClick={deleteObj}/>
        </div>
        <p className="element">Applying for: <Link to="/jobs" onClick={() => setCurrentObj(job)}>{job.description}</Link></p>
        <ul className="element">
          <li>{currentObj.text}</li>
        </ul>
      </div>
      : 
      <Loading />
      }
    </>
  )
}

export default ApplicationDetail
