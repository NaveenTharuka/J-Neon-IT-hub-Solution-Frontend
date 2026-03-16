import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getPortfolioItems, getPortfolioImages } from '../services/portfolioService'

const imgCheckmark = "http://localhost:3845/assets/0ccf5697b7ad90af92894ea1fb9741db5ca8be25.svg"

const projects = [
    {
        tag: 'Security & Compliance',
        title: 'Cyber Defense',
        desc: 'Our advanced cybersecurity protocols go beyond basic firewalls. We implement zero-trust architectures, real-time threat hunting, and forensic analysis to ensure your data remains inviolable.',
        techLabel: 'Technologies',
        tech: ['SIEM', 'EDR', 'Zero Trust', 'Pen-Testing'],
        features: [
            '24/7 Security Operations Center (SOC) monitoring.',
            'Automated incident response and containment.',
            'Compliance auditing for GDPR, HIPAA, and SOC2.',
        ],
        side: 'right',
        accentColor: 'var(--color-teal)',
        cardType: 'cyber',
    },
    {
        tag: 'Infrastructure',
        title: 'Cloud Migration',
        desc: 'Seamlessly transition your legacy systems to modern, scalable cloud environments. We minimize downtime and optimize costs, ensuring your move to the cloud is a strategic upgrade, not just a shift.',
        techLabel: 'Platforms',
        tech: ['AWS', 'Azure', 'Google Cloud', 'Kubernetes'],
        features: [
            'Zero-downtime migration strategies.',
            'Cost-optimization and resource scaling architecture.',
            'Hybrid and multi-cloud integration support.',
        ],
        side: 'left',
        accentColor: '#3b82f6',
        cardType: 'cloud',
    },
    {
        tag: 'Design & Development',
        title: 'Digital Studio',
        desc: 'We craft immersive digital experiences that captivate users and drive conversion. From high-fidelity prototyping to full-stack development, our studio merges aesthetics with performance.',
        techLabel: 'Stack',
        tech: ['React', 'Next.js', 'Tailwind', 'Figma'],
        features: [
            'High-performance, SEO-optimized web applications.',
            'User-centric interface design and usability testing.',
            'Brand identity and digital strategy.',
        ],
        side: 'right',
        accentColor: '#a855f7',
        cardType: 'studio',
    },
]

function CyberCard() {
    return (
        <div className="pf-card pf-card--cyber">
            <div className="pf-card__header">
                <span className="pf-card__icon">🛡</span>
                <span className="pf-card__badge">SECURE: ACTIVE</span>
            </div>
            <div className="pf-card__row">
                <span className="pf-card__mono pf-card__mono--dim">Threat Level</span>
                <span className="pf-card__mono pf-card__mono--teal">Zero</span>
            </div>
            <div className="pf-card__progress" />
            <div className="pf-card__row">
                <span className="pf-card__mono pf-card__mono--dim">Encryption</span>
                <span className="pf-card__mono">AES-256</span>
            </div>
            <div className="pf-card__terminal">
                <p>{'> Monitoring traffic...'}</p>
                <p>{'> Anomalies: 0'}</p>
                <p>{'> Status: Protected'}</p>
            </div>
            <div className="pf-card__stat">
                <span className="pf-card__stat-value">99.9%</span>
                <span className="pf-card__stat-label">Threat Mitigation Rate</span>
            </div>
        </div>
    )
}

function CloudCard() {
    return (
        <div className="pf-card pf-card--cloud">
            <div className="pf-card__cloud-icon">☁</div>
            <div className="pf-card__cloud-center">
                <span className="pf-card__cloud-heading">Sync Complete</span>
                <span className="pf-card__mono pf-card__mono--teal">DATA INTEGRITY: 100%</span>
            </div>
        </div>
    )
}

function StudioCard() {
    return (
        <div className="pf-card pf-card--studio">
            <div className="pf-card__studio-bar">
                <span className="dot dot--red" />
                <span className="dot dot--yellow" />
                <span className="dot dot--green" />
                <div className="pf-card__url-bar" />
            </div>
            <div className="pf-card__studio-body">
                <div className="pf-card__studio-sidebar" />
                <div className="pf-card__studio-content" />
            </div>
            <div className="pf-card__studio-badge">UX/UI</div>
            <div className="pf-card__studio-stat">
                <span className="pf-card__mono pf-card__mono--dim">Growth Metric</span>
                <span className="pf-card__studio-value">+245%</span>
            </div>
        </div>
    )
}

