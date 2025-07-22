
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { fetchField, updateObject, getObjectByUrl } from "../../fetch"
import ObjectDropdown from "../ObjectDropdown"
import TextInput from "../TextInput"

const EditEmployee = ({ currentObj, setCurrentObj }) => {

  const [requiredFields, setRequiredFields] = useState([])

  const isRequired = (field) => {
    return requiredFields.includes(field)
  }

  // Send back to EmployeePage if no employee is selected
  // Fetch the required fields and objects
  const navigate = useNavigate()
  useEffect(() => {
    if (!Object.keys(currentObj).length) {
      navigate("/employees")
    }
    const fetchData = async () => {
      // Fetch fields
      const employeeObjPromise = await fetchField("employees")
      const companyObjPromise = await fetchField("companies")
      const [employeeObj, companyObj] = await Promise.all([employeeObjPromise, companyObjPromise])

      // Set required fields
      setRequiredFields(employeeObj.requiredFields)

      // Set objects
      const companyListPromise = companyObj.companies.map((url) => getObjectByUrl(url))
      const companyList = await Promise.all(companyListPromise);
      setCompanies(companyList)
    }
    fetchData()
  }, [])

  const [companies, setCompanies] = useState([])
  const [company, setCompany] = useState(currentObj.company)
  const [role, setRole] = useState(currentObj.role)
  const [email, setEmail] = useState(currentObj.email)
  const [name, setName] = useState(currentObj.name)

  const handleDiscard = () => {
    navigate("/employees")
  }

  const handleSubmit = (event) => {

    event.preventDefault()

    const employee = {
      company: company,
      role: role,
      email: email,
      name: name
    }

    // Add the employee to the API
    updateObject(currentObj.url, employee)

    // Set the current object to an empty object
    setCurrentObj({})

    // Navigate back to EmployeePage
    navigate("/employees")
  }

  return (
    <>
      {Object.keys(currentObj).length &&
        <div className="form-edit">
          <h1>Edit Employee</h1>
          <form onSubmit={handleSubmit}>
            <div className="buttons">
              <button className="btn btn-discard" type="button" onClick={handleDiscard}>Discard</button>
              <button className="btn btn-save" type="submit">Save</button>
            </div>
            <ObjectDropdown name="company" list={companies} keyName="name" onChange={(e) => { setCompany(e.target.value) }} isRequired={isRequired("company")} value={company} />
            <TextInput name="role" type="text" value={role} onChange={(e) => setRole(e.target.value)} isRequired={isRequired("role")} />
            <TextInput name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} isRequired={isRequired("email")} />
            <TextInput name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} isRequired={isRequired("name")} />
          </form>
        </div>
      }
    </>
  )
}

export default EditEmployee
