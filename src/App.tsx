import { faCircleQuestion, faCloudArrowUp, faPaintBrush } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useState } from "react";
import "./App.css";
import ColorPicker from "./components/ColorPicker/ColorPicker";
import DropdownList from "./components/DropdownList/DropdownList";
import Gallery from "./components/Gallery/Gallery";
import IconTray from "./components/IconTray/IconTray";
import Preview from "./components/Preview/Preview";
import ToggleOption from "./components/ToggleOption/ToggleOption";

enum StyleEnum {
  designerTop5 = "designer-top-5",
  designerTop10 = "designer-top-10",
  lPsOnTheFloor = "lps-on-the-floor",
  gridStats = "grid-stats",
}

function ArtCreator() {
  // NOTE: Add useThrottle to slow down updates of the userName field.
  // Add images for the gallery, don't compose them on the fly
  const [userName, setUserName] = useState("rob");
  const [style, setStyle] = useState(StyleEnum.designerTop5);
  const [timeRange, setTimeRange] = useState("week");
  const [gridSize, setGridSize] = useState(4);
  const [gridStyle, setGridStyle] = useState(0);
  const [font, setFont] = useState("");
  const [textColor, setTextColor] =  useState("");
  const [firstBgColor, setFirstBgColor] = useState("");
  const [secondBgColor, setSecondBgColor] = useState("");
  const [genres, setGenres] = useState("");
  const [usersToggle, setUsersToggle] = useState(false);
  const [dateToggle, setDateToggle] = useState(false);
  const [rangeToggle, setRangeToggle] = useState(false);
  const [totalToggle, setTotalToggle] = useState(false);
  const [genresToggle, setGenresToggle] = useState(false);
  const [vaToggle, setVaToggle] = useState(false);

  const userToggler = useCallback(() => {
    usersToggle ? setUsersToggle(false): setUsersToggle(true);
  }, [usersToggle]);
  const dateToggler = useCallback(() => {
    dateToggle? setDateToggle(false): setDateToggle(true);
  }, [dateToggle]);
  const rangeToggler = useCallback(() => {
    rangeToggle? setRangeToggle(false): setRangeToggle(true);
  }, [rangeToggle]);
  const totalToggler = useCallback(() => {
    totalToggle? setTotalToggle(false): setTotalToggle(true);
  }, [totalToggle])
  const genresToggler = useCallback(() => {
    genresToggle? setGenresToggle(false): setGenresToggle(true);
  },[genresToggle])
  const vaToggler = useCallback(() => {
    vaToggle? setVaToggle(false): setVaToggle(true);
  }, [vaToggle])
  
  const styleOpts = [
    [StyleEnum.designerTop5, "Designer top 5"],
    [StyleEnum.designerTop10, "Designer top 10"],
    [StyleEnum.lPsOnTheFloor, "LPs on the floor"],
    [StyleEnum.gridStats, "Stats grid"]
  ];

  const galleryOpts = [
    {name: StyleEnum.designerTop5, url:"https://api.listenbrainz.org/1/art/designer-top-5/rob/week/750"},
    {name: StyleEnum.designerTop10, url:"https://api.listenbrainz.org/1/art/designer-top-10/rob/week/750"},
    {name: StyleEnum.lPsOnTheFloor, url:"https://api.listenbrainz.org/1/art/lps-on-the-floor/rob/week/750"},
    {name: StyleEnum.gridStats, url:"https://api.listenbrainz.org/1/art/grid-stats/rob/month/5/0/750"}
  ];

  const timeRangeOpts = [
    ["week", "Last week"],
    ["month","Last month"],
    ["quarter","last quarter"],
    ["half_yearly","Last half year"],
    ["year","Last year"],
    ["all_time","All time"],
    ["this_week","This week"],
    ["this_month","This month"],
    ["this_year","This year"],
  ];
  const fontOpts = [
    ["Roboto", "Roboto"],
    ["Integer", "Integer"],
    ["Sans Serif", "Sans Serif"]
  ];

  const updateStyleButtonCallback = useCallback(
    (name: string) => {
      setStyle(name as StyleEnum);
    },
    [setStyle]
  );
  const updateStyleCallback = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) =>
      setStyle(event.target.value as StyleEnum),
    [setStyle]
  );

  const updateUserNameCallback = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setUserName(event.target.value),
    [setUserName]
  );

  const updateTimeRangeCallback = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) =>
      setTimeRange(event.target.value),
    [setTimeRange]
  );

  const updateTextColourCallback = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setTextColor(event.target.value),
    [setTextColor]
  );
  const updateFirstBgColorCallback = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setFirstBgColor(event.target.value),
    [setFirstBgColor]
  );
  const updateSecondBgColorCallback = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setSecondBgColor(event.target.value),
    [setSecondBgColor]
  );
  const updateGenresCallback = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setGenres(event.target.value),
    [setGenres]
  );

  const updateGridSizeCallback = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) =>
      setGridSize(Number(event.target.value)),
    [setGridSize]
  );

  const updateGridStyleCallback = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) =>
      setGridStyle(Number(event.target.value)),
    [setGridStyle]
  );

  const updateFontCallback = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setFont(event.target.value);
  }, [setFont]);

  var previewUrl = "";
  if (style === "grid-stats") {
    previewUrl = `https://api.listenbrainz.org/1/art/${style}/${userName}/${timeRange}/${gridSize}/${gridStyle}/750`;
  } else {
    previewUrl = `https://api.listenbrainz.org/1/art/${style}/${userName}/${timeRange}/750`;
  }

  return (
    <div className="row">
      <div className="col-sm-7">
          <div className="artwork-container">
            <Gallery currentStyle={style} galleryOpts={galleryOpts} onStyleSelect={updateStyleButtonCallback} />
            <hr></hr>
            <Preview url={previewUrl} />
            <IconTray previewUrl={previewUrl}/>
          </div>
        </div>
      <div className="col-sm-2 p-0 offset-md-2">
        <div className="basic-settings-container">
          <div className="content-container">
            <h4>Settings</h4>
            <input
              type="text"
              value={userName}
              onChange={updateUserNameCallback}
              placeholder="user name.."
            />
            <DropdownList opts={styleOpts} value={style} onChange={updateStyleCallback} />
            <div className="count-container">
              <div>
                top:
              </div>
              <input
                className="ms-4"
                type="text"
                placeholder="5"
                />
            </div>
            <DropdownList opts={timeRangeOpts} value={timeRange} onChange={updateTimeRangeCallback}/>
            <div className="color-picker-panel">
              <ColorPicker firstColor={"#6b4078"} secondColor={"#33234c"} />
              <ColorPicker firstColor={"#ff2f6e"} secondColor={"#e8ff2c"} />
              <ColorPicker firstColor={"#786aba"} secondColor={"#faff5b"} />
              <ColorPicker firstColor={"#083023"} secondColor={"#006d39"} />
              <ColorPicker firstColor={"#ffffff"} secondColor={"#006d39"} />
            </div>
          </div>
        </div>
        <div className="advanced-settings-container">
          <div className="content-container">
            <h4>Advanced</h4>
            <div>
              Text colour:
              <div className="color-container">
                  <input
                    className="input-color-container"
                    type="text"
                    onChange={updateTextColourCallback}
                    placeholder="#321529"
                  />
                  <div className="d-flex border icon-container">
                    <FontAwesomeIcon icon={faPaintBrush}/>
                  </div>
              </div>
            </div>
            <div>
              Bg colour:
              <div className="color-container">
                <input
                  type="text"
                  className="border input-color-container"
                  onChange={updateFirstBgColorCallback}
                  placeholder="#321529"
                />
                <div className="d-flex border icon-container">
                  <FontAwesomeIcon icon={faPaintBrush} />
                </div>
              </div>
            </div>
            <div className="color-container">
              <input
              type="text"
              className="border input-color-container"
              onChange={updateSecondBgColorCallback}
              placeholder="#321529"
              />
              <div className="d-flex border icon-container">
                <FontAwesomeIcon icon={faPaintBrush} />
              </div>
            </div>
            <div className="d-flex color-container">
              <div className="input-color-container">
                Bg Image:
              </div>
              <div className="d-flex border icon-container">
                <FontAwesomeIcon icon={faCloudArrowUp} />
              </div>
            </div>
            <div>
              Genres: <FontAwesomeIcon icon={faCircleQuestion} /><br/>
              <input
                type="text"
                className="border"
                placeholder=""
                onChange={updateGenresCallback}
              />
            </div>
            <div>
              <ToggleOption onClick={userToggler} buttonName={"Users"}/>
              <ToggleOption onClick={dateToggler} buttonName={"Date"}/> 
              <ToggleOption onClick={rangeToggler} buttonName={"Range"}/> 
              <ToggleOption onClick={totalToggler} buttonName={"Total"}/> 
              <ToggleOption onClick={genresToggler} buttonName={"Genres"}/> 
            </div>
            <div>
              Font:<br/>
              <DropdownList opts={fontOpts} value={style} onChange={updateFontCallback}/>
            </div>
            <div>
              <ToggleOption onClick={vaToggler} buttonName={"Ignore VA"}/>
            </div>
          </div>
        </div>
        <div className="generate-button-container">
          <div className="btn-container border">
            <button className="generate-button btn">
              GENERATE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtCreator;
