import Button from "./Button"

const FieldHeader = ({ title, showAdd, onShowAdd }) => {
  return (
    <div className="field-header">
      <h1>{title}</h1>
      <Button text={showAdd ? "Close" : "Add"} onClick={onShowAdd} />
    </div>
  )
}

export default FieldHeader
