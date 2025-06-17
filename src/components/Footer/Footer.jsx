import { useTranslation } from "react-i18next";
import "./Footer.css";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-text">
        Rising Management
        <br />
        Sports Agency (SNC)
        <br />
        {t("footer.all_rights")}
      </div>
    </footer>
  );
};

export default Footer;
