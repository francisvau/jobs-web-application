
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { fetchField, updateObject, getObjectByUrl } from "../../fetch"
import ObjectDropdown from "../ObjectDropdown"
import TextInput from "../TextInput"

const EditRecruiter = ({ currentObj, setCurrentObj }) => {

  const [requiredFields, setRequiredFields] = useState([])

  const isRequired = (field) => {
    return requiredFields.includes(field)
  }

  // Send back to RecruiterPage if no recruiter is selected
  // Fetch the required fields and objects
  const navigate = useNavigate()
  useEffect(() => {
    if (!Object.keys(currentObj).length) {
      navigate("/recruiters")
    }
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

  const [name, setName] = useState(currentObj.name)
  const [email, setEmail] = useState(currentObj.email)
  const [companies, setCompanies] = useState([])
  const [company, setCompany] = useState(currentObj.company)

  const handleDiscard = () => {
    navigate("/recruiters")
  }

  const handleSubmit = (event) => {

    event.preventDefault()

    const recruiter = {
      name: name,
      email: email,
      company: company
    }

    // Add the recruiter to the API
    updateObject(currentObj.url, recruiter)

    // Set the current object to an empty object
    setCurrentObj({})

    // Navigate back to RecruiterPage
    navigate("/recruiters")
  }

  return (
    <>
      {Object.keys(currentObj).length &&
        <div className="form-edit">
          <h1>Edit Recruiter</h1>
          <form onSubmit={handleSubmit}>
            <div className="buttons">
              <button className="btn btn-discard" type="button" onClick={handleDiscard}>Discard</button>
              <button className="btn btn-save" type="submit">Save</button>
            </div>
            <ObjectDropdown name="company" list={companies} keyName="name" onChange={(e) => { setCompany(e.target.value) }} isRequired={isRequired("company")} value={company} />
            <TextInput name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} isRequired={isRequired("email")} />
            <TextInput name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} isRequired={isRequired("name")} />
          </form>
        </div>
      }
    </>
  )
}

export default EditRecruiter
