import "./ColorPicker.css";

const ColorPicker = ({ firstColor, secondColor }) => {
  return (
    <div className="color-picker">
      <div 
        className="color-half" 
        style={{ backgroundColor: firstColor }}>    
    </div>
      <div
        className="color-half"
        style={{ backgroundColor: secondColor }}
      ></div>
    </div>
  );
};

export default ColorPicker;
