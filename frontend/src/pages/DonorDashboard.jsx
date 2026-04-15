import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Plus, Clock, Book as BookIcon, CheckCircle, Package, Truck } from 'lucide-react';

const DonorDashboard = () => {
    const { user } = useAuth();
    const [donations, setDonations] = useState([]);
    const [formData, setFormData] = useState({
        bookName: '',
        category: '',
        condition: 'Good',
        deliveryMethod: 'Pickup Request',
        pickupAddress: user?.address || '',
        pickupDate: '',
        image: null
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [topDonors, setTopDonors] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchDonations();
        fetchTopDonors();
    }, []);

    const fetchTopDonors = async () => {
        try {
            const res = await api.get('/donations/top-donors');
            setTopDonors(res.data);
        } catch (error) {
            console.error('Error fetching top donors', error);
        }
    };

    const fetchDonations = async () => {
        try {
            const res = await api.get('/donations');
            setDonations(res.data);
        } catch (error) {
            console.error('Error fetching donations', error);
        }
    };

    const handleDonate = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const data = new FormData();
            data.append('bookName', formData.bookName);
            data.append('category', formData.category);
            data.append('condition', formData.condition);
            data.append('deliveryMethod', formData.deliveryMethod);
            if (formData.pickupAddress) data.append('pickupAddress', formData.pickupAddress);
            if (user?.city) data.append('city', user.city);
            if (user?.pincode) data.append('pincode', user.pincode);
            if (formData.pickupDate) data.append('pickupDate', formData.pickupDate);
            if (formData.image) data.append('image', formData.image);

            await api.post('/donations', data);
            setMessage('Donation listed successfully!');
            setFormData({ bookName: '', category: '', condition: 'Good', deliveryMethod: 'Pickup Request', pickupAddress: user?.address || '', pickupDate: '', image: null });
            fetchDonations();
            fetchTopDonors();
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to post donation. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return '#f59e0b';
            case 'Accepted': return '#2563eb';
            case 'Picked': return '#8b5cf6';
            case 'Delivered': return '#10b981';
            default: return '#64748b';
        }
    };

    return (
        <div className="dashboard animate-fade-up">
            <header style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem' }}>Welcome, {user?.name} 👋</h1>
                <p style={{ color: 'var(--text-muted)' }}>Help us spread knowledge by donating your books.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' }}>
                {/* Donation Form */}
                <section className="glass-card">
                    <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Plus size={20} color="var(--primary)" />
                        Donate a New Book
                    </h3>
                    
                    {message && <div style={{ color: 'white', background: 'var(--secondary)', padding: '0.8rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem' }}>{message}</div>}
                    {error && <div style={{ color: 'white', background: '#ef4444', padding: '0.8rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem' }}>{error}</div>}

                    <form onSubmit={handleDonate}>
                        <div style={{ marginBottom: '1.2rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Book Title</label>
                            <input 
                                type="text" 
                                required 
                                className="glass-card" 
                                style={{ width: '100%', padding: '0.8rem', background: 'white' }} 
                                placeholder="e.g. Concept of Physics"
                                value={formData.bookName}
                                onChange={(e) => setFormData({...formData, bookName: e.target.value})}
                            />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.2rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Category</label>
                                <input 
                                    type="text" 
                                    required 
                                    className="glass-card" 
                                    style={{ width: '100%', padding: '0.8rem', background: 'white' }} 
                                    placeholder="e.g. Science"
                                    value={formData.category}
                                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Condition</label>
                                <select 
                                    className="glass-card" 
                                    style={{ width: '100%', padding: '0.8rem', background: 'white' }}
                                    value={formData.condition}
                                    onChange={(e) => setFormData({...formData, condition: e.target.value})}
                                >
                                    <option value="New">New</option>
                                    <option value="Like New">Like New</option>
                                    <option value="Good">Good</option>
                                    <option value="Fair">Fair</option>
                                </select>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.2rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Book Image (Optional)</label>
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    className="glass-card" 
                                    style={{ width: '100%', padding: '0.6rem', background: 'white' }} 
                                    onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Pickup / Delivery Date</label>
                                <input 
                                    type="date" 
                                    className="glass-card" 
                                    style={{ width: '100%', padding: '0.8rem', background: 'white' }}
                                    value={formData.pickupDate}
                                    onChange={(e) => setFormData({...formData, pickupDate: e.target.value})}
                                />
                            </div>
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Delivery Method</label>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                <div 
                                    onClick={() => setFormData({...formData, deliveryMethod: 'Pickup Request'})}
                                    style={{ 
                                        padding: '1rem', 
                                        border: formData.deliveryMethod === 'Pickup Request' ? '2px solid var(--primary)' : '2px solid transparent',
                                        background: formData.deliveryMethod === 'Pickup Request' ? 'rgba(37, 99, 235, 0.05)' : 'white',
                                        borderRadius: 'var(--radius-md)',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                        <Truck size={18} color={formData.deliveryMethod === 'Pickup Request' ? 'var(--primary)' : 'var(--text-muted)'} />
                                        <span style={{ fontWeight: 600, color: formData.deliveryMethod === 'Pickup Request' ? 'var(--primary)' : 'var(--text-main)' }}>Request Pickup</span>
                                    </div>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>An NGO will come pick it up.</p>
                                </div>
                                <div 
                                    onClick={() => setFormData({...formData, deliveryMethod: 'Self Drop-off'})}
                                    style={{ 
                                        padding: '1rem', 
                                        border: formData.deliveryMethod === 'Self Drop-off' ? '2px solid var(--primary)' : '2px solid transparent',
                                        background: formData.deliveryMethod === 'Self Drop-off' ? 'rgba(37, 99, 235, 0.05)' : 'white',
                                        borderRadius: 'var(--radius-md)',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                        <Package size={18} color={formData.deliveryMethod === 'Self Drop-off' ? 'var(--primary)' : 'var(--text-muted)'} />
                                        <span style={{ fontWeight: 600, color: formData.deliveryMethod === 'Self Drop-off' ? 'var(--primary)' : 'var(--text-main)' }}>Self Drop-off</span>
                                    </div>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>You drop it off at NGO address.</p>
                                </div>
                            </div>
                        </div>

                        {formData.deliveryMethod === 'Pickup Request' && (
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Pickup Address</label>
                                <textarea 
                                    required 
                                    className="glass-card" 
                                    style={{ width: '100%', padding: '0.8rem', background: 'white', height: '80px' }} 
                                    value={formData.pickupAddress}
                                    onChange={(e) => setFormData({...formData, pickupAddress: e.target.value})}
                                ></textarea>
                            </div>
                        )}
                        <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
                            {loading ? 'Posting...' : 'Post Donation'}
                        </button>
                    </form>
                </section>

                {/* Donation History */}
                <section>
                    <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Clock size={20} color="var(--primary)" />
                        Your Recent Donations
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {donations.length === 0 ? (
                            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>No donations yet. Start today!</p>
                        ) : (
                            donations.map((d) => (
                                <div key={d._id} className="glass-card" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                        {d.imageUrl ? (
                                            <img src={`http://localhost:5000${d.imageUrl}`} alt="Book" style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '4px' }} />
                                        ) : (
                                            <div style={{ background: 'var(--light)', padding: '0.8rem', borderRadius: 'var(--radius-sm)' }}>
                                                <BookIcon size={24} color="var(--primary)" />
                                            </div>
                                        )}
                                        <div>
                                            <h4 style={{ margin: 0 }}>{d.bookName}</h4>
                                            <p style={{ margin: '0.2rem 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{d.category} • {d.condition}</p>
                                            {d.pickupDate && <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-main)' }}>Schedule: {new Date(d.pickupDate).toLocaleDateString()}</p>}
                                            {d.ngo && <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--secondary)' }}>NGO: {d.ngo.name} ({d.ngo.phone})</p>}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <span style={{ 
                                            padding: '0.4rem 0.8rem', 
                                            borderRadius: '20px', 
                                            fontSize: '0.75rem', 
                                            fontWeight: 700,
                                            background: getStatusColor(d.status) + '22',
                                            color: getStatusColor(d.status)
                                        }}>
                                            {d.status}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    
                    {/* Top Donors Widget */}
                    <div className="glass-card" style={{ marginTop: '2rem', padding: '1.5rem' }}>
                        <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            🏆 Top Gyansetu Donors
                        </h3>
                        {topDonors.map((donor, idx) => (
                            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.8rem 0', borderBottom: '1px solid var(--glass-border)' }}>
                                <span><span style={{ fontWeight: 800, marginRight: '0.5rem', color: 'var(--accent)' }}>#{idx + 1}</span> {donor.name}</span>
                                <span style={{ fontWeight: 600 }}>{donor.totalDonated} Books</span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DonorDashboard;
