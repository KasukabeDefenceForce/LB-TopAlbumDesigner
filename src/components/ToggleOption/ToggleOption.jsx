import "./ToggleOption.css"

const ToggleOption = ({buttonName}) => {
  return (
    <div className="cl-toggle-switch">
        <label className="cl-switch">
            <input type="checkbox"/>
            <span></span>
        </label>
        {buttonName}
    </div> 
  )
}

export default ToggleOption