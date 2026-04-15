import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Book, LogOut, User as UserIcon, LayoutDashboard, Heart } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="glass-card" style={{ 
            padding: '0.8rem 3rem', 
            margin: '1rem 2rem', 
            position: 'sticky', 
            top: '1rem', 
            zIndex: 1000, 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
        }}>
            <Link to="/" className="brand flex-center" style={{ gap: '0.8rem', fontSize: '1.8rem', fontWeight: 800 }}>
                <div style={{ background: 'var(--primary)', color: 'white', padding: '0.5rem', borderRadius: '12px', display: 'flex' }}>
                    <Book size={24} />
                </div>
                <span className="text-gradient">GyanSetu</span>
            </Link>

            <div className="flex-center" style={{ gap: '2.5rem' }}>
                <Link to="/" className="nav-link" style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.95rem' }}>Home</Link>
                <Link to="/requests" className="nav-link" style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.95rem' }}>Active Requests</Link>
                
                {user ? (
                    <div className="flex-center" style={{ gap: '1.5rem', marginLeft: '1rem', paddingLeft: '2rem', borderLeft: '1px solid #e2e8f0' }}>
                        <Link to={`/dashboard/${user.role}`} className="flex-center" style={{ 
                            gap: '0.5rem', 
                            fontWeight: 700, 
                            color: 'var(--primary)',
                            background: 'rgba(37, 99, 235, 0.05)',
                            padding: '0.6rem 1.2rem',
                            borderRadius: 'var(--radius-sm)'
                        }}>
                            <LayoutDashboard size={18} />
                            Dashboard
                        </Link>
                        <button onClick={handleLogout} className="flex-center" style={{ gap: '0.5rem', color: '#94a3b8', fontWeight: 600, background: 'none', transition: 'color 0.2s' }}>
                            <LogOut size={18} />
                        </button>
                    </div>
                ) : (
                    <div className="flex-center" style={{ gap: '1.5rem' }}>
                        <Link to="/login" style={{ fontWeight: 700, color: 'var(--text-main)' }}>Sign In</Link>
                        <Link to="/register" className="btn-primary" style={{ padding: '0.8rem 1.5rem', boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3)' }}>
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
