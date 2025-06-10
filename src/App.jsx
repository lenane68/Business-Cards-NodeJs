import "./App.css";

import { Route, Routes } from "react-router";

import Footer from "./components/footer";
import NavBar from "./components/navbar";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import UpdateProfile from "./pages/updateProfile";
import Crm from "./pages/crm"; 


import Home from "./pages/home";
import About from "./pages/about";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import SignOut from "./pages/signOut";
import MyCards from "./pages/myCards";
import CardCreate from "./pages/cardCreate";
import CardUpdate from "./pages/cardUpdate";
import CardDelete from "./pages/cardDelete";
import ProtectedRoute from "./components/common/protectedRoute";
import Favorites from "./pages/favorites";
import SearchPage from "./pages/searchPage";
import CardDetails from "./pages/cardDetails";

import { useState } from "react";


function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    
    <div className={darkMode ? "bg-dark text-white min-vh-100" : "bg-white text-dark min-vh-100"}>
    <div className="min-vh-100 d-flex flex-column">
      <header>
      <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />

      </header>
      <main className="flex-fill pb-5">
      <ToastContainer position="top-center" />
        <Routes>
        <Route path="/" element={<Home darkMode={darkMode} />} />

          <Route path="/about" element={<About />} />
          <Route
            path="/my-cards"
            element={
              <ProtectedRoute onlyBiz>
                <MyCards darkMode={darkMode}/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-card"
            element={
              <ProtectedRoute onlyBiz>
                <CardCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-cards/edit/:id"
            element={
              <ProtectedRoute onlyBiz>
                <CardUpdate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-cards/delete/:id"
            element={
              <ProtectedRoute onlyBiz>
                <CardDelete />
              </ProtectedRoute>
            }
          />
  <Route
  path="/favorites"
  element={
    <ProtectedRoute>
      <Favorites darkMode={darkMode} />
    </ProtectedRoute>
  }
/>

          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-out" element={<SignOut />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/cards/:id" element={<CardDetails />} />
          <Route path="/profile" element={<UpdateProfile />} />
          <Route path="/crm" element={<ProtectedRoute requiredRole="admin"> <Crm />
    </ProtectedRoute>
  }
/>

        </Routes>
      </main>
      <Footer darkMode={darkMode} />
    </div>
    </div>
  );
}

export default App;