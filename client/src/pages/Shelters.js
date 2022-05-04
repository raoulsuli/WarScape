import { Card } from "../components/Card";

export const Shelters = () => {
  fetch("http://localhost:5000/shelters")
    .then((res) => res.json())
    .then((res) => console.log(res));
  return (
    <div className="cardContainer">
      <Card id="0" title="Shelter Kiev Cartier1" location="Str. A, Nr 1" />
      <Card id="0" title="Shelter Kiev Cartier1" location="Str. A, Nr 1" />
      <Card id="0" title="Shelter Kiev Cartier1" location="Str. A, Nr 1" />
      <Card id="0" title="Shelter Kiev Cartier1" location="Str. A, Nr 1" />
      <Card id="0" title="Shelter Kiev Cartier1" location="Str. A, Nr 1" />
      <Card id="0" title="Shelter Kiev Cartier1" location="Str. A, Nr 1" />
      <Card id="0" title="Shelter Kiev Cartier1" location="Str. A, Nr 1" />
      <Card id="0" title="Shelter Kiev Cartier1" location="Str. A, Nr 1" />
      <Card id="0" title="Shelter Kiev Cartier1" location="Str. A, Nr 1" />
    </div>
  );
};
