import { useState } from 'react'
import { createContact } from '../services/contact.api'

export default function Contact() {
    const [formData, setFormData] = useState({})
    const [submitted, setSubmitted] = useState(false)

    function handleChange(e) {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        console.log(formData)
        await createContact(formData)
        setSubmitted(true)
    }

    return (
        <section className="contact" id="contact">
            <div className="contact__container">

                {/* Header */}
                <div className="contact__header fade-in">
                    <span className="contact__eyebrow">{'> CONTACT_MODULE'}</span>
                    <h2 className="contact__title">
                        Initiate <span>Communication</span>
                    </h2>
                    <p className="contact__subtitle">
                        Get in touch with our team and we'll respond within 24 hours.
                    </p>
                </div>

                {/* Form + Info layout */}
                <div className="contact__body fade-in">

                    {/* Form */}
                    <div className="contact__form-wrap">
                        {submitted ? (
                            <div className="contact__success">
                                <div className="contact__success-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 6L9 17l-5-5" />
                                    </svg>
                                </div>
                                <h3>Message Transmitted</h3>
                                <p>We've received your inquiry and will respond within 24 hours.</p>
                                <button className="contact__reset" onClick={() => { setSubmitted(false); setFormData({}); }}>
                                    Send Another →
                                </button>
                            </div>
                        ) : (
                            <form className="contact__form" onSubmit={handleSubmit} noValidate>

                                {/* Name */}
                                <div className="form-group">
                                    <label className="form-label" htmlFor="name">Name</label>
                                    <input
                                        className="form-input"
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="John Smith"
                                        value={formData.name || ''}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Email */}
                                <div className="form-group">
                                    <label className="form-label" htmlFor="email">Email</label>
                                    <input
                                        className="form-input"
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="john@company.com"
                                        value={formData.email || ''}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Message */}
                                <div className="form-group">
                                    <label className="form-label" htmlFor="message">Message</label>
                                    <textarea
                                        className="form-textarea"
                                        id="message"
                                        name="message"
                                        rows={4}
                                        placeholder="Tell us about your project or inquiry..."
                                        value={formData.message || ''}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <button className="form-submit" type="submit">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                                        <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                                    </svg>
                                    SEND MESSAGE
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Info panel */}
                    <div className="contact__info-panel">
                        <div className="contact__info-card">
                            <div className="contact__info-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                                </svg>
                            </div>
                            <div>
                                <div className="contact__info-label">Email</div>
                                <div className="contact__info-value">hello@j-neon.com</div>
                                <div className="contact__info-value">support@j-neon.com</div>
                            </div>
                        </div>

                        <div className="contact__info-card">
                            <div className="contact__info-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.18 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l1.06-1.06a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                                </svg>
                            </div>
                            <div>
                                <div className="contact__info-label">Voice</div>
                                <div className="contact__info-value">+1 (555) 123-4567</div>
                                <div className="contact__info-value">+1 (555) 987-6543</div>
                            </div>
                        </div>

                        <div className="contact__info-card">
                            <div className="contact__info-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                                </svg>
                            </div>
                            <div>
                                <div className="contact__info-label">HQ Location</div>
                                <div className="contact__info-value">123 Technology Drive</div>
                                <div className="contact__info-value">Innovation District</div>
                                <div className="contact__info-value">Tech City, TC 12345</div>
                            </div>
                        </div>

                        {/* Response time badge */}
                        <div className="contact__response-badge">
                            <span className="contact__response-dot" />
                            <span>We respond within <strong>24 hours</strong></span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}