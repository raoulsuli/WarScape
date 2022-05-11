import { useState, useEffect } from "react";
import { Card } from "../components/card/Card";
import { useHttp } from "../components/useHttp";

export const Shelters = () => {
  const [shelters, setShelters] = useState(null);
  const [getRequest] = useHttp();

  useEffect(() => {
    getRequest("/shelters").then((shelters) => {
      setShelters(shelters.data);
    });
  }, []);

  return (
    <div className="cardContainer">
      {shelters &&
        shelters.map((data, id) => (
          <Card key={`shelter-${id}`} type="Shelter" data={data} />
        ))}
    </div>
  );
};
