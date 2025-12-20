import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addEvent } from '../service/api';
import '../css/AddEvent.css';

const AddEvent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    img: '',
    price: '',
    nbTickets: '',
    nbParticipants: '',
    like: false
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.description || !formData.img) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Convertir les valeurs numériques
    const eventData = {
      ...formData,
      price: Number(formData.price),
      nbTickets: Number(formData.nbTickets),
      nbParticipants: Number(formData.nbParticipants)
    };

    try {
      setLoading(true);
      await addEvent(eventData);
      alert('Événement ajouté avec succès!');
      navigate('/events');
    } catch (error) {
      alert('Erreur lors de l\'ajout de l\'événement');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-event-container">
      <h1>Ajouter un Événement</h1>
      
      <form onSubmit={handleSubmit} className="event-form">
        <div className="form-group">
          <label htmlFor="name">Nom de l'événement *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Ex: Festival international de Carthage"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="5"
            placeholder="Description de l'événement"
          />
        </div>

        <div className="form-group">
          <label htmlFor="img">Nom du fichier image *</label>
          <input
            type="text"
            id="img"
            name="img"
            value={formData.img}
            onChange={handleChange}
            required
            placeholder="Ex: event1.jpg"
          />
          <small>Le fichier doit être placé dans le dossier public/images/</small>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Prix (TND) *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              placeholder="30"
            />
          </div>

          <div className="form-group">
            <label htmlFor="nbTickets">Nombre de tickets *</label>
            <input
              type="number"
              id="nbTickets"
              name="nbTickets"
              value={formData.nbTickets}
              onChange={handleChange}
              required
              min="0"
              placeholder="10"
            />
          </div>

          <div className="form-group">
            <label htmlFor="nbParticipants">Nombre de participants *</label>
            <input
              type="number"
              id="nbParticipants"
              name="nbParticipants"
              value={formData.nbParticipants}
              onChange={handleChange}
              required
              min="0"
              placeholder="10"
            />
          </div>
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="like"
              checked={formData.like}
              onChange={handleChange}
            />
            <span>Événement favori</span>
          </label>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Ajout en cours...' : 'Add Event'}
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigate('/events')}
            disabled={loading}
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEvent;