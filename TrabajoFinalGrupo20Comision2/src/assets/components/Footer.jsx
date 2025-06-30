import { FaGithub, FaFacebook, FaLinkedin } from 'react-icons/fa';
import '../CSS//Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container text-center py-3">
        <p className="mb-1">
          &copy; {new Date().getFullYear()} Mi App de Productos
        </p>
        <p className="mb-2 small text-muted">
          Desarrollado por Grupo 20 - Comisión 2
        </p>
        <div className="social-icons">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebook />
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
