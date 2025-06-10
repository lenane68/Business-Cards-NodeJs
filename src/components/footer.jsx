import { NavLink } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import { BsInfoCircle, BsHeart, BsPerson } from "react-icons/bs";

function Footer({ darkMode }) {
  const { user } = useAuth();

  return (
    <footer
      className={`border-top fixed-bottom py-2 ${
        darkMode ? "bg-dark text-white" : "bg-light text-dark"
      }`}
    >
      <div className="container d-flex justify-content-around text-center">
        <NavLink
          to="/about"
          className={`text-decoration-none ${darkMode ? "text-white" : "text-muted"}`}
        >
          <BsInfoCircle size={24} />
          <div>About</div>
        </NavLink>

        {user && (
          <NavLink
            to="/favorites"
            className={`text-decoration-none ${darkMode ? "text-white" : "text-muted"}`}
          >
            <BsHeart size={24} />
            <div>Favorites</div>
          </NavLink>
        )}

        {(user?.biz || user?.role === "admin") && (
          <NavLink
            to="/my-cards"
            className={`text-decoration-none ${darkMode ? "text-white" : "text-muted"}`}
          >
            <BsPerson size={24} />
            <div>My Cards</div>
          </NavLink>
        )}
      </div>
    </footer>
  );
}

export default Footer;