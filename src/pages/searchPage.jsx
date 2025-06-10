import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAll } from "../services/cardsService";
import BusinessCard from "../components/businessCard";
import PageHeader from "../components/common/pageHeader";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchPage() {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const query = useQuery();
  const searchTerm = query.get("q") || "";

  useEffect(() => {
    async function fetchCards() {
      try {
        const { data } = await getAll();
        setCards(data);
      } catch (error) {
        console.error("Error fetching cards", error);
      }
    }
    fetchCards();
  }, []);

  useEffect(() => {
    const filtered = cards.filter((card) =>
      card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCards(filtered);
  }, [cards, searchTerm]);

  return (
    <div className="container py-4">
      <PageHeader title={`תוצאות חיפוש עבור: "${searchTerm}"`} />
      {filteredCards.length === 0 ? (
        <p>לא נמצאו תוצאות</p>
      ) : (
        <div className="row g-4">
          {filteredCards.map((card) => (
            <div className="col-md-4" key={card.id}>
              <BusinessCard card={card} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
