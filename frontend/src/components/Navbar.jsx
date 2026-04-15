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
        <nav className="glass-card" style={{ padding: '1rem 2rem', margin: '1rem', position: 'sticky', top: '1rem', zIndex: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to="/" className="brand flex-center" style={{ gap: '0.5rem', fontSize: '1.5rem', color: 'var(--primary)' }}>
                <Book size={32} />
                <span>GyanSetu</span>
            </Link>

            <div className="flex-center" style={{ gap: '2rem' }}>
                <Link to="/" style={{ fontWeight: 500 }}>Home</Link>
                <Link to="/requests" style={{ fontWeight: 500 }}>Requests</Link>
                
                {user ? (
                    <>
                        <Link to={`/dashboard/${user.role}`} className="flex-center" style={{ gap: '0.5rem', fontWeight: 600 }}>
                            <LayoutDashboard size={18} />
                            Dashboard
                        </Link>
                        <button onClick={handleLogout} className="flex-center" style={{ gap: '0.5rem', color: '#ef4444', fontWeight: 600, background: 'none' }}>
                            <LogOut size={18} />
                            Logout
                        </button>
                    </>
                ) : (
                    <div className="flex-center" style={{ gap: '1rem' }}>
                        <Link to="/login" style={{ fontWeight: 600 }}>Login</Link>
                        <Link to="/register" className="btn-primary">
                            <Heart size={18} />
                            Join Us
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
