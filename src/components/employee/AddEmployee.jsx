
import { useState, useEffect } from "react"
import { addObject, fetchField, getObjectByUrl } from "../../fetch"
import ObjectDropdown from "../ObjectDropdown"
import TextInput from "../TextInput"

const AddEmployee = ({ updateTrigger, onShowAdd }) => {

  const [requiredFields, setRequiredFields] = useState([])

  const isRequired = (field) => {
    return requiredFields.includes(field)
  }

  // Fetch the required fields and objects
  useEffect(() => {
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
  const [company, setCompany] = useState("")
  const [role, setRole] = useState("")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")

  const handleSubmit = async (event) => {

    event.preventDefault()

    const employee = {
      company: company,
      role: role,
      email: email,
      name: name
    }

    // Add the employee to the API
    await addObject("employees", employee)

    // Update the visible list of employees
    updateTrigger()

    // Hide the add window
    onShowAdd()
  };

  return (
    <div className="form-add">
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <ObjectDropdown name="company" list={companies} keyName="name" onChange={(e) => { setCompany(e.target.value) }} isRequired={isRequired("company")} value={company} />
        <TextInput name="role" type="text" value={role} onChange={(e) => setRole(e.target.value)} isRequired={isRequired("role")} />
        <TextInput name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} isRequired={isRequired("email")} />
        <TextInput name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} isRequired={isRequired("name")} />
        <button className="element btn btn-save" type="submit">Submit</button>
      </form>
    </div>
  )
}

export default AddEmployee
