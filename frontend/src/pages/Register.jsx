import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, MapPin, Phone, UserPlus, Users } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'donor',
        address: '',
        city: '',
        pincode: '',
        phone: ''
    });
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.phone.length !== 10) {
            setError('Phone number must be exactly 10 digits');
            return;
        }
        if (formData.password.length < 5) {
            setError('Password must be at least 5 characters');
            return;
        }
        setError('');
        try {
            const user = await register(formData);
            navigate(`/dashboard/${user.role}`);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="flex-center" style={{ minHeight: '100vh', padding: '4rem 0', position: 'relative', overflow: 'hidden' }}>
            {/* Background decorative elements */}
            <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '500px', height: '500px', background: 'var(--primary)', filter: 'blur(150px)', opacity: 0.05, zIndex: -1 }}></div>
            <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '500px', height: '500px', background: 'var(--secondary)', filter: 'blur(150px)', opacity: 0.05, zIndex: -1 }}></div>

            <div className="glass-card animate-fade-up" style={{ width: '100%', maxWidth: '750px', padding: '4rem', border: '1px solid var(--glass-border)' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '3rem', marginBottom: '0.8rem' }}>Create <span className="text-gradient">Account</span></h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Join the community and start making an impact in rural education.</p>
                </div>
                
                {error && (
                    <div style={{ 
                        color: '#ef4444', 
                        background: 'rgba(239, 68, 68, 0.1)', 
                        padding: '1rem', 
                        borderRadius: 'var(--radius-sm)', 
                        marginBottom: '2rem', 
                        fontSize: '0.9rem',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        textAlign: 'center'
                    }}>{error}</div>
                )}
                
                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div style={{ gridColumn: 'span 2' }}>
                        <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)' }}>Choose Your Role</label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div 
                                onClick={() => setFormData({...formData, role: 'donor'})}
                                style={{ 
                                    padding: '1.5rem', 
                                    borderRadius: 'var(--radius-md)', 
                                    border: `2px solid ${formData.role === 'donor' ? 'var(--primary)' : '#e2e8f0'}`,
                                    background: formData.role === 'donor' ? 'rgba(37, 99, 235, 0.03)' : 'white',
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <Users size={24} color={formData.role === 'donor' ? 'var(--primary)' : 'var(--text-muted)'} style={{ marginBottom: '0.5rem' }} />
                                <div style={{ fontWeight: 700, color: formData.role === 'donor' ? 'var(--primary)' : 'var(--text-main)' }}>Donating Books</div>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>I want to share knowledge</p>
                            </div>
                            <div 
                                onClick={() => setFormData({...formData, role: 'ngo'})}
                                style={{ 
                                    padding: '1.5rem', 
                                    borderRadius: 'var(--radius-md)', 
                                    border: `2px solid ${formData.role === 'ngo' ? 'var(--primary)' : '#e2e8f0'}`,
                                    background: formData.role === 'ngo' ? 'rgba(37, 99, 235, 0.03)' : 'white',
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <MapPin size={24} color={formData.role === 'ngo' ? 'var(--primary)' : 'var(--text-muted)'} style={{ marginBottom: '0.5rem' }} />
                                <div style={{ fontWeight: 700, color: formData.role === 'ngo' ? 'var(--primary)' : 'var(--text-main)' }}>NGO / Rural School</div>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>I need books for my community</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ gridColumn: 'span 2' }}>
                        <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 600 }}>Full Name</label>
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input 
                                type="text" 
                                required 
                                className="glass-card" 
                                style={{ width: '100%', padding: '1rem 1rem 1rem 3.5rem', background: 'white', border: '1px solid #e2e8f0' }} 
                                placeholder="E.g. Omkar Borude"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                    </div>

                    <div style={{ gridColumn: 'span 1' }}>
                        <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 600 }}>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input 
                                type="email" 
                                required 
                                className="glass-card" 
                                style={{ width: '100%', padding: '1rem 1rem 1rem 3.5rem', background: 'white', border: '1px solid #e2e8f0' }} 
                                placeholder="name@email.com"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                        </div>
                    </div>

                    <div style={{ gridColumn: 'span 1' }}>
                        <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 600 }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input 
                                type="password" 
                                required 
                                minLength={5}
                                className="glass-card" 
                                style={{ width: '100%', padding: '1rem 1rem 1rem 3.5rem', background: 'white', border: '1px solid #e2e8f0' }} 
                                placeholder="Min 5 characters"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                            />
                        </div>
                    </div>

                    <div style={{ gridColumn: 'span 1' }}>
                        <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 600 }}>Phone Number</label>
                        <div style={{ position: 'relative' }}>
                            <Phone size={18} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input 
                                type="tel" 
                                required 
                                maxLength={10}
                                className="glass-card" 
                                style={{ width: '100%', padding: '1rem 1rem 1rem 3.5rem', background: 'white', border: '1px solid #e2e8f0' }} 
                                placeholder="10-digit number"
                                value={formData.phone}
                                onChange={(e) => {
                                    const val = e.target.value.replace(/\D/g, '');
                                    setFormData({...formData, phone: val});
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ gridColumn: 'span 1' }}>
                        <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 600 }}>Pickup/Drop Location</label>
                        <div style={{ position: 'relative' }}>
                            <MapPin size={18} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input 
                                type="text" 
                                required 
                                className="glass-card" 
                                style={{ width: '100%', padding: '1rem 1rem 1rem 3.5rem', background: 'white', border: '1px solid #e2e8f0' }} 
                                placeholder="Street, landmark"
                                value={formData.address}
                                onChange={(e) => setFormData({...formData, address: e.target.value})}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 600 }}>City</label>
                        <input 
                            type="text" 
                            required 
                            className="glass-card" 
                            style={{ width: '100%', padding: '1rem', background: 'white', border: '1px solid #e2e8f0' }} 
                            placeholder="Your City"
                            value={formData.city}
                            onChange={(e) => setFormData({...formData, city: e.target.value})}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 600 }}>Pincode</label>
                        <input 
                            type="text" 
                            required 
                            className="glass-card" 
                            style={{ width: '100%', padding: '1rem', background: 'white', border: '1px solid #e2e8f0' }} 
                            placeholder="6-digit ZIP"
                            value={formData.pincode}
                            onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                        />
                    </div>

                    <button type="submit" className="btn-primary" style={{ 
                        gridColumn: 'span 2', 
                        justifyContent: 'center', 
                        padding: '1.2rem', 
                        fontSize: '1.2rem',
                        marginTop: '1rem',
                        boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.4)'
                    }}>
                        <UserPlus size={22} />
                        Complete Registration
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '2.5rem', color: 'var(--text-muted)' }}>
                    Already part of our network? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 700 }}>Sign in here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
