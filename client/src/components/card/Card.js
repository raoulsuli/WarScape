import { useState } from "react";
import { Button } from "../Button";
import { Map } from "../Map";
import { Badge } from "../Badge";
import { badgeColor, getModalBody } from "./Card.config";
import { RentModal } from "../modals/RentModal";
import { InfoModal } from "./info-modal/InfoModal";
import { useAuth0 } from "@auth0/auth0-react";
import { authSettings } from "../../utils/authSettings";
import { ArchiveIcon } from "@heroicons/react/outline";
import { useHttp } from "../useHttp";
import { lowercase } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { AddEditModal } from "../modals/add-edit-modal/AddEditModal";

export const Card = ({ data, type, rentedItem }) => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isRentModalOpen, setIsRentModalOpen] = useState(false);
  const [isUnrentModalOpen, setIsUnrentModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [, , , deleteRequest] = useHttp();
  const navigate = useNavigate();
  const { user } = useAuth0();

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

  const rentedAndSame = () => rentedItem && rentedItem === _id;
  const rentedAndDiff = () => rentedItem && rentedItem !== _id;
  const isAdmin = () =>
    user[authSettings.AUDIENCE].includes(authSettings.ADMIN_PERMISSION);

  const onClickAction = () => {
    if (isAdmin()) {
      setIsEditModalOpen(true);
    } else {
      if (rentedAndSame()) {
        setIsUnrentModalOpen(true);
      } else {
        setIsRentModalOpen(true);
      }
    }
  };

  const actionText = isAdmin() ? "Edit" : rentedAndSame() ? "Unrent" : "Rent";

  const deleteItem = () => {
    deleteRequest(`/${lowercase(type)}s`, { id: _id }).then(() => navigate(0));
  };

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
            height="sm"
            onClick={() => setIsInfoModalOpen(true)}
          />
          {isAdmin() && (
            <ArchiveIcon
              className="h-8 deleteIconActive"
              onClick={deleteItem}
            />
          )}
          <Button
            text={actionText}
            title={
              !isAdmin() && rentedAndDiff()
                ? "Only one item can be rented at a time"
                : ""
            }
            height="sm"
            disabled={!isAdmin() && rentedAndDiff()}
            onClick={onClickAction}
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
        action="Rent"
        id={_id}
        type={type}
        title={title}
      />
      <RentModal
        isModalOpen={isUnrentModalOpen}
        setIsModalOpen={setIsUnrentModalOpen}
        action="Unrent"
        id={_id}
        type={type}
        title={title}
      />
      <AddEditModal
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
        type={type}
        data={data}
        action="Edit"
      />
    </div>
  );
};
