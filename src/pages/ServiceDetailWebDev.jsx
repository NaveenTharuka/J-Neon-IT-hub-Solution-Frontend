import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import reactLogo from '../assets/image.png'

export default function ServiceDetailPage() {
    const { id: paramId } = useParams()
    const [service, setService] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        // Get service ID from URL param, fallback to localStorage
        const storedService = localStorage.getItem('selectedService')
        const id = paramId || (storedService ? JSON.parse(storedService).id : null)
        if (!id) {
            setError('No service selected')
            setLoading(false)
            return
        }

        const fetchService = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/services/${id}`)
                if (!response.ok) throw new Error('Failed to fetch service')
                const data = await response.json()
                setService(data)
            } catch (err) {
                console.error('Fetch error:', err)
                setError(err.message)
                // Fallback: default service if API fails
                setService({
                    id,
                    title: 'Computer Service',
                    shortDescription: 'Ensure your devices run smoothly and efficiently',
                    longDescription: 'Detailed info about this default service.',
                    icon: reactLogo,
                    plans: null
                })
            } finally {
                setLoading(false)
            }
        }

        fetchService()
    }, [paramId])

    const defaultPlans = [
        { 
            id: 1, 
            tier: 'Basic', 
            price: 'LKR 1 000', 
            features: ['Core feature access', 'Email support', 'Basic analytics'] 
        },
        { 
            id: 2, 
            tier: 'Standard', 
            price: 'LKR 10 000', 
            features: ['All Basic features', 'Priority support', 'Advanced analytics', 'API access'] 
        },
        { 
            id: 3, 
            tier: 'Premium', 
            price: 'LKR 15 000', 
            features: ['All Standard features', '24/7 phone support', 'Custom integrations', 'SLA guarantee'] 
        }
    ]

    // Use service plans if available, otherwise use default plans
    const plans = service?.plans && service.plans.length > 0 ? service.plans : defaultPlans

    return (
        <>
            <Navbar />
            <main className="page">
                {loading ? (
                    <div className="loading-container">Loading service details...</div>
                ) : error && !service ? (
                    <div className="error-container" style={{ color: 'red', padding: '2rem' }}>
                        Error: {error}
                    </div>
                ) : (
                    <>
                        <section className="svc-detail-hero">
                            <h1 className="svc-detail-hero__title">
                                <span>{service.title?.toUpperCase() || 'SERVICE'}</span>
                            </h1>
                            <p className="svc-detail-hero__desc">{service.shortDescription}</p>
                            {service.longDescription && (
                                <p className="svc-detail-hero__long-desc">{service.longDescription}</p>
                            )}
                        </section>

                        <section className="svc-detail-plans">
                            <h2 className="svc-detail-plans__title">Pricing Plans</h2>
                            <div className="svc-detail-plans__grid">
                                {plans.map((plan) => (
                                    <div key={plan.id || plan.tier} className="plan-card">
                                        <div className="plan-card__header">
                                            <img 
                                                src={service.icon || reactLogo} 
                                                alt={plan.tier} 
                                                className="plan-card__icon"
                                                onError={e => e.target.src = reactLogo}
                                            />
                                            <h3 className="plan-card__tier">{plan.tier}</h3>
                                            <p className="plan-card__price">{plan.price}</p>
                                        </div>
                                        <div className="plan-card__body">
                                            <ul className="plan-card__features">
                                                {plan.features?.map((feature, index) => (
                                                    <li key={index} className="plan-card__feature">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <path d="M13.333 4L6 11.333L2.667 8" strokeLinecap="round" strokeLinejoin="round"/>
                                                        </svg>
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="plan-card__footer">
                                            <Link to={`/services/consultation`} className="plan-card__cta">
                                                Choose Plan
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </>
                )}
            </main>
            <Footer />
        </>
    )
}