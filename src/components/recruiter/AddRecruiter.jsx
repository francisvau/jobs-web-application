
import { useState, useEffect } from "react"
import { addObject, fetchField, getObjectByUrl } from "../../fetch"
import ObjectDropdown from "../ObjectDropdown"
import TextInput from "../TextInput"

const AddRecruiter = ({ updateTrigger, onShowAdd }) => {

  const [requiredFields, setRequiredFields] = useState([])

  const isRequired = (field) => {
    return requiredFields.includes(field)
  }

  // Fetch the required fields and objects
  useEffect(() => {
    const fetchData = async () => {
      // Fetch fields
      const recruiterObjPromise = await fetchField("recruiters")
      const companyObjPromise = await fetchField("companies")
      const [recruiterObj, companyObj] = await Promise.all([recruiterObjPromise, companyObjPromise])

      // Set required fields
      setRequiredFields(recruiterObj.requiredFields)

      // Set objects
      const companyListPromise = companyObj.companies.map((url) => getObjectByUrl(url))
      const companyList = await Promise.all(companyListPromise);
      setCompanies(companyList)
    }
    fetchData()
  }, [])

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [companies, setCompanies] = useState([])
  const [company, setCompany] = useState("")

  const handleSubmit = async (event) => {

    event.preventDefault()

    const recruiter = {
      name: name,
      email: email,
      company: company
    }

    // Add the recruiter to the API
    await addObject("recruiters", recruiter)

    // Update the visible list of recruiters
    updateTrigger()

    // Hide the add window
    onShowAdd()
  };

  return (
    <div className="form-add">
      <h2>Add Recruiter</h2>
      <form onSubmit={handleSubmit}>
        <ObjectDropdown name="company" list={companies} keyName="name" onChange={(e) => { setCompany(e.target.value) }} isRequired={isRequired("company")} value={company} />
        <TextInput name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} isRequired={isRequired("email")} />
        <TextInput name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} isRequired={isRequired("name")} />
        <button className="element btn btn-save" type="submit">Submit</button>
      </form>
    </div>
  )
}

export default AddRecruiter
