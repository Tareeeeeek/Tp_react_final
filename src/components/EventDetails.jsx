import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getallEvents } from '../service/api';
import '../css/EventDetails.css';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const response = await getallEvents(id);
      setEvent(response.data);
      setError(null);
    } catch (err) {
      setError('Event does not exist');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = (e) => {
    if (!imageError) {
      setImageError(true);
      // Use a data URL or a simple colored div instead of an external placeholder
      e.target.style.display = 'none';
    }
  };

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  if (error || !event) {
    return (
      <div className="error-container">
        <h2>Event does not exist</h2>
        <button onClick={() => navigate('/events')} className="btn btn-back">
          Retour à la liste
        </button>
      </div>
    );
  }

  return (
    <div className="event-details-container">
      <button onClick={() => navigate('/events')} className="btn-back">
        ← Retour
      </button>
      
      <div className="event-details-card">
        <div className="event-details-header">
          {imageError ? (
            <div className="event-image-placeholder">
              <span>🎉</span>
              <p>Image non disponible</p>
            </div>
          ) : (
            <img 
              src={`/images/${event.img}`}
              alt={event.name} 
              className="event-details-image"
              onError={handleImageError}
            />
          )}
          <div className="event-price-large">{event.price} TND</div>
        </div>
        
        <div className="event-details-content">
          <h1 className="event-details-title">{event.name}</h1>
          
          <div className="event-stats">
            <div className="stat-card">
              <div className="stat-icon">🎟️</div>
              <div className="stat-info">
                <span className="stat-label">Tickets disponibles</span>
                <span className="stat-value">{event.nbTickets}</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-info">
                <span className="stat-label">Participants</span>
                <span className="stat-value">{event.nbParticipants}</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">💰</div>
              <div className="stat-info">
                <span className="stat-label">Prix</span>
                <span className="stat-value">{event.price} TND</span>
              </div>
            </div>
          </div>
          
          <div className="event-description-section">
            <h3>Description</h3>
            <p>{event.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;