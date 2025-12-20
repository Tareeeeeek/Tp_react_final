import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getallEvents, editEvent } from '../service/api';
import '../css/UpdateEvent.css';

const UpdateEvent = () => {
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const response = await getallEvents(id);
      setFormData(response.data);
    } catch (error) {
      alert('Erreur lors du chargement de l\'événement');
      navigate('/events');
    } finally {
      setLoading(false);
    }
  };

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
      setSubmitting(true);
      await editEvent(id, eventData);
      alert('Événement modifié avec succès!');
      navigate('/events');
    } catch (error) {
      alert('Erreur lors de la modification de l\'événement');
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  return (
    <div className="update-event-container">
      <h1>Modifier l'Événement</h1>
      
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
            disabled={submitting}
          >
            {submitting ? 'Modification en cours...' : 'Modifier'}
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigate('/events')}
            disabled={submitting}
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateEvent;