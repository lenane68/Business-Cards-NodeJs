import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "./logo";
import { useAuth } from "../context/auth.context";
import { useState } from "react";
import { BsMoon, BsSun, BsPersonCircle } from "react-icons/bs";

function NavBar({ darkMode, setDarkMode }) {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav
      className={`navbar navbar-expand-md shadow-sm ${
        darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"
      }`}
      aria-label="Main navigation"
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          <Logo />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample04"
          aria-controls="navbarsExample04"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarsExample04">
          <div className="d-md-flex justify-content-between align-items-center w-100">
            <ul className="navbar-nav mb-2 mb-md-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  ABOUT
                </NavLink>
              </li>

              {user && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/favorites">
                    FAV CARDS
                  </NavLink>
                </li>
              )}

              {(user?.biz || user?.role === "admin") && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/my-cards">
                    MY CARDS
                  </NavLink>
                </li>
              )}

{user?.role === "admin" && (
  <li className="nav-item">
    <NavLink className="nav-link" to="/crm">
      CRM
    </NavLink>
  </li>
)}

            </ul>

            <ul className="navbar-nav mb-2 mb-md-0 align-items-center">
              <li className="nav-item">
                <form
                  className="d-flex align-items-center"
                  onSubmit={(e) => {
                    e.preventDefault();
                    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
                  }}
                >
                  <div className="input-group">
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Search"
                      aria-label="Search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <span className="input-group-text bg-white border-start-0">
                      <i className="bi bi-search"></i>
                    </span>
                  </div>
                </form>
              </li>

              <li className="nav-item">
                <button
                  className="btn btn-link text-decoration-none ms-2"
                  onClick={() => setDarkMode(!darkMode)}
                >
                  {darkMode ? <BsSun size={20} /> : <BsMoon size={20} />}
                </button>
              </li>

              {user ? (
                <li className="nav-item dropdown">
                  <button
                    className="btn nav-link dropdown-toggle border-0 bg-transparent"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    {user.image ? (
                      <img
                        src={user.image}
                        alt="Profile"
                        className="rounded-circle"
                        width="32"
                        height="32"
                      />
                    ) : (
                      <BsPersonCircle size={28} />
                    )}
                  </button>
                  {dropdownOpen && (
  <ul
    className={`dropdown-menu dropdown-menu-end show shadow ${
      darkMode ? "bg-dark text-white" : "bg-light text-dark"
    }`}
    style={{ right: 0, left: "auto" }}
  >
    <li>
      <NavLink
        className={`dropdown-item ${darkMode ? "text-white" : "text-dark"}`}
        to="/profile"
        onClick={() => setDropdownOpen(false)}
      >
        Update Profile
      </NavLink>
    </li>
    <li>
      <NavLink
        className={`dropdown-item ${darkMode ? "text-white" : "text-dark"}`}
        to="/sign-out"
        onClick={() => setDropdownOpen(false)}
      >
        Sign Out
      </NavLink>
    </li>
  </ul>
)}
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/sign-up">
                      SIGNUP
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/sign-in">
                      LOGIN
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
