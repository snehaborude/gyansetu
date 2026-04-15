import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Gift, Users, BookOpen, Globe } from 'lucide-react';

const Home = () => {
    const [stats, setStats] = useState({ totalDonated: 0, totalPending: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get('/donations/stats');
                setStats(res.data);
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="home">
            {/* Hero Section */}
            <header className="hero flex-center" style={{ flexDirection: 'column', textAlign: 'center', padding: '100px 0', gap: '2rem' }}>
                <h1 style={{ fontSize: '4rem', color: 'var(--primary)', marginBottom: '1rem' }} className="animate-fade-up">
                    Ignite Minds, <br />Donate Books.
                </h1>
                <p style={{ fontSize: '1.2rem', maxWidth: '600px', color: 'var(--text-muted)' }} className="animate-fade-up">
                    GyanSetu connects generous donors with rural schools and NGOs to ensure every child has access to the world of knowledge.
                </p>
                <div className="flex-center animate-fade-up" style={{ gap: '1.5rem', marginTop: '1rem' }}>
                    <Link to="/register" className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>Start Donating</Link>
                    <Link to="/requests" style={{ fontWeight: 600, color: 'var(--text-main)' }}>View Requests →</Link>
                </div>
            </header>

            {/* Impact Section */}
            <section className="impact glass-card animate-fade-up" style={{ margin: '4rem 0', padding: '4rem' }}>
                <div className="grid-cols" style={{ textAlign: 'center' }}>
                    <div className="stat-item">
                        <Gift size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                        <h2 style={{ fontSize: '3rem' }}>{stats.totalDonated}+</h2>
                        <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Books Delivered</p>
                    </div>
                    <div className="stat-item">
                        <Users size={48} color="var(--secondary)" style={{ marginBottom: '1rem' }} />
                        <h2 style={{ fontSize: '3rem' }}>{stats.totalPending}+</h2>
                        <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Active Donations</p>
                    </div>
                    <div className="stat-item">
                        <Globe size={48} color="var(--accent)" style={{ marginBottom: '1rem' }} />
                        <h2 style={{ fontSize: '3rem' }}>50+</h2>
                        <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Rural Schools Reached</p>
                    </div>
                </div>
            </section>

            {/* Steps Section */}
            <section className="steps" style={{ padding: '4rem 0' }}>
                <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem' }}>How It Works</h2>
                <div className="grid-cols">
                    <div className="step-card" style={{ padding: '2rem', textAlign: 'center' }}>
                        <div className="icon-wrapper flex-center" style={{ background: '#dbeafe', width: '64px', height: '64px', borderRadius: '50%', margin: '0 auto 1.5rem', color: 'var(--primary)' }}>
                            <BookOpen size={32} />
                        </div>
                        <h3>1. Register</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Choose your role as a Donor or an NGO.</p>
                    </div>
                    <div className="step-card" style={{ padding: '2rem', textAlign: 'center' }}>
                        <div className="icon-wrapper flex-center" style={{ background: '#dcfce7', width: '64px', height: '64px', borderRadius: '50%', margin: '0 auto 1.5rem', color: 'var(--secondary)' }}>
                            <Gift size={32} />
                        </div>
                        <h3>2. Donate/Request</h3>
                        <p style={{ color: 'var(--text-muted)' }}>List your books or tell us what you need.</p>
                    </div>
                    <div className="step-card" style={{ padding: '2rem', textAlign: 'center' }}>
                        <div className="icon-wrapper flex-center" style={{ background: '#fef3c7', width: '64px', height: '64px', borderRadius: '50%', margin: '0 auto 1.5rem', color: 'var(--accent)' }}>
                            <Globe size={32} />
                        </div>
                        <h3>3. Deliver Impact</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Track the journey of your books to their new home.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
