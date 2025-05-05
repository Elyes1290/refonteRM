import { Link } from "react-router-dom";
import "./Menu.css";

const Menu = () => {
  return (
    <nav className="menu">
      <div className="menu-container">
        {/* Logo + texte à gauche */}
        <div className="menu-left">
          <img className="menu-logo-left" src="/images/logo.png" alt="Logo" />
          <div className="menu-title">RM Sports Agency</div>
        </div>

        {/* Logo central qui mène à l'accueil */}
        <div className="menu-center">
          <Link to="/">
            <img
              className="menu-logo-center"
              src="/images/logo.png"
              alt="Logo Central"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
