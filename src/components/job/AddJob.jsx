
import { useState, useEffect } from "react"
import { addObject, fetchField, getObjectByUrl } from "../../fetch"
import ObjectDropdown from "../ObjectDropdown"
import TextArea from "../TextArea"
import TextInput from "../TextInput"
import TextList from "../TextList"

const AddJob = ({ updateTrigger, onShowAdd }) => {

  const [requiredFields, setRequiredFields] = useState([])

  const isRequired = (field) => {
    return requiredFields.includes(field)
  }

  // Fetch the required fields and objects
  useEffect(() => {
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

  const [requirements, setRequirements] = useState([])
  const [recruiters, setRecruiters] = useState([])
  const [recruiter, setRecruiter] = useState("")
  const [companies, setCompanies] = useState([])
  const [company, setCompany] = useState("")
  const [description, setDescription] = useState("")
  const [salaryMin, setSalaryMin] = useState("")
  const [salaryMax, setSalaryMax] = useState("")
  const [deadline, setDeadline] = useState(new Date())

  const handleSubmit = async (event) => {

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
    await addObject("jobs", job)

    // Update the visible list of jobs
    updateTrigger()

    // Hide the add window
    onShowAdd()
  };

  return (
    <div className="form-add">
      <h2>Add Job</h2>
      <form onSubmit={handleSubmit}>
        <TextList name="requirements" list={requirements} setList={setRequirements} />
        <ObjectDropdown name="recruiter" list={recruiters} keyName="name" onChange={(e) => { setRecruiter(e.target.value) }} isRequired={isRequired("recruiter")} value={recruiter} />
        <ObjectDropdown name="company" list={companies} keyName="name" onChange={(e) => { setCompany(e.target.value) }} isRequired={isRequired("company")} value={company} />
        <TextArea name="description" value={description} onChange={(e) => setDescription(e.target.value)} isRequired={isRequired("description")} />
        <TextInput name="minimum salary" type="text" value={salaryMin} onChange={(e) => setSalaryMin(e.target.value)} isRequired={isRequired("salaryMin")} />
        <TextInput name="maximum salary" type="text" value={salaryMax} onChange={(e) => setSalaryMax(e.target.value)} isRequired={isRequired("salaryMax")} />
        <TextInput name="deadline" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} isRequired={isRequired("deadline")} />
        <button className="element btn btn-save" type="submit">Submit</button>
      </form>
    </div>
  )
}

export default AddJob
