import { Card } from "../components/Card";
fetch(
  "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?SingleLine=Aleea%20Avrig,%2014,%20Bucuresti,%20Romania&f=json"
)
  .then((r) => r.json())
  .then((r) => console.log(r));

export const Borders = () => {
  return (
    <div className="cardContainer">
      <Card id="0" title="Siret" location="Str. A, Nr 1" />
      <Card id="0" title="Odesa" location="Str. A, Nr 1" />
      <Card id="0" title="Polonia" location="Str. A, Nr 1" />
      <Card id="0" title="Romania" location="Str. A, Nr 1" />
      <Card id="0" title="Rusia" location="Str. A, Nr 1" />
    </div>
  );
};
