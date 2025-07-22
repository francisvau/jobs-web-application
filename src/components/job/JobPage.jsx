
import AddJob from "./AddJob"
import FieldHeader from "../FieldHeader"
import IdSelector from "../IdSelector"
import { fetchField } from "../../fetch"
import { useState, useEffect } from "react"
import NoSelection from "../NoSelection"
import JobDetail from "./JobDetail"

const JobPage = ({ currentObj, setCurrentObj, showAdd, onShowAdd }) => {

  const [jobs, setJobs] = useState([])
  const [updateTrigger, setUpdateTrigger] = useState(false)

  const triggerListUpdate = () => {
    setUpdateTrigger(!updateTrigger)
  }

  useEffect(() => {
    const getJobsObj = async () => {
      const jobsObjFromServer = await fetchField("jobs")
      setJobs(jobsObjFromServer.jobs)
    }
    getJobsObj()
  }, [updateTrigger])

  return (
    <>
      <FieldHeader title="Jobs" showAdd={showAdd} onShowAdd={onShowAdd} />
      {showAdd && <AddJob updateTrigger={triggerListUpdate} onShowAdd={onShowAdd} />}
      <IdSelector setCurrentObj={setCurrentObj} list={jobs} field="jobs" keyName="description" />
      {Object.keys(currentObj).length
        ?
        <JobDetail currentObj={currentObj} setCurrentObj={setCurrentObj} triggerListUpdate={triggerListUpdate} />
        :
        <NoSelection name="job" />
      }
    </>
  )
}

export default JobPage
