
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { fetchField, updateObject, getObjectByUrl } from "../../fetch"
import ObjectDropdown from "../ObjectDropdown"
import TextArea from "../TextArea"

const EditReview = ({ currentObj, setCurrentObj }) => {

  const [requiredFields, setRequiredFields] = useState([])

  const isRequired = (field) => {
    return requiredFields.includes(field)
  }

  // Send back to ReviewPage if no review is selected
  // Fetch the required fields and objects
  const navigate = useNavigate()
  useEffect(() => {
    if (!Object.keys(currentObj).length) {
      navigate("/reviews")
    }
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
  const [employee, setEmployee] = useState(currentObj.employee)
  const [text, setText] = useState(currentObj.text)
  const [score, setScore] = useState(currentObj.score)

  const handleDiscard = () => {
    navigate("/reviews")
  }

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
    updateObject(currentObj.url, review)

    // Set the current object to an empty object
    setCurrentObj({})

    // Navigate back to ReviewPage
    navigate("/reviews")
  }

  return (
    <>
      {Object.keys(currentObj).length &&
        <div className="form-edit">
          <h1>Edit Review</h1>
          <form onSubmit={handleSubmit}>
            <div className="buttons">
              <button className="btn btn-discard" type="button" onClick={handleDiscard}>Discard</button>
              <button className="btn btn-save" type="submit">Save</button>
            </div>
            <ObjectDropdown name="employee" list={employees} keyName="name" onChange={(e) => { setEmployee(e.target.value) }} isRequired={isRequired("employee")} value={employee} />
            <TextArea name="text" value={text} onChange={(e) => setText(e.target.value)} isRequired={isRequired("text")} />
            <div className="element">
              <label htmlFor="score">Select score:</label>
              <select className="object-dropdown" id="score" onChange={(e) => setScore(e.target.value)} required={isRequired("score")} value={score}>
                <option value="">Please choose any score</option>
                {Array.from(Array(11).keys()).map((index) => <option key={index} value={index}>{index}</option>)}
              </select>
            </div>
          </form>
        </div>
      }
    </>
  )
}

export default EditReview
