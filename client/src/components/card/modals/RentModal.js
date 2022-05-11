import { useState } from "react";
import Modal from "react-modal";
import { XIcon } from "@heroicons/react/outline";
import { Button } from "../../Button";
import { Input } from "../../forms/Input";
import { useHttp } from "../../useHttp";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { MODAL_STYLES } from "../../../utils/constants";

export const RentModal = ({ isModalOpen, setIsModalOpen, id, title, type }) => {
  const [size, setSize] = useState(0);
  const [date, setDate] = useState(null);
  const [, postRequest] = useHttp();
  const { user } = useAuth0();
  const navigate = useNavigate();

  const rent = () => {
    postRequest(`/rent${type}`, {
      id: id,
      size: size,
      date: date,
      email: user.email,
    }).then(() => navigate(0));
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
      <div className="grid grid-rows-2">
        <div className="modalTitle">
          {`Rent ${type} ${title}`}
          <XIcon className="closeIcon" onClick={() => setIsModalOpen(false)} />
        </div>
        <div className="rentModalBody">
          <Input
            type="number"
            min="0"
            width="md"
            height="sm"
            className="colorRed"
            onChange={(e) => setSize(e.target.value)}
          />
          <Input
            type="date"
            width="md"
            height="sm"
            className="colorRed"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="flex justify-evenly mt-10">
          <Button
            text="Decline"
            width="sm"
            height="sm"
            btnColor="bg-red-600"
            onClick={() => setIsModalOpen(false)}
          />
          <Button
            text="Confirm"
            disabled={!size || size < 1 || !date}
            width="sm"
            height="sm"
            btnColor="bg-green-600"
            onClick={rent}
          />
        </div>
      </div>
    </Modal>
  );
};
