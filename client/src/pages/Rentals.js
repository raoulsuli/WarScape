import { useState, useEffect } from "react";
import { useHttp } from "../components/useHttp";
import { useAuth0 } from "@auth0/auth0-react";
import { capitalize } from "../utils/constants";
import { ArchiveIcon } from "@heroicons/react/outline";
import { RentModal } from "../components/modals/RentModal";
import { authSettings } from "../utils/authSettings";

export const Rentals = () => {
  const [rentals, setRentals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState(null);
  const [getRequest] = useHttp();

  const { user } = useAuth0();

  const isAdmin = () =>
    user[authSettings.AUDIENCE].includes(authSettings.ADMIN_PERMISSION);

  const unrent = (id, type, title) => {
    setModalInfo({ id: id, type: type, title: title });
    setIsModalOpen(true);
  };

  useEffect(() => {
    const apiUrl = isAdmin() ? "/rentals" : `/rentals?email=${user.email}`;
    getRequest(apiUrl).then((rentals) =>
      setRentals(rentals.data.sort((a) => (a.active ? -1 : 1)))
    );
  }, []);

  return (
    <>
      <div className="rentalsTitle">Rental History</div>
      <div className="rentalsContainer">
        {rentals.length !== 0 ? (
          <table className="rentalsTable">
            <thead className="border-b-2">
              <tr className="colorRed">
                {isAdmin() && <th>Email</th>}
                <th className="py-5">Type</th>
                <th>Size</th>
                <th>Date</th>
                <th>Title</th>
                <th>Address</th>
                <th>Risk</th>
                <th>Active</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="rentalsTBody">
              {rentals.map(
                ({ type, size, date, active, email, item }, index) => {
                  const { _id, title, address, city, region, risk } = item;
                  return (
                    <tr key={`rental-${index}`} className="border-b-2">
                      {isAdmin() && <td>{email}</td>}
                      <td>{capitalize(type)}</td>
                      <td>{size}</td>
                      <td>{date.split("T")[0]}</td>
                      <td>{title}</td>
                      <td>{`${address}, ${city}, ${region}`}</td>
                      <td>{risk}/5</td>
                      <td>{active ? "Yes" : "No"}</td>
                      <td className="rentalsDeleteIcon">
                        <ArchiveIcon
                          className={`h-8 ${
                            active ? "rentalsDeleteActive" : "text-gray-500"
                          }`}
                          onClick={() => active && unrent(_id, type, title)}
                        />
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        ) : (
          <div className="emptyTableText">No rentals found</div>
        )}
        {modalInfo && (
          <RentModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            action="Unrent"
            id={modalInfo.id}
            type={modalInfo.type}
            title={modalInfo.title}
          />
        )}
      </div>
    </>
  );
};
