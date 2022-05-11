import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Card } from "../components/card/Card";
import { useHttp } from "../components/useHttp";

export const Shelters = () => {
  const [shelters, setShelters] = useState(null);
  const [rentedItem, setRentedItem] = useState(null);
  const [getRequest] = useHttp();
  const { user } = useAuth0();

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
  );
};
