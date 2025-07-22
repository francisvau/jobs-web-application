
import { useState } from "react"

const TextList = ({ name, list, setList }) => {

  const [newText, setNewText] = useState("")

  const handleAddText = () => {
    if (newText.trim() !== "") {
      setList([...list, newText])
      setNewText("")
    }
  };

  return (
    <div className="element">
      <div>
        <label htmlFor={`${name}-add`}>Add {name}:</label>
        <input className="text-input" type="text" id={`${name}-add`} value={newText} onChange={(e) => setNewText(e.target.value)} />
        <button className="btn" type="button" onClick={handleAddText}>Add</button>
      </div>
      <ul className="item-list">
        {list.map((item, index) => (
          <li key={index}>{item}<button type="button" onClick={() => setList(list.filter((e) => e !== item))}>x</button></li>
        ))}
      </ul>
    </div>
  )
}

export default TextList
