import "./DropdownList.css";

const DropdownList = ({opts, onChange, value}) => {
  return (
    <select className="dropdown-list" value={value} onChange={onChange}>
      {opts.map((opt) => <option key={opt[0]} value={opt[0]}>{opt[1]}</option>)}
    </select>
  )
}

export default DropdownList;