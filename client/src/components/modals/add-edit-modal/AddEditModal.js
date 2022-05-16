import { useState } from "react";
import Modal from "react-modal";
import { XIcon } from "@heroicons/react/outline";
import { Button } from "../../Button";
import { Input } from "../../forms/Input";
import { useHttp } from "../../useHttp";
import { useNavigate } from "react-router-dom";
import { MODAL_STYLES, lowercase } from "../../../utils/constants";
import {
  parseResources,
  parseDoctors,
  stringifyResources,
  stringifyDoctors,
} from "./AddEditModal.config";
import { TextArea } from "../../forms/TextArea";

export const AddEditModal = ({
  isModalOpen,
  setIsModalOpen,
  action,
  type,
  data = {},
}) => {
  const [title, setTitle] = useState(data.title || "");
  const [city, setCity] = useState(data.city || "");
  const [region, setRegion] = useState(data.region || "");
  const [address, setAddress] = useState(data.address || "");
  const [capacity, setCapacity] = useState(data.capacity || "");
  const [risk, setRisk] = useState(data.risk || "");
  const [resources, setResources] = useState(
    stringifyResources(data.resources)
  );
  const [doctors, setDoctors] = useState(stringifyDoctors(data.doctors));

  const [, postRequest, putRequest] = useHttp();
  const navigate = useNavigate();

  const isEditAction = () => action === "Edit" && data;
  const isShelter = () => type === "Shelter";

  const fieldsEmpty = () =>
    title === "" ||
    capacity === "" ||
    capacity === 0 ||
    risk === "" ||
    risk < 1 ||
    risk > 5;

  const onClickAction = () => {
    const body = {
      title: title,
      capacity: capacity,
      risk: risk,
    };

    if (isShelter())
      Object.assign(body, {
        resources: parseResources(resources),
        doctors: parseDoctors(doctors),
      });

    if (isEditAction()) {
      putRequest(`/${lowercase(type)}s`, { id: data._id, ...body }).then(() =>
        navigate(0)
      );
    } else {
      Object.assign(body, { city: city, region: region, address: address });
      postRequest(`/${lowercase(type)}s`, body).then(() => navigate(0));
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
      ariaHideApp={false}
      style={{
        overlay: MODAL_STYLES.overlay,
        content: { ...MODAL_STYLES.content, paddingBottom: "5px" },
      }}
    >
      <>
        <div className="modalTitle mb-14">
          {`${action} ${type} ${isEditAction() ? data.title : ""}`}
          <XIcon className="closeIcon" onClick={() => setIsModalOpen(false)} />
        </div>
        <div className="addEditModalFields">
          <Input
            type="text"
            placeholder="Title"
            label="Title"
            width="sm"
            height="md"
            className="colorRed"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {!isEditAction() && (
            <>
              <Input
                type="text"
                placeholder="City"
                label="City"
                width="sm"
                height="md"
                className="colorRed"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Region"
                label="Region"
                width="sm"
                height="md"
                className="colorRed"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Address"
                label="Address"
                width="sm"
                height="md"
                className="colorRed"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </>
          )}
          <Input
            type="number"
            placeholder="Capacity"
            label="Capacity"
            width="sm"
            height="md"
            className="colorRed"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            min="1"
          />
          <Input
            type="number"
            placeholder="Risk (1-5)"
            label="Risk"
            width="sm"
            height="md"
            className="colorRed"
            parentClassName={isEditAction() ? "riskFieldParent" : ""}
            value={risk}
            onChange={(e) => setRisk(e.target.value)}
            min="1"
            max="5"
          />
          {isShelter() && resources !== undefined && doctors !== undefined && (
            <>
              <TextArea
                label="Resources"
                value={resources}
                onChange={(e) => setResources(e.target.value)}
                placeholder="<Type>, <Quantity>;"
              />
              <TextArea
                label="Doctors"
                value={doctors}
                onChange={(e) => setDoctors(e.target.value)}
                placeholder="<Name>, <Specialisation>;"
              />
            </>
          )}
        </div>
        <div className="modalButtons">
          <Button
            text="Decline"
            height="sm"
            btnColor="bg-red-600"
            onClick={() => setIsModalOpen(false)}
          />
          <Button
            text="Confirm"
            disabled={fieldsEmpty()}
            height="sm"
            btnColor="btnGreen"
            onClick={onClickAction}
          />
        </div>
      </>
    </Modal>
  );
};
