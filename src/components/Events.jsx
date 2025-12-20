import { useState, useEffect } from 'react';
import { getallEvents } from '../service/api';
import Event from './Event';
import '../css/Events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await getallEvents();
      setEvents(response.data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des événements');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEventDeleted = () => {
    fetchEvents(); // Recharger la liste après suppression
  };

  if (loading) {
    return <div className="loading">Chargement des événements...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }
 const getImagePath = (imgPath) => {
    if (imgPath.startsWith('src/')) {
      return `/${imgPath}`;
    }
    return `/src/assets/${imgPath}`;
  };
  return (
    <div className="events-container">
      <h1>Liste des Événements</h1>
      {events.length === 0 ? (
        <p className="no-events">Aucun événement disponible</p>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <Event
              key={event.id}
              event={event}
              onEventDeleted={handleEventDeleted}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;