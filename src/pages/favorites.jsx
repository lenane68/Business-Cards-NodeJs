import { useEffect, useState } from "react";
import { getAll } from "../services/cardsService";
import BusinessCard from "../components/businessCard";
import PageHeader from "../components/common/pageHeader";
import { useFavorites } from "../context/favorites.context";

function Favorites({ darkMode }) {
  const [cards, setCards] = useState([]);
  const { favorites } = useFavorites();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await getAll();
        const filtered = data.filter((card) => favorites.includes(card.id));
        setCards(filtered);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [favorites]);

  return (
    <div className="container py-4">
      <PageHeader title="Favorite Cards" description="Your saved favorite cards" />
      {cards.length === 0 ? (
        <p className="text-center">No favorites yet.</p>
      ) : (
        <div className="row g-4">
          {cards.map((card) => (
            <div key={card.id} className="col-12 col-sm-6 col-md-4">
              <BusinessCard card={card} darkMode={darkMode}/>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
