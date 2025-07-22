
import { useState, useEffect } from "react"
import Loading from "../Loading"
import { Link } from "react-router-dom"
import { getObjectByUrl, deleteObjectByUrl } from "../../fetch"
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const EmployeeDetail = ({ currentObj, setCurrentObj, triggerListUpdate }) => {

  const [company, setCompany] = useState([])

  // Load the corresponding objects
  useEffect(() => {
    const loadObjects = async () => {
      const companyObjFromServer = await getObjectByUrl(currentObj.company)
      setCompany(companyObjFromServer)
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
            <Link to="/employees/edit"><AiOutlineEdit className="icon"></AiOutlineEdit></Link>
            <p>{currentObj.name}</p>
            <p>{currentObj.email}</p>
            <AiOutlineDelete className="icon" onClick={deleteObj} />
          </div>
          <h3 className="element">{currentObj.role}</h3>
          <p className="element">Works for: <Link to="/companies" onClick={() => setCurrentObj(company)}>{company.name}</Link></p>
        </div>
        :
        <Loading />
      }
    </>
  )
}

export default EmployeeDetail
