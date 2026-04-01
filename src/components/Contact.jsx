import { Check, ChevronDown } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const benefits = [
    "Free initial consultation",
    "Custom architecture & roadmap",
    "Enterprise-grade security",
    "Transparent pricing model"
  ];

  return (
    <section className="contact section fade-in" id="contact">
      <div className="container contact__container">
        
        <div className="contact__content">
          <div className="contact__kicker">
            <span>WHY</span>
            <span>WHERE</span>
            <span>WITH US</span>
          </div>
          <h2 className="contact__title">Engineering Solutions That Scale</h2>
          <p className="contact__desc">
            Whether you need cybersecurity, cloud migration, or full-scale product development, our team delivers secure, scalable, and future-proof systems.
          </p>
          
          <ul className="contact__benefits">
            {benefits.map((text, i) => (
              <li key={i}>
                <Check color="#2ebfa5" size={18} className="contact__check" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="contact__form-wrapper">
          <form className="contact__form" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Full Name" className="contact__input" />
            <input type="email" placeholder="Email Address" className="contact__input" />
            
            <div className="contact__select-wrapper">
              <select className="contact__input contact__select" defaultValue="">
                <option value="" disabled hidden>Select Project Type</option>
                <option value="web">Web Development</option>
                <option value="cloud">Cloud Migration</option>
                <option value="cyber">Cybersecurity</option>
                <option value="other">Other</option>
              </select>
              <ChevronDown className="contact__select-icon" size={20} color="#6b7280" />
            </div>

            <textarea 
              placeholder="Describe your project requirements..." 
              className="contact__input contact__textarea"
              rows={4}
            ></textarea>
            
            <button type="submit" className="contact__submit">
              Request Consultation
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
