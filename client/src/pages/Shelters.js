import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Card } from "../components/card/Card";
import { useHttp } from "../components/useHttp";
import { Button } from "../components/Button";
import { AddEditModal } from "../components/modals/add-edit-modal/AddEditModal";
import { authSettings } from "../utils/authSettings";

export const Shelters = () => {
  const [shelters, setShelters] = useState(null);
  const [rentedItem, setRentedItem] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [getRequest] = useHttp();
  const { user } = useAuth0();

  const isAdmin = () =>
    user[authSettings.AUDIENCE].includes(authSettings.ADMIN_PERMISSION);

  useEffect(() => {
    getRequest(`/rentals?email=${user.email}&active=true&type=shelter`).then(
      (rentals) =>
        rentals.data.length !== 0 && setRentedItem(rentals.data[0].item._id)
    );
  }, []);

  useEffect(() => {
    getRequest("/shelters").then((shelters) => {
      setShelters(shelters.data);
    });
  }, []);

  return (
    <>
      {isAdmin() && (
        <div className="flex justify-end mr-8 mt-8">
          <Button
            text="Add new shelter"
            btnColor="bg-green-600"
            width="sm"
            height="md"
            onClick={() => setIsAddModalOpen(true)}
          />
        </div>
      )}
      <div className="cardContainer">
        {shelters &&
          shelters.map((data, id) => (
            <Card
              key={`shelter-${id}`}
              type="Shelter"
              data={data}
              rentedItem={rentedItem}
            />
          ))}
      </div>
      <AddEditModal
        isModalOpen={isAddModalOpen}
        setIsModalOpen={setIsAddModalOpen}
        type="Shelter"
        action="Add"
      />
    </>
  );
};
