import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Gift, Users, BookOpen, Globe, Search, MapPin, ArrowRight, BookCheck } from 'lucide-react';

const Home = () => {
    const [stats, setStats] = useState({ totalDonated: 0, totalPending: 0, totalUsers: 0, totalNGOs: 0 });
    const [requests, setRequests] = useState([]);
    const [topDonors, setTopDonors] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [matchedRequests, setMatchedRequests] = useState([]);
    const navigate = useNavigate();

    const recentDonations = [
        { id: 1, name: "Fundamentals of Algebra", category: "Mathematics", condition: "Like New", status: "Delivered", city: "Pune" },
        { id: 2, name: "Wings of Fire - APJ Kalam", category: "Biography", condition: "Good", status: "Accepted", city: "Nashik" },
        { id: 3, name: "Oxford English Dictionary", category: "Language", condition: "New", status: "Pending", city: "Mumbai" },
        { id: 4, name: "Science Encyclopedia", category: "Science", condition: "Good", status: "Delivered", city: "Kolhapur" }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const statsRes = await api.get('/donations/stats');
                setStats(statsRes.data);

                const donorsRes = await api.get('/donations/top-donors');
                setTopDonors(donorsRes.data);

                const reqRes = await api.get('/requests');
                setRequests(reqRes.data);
                setMatchedRequests(reqRes.data.slice(0, 3));
            } catch (error) {
                console.error('Error fetching homepage data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        let filtered = requests;
        if (searchQuery) {
            filtered = filtered.filter(req => 
                req.bookType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                req.ngo?.name?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        if (selectedCategory) {
            filtered = filtered.filter(req => 
                req.bookType.toLowerCase().includes(selectedCategory.toLowerCase())
            );
        }
        setMatchedRequests(filtered.slice(0, 3));
    }, [searchQuery, selectedCategory, requests]);

    const handleFulfillClick = (req) => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            navigate(`/dashboard/donor?bookType=${encodeURIComponent(req.bookType)}&category=Educational`);
        }
    };

    const getBadgeStyle = (index) => {
        switch (index) {
            case 0: return { background: '#fef08a', color: '#854d0e' };
            case 1: return { background: '#e2e8f0', color: '#475569' };
            case 2: return { background: '#ffedd5', color: '#c2410c' };
            default: return { background: '#f1f5f9', color: '#64748b' };
        }
    };

    return (
        <div style={{ paddingBottom: '2rem' }}>
            {/* Hero Section */}
            <header className="hero container flex-center" style={{ 
                flexDirection: 'column',
                textAlign: 'center',
                padding: '120px 0 80px 0', 
                minHeight: '75vh',
                maxWidth: '850px',
                margin: '0 auto',
                gap: '2rem'
            }}>
                <div className="hero-content animate-fade-up flex-center" style={{ flexDirection: 'column' }}>
                    <span style={{ 
                        background: 'rgba(74, 123, 176, 0.1)', 
                        color: 'var(--primary)', 
                        padding: '0.6rem 1.2rem', 
                        borderRadius: '4px', 
                        fontSize: '0.9rem', 
                        fontWeight: 700,
                        marginBottom: '2rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        border: '1px solid rgba(74, 123, 176, 0.2)'
                    }}>
                        <Globe size={16} /> Bridging the Rural Educational Divide
                    </span>
                    <h1 style={{ fontSize: '4.8rem', lineHeight: 1.15, marginBottom: '2rem', fontWeight: 800, color: 'var(--dark)' }}>
                        Ignite Minds. <br />
                        <span style={{ color: 'var(--primary)' }}>Donate Books. Build Futures.</span>
                    </h1>
                    <p style={{ fontSize: '1.35rem', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '640px', lineHeight: 1.7 }}>
                        GyanSetu connects textbook and reading book donors with schools and community NGOs in rural areas that need resources.
                    </p>
                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', justifyContent: 'center' }}>
                        <Link to="/register" className="btn-primary" style={{ padding: '1.2rem 3.5rem', fontSize: '1.1rem', borderRadius: 'var(--radius-sm)' }}>
                            Register & Get Started
                        </Link>
                        <Link to="/how-to-help" style={{ fontWeight: 700, color: 'var(--primary)', borderBottom: '2px solid var(--primary)', paddingBottom: '3px', fontSize: '1.1rem' }}>
                            Learn How It Works
                        </Link>
                    </div>
                </div>
            </header>

            {/* Platform Stats */}
            <section className="impact-strip" style={{ 
                background: 'var(--dark)', 
                color: 'white', 
                padding: '3.5rem 0',
                borderRadius: '4px',
                margin: '0 2rem 4rem 2rem'
            }}>
                <div className="container grid-cols" style={{ gridTemplateColumns: 'repeat(4, 1fr)', textAlign: 'center' }}>
                    <div>
                        <Gift size={32} color="var(--secondary)" style={{ marginBottom: '0.5rem' }} />
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 850, marginBottom: '0.1rem' }}>{stats.totalDonated || 150}+</h2>
                        <p style={{ opacity: 0.8, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.75rem', fontWeight: 600 }}>Books Distributed</p>
                    </div>
                    <div>
                        <Users size={32} color="var(--primary)" style={{ marginBottom: '0.5rem' }} />
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 850, marginBottom: '0.1rem' }}>{stats.totalUsers || 42}+</h2>
                        <p style={{ opacity: 0.8, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.75rem', fontWeight: 600 }}>Active Donors</p>
                    </div>
                    <div>
                        <Globe size={32} color="var(--accent)" style={{ marginBottom: '0.5rem' }} />
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 850, marginBottom: '0.1rem' }}>{stats.totalNGOs || 18}+</h2>
                        <p style={{ opacity: 0.8, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.75rem', fontWeight: 600 }}>Partner NGOs</p>
                    </div>
                    <div>
                        <BookCheck size={32} color="#a78bfa" style={{ marginBottom: '0.5rem' }} />
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 850, marginBottom: '0.1rem' }}>{stats.totalPending || 12}</h2>
                        <p style={{ opacity: 0.8, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.75rem', fontWeight: 600 }}>Open Requirements</p>
                    </div>
                </div>
            </section>

            {/* Live Book Matcher Widget (Light-Blue Encased) */}
            <section id="matcher" className="container" style={{ padding: '40px 0', scrollMarginTop: '80px', marginBottom: '4rem' }}>
                <div className="card-light-blue" style={{ padding: '3.5rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <span style={{ color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem' }}>Fulfillment Center</span>
                        <h2 style={{ fontSize: '2.4rem', marginTop: '0.5rem', marginBottom: '0.8rem', color: 'var(--dark)' }}>Live Book Requirement Matcher</h2>
                        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
                            Search our database of active school and NGO requests to see if you can supply the books they need.
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
                        <div style={{ position: 'relative', flex: 1 }}>
                            <Search size={18} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input 
                                type="text"
                                placeholder="Search by grade level, topic (e.g. maths, stories)..."
                                className="glass-card"
                                style={{ 
                                    width: '100%', 
                                    padding: '0.8rem 1rem 0.8rem 3.2rem', 
                                    background: 'white',
                                    border: '1px solid #cbd5e1',
                                    fontSize: '0.95rem',
                                    borderRadius: '4px'
                                }}
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setSelectedCategory('');
                                }}
                            />
                        </div>
                    </div>

                    {/* Quick Filters */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
                        {['Mathematics', 'Science', 'English', 'Storybooks', 'Reference'].map(cat => (
                            <button
                                key={cat}
                                onClick={() => {
                                    setSelectedCategory(prev => prev === cat ? '' : cat);
                                    setSearchQuery('');
                                }}
                                style={{
                                    padding: '0.5rem 1.2rem',
                                    borderRadius: '4px',
                                    fontSize: '0.85rem',
                                    fontWeight: 700,
                                    transition: 'all 0.2s',
                                    background: selectedCategory === cat ? 'var(--primary)' : 'white',
                                    color: selectedCategory === cat ? 'white' : 'var(--text-main)',
                                    border: `1px solid ${selectedCategory === cat ? 'var(--primary)' : '#cbd5e1'}`,
                                    cursor: 'pointer'
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Matched Requests */}
                    <div className="grid-cols" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                        {matchedRequests.map(req => (
                            <div key={req._id} className="glass-card" style={{ 
                                padding: '1.8rem', 
                                border: '1px solid #cbd5e1',
                                borderTop: '4px solid var(--primary)',
                                display: 'flex', 
                                flexDirection: 'column', 
                                justifyContent: 'space-between',
                                background: 'white',
                                borderRadius: '4px'
                            }}>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                        <span style={{ background: '#e0f2fe', color: 'var(--primary)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800 }}>
                                            {req.quantity} BOOKS
                                        </span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                                            <MapPin size={12} /> {req.city || 'Rural'}
                                        </span>
                                    </div>
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', color: 'var(--dark)' }}>{req.bookType}</h3>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                                        Needed by: <b>{req.ngo?.name || 'Partner NGO'}</b>
                                    </p>
                                </div>
                                <button 
                                    className="btn-primary" 
                                    style={{ width: '100%', justifyContent: 'center', padding: '0.7rem', borderRadius: '4px' }}
                                    onClick={() => handleFulfillClick(req)}
                                >
                                    Donate Books
                                </button>
                            </div>
                        ))}
                        {matchedRequests.length === 0 && (
                            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                                No active requirements matched. Use the search bar above to try another subject.
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Activity & Hall of Fame Dual Column */}
            <section className="container" style={{ padding: '20px 0 60px 0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '3rem' }}>
                    
                    {/* Recent Shelf */}
                    <div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <span style={{ color: 'var(--secondary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem' }}>Recent Flow</span>
                            <h2 style={{ fontSize: '2rem', marginTop: '0.3rem', color: 'var(--dark)' }}>Recent Activity Feed</h2>
                        </div>
                        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', background: 'white', border: '1px solid #cbd5e1', borderRadius: 'var(--radius-sm)' }}>
                            {recentDonations.map(don => (
                                <div key={don.id} style={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center', 
                                    padding: '0.8rem', 
                                    borderBottom: '1px solid #f1f5f9'
                                }}>
                                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                        <div style={{ background: '#ecfdf5', padding: '0.6rem', borderRadius: '4px', color: 'var(--secondary)' }}>
                                            <Gift size={18} />
                                        </div>
                                        <div>
                                            <h4 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--dark)' }}>{don.name}</h4>
                                            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                                {don.category} | {don.city}
                                            </p>
                                        </div>
                                    </div>
                                    <span style={{ 
                                        fontSize: '0.7rem', 
                                        fontWeight: 700, 
                                        padding: '0.2rem 0.5rem', 
                                        borderRadius: '4px',
                                        background: don.status === 'Delivered' ? '#dcfce7' : don.status === 'Accepted' ? '#dbeafe' : '#fef3c7',
                                        color: don.status === 'Delivered' ? '#166534' : don.status === 'Accepted' ? 'var(--primary)' : '#b45309'
                                    }}>
                                        {don.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Leaderboard Column */}
                    <div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <span style={{ color: 'var(--accent)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem' }}>Gyan Hall</span>
                            <h2 style={{ fontSize: '2rem', marginTop: '0.3rem', color: 'var(--dark)' }}>Top Contributors</h2>
                        </div>
                        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'white', border: '1px solid #cbd5e1', borderRadius: 'var(--radius-sm)' }}>
                            {topDonors.map((donor, index) => {
                                const badge = getBadgeStyle(index);
                                return (
                                    <div key={index} style={{ 
                                        display: 'flex', 
                                        justifyContent: 'space-between', 
                                        alignItems: 'center', 
                                        padding: '0.6rem 0.8rem',
                                        borderRadius: '4px',
                                        background: '#f8fafc',
                                        border: '1px solid #cbd5e1'
                                    }}>
                                        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                                            <div style={{ 
                                                width: '28px', 
                                                height: '28px', 
                                                borderRadius: '50%', 
                                                background: badge.background, 
                                                color: badge.color, 
                                                fontWeight: 800, 
                                                fontSize: '0.85rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                {index + 1}
                                            </div>
                                            <div>
                                                <h4 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--dark)' }}>{donor.name}</h4>
                                                <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                                                    {index === 0 ? '🏆 Literacy Champion' : index === 1 ? '🌟 Page Turner' : index === 2 ? '⭐ Knowledge Giver' : 'Donor'}
                                                </p>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--primary)', fontWeight: 800 }}>{donor.totalDonated}</h4>
                                            <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-muted)' }}>Books</p>
                                        </div>
                                    </div>
                                );
                            })}
                            {topDonors.length === 0 && (
                                <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-muted)' }}>
                                    No listings recorded yet. Be the first!
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default Home;
