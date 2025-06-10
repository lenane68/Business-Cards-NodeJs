import {
  BsTelephone,
  BsTrash,
  BsPencil,
  BsHeart,
  BsHeartFill,
} from "react-icons/bs";
import { useAuth } from "../context/auth.context";
import { useFavorites } from "../context/favorites.context";
import { useNavigate, Link } from "react-router-dom";

function BusinessCard({ card, onDelete = () => {}, darkMode }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const canEditOrDelete =
    (user?.biz && user._id === card.user_id) || user?.role === "admin";

  const handleEdit = () => {
    navigate(`/my-cards/edit/${card.id}`);
  };

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(card.id);
  };

  return (
    <div
      className={`card h-100 shadow-sm ${darkMode ? "bg-dark text-white" : "bg-light text-dark"}`}
      style={{ maxWidth: "100%", minHeight: "380px", cursor: "pointer" }}
    >
      <Link
        to={`/cards/${card.id}`}
        className="text-decoration-none text-reset"
        style={{ textDecoration: "none" }}
      >
        <img
          src={card.image}
          className="card-img-top"
          alt={card.alt}
          style={{ height: "150px", objectFit: "cover" }}
        />
        <div className="card-body d-flex flex-column justify-content-between p-3">
          <div>
            <h6 className="card-title mb-1 d-flex justify-content-between align-items-center">
              {card.title}
              <button
                type="button"
                className="btn btn-sm p-0"
                onClick={handleFavoriteClick}
              >
                {isFavorite(card.id) ? (
                  <BsHeartFill className="text-danger favorite-icon" />
                ) : (
                  <BsHeart className="favorite-icon" />
                )}
              </button>
            </h6>
            <p className="card-subtitle text-muted small mb-2">
              {card.subtitle}
            </p>
            <p className="mb-1" style={{ fontSize: "0.85rem" }}>
              <strong>Phone:</strong> {card.phone}
            </p>
            <p className="mb-1" style={{ fontSize: "0.85rem" }}>
              <strong>Address:</strong> {card.street} {card.houseNumber}, {card.city}
            </p>
          </div>
        </div>
      </Link>
      <div className="card-footer bg-transparent border-0 d-flex justify-content-between align-items-center mt-auto px-3 pb-3">
        <a href={`tel:${card.phone}`} className="btn btn-sm btn-outline-primary">
          <BsTelephone />
        </a>
        {canEditOrDelete && (
          <div className="d-flex gap-2">
            <button className="btn btn-sm btn-outline-warning" onClick={handleEdit}>
              <BsPencil />
            </button>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => onDelete(card.id)}
            >
              <BsTrash />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BusinessCard;
