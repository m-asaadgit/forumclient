import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import ProtectedRoute from "./auth/ProtectedRoute"; // Import the ProtectedRoute component
import Admin from "./pages/Admin";
import DetailFiller from "./pages/DetailFiller";
import Unapproved from "./pages/Unapproved";
import Approved from "./pages/Approved";
import LandingPage from "./pages/LandingPage";
// import About from "./pages/About";
import Contact from "./pages/Contact";
import Loader from "./components/Loader";
import MessegePage from "./pages/MessegePage";
// import PeopleDetails from "./pages/PeopleDetails";
import Indivitual from "./indivitualDetails/Indivitual";
import UpapprovedIndivitualDetails from "./indivitualDetails/UpapprovedIndivitualDetails";
import ApprovedIndivitualDetails from "./indivitualDetails/ApprovedIndivitualDetails";

function Routers() {
  return (
    <div className="">
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="/" element={<Home />} />
        <Route path="/info/:id" element={<Indivitual />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/ld" element={<Loader />} />
        <Route
          path="/query-Messege"
          element={
            <ProtectedRoute>
              <MessegePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/fill-form"
          element={<DetailFiller></DetailFiller>}
        ></Route>
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />{" "}
        <Route
          path="/unapproved"
          element={
            <ProtectedRoute>
              <Unapproved />
            </ProtectedRoute>
          }
        />{" "}
        <Route
          path="/approved"
          element={
            <ProtectedRoute>
              <Approved />
            </ProtectedRoute>
          }
        />{" "}
        <Route
          path="/landingPage"
          element={
            <ProtectedRoute>
              <LandingPage />
            </ProtectedRoute>
          }
        />{" "}
        <Route
          path="/unapproved/:id"
          element={
            <ProtectedRoute>
              <UpapprovedIndivitualDetails />
            </ProtectedRoute>
          }
        />{" "}
        <Route
          path="/approved/:id"
          element={
            <ProtectedRoute>
              <ApprovedIndivitualDetails />
            </ProtectedRoute>
          }
        />{" "}
        {/* <Route
          path="/ImagePage"
          element={
            <ProtectedRoute>
              <ImagePage />
            </ProtectedRoute>
          }
        /> */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default Routers;
