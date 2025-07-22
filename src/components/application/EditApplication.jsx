
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { fetchField, updateObject, getObjectByUrl } from "../../fetch"
import ObjectDropdown from "../ObjectDropdown"
import TextArea from "../TextArea"

const EditApplication = ({ currentObj, setCurrentObj }) => {

  const [requiredFields, setRequiredFields] = useState([])

  const isRequired = (field) => {
    return requiredFields.includes(field)
  }

  // Send back to ApplicationPage if no application is selected
  // Fetch the required fields and objects
  const navigate = useNavigate()
  useEffect(() => {
    if (!Object.keys(currentObj).length) {
      navigate("/applications")
    }
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

  const [text, setText] = useState(currentObj.text)
  const [jobs, setJobs] = useState([])
  const [job, setJob] = useState(currentObj.job)
  const [applicants, setApplicants] = useState([])
  const [applicant, setApplicant] = useState(currentObj.applicant)

  const handleDiscard = () => {
    navigate("/applications")
  }

  const handleSubmit = (event) => {

    event.preventDefault()

    const application = {
      applicant: applicant,
      job: job,
      text: text
    }

    // Add the application to the API
    updateObject(currentObj.url, application)

    // Set the current object to an empty object
    setCurrentObj({})

    // Navigate back to ApplicationPage
    navigate("/applications")
  }

  return (
    <>
      {Object.keys(currentObj).length &&
        <div className="form-edit">
          <h1>Edit Application</h1>
          <form onSubmit={handleSubmit}>
            <div className="buttons">
              <button className="btn btn-discard" type="button" onClick={handleDiscard}>Discard</button>
              <button className="btn btn-save" type="submit">Save</button>
            </div>
            <ObjectDropdown name="job" list={jobs} keyName="description" onChange={(e) => { setJob(e.target.value) }} isRequired={isRequired("job")} value={job} />
            <ObjectDropdown name="applicant" list={applicants} keyName="name" onChange={(e) => { setApplicant(e.target.value) }} isRequired={isRequired("applicant")} value={applicant} />
            <TextArea name="text" value={text} onChange={(e) => setText(e.target.value)} isRequired={isRequired("text")} />
          </form>
        </div>
      }
    </>
  )
}

export default EditApplication
