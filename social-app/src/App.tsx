import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../src/components/Header";
import Profile from "../src/features/userFeature/Profile";
import Register from "../src/features/authFeature/Register";
import Login from "../src/features/authFeature/Login";
import ViewAllUsers from "./features/userFeature/ViewAllUsers";
import ViewSingleUser from "./features/userFeature/ViewSingleUser";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/all" element={<ViewAllUsers />} />
            <Route path="/single" element={<ViewSingleUser />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
