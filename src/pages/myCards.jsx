import { useEffect, useState } from "react";
import { deleteCard, getAll } from "../services/cardsService";
import { useAuth } from "../context/auth.context";
import BusinessCard from "../components/businessCard";
import PageHeader from "../components/common/pageHeader";
import { useNavigate } from "react-router-dom";


function MyCards({darkMode}) {
  const [cards, setCards] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  


  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await getAll();
        const filteredCards = data.filter((card) => card.userEmail === user.email);
        setCards(filteredCards);
      } catch (error) {
        console.error("Error fetching cards", error);
      }
    }

    fetchData();
  }, [user]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      try {
        await deleteCard(id);
        setCards(cards.filter((card) => card.id !== id));
      } catch (error) {
        console.error("Failed to delete card", error);
      }
    }
  };

  return (
    <div className="container py-4">
      <PageHeader title="My Cards" description="Here you can manage your business cards" />
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
      {cards.length === 0 ? (
        <p className="text-center">No cards found.</p>
      ) : (
        <div className="row g-4">
          {cards.map((card) => (
            <div key={card.id} className="col-12 col-sm-6 col-md-4">
              <BusinessCard card={card} onDelete={handleDelete} darkMode={darkMode} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyCards;
