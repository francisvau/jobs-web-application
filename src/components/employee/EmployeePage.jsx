
import AddEmployee from "./AddEmployee"
import FieldHeader from "../FieldHeader"
import IdSelector from "../IdSelector"
import { fetchField } from "../../fetch"
import { useState, useEffect } from "react"
import NoSelection from "../NoSelection"
import EmployeeDetail from "./EmployeeDetail"

const EmployeePage = ({ currentObj, setCurrentObj, showAdd, onShowAdd }) => {

  const [employees, setEmployees] = useState([])
  const [updateTrigger, setUpdateTrigger] = useState(false)

  const triggerListUpdate = () => {
    setUpdateTrigger(!updateTrigger)
  }

  useEffect(() => {
    const getEmployeesObj = async () => {
      const employeesObjFromServer = await fetchField("employees")
      setEmployees(employeesObjFromServer.employees)
    }
    getEmployeesObj()
  }, [updateTrigger])

  return (
    <>
      <FieldHeader title="Employees" showAdd={showAdd} onShowAdd={onShowAdd} />
      {showAdd && <AddEmployee updateTrigger={triggerListUpdate} onShowAdd={onShowAdd} />}
      <IdSelector setCurrentObj={setCurrentObj} list={employees} field="employees" keyName="name" />
      {Object.keys(currentObj).length
        ?
        <EmployeeDetail currentObj={currentObj} setCurrentObj={setCurrentObj} triggerListUpdate={triggerListUpdate} />
        :
        <NoSelection name="employee" />
      }
    </>
  )
}

export default EmployeePage
