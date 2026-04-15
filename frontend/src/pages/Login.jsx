import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, LogIn } from 'lucide-react';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await login(formData.email, formData.password);
            navigate(`/dashboard/${user.role}`);
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="flex-center" style={{ minHeight: '85vh', position: 'relative' }}>
            {/* Background blobs */}
            <div style={{ position: 'absolute', top: '15%', left: '20%', width: '300px', height: '300px', background: 'var(--primary)', filter: 'blur(120px)', opacity: 0.1, zIndex: -1 }}></div>
            <div style={{ position: 'absolute', bottom: '15%', right: '20%', width: '300px', height: '300px', background: 'var(--secondary)', filter: 'blur(120px)', opacity: 0.1, zIndex: -1 }}></div>

            <div className="glass-card animate-fade-up" style={{ width: '100%', maxWidth: '480px', padding: '3rem', border: '1px solid var(--glass-border)' }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Welcome <span className="text-gradient">Back</span></h2>
                    <p style={{ color: 'var(--text-muted)' }}>Enter your credentials to access your account</p>
                </div>
                
                {error && (
                    <div style={{ 
                        color: '#ef4444', 
                        background: 'rgba(239, 68, 68, 0.1)', 
                        padding: '1rem', 
                        borderRadius: 'var(--radius-sm)', 
                        marginBottom: '1.5rem', 
                        fontSize: '0.9rem',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444' }}></div>
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.8rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-main)' }}>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input 
                                type="email" 
                                required 
                                className="glass-card" 
                                style={{ 
                                    width: '100%', 
                                    padding: '1rem 1rem 1rem 3.5rem', 
                                    background: 'white',
                                    fontSize: '1rem',
                                    border: '1px solid #e2e8f0',
                                    transition: 'border-color 0.2s'
                                }} 
                                placeholder="name@company.com"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                            <label style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-main)' }}>Password</label>
                            <span style={{ fontSize: '0.8rem', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }}>Forgot password?</span>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input 
                                type="password" 
                                required 
                                className="glass-card" 
                                style={{ 
                                    width: '100%', 
                                    padding: '1rem 1rem 1rem 3.5rem', 
                                    background: 'white',
                                    fontSize: '1rem',
                                    border: '1px solid #e2e8f0'
                                }} 
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn-primary" style={{ 
                        width: '100%', 
                        justifyContent: 'center', 
                        padding: '1.2rem', 
                        fontSize: '1.1rem',
                        boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.4)'
                    }}>
                        <LogIn size={20} />
                        Sign In to Account
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                    New to GyanSetu? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 700 }}>Create an account</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
