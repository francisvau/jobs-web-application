
import { useState, useEffect } from "react"
import Loading from "../Loading"
import { Link } from "react-router-dom"
import { getObjectByUrl, deleteObjectByUrl } from "../../fetch"
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const CompanyDetail = ({ currentObj, setCurrentObj, triggerListUpdate }) => {

  const [jobs, setJobs] = useState([])
  const [reviews, setReviews] = useState([])
  const [employees, setEmployees] = useState([])

  // Load the corresponding objects
  useEffect(() => {
    const loadObjects = async () => {
      const jobListPromise = currentObj.jobs.map((url) => getObjectByUrl(url))
      const reviewListPromise = currentObj.reviews.map((url) => getObjectByUrl(url))
      const employeeListPromise = currentObj.employees.map((url) => getObjectByUrl(url))
      const [jobList, reviewList, employeeList] = await Promise.all([
        Promise.all(jobListPromise),
        Promise.all(reviewListPromise),
        Promise.all(employeeListPromise),
      ]);
      setJobs(jobList)
      setReviews(reviewList)
      setEmployees(employeeList)
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
            <Link to="/companies/edit"><AiOutlineEdit className="icon"></AiOutlineEdit></Link>
            <p>{currentObj.name}</p>
            <p>Size: {currentObj.size}</p>
            <AiOutlineDelete className="icon" onClick={deleteObj} />
          </div>
          <h3 className="element">Insdustry: {currentObj.industry}</h3>
          <p className="element">{currentObj.description}</p>
          <div className="element">
            <h3>Jobs: </h3>
            <ul>{jobs.map((job, index) => <li key={index}><Link to="/jobs" onClick={() => setCurrentObj(job)}>{job.description}</Link></li>)}</ul>
          </div>
          <div className="element">
            <h3>Employees: </h3>
            <ul>{employees.map((employee, index) => <li key={index}><Link to="/employees" onClick={() => setCurrentObj(employee)}>{employee.name}</Link></li>)}</ul>
          </div>
          <div className="element">
            <h3>Reviews: </h3>
            <ul>{reviews.map((review, index) => <li key={index}><Link to="/reviews" onClick={() => setCurrentObj(review)}>{review.text}</Link></li>)}</ul>
          </div>
        </div>
        :
        <Loading />
      }
    </>
  )
}

export default CompanyDetail
