
const TextArea = ({ name, value, onChange, isRequired }) => {
  return (
    <div className="element column-element">
      <label htmlFor={name}>Enter {name}:</label>
      <textarea className="text-area" id={name} value={value} onChange={(e) => onChange(e)} required={isRequired} />
    </div>
  )
}

export default TextArea
