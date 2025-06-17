import { useTranslation } from "react-i18next";
import "./LanguageSelector.css";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="language-selector">
      <button
        onClick={() => changeLanguage("fr")}
        className={`lang-btn lang-btn-fr ${
          i18n.language === "fr" ? "active" : ""
        }`}
        title="Français"
      >
        FR
      </button>
      <button
        onClick={() => changeLanguage("en")}
        className={`lang-btn lang-btn-en ${
          i18n.language === "en" ? "active" : ""
        }`}
        title="English"
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSelector;
