import { faCircleQuestion, faClipboard, faCloudArrowUp, faCode, faDownload, faLink, faPaintBrush, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useState } from "react";
import "./App.css";
import ColorPicker from "./components/ColorPicker/ColorPicker";
import DropdownList from "./components/DropdownList/DropdownList";
import ToggleOption from "./components/ToggleOption/ToggleOption";

enum StyleEnum {
  designerTop5 = "designer-top-5",
  designerTop10 = "designer-top-10",
  lPsOnTheFloor = "lps-on-the-floor",
  gridStats = "grid-stats",
}

type GalleryTileProps = {
  name: StyleEnum;
  url: string;
  onStyleSelect: (styleName: string) => void;
};

type GalleryProps = {
  onStyleSelect: (styleName: string) => void;
};

type PreviewProps = {
  url: string;
};

function GalleryTile(props: GalleryTileProps) {
  const { name, url, onStyleSelect } = props;
  const updateStyleCallback = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      onStyleSelect(name);
    },
    [name, onStyleSelect]
  );

  return (
    <div onClick={updateStyleCallback}>
      <object className="gallery-tile" data={url}></object>
    </div>
  );
}

function Gallery(props: GalleryProps) {
  return (
    <div className="d-flex">
      <GalleryTile
        name={StyleEnum.designerTop5}
        onStyleSelect={props.onStyleSelect}
        url={"https://api.listenbrainz.org/1/art/designer-top-5/rob/week/750"}
      />
      <GalleryTile
        name={StyleEnum.designerTop10}
        onStyleSelect={props.onStyleSelect}
        url={"https://api.listenbrainz.org/1/art/designer-top-10/rob/week/750"}
      />
      <GalleryTile
        name={StyleEnum.lPsOnTheFloor}
        onStyleSelect={props.onStyleSelect}
        url={"https://api.listenbrainz.org/1/art/lps-on-the-floor/rob/week/750"}
      />
      <GalleryTile
        name={StyleEnum.gridStats}
        onStyleSelect={props.onStyleSelect}
        url={"https://api.listenbrainz.org/1/art/grid-stats/rob/month/5/0/750"}
      />
      <GalleryTile
        name={StyleEnum.gridStats}
        onStyleSelect={props.onStyleSelect}
        url={"https://api.listenbrainz.org/1/art/grid-stats/rob/week/4/0/750"}
      />
    </div>
  );
}

function Preview(props: PreviewProps) {
  return <object className="preview" data={props.url} width={700} height={700}></object>;
}

function copyLink(){
  var copyText = document.getElementById("Link") as HTMLInputElement;

  // Select the text field
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

   // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value);

  // Alert the copied text
  alert("Copied the text: " + copyText.value);
}
function ArtCreator() {
  // NOTE: Add useThrottle to slow down updates of the userName field.
  // Add images for the gallery, don't compose them on the fly
  const [userName, setUserName] = useState("rob");
  const [style, setStyle] = useState(StyleEnum.designerTop5);
  const [timeRange, setTimeRange] = useState("week");
  const [gridSize, setGridSize] = useState(4);
  const [gridStyle, setGridStyle] = useState(0);
  const styleOpts = [
    [StyleEnum.designerTop5, "Designer top 5"],
    [StyleEnum.designerTop10, "Designer top 10"],
    [StyleEnum.lPsOnTheFloor, "LPs on the floor"],
    [StyleEnum.gridStats, "Stats grid"]
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

  const toggleOpts = [
    ["Users", "Users"],
    ["Date", "Date"],
    ["Range", "Range"],
    ["Total", "Total"],
    ["Genres", "Genres"],
  ];

  const timeOpts=[
    ["daily", "daily"],
    ["weekly", "weekly"],
    ["Monthly", "Monthly"],
    ["Yearly", "Yearly"]
  ]

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
            <Gallery onStyleSelect={updateStyleButtonCallback} />
            <hr></hr>
            <Preview url={previewUrl} />
            <div className="d-flex align-items-center">
                  <div className="d-flex user-icon-container">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <div className="profile-container">
                    add to profile, refresh
                    <select className="borderless-dropdown-list" value={style} onChange={updateStyleCallback}>
                      <option value="daily">daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="Monthly">Monthly</option>
                    </select>
                  </div>
                  <div className="icon-bar">
                    <div className="d-flex icon-tray">
                      <FontAwesomeIcon className="icon-bar-item mx-2" icon={faLink} />
                      <FontAwesomeIcon className="icon-bar-item mx-2" icon={faDownload} />
                      <FontAwesomeIcon className="icon-bar-item mx-2" icon={faCode} />
                    </div>
                    <div className="d-flex border p-0 link-container">
                      <input
                        type="text"
                        id="Link"
                        placeholder={previewUrl}
                        disabled
                      />
                      <button className="d-flex copy-link-container">
                        <FontAwesomeIcon onClick={copyLink} icon={faClipboard}/>
                      </button>
                    </div>
                  </div>
            </div>
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
                value={userName}
                onChange={updateUserNameCallback}
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
                    value=""
                    onChange={updateUserNameCallback}
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
                  value=""
                  className="border input-color-container"
                  onChange={updateUserNameCallback}
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
              value=""
              className="border input-color-container"
              onChange={updateUserNameCallback}
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
                value=""
                className="border"
                onChange={updateUserNameCallback}
                placeholder=""
              />
            </div>
            <div>
              <ToggleOption buttonName={"Users"}/>
              <ToggleOption buttonName={"Date"}/> 
              <ToggleOption buttonName={"Range"}/> 
              <ToggleOption buttonName={"Total"}/> 
              <ToggleOption buttonName={"Genres"}/> 
            </div>
            <div>
              Font:<br/>
              <DropdownList opts={fontOpts} value={style} onChange={updateStyleCallback}/>
            </div>
            <div>
              <ToggleOption buttonName={"Ignore VA"}/>
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
