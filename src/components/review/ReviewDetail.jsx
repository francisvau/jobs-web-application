
import { useState, useEffect } from "react"
import Loading from "../Loading"
import { Link } from "react-router-dom"
import { getObjectByUrl, deleteObjectByUrl, setObjByUrl } from "../../fetch"
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const ReviewDetail = ({ currentObj, setCurrentObj, triggerListUpdate }) => {

  const [company, setCompany] = useState("")

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
            <Link to="/reviews/edit"><AiOutlineEdit className="icon"></AiOutlineEdit></Link>
            <p>Review for: <Link to="/companies" onClick={() => setCurrentObj(company)}>{company.name}</Link></p>
            <p>{currentObj.score}/10</p>
            <AiOutlineDelete className="icon" onClick={deleteObj} />
          </div>
          <p className="element">{currentObj.text}</p>
        </div>
        :
        <Loading />
      }
    </>
  )
}

export default ReviewDetail
