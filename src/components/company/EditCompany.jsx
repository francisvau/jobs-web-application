
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { fetchField, updateObject } from "../../fetch"
import TextInput from "../TextInput"
import TextArea from "../TextArea"

const EditCompany = ({ currentObj, setCurrentObj }) => {

  const [requiredFields, setRequiredFields] = useState([])

  const isRequired = (field) => {
    return requiredFields.includes(field)
  }

  // Send back to CompanyPage if no company is selected
  // Fetch the required fields
  const navigate = useNavigate()
  useEffect(() => {
    if (!Object.keys(currentObj).length) {
      navigate("/companies")
    }
    const getRequiredFields = async () => {
      const companiesObj = await fetchField("companies")
      setRequiredFields(companiesObj.requiredFields)
    }
    getRequiredFields()
  })

  const [name, setName] = useState(currentObj.name)
  const [industry, setIndustry] = useState(currentObj.industry)
  const [description, setDescription] = useState(currentObj.description)
  const [size, setSize] = useState(currentObj.size)

  const handleDiscard = () => {
    navigate("/companies")
  }

  const handleSubmit = (event) => {

    event.preventDefault()

    if (isNaN(size)) {
      alert("Size must be a number")
      setSize("")
      return
    }

    const company = {
      name: name,
      industry: industry,
      description: description,
      size: parseInt(size)
    }

    // Add the company to the API
    updateObject(currentObj.url, company)

    // Set the current object to an empty object
    setCurrentObj({})

    // Navigate back to CompanyPage
    navigate("/companies")
  }

  return (
    <>
      {Object.keys(currentObj).length &&
        <div className="form-edit">
          <h1>Edit Company</h1>
          <form onSubmit={handleSubmit}>
            <div className="buttons">
              <button className="btn btn-discard" type="button" onClick={handleDiscard}>Discard</button>
              <button className="btn btn-save" type="submit">Save</button>
            </div>
            <TextInput name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} isRequired={isRequired("name")} />
            <TextInput name="industry" type="text" value={industry} onChange={(e) => setIndustry(e.target.value)} isRequired={isRequired("industry")} />
            <TextArea name="description" value={description} onChange={(e) => setDescription(e.target.value)} isRequired={isRequired("description")} />
            <TextInput name="size" type="text" value={size} onChange={(e) => setSize(e.target.value)} isRequired={isRequired("size")} />
          </form>
        </div>
      }
    </>
  )
}

export default EditCompany
