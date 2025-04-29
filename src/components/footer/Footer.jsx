import { FaInstagram, FaWhatsapp, FaFacebook, FaTiktok} from "react-icons/fa";
import React from 'react'
import "./footer.css"

export default function Footer() {
    return (
        <footer className="footer">
          <section className="footer-content">
            
            <section className="footer-section">
              <p>&copy; {new Date().getFullYear()} JolyGuacamoly-Todos los derechos reservados.</p>
              <p>El sabor que conecta ❤️</p>
            </section>
    
            <section className="footer-section redes">
              <h4>¡Síguenos para saber mas de nosotros!</h4>
              <div className="iconos-redes">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <FaInstagram size={30} />
                </a>
                <a href="https://wa.me/tu-numero" target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp size={30} />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <FaFacebook size={30} />
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                  <FaTiktok size={30} />
                </a>
              </div>
            </section>
    
          </section>
        </footer>
      );
}
