import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getAll } from "../services/cardsService";
import PageHeader from "../components/common/pageHeader";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/favorites.context";


function CardDetails() {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();


  useEffect(() => {
    async function fetchCard() {
      const { data } = await getAll();
      const found = data.find((c) => c._id === id || c.id === id);
      setCard(found);
    }
    fetchCard();
  }, [id]);

  if (!card) return <p className="text-center mt-5">Loading...</p>;

  const address = `${card.street} ${card.houseNumber}, ${card.city}, ${card.country}`;

  return (
    <div className="container py-4">
      <PageHeader title={card.title} description={card.subtitle} />
      <div className="d-flex justify-content-between align-items-center my-3">
  <button
    className="btn btn-outline-secondary"
    onClick={() => navigate(-1)}
  >
    ← Back
  </button>

  <button
    className={`btn ${isFavorite(card.id) ? "btn-danger" : "btn-outline-danger"}`}
    onClick={() => toggleFavorite(card.id)}
  >
    {isFavorite(card.id) ? "💖 Remove from Favorites" : "🤍 Add to Favorites"}
  </button>
</div>
      

      <div className="row g-4 mt-3">
        {/* Image + Info */}
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <img
              src={card.image}
              alt={card.alt || card.title}
              className="card-img-top"
              style={{ height: "250px", objectFit: "cover" }}
            />
            <div className="card-body">
              <p><strong>Description:</strong> {card.description}</p>
              <p><strong>Phone:</strong> {card.phone}</p>
              <p><strong>Email:</strong> <a href={`mailto:${card.email}`}>{card.email}</a></p>
              {card.web && (
                <p><strong>Website:</strong> <a href={card.web} target="_blank" rel="noreferrer">{card.web}</a></p>
              )}
              <p><strong>Address:</strong> {address}</p>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-header">
              <strong>Location Map</strong>
            </div>
            <div className="card-body p-0">
              <iframe
                title="Map"
                width="100%"
                height="350"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

      </div>


    </div>
  );
}

export default CardDetails;
