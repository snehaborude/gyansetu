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
        <div className="home" style={{ overflow: 'hidden' }}>
            {/* Hero Section */}
            <header className="hero container" style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                alignItems: 'center', 
                padding: '80px 0', 
                gap: '4rem',
                minHeight: '80vh'
            }}>
                <div className="hero-content animate-fade-up">
                    <span style={{ 
                        background: 'rgba(37, 99, 235, 0.1)', 
                        color: 'var(--primary)', 
                        padding: '0.5rem 1rem', 
                        borderRadius: '100px', 
                        fontSize: '0.9rem', 
                        fontWeight: 700,
                        marginBottom: '1.5rem',
                        display: 'inline-block'
                    }}>
                        Empowering Rural India Through Literacy
                    </span>
                    <h1 style={{ fontSize: '4.5rem', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                        Ignite Minds, <br />
                        <span className="text-gradient">Donate Books.</span>
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: '500px' }}>
                        GyanSetu is a digital bridge connecting your unused books with rural schools and NGOs that need them most. 
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <Link to="/register" className="btn-primary" style={{ padding: '1.2rem 2.8rem', fontSize: '1.1rem', borderRadius: 'var(--radius-md)' }}>
                            Join the Movement
                        </Link>
                        <Link to="/requests" style={{ fontWeight: 600, color: 'var(--text-main)', borderBottom: '2px solid var(--primary)', paddingBottom: '2px' }}>
                            View Urgent Requests
                        </Link>
                    </div>
                </div>
                <div className="hero-visual animate-float" style={{ position: 'relative' }}>
                    <div style={{ 
                        position: 'absolute', 
                        top: '-10%', 
                        right: '-10%', 
                        width: '400px', 
                        height: '400px', 
                        background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)',
                        zIndex: -1 
                    }}></div>
                    <img 
                        src="/src/assets/hero_visual.png" 
                        alt="GyanSetu Knowledge Sharing" 
                        style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}
                        onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
                        }}
                    />
                </div>
            </header>

            {/* Impact Metrics */}
            <section className="impact-strip" style={{ background: 'var(--dark)', color: 'white', padding: '4rem 0', margin: '4rem 0' }}>
                <div className="container grid-cols" style={{ textAlign: 'center' }}>
                    <div className="animate-fade-up">
                        <Gift size={40} color="var(--secondary)" style={{ marginBottom: '1rem' }} />
                        <h2 style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>{stats.totalDonated || 0}+</h2>
                        <p style={{ opacity: 0.7, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem' }}>Books Distributed</p>
                    </div>
                    <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
                        <Users size={40} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                        <h2 style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>{stats.totalUsers || 0}+</h2>
                        <p style={{ opacity: 0.7, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem' }}>Active Donors</p>
                    </div>
                    <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
                        <Globe size={40} color="var(--accent)" style={{ marginBottom: '1rem' }} />
                        <h2 style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>{stats.totalNGOs || 0}+</h2>
                        <p style={{ opacity: 0.7, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem' }}>Partner NGOs</p>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="container" style={{ padding: '80px 0' }}>
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Sparking Change in 3 Steps</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Our streamlined process ensures your contribution reaches those in need.</p>
                </div>
                <div className="grid-cols">
                    <div className="glass-card step-card" style={{ textAlign: 'center' }}>
                        <div className="icon-badge flex-center" style={{ 
                            background: 'white', 
                            width: '80px', 
                            height: '80px', 
                            borderRadius: '50%', 
                            margin: '-60px auto 2rem', 
                            boxShadow: 'var(--shadow)',
                            color: 'var(--primary)'
                        }}>
                            <BookOpen size={36} />
                        </div>
                        <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>1. List Your Books</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Snap a photo and list your books. Mention condition and pickup preference.</p>
                    </div>
                    
                    <div className="glass-card step-card" style={{ textAlign: 'center' }}>
                        <div className="icon-badge flex-center" style={{ 
                            background: 'white', 
                            width: '80px', 
                            height: '80px', 
                            borderRadius: '50%', 
                            margin: '-60px auto 2rem', 
                            boxShadow: 'var(--shadow)',
                            color: 'var(--secondary)'
                        }}>
                            <Gift size={36} />
                        </div>
                        <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>2. NGO Matching</h3>
                        <p style={{ color: 'var(--text-muted)' }}>We match your books with requests from nearby rural schools and local NGOs.</p>
                    </div>

                    <div className="glass-card step-card" style={{ textAlign: 'center' }}>
                        <div className="icon-badge flex-center" style={{ 
                            background: 'white', 
                            width: '80px', 
                            height: '80px', 
                            borderRadius: '50%', 
                            margin: '-60px auto 2rem', 
                            boxShadow: 'var(--shadow)',
                            color: 'var(--accent)'
                        }}>
                            <Globe size={36} />
                        </div>
                        <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>3. Secure Delivery</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Schedule a pickup or drop off. Track the journey until the book is received.</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container" style={{ margin: '80px auto' }}>
                <div className="glass-card animate-pulse" style={{ 
                    background: 'linear-gradient(135deg, var(--dark) 0%, #1e293b 100%)', 
                    color: 'white', 
                    padding: '5rem', 
                    textAlign: 'center',
                    borderRadius: 'var(--radius-lg)'
                }}>
                    <h2 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Ready to Share Knowledge?</h2>
                    <p style={{ fontSize: '1.3rem', opacity: 0.8, marginBottom: '3rem', maxWidth: '700px', margin: '0 auto 3rem' }}>
                        Join thousands of donors making a difference in the lives of rural students. Your one book can change a life.
                    </p>
                    <Link to="/register" className="btn-primary" style={{ padding: '1.2rem 4rem', fontSize: '1.2rem', background: 'white', color: 'var(--dark)' }}>
                        Register Now
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
