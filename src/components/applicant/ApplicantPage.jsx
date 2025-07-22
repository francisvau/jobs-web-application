
import AddApplicant from "./AddApplicant"
import FieldHeader from "../FieldHeader"
import IdSelector from "../IdSelector"
import { fetchField } from "../../fetch"
import { useState, useEffect } from "react"
import NoSelection from "../NoSelection"
import ApplicantDetail from "./ApplicantDetail"

const ApplicantSelector = ({ currentObj, setCurrentObj, showAdd, onShowAdd }) => {

  const [applicants, setApplicants] = useState([])
  const [updateTrigger, setUpdateTrigger] = useState(false)

  const triggerListUpdate = () => {
    setUpdateTrigger(!updateTrigger)
  }

  useEffect(() => {
    const getApplicantsObj = async () => {
      const applicantsObjFromServer = await fetchField("applicants")
      setApplicants(applicantsObjFromServer.applicants)
    }
    getApplicantsObj()
  }, [updateTrigger])

  return (
    <>
      <FieldHeader title="Applicants" showAdd={showAdd} onShowAdd={onShowAdd} />
      {showAdd && <AddApplicant updateTrigger={triggerListUpdate} onShowAdd={onShowAdd} />}
      <IdSelector currentObj={currentObj} setCurrentObj={setCurrentObj} list={applicants} field="applicants" keyName="name" />
      {Object.keys(currentObj).length
        ?
        <ApplicantDetail currentObj={currentObj} setCurrentObj={setCurrentObj} triggerListUpdate={triggerListUpdate} />
        :
        <NoSelection name="applicant" />
      }
    </>
  )
}

export default ApplicantSelector
