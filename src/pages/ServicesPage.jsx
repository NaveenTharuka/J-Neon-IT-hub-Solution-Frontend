import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import reactLogo from '../assets/image.png'
import { fetchAllServices, fetchServiceById } from '../services/services.api'
import useScrollFadeIn from '../hooks/useScrollFadeIn'

const imgEllipse = reactLogo
const defaultIcon = reactLogo

export default function ServicesPage() {
    useScrollFadeIn();
    const [services, setServices] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetchAllServices();

                const data = res?.data || res;

                const activeServices = Array.isArray(data)
                    ? data.filter(item => item.active === true)
                    : [];

                setServices(activeServices);

            } catch (error) {
                console.log(error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Navbar />
            <main className="page">
                <section className="services-page-hero">
                    <div className="services-page-hero__content fade-in">
                        <h1 className="services-page-hero__title">
                            OUR <span>SERVICES</span>
                        </h1>
                        <p className="services-page-hero__subtitle">
                            Choose from our range of solutions. Each plan comes with flexible pricing options.
                        </p>
                    </div>

                    <div className="fade-in" style={{
                        display: error ? 'none' : 'block',
                        marginTop: '50px'
                    }}>
                        <h2 className="services-page-tagline__heading">
                            Choose what's <span className="gradient-text">best</span> for you
                        </h2>
                        <p className="services-page-tagline__sub">
                            Flexible packages designed for startups, growing businesses, and enterprise-grade applications.
                        </p>
                    </div>
                </section>



                <section style={{
                    display: error ? 'none' : 'block'
                }}>
                    <div className="services-page-grid__container fade-in" style={{ marginBottom: '50px' }}>

                        {loading && <div className="loading-state">Loading services...</div>}

                        {!loading && !error && services.map(service => (
                            <div key={service.id} className="svc-card">
                                <div
                                    className="svc-card__ellipse"
                                    aria-hidden="true"
                                />

                                <div className="svc-card__body">
                                    <h3 className="svc-card__title">{service.title}</h3>
                                    <p className="svc-card__desc">{service.shortDescription}</p>
                                    <Link
                                        to={`/services/${service.id}`}
                                        className="svc-card__cta"
                                        onClick={() => localStorage.setItem('selectedService', JSON.stringify(service))}
                                    >
                                        Get Your Quote
                                        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                                            <path d="M4 10h12M10 4l6 6-6 6" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>


                {error && (
                    <div style={{
                        position: 'relative',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 9999,
                        pointerEvents: 'none'
                    }}>
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '16px',
                            padding: '24px 32px',
                            textAlign: 'center',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                            maxWidth: '400px',
                            margin: '20px'
                        }}>
                            <p style={{
                                color: 'white',
                                margin: 0,
                                fontSize: '16px',
                                fontWeight: '500',
                                textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                            }}>
                                Error: {typeof error === 'string' ? error : error?.message || 'Something went wrong'}
                            </p>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </>
    )
}