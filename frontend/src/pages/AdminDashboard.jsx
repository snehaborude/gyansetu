import { useState, useEffect } from 'react';
import api from '../services/api';
import { Shield, Users, Book as BookIcon, BarChart3, Trash2 } from 'lucide-react';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ donors: 0, ngos: 0, donations: 0, requests: 0 });
    const [donations, setDonations] = useState([]);
    const [activeView, setActiveView] = useState('overview');

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const donRes = await api.get('/donations');
                const reqRes = await api.get('/requests');
                const statRes = await api.get('/donations/stats');
                
                setDonations(donRes.data);
                setStats({
                    donations: donRes.data.length,
                    requests: reqRes.data.length,
                    donors: statRes.data.totalUsers,
                    ngos: statRes.data.totalNGOs,
                });
            } catch (error) {
                console.error('Error fetching admin data', error);
            }
        };
        fetchAll();
    }, []);

    return (
        <div className="admin-panel animate-fade-up">
            <header style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Shield size={40} color="var(--primary)" />
                    <h1 style={{ fontSize: '2.5rem' }}>Admin Control Center</h1>
                </div>
                <p style={{ color: 'var(--text-muted)' }}>Global platform monitoring and management.</p>
            </header>

            {/* Quick Stats */}
            <div className="grid-cols" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '3rem' }}>
                <div className="glass-card flex-center" style={{ flexDirection: 'column', padding: '1.5rem' }}>
                    <Users size={24} color="var(--primary)" />
                    <h2 style={{ margin: '0.5rem 0' }}>{stats.donors}</h2>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Donors</p>
                </div>
                <div className="glass-card flex-center" style={{ flexDirection: 'column', padding: '1.5rem' }}>
                    <Shield size={24} color="var(--secondary)" />
                    <h2 style={{ margin: '0.5rem 0' }}>{stats.ngos}</h2>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>NGOs</p>
                </div>
                <div className="glass-card flex-center" style={{ flexDirection: 'column', padding: '1.5rem' }}>
                    <BookIcon size={24} color="var(--accent)" />
                    <h2 style={{ margin: '0.5rem 0' }}>{stats.donations}</h2>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Donations</p>
                </div>
                <div className="glass-card flex-center" style={{ flexDirection: 'column', padding: '1.5rem' }}>
                    <BarChart3 size={24} color="#8b5cf6" />
                    <h2 style={{ margin: '0.5rem 0' }}>{stats.requests}</h2>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Requests</p>
                </div>
            </div>

            <section className="glass-card">
                <h3 style={{ marginBottom: '1.5rem' }}>All Donations Status</h3>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
                                <th style={{ padding: '1rem' }}>Book Name</th>
                                <th style={{ padding: '1rem' }}>Donor</th>
                                <th style={{ padding: '1rem' }}>Category</th>
                                <th style={{ padding: '1rem' }}>Status</th>
                                <th style={{ padding: '1rem' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donations.map(d => (
                                <tr key={d._id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                    <td style={{ padding: '1rem' }}>{d.bookName}</td>
                                    <td style={{ padding: '1rem' }}>{d.donor?.name || '---'}</td>
                                    <td style={{ padding: '1rem' }}>{d.category}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{ 
                                            padding: '0.3rem 0.6rem', 
                                            borderRadius: '12px', 
                                            fontSize: '0.75rem',
                                            background: 'var(--light)',
                                            fontWeight: 700
                                        }}>{d.status}</span>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <button style={{ background: 'none', color: '#ef4444' }}><Trash2 size={18} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default AdminDashboard;
