import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../LanguageSelector";
import "./Menu.css";

const Menu = () => {
  const { t } = useTranslation();

  return (
    <nav className="menu">
      <div className="menu-container">
        {/* Logo + texte à gauche */}
        <div className="menu-left">
          <img className="menu-logo-left" src="/images/logo.png" alt="Logo" />
          <div className="menu-title">{t("menu.title")}</div>
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

        {/* Sélecteur de langue à droite */}
        <div className="menu-right">
          <LanguageSelector />
        </div>
      </div>
    </nav>
  );
};

export default Menu;
