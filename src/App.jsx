import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// Import de vos composants
import Events from './components/Events'
import EventDetails from './components/EventDetails'
import AddEvent from './components/AddEvent'
import UpdateEvent from './components/UpdateEvent'
import { Navbar } from "./components/Navbar"
import { MainBody } from "./components/MainBody"

function App() {
  return (
    <Router>
      <div className="app">
        {/* Header avec navigation */}
        <Navbar />

        {/* Contenu principal avec routes */}
        <MainBody>
          <main className="main-content">
            <Routes>
              {/* Route pour la page d'accueil */}
              <Route
                path="/"
                element={
                  <div className="home-page">
                    <div className="hero-section">
                      <h1 className='title'>Event Manager</h1>
                      <p className="subtitle">
                        Gérez vos événements facilement et efficacement
                      </p>
                    </div>

                    <div className="card">
                      <h2 className="welcome-title">Bienvenue !</h2>
                      <p className="welcome-text">
                        Créez, gérez et suivez tous vos événements en un seul endroit.
                        Une plateforme simple et intuitive pour organiser vos événements.
                      </p>
                      

                      <div className="home-actions">
                        <a href="/events" className="btn btn-primary">
                          📋 Voir les événements
                        </a>
                        <a href="/add-event" className="btn btn-secondary">
                          ➕ Ajouter un événement
                        </a>
                      </div>
                    </div>
                  </div>
                }
              />

              {/* Routes pour les fonctionnalités événements */}
              <Route path="/events" element={<Events />} />
              <Route path="/events/:id" element={<EventDetails />} />
              <Route path="/add-event" element={<AddEvent />} />
              <Route path="/update-event/:id" element={<UpdateEvent />} />

              {/* Redirection par défaut */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </MainBody>

        {/* Footer */}
        <footer className="app-footer">
          <p>&copy; 2025 Event Manager. Tous droits réservés.</p>
        </footer>
      </div>
    </Router>
  )
}

export default App