const cardComponents = {
    cyber: CyberCard,
    cloud: CloudCard,
    studio: StudioCard
}

// Helper function to get the best image for display
function getBestPortfolioImage(images) {
    if (!images || images.length === 0) return null;

    // First try to find cover image
    const coverImage = images.find(img => img.isCover === true);
    if (coverImage) return coverImage;

    // Then sort by sortOrder and take first
    const sortedImages = [...images].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
    return sortedImages[0];
}

function ProjectInfo({ project, imgCheckmark }) {
    return (
        <>
            <span className="section-tag">{project.tag}</span>
            <h2 className="pf-section__title">{project.title}</h2>
            <p className="pf-section__desc">{project.desc}</p>
            <div className="pf-section__tech-block">
                <div className="pf-section__tech-label">
                    <span className="pf-section__tech-label-text">{project.techLabel}</span>
                </div>
                <div className="pf-section__tech-tags">
                    {project.tech.map((t, j) => (
                        <span key={j} className="tech-tag">{t}</span>
                    ))}
                </div>
            </div>
            <ul className="pf-section__features">
                {project.features.map((f, j) => (
                    <li key={j} className="pf-section__feature-item">
                        <span className="pf-section__check">✓</span>
                        {f}
                    </li>
                ))}
            </ul>
        </>
    )
}

function PortfolioImage({ imageUrl, altText, accentColor, hasMultipleImages, imageCount }) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    if (hasError) {
        return (
            <div className="portfolio-image-error" style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f3f4f6',
                borderRadius: '12px',
                color: '#6b7280'
            }}>
                <span>Image failed to load</span>
            </div>
        );
    }

    return (
        <div className="portfolio-image-wrapper" style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            borderRadius: '12px',
            overflow: 'hidden',
            border: `1px solid ${accentColor}33`,
            background: '#f9fafb'
        }}>
            {isLoading && (
                <div className="image-skeleton" style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 1.5s infinite'
                }} />
            )}
            <img
                src={imageUrl}
                alt={altText}
                className="portfolio-image"
                onLoad={() => setIsLoading(false)}
                onError={() => setHasError(true)}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: isLoading ? 0 : 1,
                    transition: 'opacity 0.3s ease'
                }}
            />
            {hasMultipleImages && (
                <div className="image-gallery-indicator" style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    background: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '500',
                    backdropFilter: 'blur(4px)'
                }}>
                    <span>📸 {imageCount} {imageCount === 1 ? 'image' : 'images'}</span>
                </div>
            )}
        </div>
    );
}

