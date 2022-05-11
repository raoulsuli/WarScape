import { useState } from "react";
import { Button } from "../Button";
import { Map } from "../Map";
import { Badge } from "../Badge";
import { badgeColor, getModalBody } from "./Card.config";
import { RentModal } from "./modals/RentModal";
import { InfoModal } from "./modals/info-modal/InfoModal";

export const Card = ({ data, type }) => {
  const {
    _id,
    title,
    city,
    region,
    address,
    size,
    capacity,
    risk,
    resources,
    doctors,
  } = data;

  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isRentModalOpen, setIsRentModalOpen] = useState(false);

  return (
    <div className="card">
      <Badge
        className={`top-2 right-1 ${badgeColor(risk, 5)}`}
        text={`Risk: ${risk}/5`}
      />
      <Badge
        className={`top-10 right-1 ${badgeColor(size, capacity)}`}
        text={`Capacity: ${capacity - size}/${capacity}`}
      />
      <Map
        className="mapContainer"
        address={address}
        city={city}
        region={region}
      />
      <div className="cardContent">
        <div>
          <div className="nameStyle">{title}</div>
          <div className="locationStyle">{`${address}, ${region}, ${city}`}</div>
        </div>
        <div className="flex justify-between">
          <Button
            text="More info"
            btnColor="btnGreen"
            width="sm"
            height="sm"
            onClick={() => setIsInfoModalOpen(true)}
          />
          <Button
            text="Rent now"
            width="sm"
            height="sm"
            onClick={() => setIsRentModalOpen(true)}
          />
        </div>
      </div>
      <InfoModal
        isModalOpen={isInfoModalOpen}
        setIsModalOpen={setIsInfoModalOpen}
        type={type}
        title={title}
        body={getModalBody(address, region, city, capacity, size, risk)}
        footer={{ resources: resources, doctors: doctors }}
      />
      <RentModal
        isModalOpen={isRentModalOpen}
        setIsModalOpen={setIsRentModalOpen}
        id={_id}
        type={type}
        title={title}
      />
    </div>
  );
};
