import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteEvent } from '../service/api';
import '../css/Event.css';

const Event = ({ event, onEventDeleted }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const handleDelete = async () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'événement "${event.name}" ?`)) {
      try {
        await deleteEvent(event.id);
        alert('Événement supprimé avec succès');
        if (onEventDeleted) {
          onEventDeleted();
        }
      } catch (error) {
        alert('Erreur lors de la suppression de l\'événement');
        console.error(error);
      }
    }
  };

  const handleUpdate = () => {
    navigate(`/update-event/${event.id}`);
  };

  const handleImageError = (e) => {
    if (!imageError) {
      setImageError(true);
    }
  };

  return (
    <div className="event-card">
      <div className="event-image-container">
        {imageError ? (
          <div className="event-image-placeholder">
            <span>🎉</span>
          </div>
        ) : (
          <img
            src={`/${event.img}`}
            alt={event.name}
            className="event-image"
            onError={handleImageError}
          />
        )}
        <div className="event-price-badge">{event.price} TND</div>
      </div>

      <div className="event-content">
        <h3 className="event-title">{event.name}</h3>
        <p className="event-description">{event.description}</p>

        <div className="event-info">
          <div className="info-item">
            <span className="info-icon">🎟️</span>
            <span>{event.nbTickets} tickets</span>
          </div>
          <div className="info-item">
            <span className="info-icon">👥</span>
            <span>{event.nbParticipants} participants</span>
          </div>
        </div>

        <div className="event-actions">
          <Link to={`/events/${event.id}`} className="btn btn-details">
            Détails
          </Link>
          <button onClick={handleUpdate} className="btn btn-update">
            Update
          </button>
          <button onClick={handleDelete} className="btn btn-delete">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Event;