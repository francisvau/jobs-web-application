
import AddCompany from "./AddCompany"
import FieldHeader from "../FieldHeader"
import IdSelector from "../IdSelector"
import { fetchField } from "../../fetch"
import { useState, useEffect } from "react"
import NoSelection from "../NoSelection"
import CompanyDetail from "./CompanyDetail"

const CompanyPage = ({ currentObj, setCurrentObj, showAdd, onShowAdd }) => {

  const [companies, setCompanies] = useState([])
  const [updateTrigger, setUpdateTrigger] = useState(false)

  const triggerListUpdate = () => {
    setUpdateTrigger(!updateTrigger)
  }

  useEffect(() => {
    const getCompaniesObj = async () => {
      const companiesObjFromServer = await fetchField("companies")
      setCompanies(companiesObjFromServer.companies)
    }
    getCompaniesObj()
  }, [updateTrigger])

  return (
    <>
      <FieldHeader title="Companies" showAdd={showAdd} onShowAdd={onShowAdd} />
      {showAdd && <AddCompany updateTrigger={triggerListUpdate} onShowAdd={onShowAdd} />}
      <IdSelector setCurrentObj={setCurrentObj} list={companies} field="companies" keyName="name" />
      {Object.keys(currentObj).length
        ?
        <CompanyDetail currentObj={currentObj} setCurrentObj={setCurrentObj} triggerListUpdate={triggerListUpdate} />
        :
        <NoSelection name="company" />
      }
    </>
  )
}

export default CompanyPage
