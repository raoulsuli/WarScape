import { Routes, Route, Navigate } from "react-router-dom";
import { Spinner } from "./components/Spinner";
import { useAuth0 } from "@auth0/auth0-react";
import { Navbar } from "./components/navbar/Navbar";
import { Home } from "./pages/Home";
import { Rentals } from "./pages/Rentals";
import { Borders } from "./pages/Borders";
import { Shelters } from "./pages/Shelters";

const App = () => {
  const { isLoading, isAuthenticated } = useAuth0();

  const privateRoute = (route) =>
    isAuthenticated ? route : <Navigate to="/" replace />;

  return (
    <div className={`${isLoading ? "flex justify-center" : ""}`}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/rentals" element={privateRoute(<Rentals />)} />
            <Route exact path="/borders" element={privateRoute(<Borders />)} />
            <Route
              exact
              path="/shelters"
              element={privateRoute(<Shelters />)}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
