/**
 * Composant principal de l'application admin
 * Gestion des routes et de l'authentification
 */

import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ProjectsList from './pages/Projects/ProjectsList'
import ProjectForm from './pages/Projects/ProjectForm'
import TechnologiesList from './pages/Technologies/TechnologiesList'
import TestimonialsList from './pages/Testimonials/TestimonialsList'
import ContactsList from './pages/Contacts/ContactsList'
import AdminLayout from './components/layout/AdminLayout'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<ProjectsList />} />
          <Route path="/projects/new" element={<ProjectForm />} />
          <Route path="/projects/:id/edit" element={<ProjectForm />} />
          <Route path="/technologies" element={<TechnologiesList />} />
          <Route path="/testimonials" element={<TestimonialsList />} />
          <Route path="/contacts" element={<ContactsList />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
