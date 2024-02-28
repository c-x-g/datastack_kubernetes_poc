// import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CallAPI from "./component/CallAPI.tsx";
import CallTable from "./component/CallTable.tsx";
import NavBar from "./component/Navbar.tsx";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        {/* by default the page shown should be from the root path "/" */}
        <Route path="/" element={<CallAPI />} />
        <Route path="/table" element={<CallTable />} />
      </Routes>
    </Router>
  );
}

export default App;
