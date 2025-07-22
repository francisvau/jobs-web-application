
const TextInput = ({ name, type, value, onChange, isRequired }) => {
  return (
    <div className="element">
      <label htmlFor={name}>Enter {name}:</label>
      <input className="text-input" type={type} id={name} value={value} onChange={(e) => onChange(e)} required={isRequired} />
    </div>
  )
}

export default TextInput
