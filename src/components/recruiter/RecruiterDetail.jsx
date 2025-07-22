
import { useState, useEffect } from "react"
import Loading from "../Loading"
import { Link } from "react-router-dom"
import { getObjectByUrl, deleteObjectByUrl } from "../../fetch"
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const RecruiterDetail = ({ currentObj, setCurrentObj, triggerListUpdate }) => {

  const [company, setCompany] = useState([])
  const [jobs, setJobs] = useState([])

  // Load the corresponding objects
  useEffect(() => {
    const loadObjects = async () => {
      const companyObjPromise = await getObjectByUrl(currentObj.company)
      const jobListPromise = currentObj.jobs.map((url) => getObjectByUrl(url))
      const [companyObj, ...jobList] = await Promise.all([companyObjPromise, ...jobListPromise])
      setCompany(companyObj)
      setJobs(jobList)
    }
    if (Object.keys(currentObj).length) {
      loadObjects()
    }
  },  [currentObj])

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
            <Link to="/recruiters/edit"><AiOutlineEdit className="icon"></AiOutlineEdit></Link>
            <p>{currentObj.name}</p>
            <p>{currentObj.email}</p>
            <AiOutlineDelete className="icon" onClick={deleteObj} />
          </div>
          <p className="element">Recruiting for: <Link to="/companies" onClick={() => setCurrentObj(company)}>{company.name}</Link></p>
          <div className="element">
            <h3>Jobs: </h3>
            <ul>{jobs.map((job, index) => <li key={index}><Link to="/jobs" onClick={() => setCurrentObj(job)}>{job.description}</Link></li>)}</ul>
          </div>
        </div>
        :
        <Loading />
      }
    </>
  )
}

export default RecruiterDetail
