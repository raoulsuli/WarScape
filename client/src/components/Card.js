import { Button } from "./Button";

export const Card = ({ id, title, location }) => {
  const rent = () => {};

  return (
    <div className="card">
      <div className="flex justify-center items-center border-b-2 border-gray-400">
        harta
      </div>
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
