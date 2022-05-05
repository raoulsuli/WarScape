import { getRequest } from "../components/Http";

export const Home = () => {
  getRequest("/shelters").then((r) => console.log(r));
  return (
    <div className="homeContainer">
      <div className="homeText">
        <div>
          Web Assistant for <span className="colorRed">war zones</span>.
        </div>
        <div>
          Discover <span className="colorGreen">safe places</span> and{" "}
          <span className="colorGreen">ways to flee</span> the danger.
        </div>
      </div>
    </div>
  );
};
