import { Button } from "./Button";
import { Map } from "./Map";

export const Card = ({ id, title, location }) => {
  const rent = () => {};

  return (
    <div className="card">
      <Map className="mapContainer" location={location} />
      <div className="cardContent">
        <div>
          <div className="nameStyle">{title}</div>
          <div className="locationStyle">{location}</div>
        </div>
        <div className="flex justify-between">
          <Button text="More info" btnColor="btnGreen" width="sm" height="sm" />
          <Button text="Rent now" width="sm" height="sm" onClick={rent} />
        </div>
      </div>
    </div>
  );
};
