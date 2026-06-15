import React from 'react';
import { Award, Heart, Shield } from 'lucide-react';

const Impact = () => {
    const stories = [
        {
            id: 1,
            title: "Library Setup in Mangaon Village",
            ngo: "Gramin Shiksha Foundation",
            location: "Mangaon, Maharashtra",
            impact: "120+ rural students now have daily access to curriculum textbooks and references.",
            description: "Previously, children in Mangaon had to walk 6km to get access to standard reference books for their high school studies. With over 250 donated textbooks via GyanSetu, the local village center has set up a mini reading-library.",
            image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 2,
            title: "Primary School English Drive",
            ngo: "Asha School of Hope",
            location: "Dharwad, Karnataka",
            impact: "Improved vocabulary and reading scores of primary kids by 40% in 3 months.",
            description: "Donations of simple illustrated storybooks, dictionaries, and vocabulary building cards were collected from donors in Bangalore. Children are now engaging in weekend reading circles, boosting confidence.",
            image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 3,
            title: "Satara Rural Study Center",
            ngo: "Yuva Vikas Trust",
            location: "Satara Rural, Maharashtra",
            impact: "8 students cleared state level secondary scholarship exams.",
            image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
        }
    ];

    return (
        <div className="container" style={{ padding: '4rem 0', minHeight: '80vh' }}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>Platform Records</span>
                <h1 style={{ fontSize: '3rem', marginTop: '0.5rem', color: 'var(--dark)' }}>Platform Impact & Stories</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '0.5rem' }}>Every book donated builds a bridge towards a child's dreams.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', maxWidth: '950px', margin: '0 auto' }}>
                
                {/* Impact Statement Card */}
                <div className="card-light-blue" style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Making a Visible Difference</h2>
                    <p style={{ fontSize: '1.1rem', lineHeight: 1.7, maxWidth: '750px', margin: '0 auto' }}>
                        Education is the ultimate equalizer. By matching hundreds of rural requests with urban donations, we've helped open libraries, resource centers, and tutoring classes across different regions in Maharashtra and Karnataka.
                    </p>
                </div>

                {/* Grid Stories */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {stories.map(story => (
                        <div key={story.id} style={{ 
                            background: 'white', 
                            border: '1px solid #cbd5e1', 
                            borderRadius: 'var(--radius-sm)',
                            overflow: 'hidden',
                            display: 'grid',
                            gridTemplateColumns: '1fr 1.5fr'
                        }}>
                            <img src={story.image} alt={story.title} style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '260px' }} />
                            <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <span style={{ color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>{story.location}</span>
                                <h3 style={{ fontSize: '1.5rem', margin: '0.5rem 0', color: 'var(--dark)' }}>{story.title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
                                    {story.description || story.impact}
                                </p>
                                <div style={{ 
                                    padding: '0.8rem 1rem', 
                                    background: '#ecfdf5', 
                                    border: '1px solid #a7f3d0', 
                                    borderRadius: '4px', 
                                    color: '#065f46', 
                                    fontSize: '0.85rem' 
                                }}>
                                    <b>Recorded Impact:</b> {story.impact}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Impact;
