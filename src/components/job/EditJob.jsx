
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { fetchField, updateObject, getObjectByUrl } from "../../fetch"
import ObjectDropdown from "../ObjectDropdown"
import TextArea from "../TextArea"
import TextList from "../TextList"
import TextInput from "../TextInput"

const EditJob = ({ currentObj, setCurrentObj }) => {

  const [requiredFields, setRequiredFields] = useState([])

  const isRequired = (field) => {
    return requiredFields.includes(field)
  }

  // Send back to JobPage if no job is selected
  // Fetch the required fields and objects
  const navigate = useNavigate()
  useEffect(() => {
    if (!Object.keys(currentObj).length) {
      navigate("/jobs")
    }
    const fetchData = async () => {
      // Fetch fields
      const jobObjPromise = await fetchField("jobs")
      const recruiterObjPromise = await fetchField("recruiters")
      const companyObjPromise = await fetchField("companies")
      const [jobObj, recruiterObj, companyObj] = await Promise.all([jobObjPromise, recruiterObjPromise, companyObjPromise])

      // Set required fields
      setRequiredFields(jobObj.requiredFields)

      // Set objects
      const recruiterListPromise = recruiterObj.recruiters.map((url) => getObjectByUrl(url))
      const companyListPromise = companyObj.companies.map((url) => getObjectByUrl(url))
      const [recruiterList, companyList] = await Promise.all([
        Promise.all(recruiterListPromise),
        Promise.all(companyListPromise),
      ]);
      setRecruiters(recruiterList)
      setCompanies(companyList)
    }
    fetchData()
  }, [])

  const [requirements, setRequirements] = useState(currentObj.requirements)
  const [recruiters, setRecruiters] = useState([])
  const [recruiter, setRecruiter] = useState(currentObj.recruiter)
  const [companies, setCompanies] = useState([])
  const [company, setCompany] = useState(currentObj.company)
  const [description, setDescription] = useState(currentObj.description)
  const [salaryMin, setSalaryMin] = useState(currentObj.salaryMin)
  const [salaryMax, setSalaryMax] = useState(currentObj.salaryMax)
  const [deadline, setDeadline] = useState(currentObj.deadline)

  const handleDiscard = () => {
    navigate("/jobs")
  }

  const handleSubmit = (event) => {

    event.preventDefault()

    if (isNaN(salaryMin + salaryMax)) {
      alert("Salary must be a number")
      setSalaryMin("")
      setSalaryMax("")
      return
    }

    const job = {
      requirements: requirements,
      recruiter: recruiter,
      company: company,
      description: description,
      salaryMin: salaryMin,
      salaryMax: salaryMax,
      published: new Date(),
      deadline: deadline
    }

    // Add the job to the API
    updateObject(currentObj.url, job)

    // Set the current object to an empty object
    setCurrentObj({})

    // Navigate back to JobPage
    navigate("/jobs")
  }

  return (
    <>
      {Object.keys(currentObj).length &&
        <div className="form-edit">
          <h1>Edit Job</h1>
          <form onSubmit={handleSubmit}>
            <div className="buttons">
              <button className="btn btn-discard" type="button" onClick={handleDiscard}>Discard</button>
              <button className="btn btn-save" type="submit">Save</button>
            </div>
            <TextList name="requirements" list={requirements} setList={setRequirements} />
            <ObjectDropdown name="recruiter" list={recruiters} keyName="name" onChange={(e) => { setRecruiter(e.target.value) }} isRequired={isRequired("recruiter")} value={recruiter} />
            <ObjectDropdown name="company" list={companies} keyName="name" onChange={(e) => { setCompany(e.target.value) }} isRequired={isRequired("company")} value={company} />
            <TextArea name="description" value={description} onChange={(e) => setDescription(e.target.value)} isRequired={isRequired("description")} />
            <TextInput name="minimum salary" type="text" value={salaryMin} onChange={(e) => setSalaryMin(e.target.value)} isRequired={isRequired("salaryMin")} />
            <TextInput name="maximum salary" type="text" value={salaryMax} onChange={(e) => setSalaryMax(e.target.value)} isRequired={isRequired("salaryMax")} />
            <TextInput name="deadline" type="date" value={new Date(deadline).toISOString().substring(0, 10)} onChange={(e) => setDeadline(e.target.value)} isRequired={isRequired("deadline")} />
          </form>
        </div>
      }
    </>
  )
}

export default EditJob
