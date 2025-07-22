
import { useState, useEffect } from "react"
import { addObject, fetchField, getObjectByUrl } from "../../fetch"
import ObjectDropdown from "../ObjectDropdown"
import TextArea from "../TextArea"

const AddApplication = ({ updateTrigger, onShowAdd }) => {

  const [requiredFields, setRequiredFields] = useState([])

  const isRequired = (field) => {
    return requiredFields.includes(field)
  }

  // Fetch the required fields and objects
  useEffect(() => {
    const fetchData = async () => {
      // Fetch fields
      const applicationObjPromise = await fetchField("applications")
      const jobObjPromise = await fetchField("jobs")
      const applicantObjPromise = await fetchField("applicants")
      const [applicationObj, jobObj, applicantObj] = await Promise.all([applicationObjPromise, jobObjPromise, applicantObjPromise])

      // Set required fields
      setRequiredFields(applicationObj.requiredFields)

      // Set objects
      const jobListPromise = jobObj.jobs.map((url) => getObjectByUrl(url))
      const applicantListPromise = applicantObj.applicants.map((url) => getObjectByUrl(url))
      const [jobList, applicantList] = await Promise.all([
        Promise.all(jobListPromise),
        Promise.all(applicantListPromise),
      ]);
      setJobs(jobList)
      setApplicants(applicantList)
    }
    fetchData()
  }, [])

  const [text, setText] = useState("")
  const [jobs, setJobs] = useState([])
  const [job, setJob] = useState({})
  const [applicants, setApplicants] = useState([])
  const [applicant, setApplicant] = useState({})

  const handleSubmit = async (event) => {

    event.preventDefault()

    const application = {
      applicant: applicant,
      job: job,
      text: text
    }

    // Add the application to the API
    await addObject("applications", application)

    // Update the visible list of applications
    updateTrigger()

    // Hide the add window
    onShowAdd()
  };

  return (
    <div className="form-add">
      <h2>Add Application</h2>
      <form onSubmit={handleSubmit}>
        <ObjectDropdown name="job" list={jobs} keyName="description" onChange={(e) => { setJob(e.target.value) }} isRequired={isRequired("job")} value={job} />
        <ObjectDropdown name="applicant" list={applicants} keyName="name" onChange={(e) => { setApplicant(e.target.value) }} isRequired={isRequired("applicant")} value={applicant} />
        <TextArea name="text" value={text} onChange={(e) => setText(e.target.value)} isRequired={isRequired("text")} />
        <button className="element btn btn-save" type="submit">Submit</button>
      </form>
    </div>
  )
}

export default AddApplication
