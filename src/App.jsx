import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import './index.css'

import LoginPage from './pages/login'
import ServiceContactPage from './pages/ServiceContact'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import PortfolioPage from './pages/PortfolioPage'
import ServicesPage from './pages/ServicesPage'
import ServiceDetailWebPage from './pages/ServiceDetailWebDev'
import ProtectedRoute from './pages/security'

// --- Admin Imports ---
import AdminLayout from './layouts/AdminLayout'
import AdminPortfolioList from './pages/admin/AdminPortfolioList'
import AdminPortfolioForm from './pages/admin/AdminPortfolioForm'
import AdminUsers from './pages/admin/UserManagement'

import AdminAddService from './pages/admin/services/AdminAddService'
import AdminServicesList from './pages/admin/services/AdminServicesList'

import AdminInquiries from './pages/admin/AdminInquiries'
import AdminEditService from './pages/admin/services/AdminEditService'
import AdminMedia from './pages/admin/AdminMedia'

import AdminServicePlansList from "./pages/admin/services/AdminServicePlansList";
import AdminServicePlansForm from "./pages/admin/services/AdminServicePlansForm";
import OAuthSuccess from './pages/OAuthSuccess'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>

        {/* ---------------- PUBLIC ROUTES ---------------- */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/services/consultation" element={<ServiceContactPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetailWebPage />} />

        {/* ---------------- ADMIN ROUTES (PROTECTED) ---------------- */}

        <Route path="/oauth-success" element={<OAuthSuccess />} />
        <Route
          path="/admin/portfolio"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminPortfolioList />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/portfolio/create"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminPortfolioForm />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/portfolio/edit/:id"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminPortfolioForm isEdit />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/services"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminServicesList />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/services/add"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminAddService />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/services/edit/:id"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminEditService />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/inquiries"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminInquiries />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminUsers />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/media"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminMedia />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/services/:serviceId/plans"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminServicePlansList />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/services/:serviceId/plans/add"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminServicePlansForm />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/services/:serviceId/plans/edit/:planId"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminServicePlansForm />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

      </Routes>
    </>
  )
}