export default function PortfolioPage() {
    const [dynamicProjects, setDynamicProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await getPortfolioItems();

                if (data && data.length > 0) {
                    const cardTypes = ['cyber', 'cloud', 'studio'];
                    const sides = ['right', 'left'];
                    const accents = ['var(--color-teal)', '#3b82f6', '#a855f7'];

                    const mapped = await Promise.all(data.map(async (item, i) => {
                        let imageData = null;
                        let imageUrl = null;
                        let altText = item.title;

                        try {
                            const images = await getPortfolioImages(item.id);
                            if (images && images.length > 0) {
                                imageData = images;
                                const bestImage = getBestPortfolioImage(images);
                                imageUrl = bestImage?.imageUrl || images[0]?.imageUrl;
                                altText = bestImage?.altTextOverride || item.title;
                            }
                        } catch (e) {
                            console.error(`Failed to fetch images for item ${item.id}:`, e);
                        }

                        return {
                            id: item.id,
                            tag: item.summary || 'Project',
                            title: item.title,
                            desc: item.description,
                            techLabel: 'Technologies',
                            tech: item.technologies || ['React', 'Node.js', 'Python'],
                            features: item.features || [
                                'Custom solution tailored to client needs',
                                'Scalable architecture design',
                                'Comprehensive testing and QA',
                                'Ongoing support and maintenance'
                            ],
                            side: sides[i % 2],
                            accentColor: accents[i % 3],
                            cardType: cardTypes[i % 3],
                            imageUrl: imageUrl,
                            imageData: imageData,
                            altText: altText,
                            hasMultipleImages: imageData ? imageData.length > 1 : false,
                            imageCount: imageData ? imageData.length : 0
                        };
                    }));

                    setDynamicProjects(mapped);
                }
            } catch (err) {
                console.error("Failed to load public portfolio items", err);
                setError("Failed to load portfolio items. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const displayProjects = dynamicProjects.length > 0 ? dynamicProjects : projects;

    // Add keyframe animation for skeleton loading
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes shimmer {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
            }
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    if (loading) {
        return (
            <>
                <Navbar />
                <main className="page">
                    <section className="portfolio-page-hero">
                        <div className="portfolio-page-hero__content">
                            <h1 className="portfolio-page-hero__title">
                                OUR <span>PORTFOLIO</span>
                            </h1>
                            <p className="portfolio-page-hero__subtitle">
                                Showcase of our digital craftsmanship. Where complex problems meet
                                elegant, high-performance solutions.
                            </p>
                        </div>
                    </section>
                    <div className="portfolio-loading" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '4rem 2rem',
                        minHeight: '300px'
                    }}>
                        <div className="loading-spinner" style={{
                            width: '40px',
                            height: '40px',
                            border: '3px solid #f3f3f3',
                            borderTop: `3px solid var(--color-teal)`,
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                            marginBottom: '1rem'
                        }} />
                        <style>{`
                            @keyframes spin {
                                0% { transform: rotate(0deg); }
                                100% { transform: rotate(360deg); }
                            }
                        `}</style>
                        <p style={{ color: '#6b7280' }}>Loading portfolio projects...</p>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    if (error) {
        return (
            <>
                <Navbar />
                <main className="page">
                    <section className="portfolio-page-hero">
                        <div className="portfolio-page-hero__content">
                            <h1 className="portfolio-page-hero__title">
                                OUR <span>PORTFOLIO</span>
                            </h1>
                            <p className="portfolio-page-hero__subtitle">
                                Showcase of our digital craftsmanship. Where complex problems meet
                                elegant, high-performance solutions.
                            </p>
                        </div>
                    </section>
                    <div className="portfolio-error" style={{
                        textAlign: 'center',
                        padding: '4rem 2rem',
                        color: '#ef4444'
                    }}>
                        <p>{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            style={{
                                marginTop: '1rem',
                                padding: '0.5rem 1rem',
                                background: 'var(--color-teal)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Try Again
                        </button>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <main className="page">
                {/* Hero Section */}
                <section className="portfolio-page-hero">
                    <div className="portfolio-page-hero__content">
                        <h1 className="portfolio-page-hero__title">
                            OUR <span>PORTFOLIO</span>
                        </h1>
                        <p className="portfolio-page-hero__subtitle">
                            Showcase of our digital craftsmanship. Where complex problems meet
                            elegant, high-performance solutions.
                        </p>
                    </div>
                </section>

                {/* Projects Section */}
                {displayProjects.map((project, i) => {
                    const CardComp = cardComponents[project.cardType] || cardComponents.cyber

                    const VisualContent = () => (
                        project.imageUrl ? (
                            <PortfolioImage
                                imageUrl={project.imageUrl}
                                altText={project.altText}
                                accentColor={project.accentColor}
                                hasMultipleImages={project.hasMultipleImages}
                                imageCount={project.imageCount}
                            />
                        ) : (
                            <CardComp />
                        )
                    );

                    return (
                        <section
                            key={project.id || i}
                            className={`pf-section pf-section--${project.side}`}
                            style={{ '--accent': project.accentColor }}
                        >
                            <div className="pf-section__container">
                                {project.side === 'right' ? (
                                    <>
                                        <div className="pf-section__visual">
                                            <VisualContent />
                                        </div>
                                        <div className="pf-section__info">
                                            <ProjectInfo project={project} imgCheckmark={imgCheckmark} />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="pf-section__info">
                                            <ProjectInfo project={project} imgCheckmark={imgCheckmark} />
                                        </div>
                                        <div className="pf-section__visual">
                                            <VisualContent />
                                        </div>
                                    </>
                                )}
                            </div>
                        </section>
                    )
                })}
            </main>
            <Footer />
        </>
    )
}