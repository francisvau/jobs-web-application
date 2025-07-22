
import { useState, useEffect } from 'react'
import { getObjectByUrl } from '../fetch'

const IdSelector = ({ setCurrentObj, list, field, keyName }) => {

  const [objects, setObjects] = useState([])

  // Fetch objects
  useEffect(() => {
    const loadObjects = async () => {
      const promiseList = list.map((url) => getObjectByUrl(url))
      const resolvedObjects = await Promise.all(promiseList)
      setObjects(resolvedObjects)
    };
    loadObjects();
  }, [list])

  const onClick = async (url) => {
    const res = await fetch(url)
    const object = await res.json()
    setCurrentObj(object)
  }

  return (
    <div className="id-selector">
      <h2>Select {`${field}`}</h2>
      {objects.length
        ?
        <div className="id-list">
          {objects.map((object, index) => <button key={index} value={object.url} onClick={(e) => onClick(e.target.value)}>{object[keyName]}</button>)}
        </div>
        :
        <div className="id-list"><div className="empty"></div></div>
      }
    </div>
  )
}

export default IdSelector
