
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { fetchField, updateObject } from "../../fetch"
import TextInput from "../TextInput"
import TextList from "../TextList"

const EditApplicant = ({ currentObj, setCurrentObj }) => {

  const [requiredFields, setRequiredFields] = useState([])

  const isRequired = (field) => {
    return requiredFields.includes(field)
  }

  // Send back to ApplicantPage if no applicant is selected
  // Fetch the required fields
  const navigate = useNavigate()
  useEffect(() => {
    if (!Object.keys(currentObj).length) {
      navigate("/applicants")
    }
    const getRequiredFields = async () => {
      const applicantsObj = await fetchField("applicants")
      setRequiredFields(applicantsObj.requiredFields)
    }
    getRequiredFields()
  })

  const [name, setName] = useState(currentObj.name)
  const [email, setEmail] = useState(currentObj.email)
  const [resume, setResume] = useState(currentObj.resume)
  const [skills, setSkills] = useState(currentObj.skills)

  const handleDiscard = () => {
    navigate("/applicants")
  }

  const handleSubmit = (event) => {

    event.preventDefault()

    const applicant = {
      skills: skills,
      name: name,
      email: email,
      resume: resume
    }

    // Add the applicant to the API
    updateObject(currentObj.url, applicant)

    // Set the current object to an empty object
    setCurrentObj({})

    // Navigate back to ApplicantPage
    navigate("/applicants")
  }

  return (
    <>
      {Object.keys(currentObj).length &&
        <div className="form-edit">
          <h1>Edit Applicant</h1>
          <form onSubmit={handleSubmit}>
            <div className="buttons">
              <button className="btn btn-discard" type="button" onClick={handleDiscard}>Discard</button>
              <button className="btn btn-save" type="submit">Save</button>
            </div>
            <TextInput name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} isRequired={isRequired("name")} />
            <TextInput name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} isRequired={isRequired("email")} />
            <TextInput name="resume" type="text" value={resume} onChange={(e) => setResume(e.target.value)} isRequired={isRequired("resume")} />
            <TextList name="skills" list={skills} setList={setSkills} />
          </form>
        </div>
      }
    </>
  )
}

export default EditApplicant
