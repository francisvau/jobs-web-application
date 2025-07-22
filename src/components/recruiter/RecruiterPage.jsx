
import AddRecruiter from "./AddRecruiter"
import FieldHeader from "../FieldHeader"
import IdSelector from "../IdSelector"
import { fetchField } from "../../fetch"
import { useState, useEffect } from "react"
import NoSelection from "../NoSelection"
import RecruiterDetail from "./RecruiterDetail"

const RecruiterPage = ({ currentObj, setCurrentObj, showAdd, onShowAdd }) => {

  const [recruiters, setRecruiters] = useState([])
  const [updateTrigger, setUpdateTrigger] = useState(false)

  const triggerListUpdate = () => {
    setUpdateTrigger(!updateTrigger)
  }

  useEffect(() => {
    const getRecruitersObj = async () => {
      const recruitersObjFromServer = await fetchField("recruiters")
      setRecruiters(recruitersObjFromServer.recruiters)
    }
    getRecruitersObj()
  }, [updateTrigger])

  return (
    <>
      <FieldHeader title="Recruiters" showAdd={showAdd} onShowAdd={onShowAdd} />
      {showAdd && <AddRecruiter updateTrigger={triggerListUpdate} onShowAdd={onShowAdd} />}
      <IdSelector setCurrentObj={setCurrentObj} list={recruiters} field="recruiters" keyName="name" />
      {Object.keys(currentObj).length
        ?
        <RecruiterDetail currentObj={currentObj} setCurrentObj={setCurrentObj} triggerListUpdate={triggerListUpdate} />
        :
        <NoSelection name="recruiter" />
      }
    </>
  )
}

export default RecruiterPage
