
import { addObject, fetchField } from "../../fetch"
import { useState, useEffect } from "react"
import TextInput from "../TextInput"
import TextList from "../TextList"

const AddApplicant = ({ updateTrigger, onShowAdd }) => {

  const [requiredFields, setRequiredFields] = useState([])

  const isRequired = (field) => {
    return requiredFields.includes(field)
  }

  // Fetch the required fields
  useEffect(() => {
    const getRequiredFields = async () => {
      const applicantsObj = await fetchField("applicants")
      setRequiredFields(applicantsObj.requiredFields)
    }
    getRequiredFields()
  })

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [resume, setResume] = useState("")
  const [skills, setSkills] = useState([])

  const handleSubmit = async (event) => {

    event.preventDefault()

    const applicant = {
      skills: skills,
      name: name,
      email: email,
      resume: resume
    }

    // Add the applicant to the API
    await addObject("applicants", applicant)

    // Update the visible list of applicants
    updateTrigger()

    // Hide the add window
    onShowAdd()
  };

  return (
    <div className="form-add">
      <h2>Add applicant</h2>
      <form onSubmit={handleSubmit}>
        <TextInput name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} isRequired={isRequired("name")} />
        <TextInput name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} isRequired={isRequired("email")} />
        <TextInput name="resume" type="text" value={resume} onChange={(e) => setResume(e.target.value)} isRequired={isRequired("resume")} />
        <TextList name="skills" list={skills} setList={setSkills} />
        <button className="btn btn-save" type="submit">Submit</button>
      </form>
    </div>
  )
}

export default AddApplicant
