
import { useState, useEffect } from "react"
import { addObject, fetchField } from "../../fetch"
import TextInput from "../TextInput"
import TextArea from "../TextArea"

const AddCompany = ({ updateTrigger, onShowAdd }) => {

  const [requiredFields, setRequiredFields] = useState([])

  const isRequired = (field) => {
    return requiredFields.includes(field)
  }

  // Fetch the required fields
  useEffect(() => {
    const getRequiredFields = async () => {
      const companiesObj = await fetchField("companies")
      setRequiredFields(companiesObj.requiredFields)
    }
    getRequiredFields()
  })

  const [name, setName] = useState("")
  const [industry, setIndustry] = useState("")
  const [description, setDescription] = useState("")
  const [size, setSize] = useState("")

  const handleSubmit = async (event) => {

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
    await addObject("companies", company)

    // Update the visible list of companies
    updateTrigger()

    // Hide the add window
    onShowAdd()
  };

  return (
    <div className="form-add">
      <h2>Add company</h2>
      <form onSubmit={handleSubmit}>
        <TextInput name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} isRequired={isRequired("name")} />
        <TextInput name="industry" type="text" value={industry} onChange={(e) => setIndustry(e.target.value)} isRequired={isRequired("industry")} />
        <TextArea name="description" value={description} onChange={(e) => setDescription(e.target.value)} isRequired={isRequired("description")} />
        <TextInput name="size" type="text" value={size} onChange={(e) => setSize(e.target.value)} isRequired={isRequired("size")} />
        <button className="element btn btn-save" type="submit">Submit</button>
      </form>
    </div>
  )
}

export default AddCompany
