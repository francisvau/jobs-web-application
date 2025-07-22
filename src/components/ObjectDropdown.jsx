
const ObjectDropdown = ({ name, list, keyName, onChange, isRequired, value }) => {
  return (
    <div className="element">
      <label htmlFor={name}>Select {name}:</label>
      <select className="object-dropdown" id={name} onChange={(e) => onChange(e)} required={isRequired} value={value}>
        <option value="">Please choose any {name}</option>
        {list.map((option, index) => <option key={index} value={list[index].url}>{option[keyName]}</option>)}
      </select>
    </div>
  )
}

export default ObjectDropdown
