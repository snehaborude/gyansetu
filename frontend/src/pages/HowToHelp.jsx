import React from 'react';
import { Gift, BookOpen, Truck, Landmark } from 'lucide-react';

const HowToHelp = () => {
    return (
        <div className="container" style={{ padding: '4rem 0', minHeight: '80vh' }}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>User Guide</span>
                <h1 style={{ fontSize: '3rem', marginTop: '0.5rem', color: 'var(--dark)' }}>How to Help & Participate</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '0.5rem' }}>Learn how our book matching and delivery lifecycle works.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', maxWidth: '950px', margin: '0 auto' }}>
                
                {/* For Donors */}
                <div className="card-light-blue">
                    <h2 style={{ marginBottom: '1.5rem', fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <Gift color="var(--primary)" /> For Book Donors
                    </h2>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
                            <div style={{ background: 'white', padding: '0.6rem', borderRadius: '50%', color: 'var(--primary)', fontWeight: 'bold' }}>1</div>
                            <div>
                                <h4 style={{ fontSize: '1.1rem', margin: '0 0 0.3rem 0' }}>Search or List Books</h4>
                                <p style={{ margin: 0, fontSize: '0.95rem', opacity: 0.85 }}>Check active NGO requirements on our homepage or go straight to your dashboard to list what books you want to donate.</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
                            <div style={{ background: 'white', padding: '0.6rem', borderRadius: '50%', color: 'var(--primary)', fontWeight: 'bold' }}>2</div>
                            <div>
                                <h4 style={{ fontSize: '1.1rem', margin: '0 0 0.3rem 0' }}>NGO Approval</h4>
                                <p style={{ margin: 0, fontSize: '0.95rem', opacity: 0.85 }}>Once you submit your books, nearby NGOs will review details. If matched, the status shifts to 'Accepted'.</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
                            <div style={{ background: 'white', padding: '0.6rem', borderRadius: '50%', color: 'var(--primary)', fontWeight: 'bold' }}>3</div>
                            <div>
                                <h4 style={{ fontSize: '1.1rem', margin: '0 0 0.3rem 0' }}>Deliver / Send Books</h4>
                                <p style={{ margin: 0, fontSize: '0.95rem', opacity: 0.85 }}>Mail the books using standard couriers or schedule a local volunteer/NGO pickup depending on selection.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* For NGOs */}
                <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '3rem', borderRadius: 'var(--radius-sm)' }}>
                    <h2 style={{ marginBottom: '1.5rem', fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--dark)' }}>
                        <Landmark color="var(--secondary)" /> For NGOs / Rural Schools
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
                            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '0.6rem 0.8rem', borderRadius: '50%', color: 'var(--dark)', fontWeight: 'bold' }}>1</div>
                            <div>
                                <h4 style={{ fontSize: '1.1rem', margin: '0 0 0.3rem 0', color: 'var(--dark)' }}>Register & Post Needs</h4>
                                <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-muted)' }}>Create an NGO account and post detailed book type requirements (e.g. Science textbooks, grades 1-5) along with quantities.</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
                            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '0.6rem 0.8rem', borderRadius: '50%', color: 'var(--dark)', fontWeight: 'bold' }}>2</div>
                            <div>
                                <h4 style={{ fontSize: '1.1rem', margin: '0 0 0.3rem 0', color: 'var(--dark)' }}>Accept Matches</h4>
                                <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-muted)' }}>Browse available list submissions or wait for direct donor matching notification, then click 'Accept' on items.</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
                            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '0.6rem 0.8rem', borderRadius: '50%', color: 'var(--dark)', fontWeight: 'bold' }}>3</div>
                            <div>
                                <h4 style={{ fontSize: '1.1rem', margin: '0 0 0.3rem 0', color: 'var(--dark)' }}>Confirm Receipt</h4>
                                <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-muted)' }}>Update status to 'Picked Up' and then 'Delivered' when you physically get the books, completing the donation cycle.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Criteria Shelf */}
                <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '2.5rem', borderRadius: 'var(--radius-sm)' }}>
                    <h3 style={{ marginBottom: '1.2rem', fontSize: '1.4rem', color: 'var(--dark)' }}>Book Quality Guidelines</h3>
                    <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.95rem' }}>
                        <li>We accept textbooks (NCERT, State Boards), dictionaries, atlases, children's storybooks, and competitive exam books (JEE, NEET, Civil Services).</li>
                        <li>Books must not have missing pages, heavy water damage, or completely torn bindings.</li>
                        <li>Writing or underlining with pencil/pen is acceptable if the text remains clearly readable.</li>
                        <li>Avoid donating outdated software guides or old news magazines.</li>
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default HowToHelp;
