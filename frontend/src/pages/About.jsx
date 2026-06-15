import React from 'react';
import { BookOpen, ShieldCheck, Heart } from 'lucide-react';

const About = () => {
    return (
        <div className="container" style={{ padding: '4rem 0', minHeight: '80vh' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>Who We Are</span>
                <h1 style={{ fontSize: '3rem', marginTop: '0.5rem', color: 'var(--dark)' }}>About GyanSetu</h1>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', maxWidth: '900px', margin: '0 auto' }}>
                {/* Mission Card */}
                <div className="card-light-blue">
                    <h2 style={{ marginBottom: '1.2rem', fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <Heart color="var(--primary)" /> Our Core Mission
                    </h2>
                    <p style={{ fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                        GyanSetu (meaning "Bridge of Knowledge") was conceived to address a severe inequality in educational resources across India. While urban households accumulate stacks of high-quality textbooks, novels, and reference materials that eventually go to waste, rural schools and community libraries are left without the books needed to build basic literacy.
                    </p>
                    <p style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                        Our platform acts as a direct, peer-to-peer connection channel. We remove middle-tier warehouses, transport fees, and administrative delays, allowing direct donations of exact books requested by local NGOs.
                    </p>
                </div>

                {/* Core Values / Pillar Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '2rem', borderRadius: 'var(--radius-sm)' }}>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--dark)' }}>
                            <BookOpen color="var(--primary)" size={20} /> Resource Equality
                        </h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                            We believe knowledge should be shared, not stored. By recycling books, we promote educational resource availability and reduce paper waste.
                        </p>
                    </div>

                    <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '2rem', borderRadius: 'var(--radius-sm)' }}>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--dark)' }}>
                            <ShieldCheck color="var(--secondary)" size={20} /> Transparency
                        </h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                            Donors can see exactly which school, village, or learning center requested their specific books, establishing a direct emotional link.
                        </p>
                    </div>
                </div>

                {/* Story Card */}
                <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '3rem', borderRadius: 'var(--radius-sm)' }}>
                    <h2 style={{ marginBottom: '1.5rem', fontSize: '1.8rem', color: 'var(--dark)' }}>The Story of GyanSetu</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.2rem' }}>
                        What started as a local volunteer book-drive in Pune quickly highlighted a broader challenge: donors had books to give, but they didn't know *who* needed them, and NGOs needed books but had no way to ask for specific titles.
                    </p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>
                        By creating a digital database matching real-time book demands with public donations, we hope to build a nationwide network. Every textbook shared is a child empowered.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
