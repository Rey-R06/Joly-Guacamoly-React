import React from 'react';
import { FaFacebook, FaWhatsapp, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './footer.css';

function Footer() {
  const companyInfo = {
    name: "Joly",
    description: "No somos una salsa, somos un producto especial y nos enfocamos en entregar un producto natural y vegetariano.",
    social: {
      facebook: "#",
      whatsapp: "https://api.whatsapp.com/send?phone=+573003004590",
      instagram: "#"
    },
    contact: {
      address: "Poblado, Medellín, Antioquia, Colombia",
      shortAddress: "Poblado, Medellín, CO",
      phone: "+57 300-300-4590",
      formattedPhone: "+57 301 604 1308",
      email: "jolydips@gmail.com"
    },
    schedule: {
      weekdays: "8:AM - 5:PM",
      weekends: "12:PM - 5:PM"
    }
  };

  return (
    <>
      {/* Contact Info Section - Centered */}
      <section className="contact-bar">
        <div className="contact-container">
          <div className="contact-item">
            <div className="contact-icon">
              <FaPhone />
            </div>
            <div className="contact-text">
              <h4>Celular</h4>
              <p>
                <a href={`tel:${companyInfo.contact.phone}`}>
                  {companyInfo.contact.formattedPhone}
                </a>
              </p>
            </div>
          </div>
          
          <div className="contact-item">
            <div className="contact-icon">
              <FaEnvelope />
            </div>
            <div className="contact-text">
              <h4>Email</h4>
              <p>
                <a href={`mailto:${companyInfo.contact.email}`}>
                  {companyInfo.contact.email}
                </a>
              </p>
            </div>
          </div>
          
          <div className="contact-item">
            <div className="contact-icon">
              <FaMapMarkerAlt />
            </div>
            <div className="contact-text">
              <h4>Ubicación</h4>
              <p>{companyInfo.contact.shortAddress}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="main-footer">
        <div className="footer-content">
          <div className="footer-columns">
            {/* Company Info */}
            <div className="footer-col">
              <h3>{companyInfo.name}</h3>
              <p>{companyInfo.description}</p>
            </div>

            {/* Social Media */}
            <div className="footer-col">
              <h3>Redes sociales</h3>
              <div className="social-links">
                <a href={companyInfo.social.facebook} aria-label="Facebook">
                  <FaFacebook />
                </a>
                <a href={companyInfo.social.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  <FaWhatsapp />
                </a>
                <a href={companyInfo.social.instagram} aria-label="Instagram">
                  <FaInstagram />
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div className="footer-col">
              <h3>Contacto</h3>
              <p>{companyInfo.contact.address}</p>
              <p><a href={`tel:${companyInfo.contact.phone}`}>{companyInfo.contact.phone}</a></p>
              <p><a href={`mailto:${companyInfo.contact.email}`}>{companyInfo.contact.email}</a></p>
            </div>

            {/* Schedule */}
            <div className="footer-col">
              <h3>Horario</h3>
              <p><span className="highlight">Lunes-viernes:</span> {companyInfo.schedule.weekdays}</p>
              <p><span className="highlight">Sábados-Domingos:</span> {companyInfo.schedule.weekends}</p>
            </div>
          </div>

          <div className="copyright">
            <p>
              Todos los derechos reservados. &copy; {new Date().getFullYear()} {companyInfo.name}Dips
              <span> Design By: N/A</span>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
