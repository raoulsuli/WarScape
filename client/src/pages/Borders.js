import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Card } from "../components/card/Card";
import { useHttp } from "../components/useHttp";

export const Borders = () => {
  const [borders, setBorders] = useState(null);
  const [rentedItem, setRentedItem] = useState(null);
  const [getRequest] = useHttp();
  const { user } = useAuth0();

  useEffect(() => {
    getRequest(`/rentals?email=${user.email}&active=true&type=border`).then(
      (rentals) =>
        rentals.data.length !== 0 && setRentedItem(rentals.data[0].item._id)
    );
  }, []);

  useEffect(() => {
    getRequest("/borders").then((borders) => {
      setBorders(borders.data);
    });
  }, []);

  return (
    <div className="cardContainer">
      {borders &&
        borders.map((data, id) => (
          <Card
            key={`border-${id}`}
            type="Border"
            data={data}
            rentedItem={rentedItem}
          />
        ))}
    </div>
  );
};
