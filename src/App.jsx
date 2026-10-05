import { Routes, Route } from "react-router-dom";
import Home from "./user/pages/Home";
import Contact from "./user/pages/Contact";
import Books from "./user/pages/Books";
import Auth from "./pages/Auth";


import Profile from "./user/pages/Profile"; 
import View from "./user/pages/View";


import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminResources from "./admin/pages/AdminResources";
import AdminSetiings from "./admin/pages/AdminSetiings";

import Pnf from "./pages/Pnf";
import Footer from "./components/Footer";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/books" element={<Books />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth insideRegister={true}/>} />

        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/books/:id" element={<View />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/resources" element={<AdminResources />} />
        <Route path="/admin/settings" element={<AdminSetiings />} />

        <Route path="/*" element={<Pnf />} />
       
      </Routes>
       <Footer/>
      
    </>
  );
}

export default App;