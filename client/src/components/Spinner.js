import { SpinnerCircular } from "spinners-react";

export const Spinner = () => {
  return (
    <SpinnerCircular
      color="#dd7f73"
      secondaryColor="white"
      enabled={true}
      size={150}
      style={{ marginTop: "35vh" }}
    />
  );
};
