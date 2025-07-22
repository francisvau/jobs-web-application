
import { useState, useEffect } from "react"
import Loading from "../Loading"
import { Link } from "react-router-dom"
import { getObjectByUrl, deleteObjectByUrl } from "../../fetch"
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const ApplicantDetail = ({ currentObj, setCurrentObj, triggerListUpdate }) => {

  const [applications, setApplications] = useState([])

  // Load the corresponding objects
  useEffect(() => {
    const loadObjects = async () => {
      const applicationListPromise = currentObj.applications.map((url) => getObjectByUrl(url))
      const applicationList = await Promise.all(applicationListPromise)
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
            <Link to="/applicants/edit"><AiOutlineEdit className="icon"></AiOutlineEdit></Link>
            <p>{currentObj.name}</p>
            <p>{currentObj.email}</p>
            <AiOutlineDelete className="icon" onClick={deleteObj} />
          </div>
          <a className="element" href={currentObj.resume}>resume</a>
          <div className="element">
            <h3>Skills: </h3>
            <ul>{currentObj.skills.map((skill, index) => <li key={index}>{skill}</li>)}</ul>
          </div>
          <div className="element">
            <h3>Applications: </h3>
            <ul>{applications.map(
              (application, index) => <li key={index}>
                <Link to="/applications" onClick={() => setCurrentObj(application)}>{application.text}</Link>
              </li>
            )}</ul>
          </div>
        </div>
        :
        <Loading />
      }
    </>
  )
}

export default ApplicantDetail
