import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Book, LogOut, LayoutDashboard, Heart, Sun, Moon } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="glass-card" style={{ 
            padding: '0.8rem 3rem', 
            margin: '0', 
            position: 'sticky', 
            top: '0', 
            zIndex: 1000, 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            background: 'var(--dark)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
            borderRadius: '0'
        }}>
            <Link to="/" className="brand flex-center" style={{ gap: '0.8rem', fontSize: '1.8rem', fontWeight: 800 }}>
                <div style={{ background: 'var(--primary)', color: 'white', padding: '0.5rem', borderRadius: '12px', display: 'flex' }}>
                    <Book size={24} />
                </div>
                <span style={{ color: '#ffffff' }}>GyanSetu</span>
            </Link>

            <div className="flex-center" style={{ gap: '1.2rem' }}>
                <Link to="/" className="nav-link" style={{ fontWeight: 600, color: '#f8fafc', fontSize: '0.85rem' }}>Home</Link>
                <Link to="/about" className="nav-link" style={{ fontWeight: 600, color: '#f8fafc', fontSize: '0.85rem' }}>About Us</Link>
                <Link to="/how-to-help" className="nav-link" style={{ fontWeight: 600, color: '#f8fafc', fontSize: '0.85rem' }}>How to Help</Link>
                <Link to="/requests" className="nav-link" style={{ fontWeight: 600, color: '#f8fafc', fontSize: '0.85rem' }}>Active Requests</Link>
                <Link to="/track" className="nav-link" style={{ fontWeight: 600, color: '#f8fafc', fontSize: '0.85rem' }}>Track Donation</Link>
                <Link to="/impact" className="nav-link" style={{ fontWeight: 600, color: '#f8fafc', fontSize: '0.85rem' }}>Impact Stories</Link>
                <Link to="/faqs" className="nav-link" style={{ fontWeight: 600, color: '#f8fafc', fontSize: '0.85rem' }}>FAQs</Link>
                <Link to="/contact" className="nav-link" style={{ fontWeight: 600, color: '#f8fafc', fontSize: '0.85rem' }}>Contact</Link>
                
                <button 
                    onClick={toggleTheme} 
                    className="flex-center nav-link" 
                    style={{ 
                        background: 'none', 
                        color: '#f8fafc', 
                        padding: '0.3rem', 
                        borderRadius: '50%',
                        transition: 'transform 0.2s',
                        cursor: 'pointer'
                    }}
                    title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
                >
                    {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                </button>

                {user ? (
                    <div className="flex-center" style={{ gap: '1.5rem', marginLeft: '1rem', paddingLeft: '2rem', borderLeft: '1px solid rgba(255, 255, 255, 0.2)' }}>
                        <Link to={`/dashboard/${user.role}`} className="flex-center" style={{ 
                            gap: '0.5rem', 
                            fontWeight: 700, 
                            color: 'white',
                            background: 'rgba(255, 255, 255, 0.1)',
                            padding: '0.6rem 1.2rem',
                            borderRadius: 'var(--radius-sm)'
                        }}>
                            <LayoutDashboard size={18} />
                            Dashboard
                        </Link>
                        <button onClick={handleLogout} className="flex-center" style={{ gap: '0.5rem', color: '#94a3b8', background: 'none', transition: 'color 0.2s' }}>
                            <LogOut size={18} />
                        </button>
                    </div>
                ) : (
                    <div className="flex-center" style={{ gap: '1.5rem' }}>
                        <Link to="/login" style={{ fontWeight: 700, color: '#f8fafc' }}>Sign In</Link>
                        <Link to="/register" className="btn-primary" style={{ padding: '0.8rem 1.5rem', boxShadow: '0 10px 15px -3px rgba(74, 123, 176, 0.3)' }}>
                            <Heart size={18} />
                            Get Started
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
