import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DonorDashboard from './pages/DonorDashboard';
import NGODashboard from './pages/NGODashboard';
import AdminDashboard from './pages/AdminDashboard';
import RequestsPage from './pages/RequestsPage';
import About from './pages/About';
import HowToHelp from './pages/HowToHelp';
import Impact from './pages/Impact';
import FAQs from './pages/FAQs';
import Contact from './pages/Contact';
import Tracking from './pages/Tracking';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app home-bg">
          <Navbar />
          <main className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/how-to-help" element={<HowToHelp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/requests" element={<RequestsPage />} />
              <Route path="/impact" element={<Impact />} />
              <Route path="/faqs" element={<FAQs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/track" element={<Tracking />} />
              <Route path="/track/:id" element={<Tracking />} />
              
              <Route 
                path="/dashboard/donor" 
                element={
                  <ProtectedRoute roles={['donor']}>
                    <DonorDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/ngo" 
                element={
                  <ProtectedRoute roles={['ngo']}>
                    <NGODashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/admin" 
                element={
                  <ProtectedRoute roles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
