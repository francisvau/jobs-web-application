
import AddApplication from "./AddApplication"
import FieldHeader from "../FieldHeader"
import IdSelector from "../IdSelector"
import { fetchField } from "../../fetch"
import { useState, useEffect } from "react"
import NoSelection from "../NoSelection"
import ApplicationDetail from "./ApplicationDetail"

const ApplicationSelector = ({ currentObj, setCurrentObj, showAdd, onShowAdd }) => {
  
  const [applications, setApplications] = useState([])
  const [updateTrigger, setUpdateTrigger] = useState(false)

  const triggerListUpdate = () => {
    setUpdateTrigger(!updateTrigger)
  }

  useEffect(() => {
    const getApplicationsObj = async () => {
      const applicationsObjFromServer = await fetchField("applications")
      setApplications(applicationsObjFromServer.applications)
    }
    getApplicationsObj()
  }, [updateTrigger])

  return (
    <>
      <FieldHeader title="Applications" showAdd={showAdd} onShowAdd={onShowAdd} />
      {showAdd && <AddApplication updateTrigger={setUpdateTrigger} onShowAdd={onShowAdd} />}
      <IdSelector setCurrentObj={setCurrentObj} list={applications} field="applications" keyName="text"  />
      {Object.keys(currentObj).length
      ?
      <ApplicationDetail currentObj={currentObj} setCurrentObj={setCurrentObj} triggerListUpdate={triggerListUpdate} />
      :
      <NoSelection name="application" />
      }
    </>
  )
}

export default ApplicationSelector
