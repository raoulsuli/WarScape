import { useState, useEffect } from "react";
import { Card } from "../components/card/Card";
import { useHttp } from "../components/useHttp";

export const Borders = () => {
  const [borders, setBorders] = useState(null);
  const [getRequest] = useHttp();

  useEffect(() => {
    getRequest("/borders").then((borders) => {
      setBorders(borders.data);
    });
  }, []);

  return (
    <div className="cardContainer">
      {borders &&
        borders.map((data, id) => (
          <Card key={`border-${id}`} type="Border" data={data} />
        ))}
    </div>
  );
};
