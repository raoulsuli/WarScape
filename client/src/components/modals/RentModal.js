import { useState } from "react";
import Modal from "react-modal";
import { XIcon } from "@heroicons/react/outline";
import { Button } from "../Button";
import { Input } from "../forms/Input";
import { useHttp } from "../useHttp";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { getCurrentDate, MODAL_STYLES } from "../../utils/constants";
import { authSettings } from "../../utils/authSettings";

export const RentModal = ({
  isModalOpen,
  setIsModalOpen,
  id,
  action,
  title,
  type,
  email,
}) => {
  const [size, setSize] = useState(0);
  const [date, setDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [, postRequest] = useHttp();
  const { user } = useAuth0();
  const navigate = useNavigate();

  const isAdmin = () =>
    user[authSettings.AUDIENCE].includes(authSettings.ADMIN_PERMISSION);

  const rent = () => {
    postRequest(`/rent${type}`, {
      id: id,
      size: size,
      date: date,
      email: user.email,
    }).then((r) => {
      if (r.status === 400) {
        setErrorMessage("Size exceeded!");
      } else {
        navigate(0);
      }
    });
  };

  const unrent = () => {
    postRequest(`/rent${type}`, {
      id: id,
      size: 0,
      email: isAdmin() ? email : user.email,
    }).then(() => navigate(0));
  };

  const isRentAction = () => action === "Rent";

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
          {`${action} ${type} ${title}`}
          <XIcon className="closeIcon" onClick={() => setIsModalOpen(false)} />
        </div>
        {isRentAction() && (
          <>
            <div className="rentModalBody">
              <Input
                type="number"
                min="0"
                width="md"
                height="sm"
                className="colorRed"
                placeholder="Size"
                onChange={(e) => {
                  setSize(e.target.value);
                  setErrorMessage("");
                }}
              />
              <Input
                width="md"
                height="sm"
                className="colorRed"
                type="text"
                placeholder="Date"
                onFocus={(e) => (e.target.type = "date")}
                min={getCurrentDate()}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="rentModalError">{errorMessage}</div>
          </>
        )}
        <div className="modalButtons mt-7">
          <Button
            text="Decline"
            height="sm"
            btnColor="bg-red-600"
            onClick={() => setIsModalOpen(false)}
          />
          <Button
            text="Confirm"
            disabled={isRentAction() && (!size || size < 1 || !date)}
            height="sm"
            btnColor="btnGreen"
            onClick={() => (isRentAction() ? rent() : unrent())}
          />
        </div>
      </div>
    </Modal>
  );
};
