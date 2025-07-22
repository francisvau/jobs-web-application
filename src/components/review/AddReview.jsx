
import { useState, useEffect } from "react"
import { addObject, fetchField, getObjectByUrl } from "../../fetch"
import ObjectDropdown from "../ObjectDropdown"
import TextArea from "../TextArea"

const AddReview = ({ updateTrigger, onShowAdd }) => {

  const [requiredFields, setRequiredFields] = useState([])

  const isRequired = (field) => {
    return requiredFields.includes(field)
  }

  // Fetch the required fields and objects
  useEffect(() => {
    const fetchData = async () => {
      // Fetch fields
      const reviewObjPromise = await fetchField("reviews")
      const employeeObjPromise = await fetchField("employees")
      const [reviewObj, employeeObj] = await Promise.all([reviewObjPromise, employeeObjPromise])

      // Set required fields
      setRequiredFields(reviewObj.requiredFields)

      // Set objects
      const employeeListPromise = employeeObj.employees.map((url) => getObjectByUrl(url))
      const employeeList = await Promise.all(employeeListPromise);
      setEmployees(employeeList)
    }
    fetchData()
  }, [])

  const [employees, setEmployees] = useState([])
  const [employee, setEmployee] = useState("")
  const [text, setText] = useState("")
  const [score, setScore] = useState("")

  const handleSubmit = async (event) => {

    event.preventDefault()

    // Load the company of the reviewer
    const employeeObj = await getObjectByUrl(employee)
    const company = employeeObj.company

    const review = {
      employee: employee,
      company: company,
      text: text,
      score: score
    }

    // Add the review to the API
    await addObject("reviews", review)

    // Update the visible list of reviews
    updateTrigger()

    // Hide the add window
    onShowAdd()
  };

  return (
    <div className="form-add">
      <h2>Add Review</h2>
      <form onSubmit={handleSubmit}>
        <ObjectDropdown name="employee" list={employees} keyName="name" onChange={(e) => { setEmployee(e.target.value) }} isRequired={isRequired("employee")} value={employee} />
        <TextArea name="text" value={text} onChange={(e) => setText(e.target.value)} isRequired={isRequired("text")} />
        <div className="element">
          <label htmlFor="score">Select score:</label>
          <select className="object-dropdown" id="score" onChange={(e) => setScore(e.target.value)} required={isRequired("score")}>
            <option value="">Please choose any score</option>
            {Array.from(Array(11).keys()).map((index) => <option key={index} value={index}>{index}</option>)}
          </select>
        </div>
        <button className="element btn btn-save" type="submit">Submit</button>
      </form>
    </div>
  )
}

export default AddReview
