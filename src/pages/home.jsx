import { useEffect, useState } from "react";
import { getAll } from "../services/cardsService";
import PageHeader from "../components/common/pageHeader";
import BusinessCard from "../components/businessCard";
import { useAuth } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

function Home({ darkMode }) {
  const [cards, setCards] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCards() {
      try {
        const { data } = await getAll();
        setCards(data.slice(0, 6));
      } catch (err) {
        console.error("Error fetching cards", err);
      }
    }
    fetchCards();
  }, []);

  return (
    <div className="container py-4">
      <PageHeader
        title="Digital Business Cards Made Simple"
        description="Create, manage and share your business cards online in seconds."
      />

      {!user && (
        <div className="alert alert-info text-center">
          <strong>Join now</strong> to create and manage your own digital business cards.
        </div>
      )}

      {(user?.biz || user?.role === "admin") && (
        <div className="text-end mb-3">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/create-card")}
          >
            ➕ Add New Card
          </button>
        </div>
      )}

      <div className="row g-4">
        {cards.map((card) => (
          <div key={card.id || card.id} className="col-12 col-sm-6 col-md-4">
            <BusinessCard card={card} darkMode={darkMode} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
