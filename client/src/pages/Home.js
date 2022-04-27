export const Home = () => {
  return (
    <div className="homeContainer">
      {true ? (
        <div className="homeText">
          <div>
            Welcome to <span className="colorRed">WarScape</span>.
          </div>
          <div>
            <span className="colorGreen">Online</span> War Assistant
          </div>
        </div>
      ) : (
        <div className="homeText">
          <div>
            Web Assistant for <span className="colorRed">war zones</span>.
          </div>
          <div>
            Discover <span className="colorGreen">safe places</span> and{" "}
            <span className="colorGreen">ways to flee</span> the danger.
          </div>
        </div>
      )}
    </div>
  );
};
