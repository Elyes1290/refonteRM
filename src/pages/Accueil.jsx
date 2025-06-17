import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import emailjs from "emailjs-com";
import DeroulantSection from "../components/DeroulantSection/DeroulantSection";
import "./Accueil.css";
import { motion } from "framer-motion";

const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (section) {
    const offset = -100;
    const sectionPosition =
      section.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: sectionPosition + offset,
      behavior: "smooth",
    });
  }
};

const handleSubmit = (event) => {
  event.preventDefault();

  emailjs
    .sendForm(
      "service_4ae3ugo",
      "template_br7glnr",
      event.target,
      "5g5sHbl-t-4j-IkBf"
    )
    .then(
      (response) => {
        console.log(
          "Email envoyé avec succès !",
          response.status,
          response.text
        );
        alert("Votre message a été envoyé !");
      },
      (error) => {
        console.log("Erreur lors de l'envoi", error);
        alert("Une erreur est survenue. Veuillez réessayer.");
      }
    );

  event.target.reset();
};

const fadeInVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
  exit: { opacity: 0, transition: { duration: 0.8 } },
};

const Accueil = () => {
  const { t } = useTranslation();
  const [showScrollTop, setShowScrollTop] = useState(false);

  const prestations = [
    {
      title: t("prestations.accompagnement_specifique"),
      image: "/images/prestation1.png",
      text: t("prestations.accompagnement_desc"),
    },
    {
      title: t("prestations.suivi_physique"),
      image: "/images/prestation2.png",
      text: t("prestations.suivi_physique_desc"),
    },
    {
      title: t("prestations.negociation_contrats"),
      image: "/images/prestation3.png",
      text: t("prestations.negociation_desc"),
    },
    {
      title: t("prestations.gestion_image"),
      image: "/images/prestation4.png",
      text: t("prestations.gestion_image_desc"),
    },
    {
      title: t("prestations.suivi_transfert"),
      image: "/images/prestation5.png",
      text: t("prestations.suivi_transfert_desc"),
    },
    {
      title: t("prestations.conseils_juridiques"),
      image: "/images/prestation6.png",
      text: t("prestations.conseils_juridiques_desc"),
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="accueil">
      {/* Premier bloc de contenu */}
      <motion.div
        className="contenu premier-contenu"
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInVariant}
      >
        <h2 className="contenu-titre">{t("accueil.passion_metier")}</h2>

        <p className="contenu-texte">
          {t("accueil.description_agence")}
          <br />
          <br />
          {t("accueil.description_complete")}
          <br />
          <br />
          {t("accueil.description_suite")}
          <br />
          <br />
          {t("accueil.description_fin")}
        </p>

        <button
          className="contenu-bouton"
          onClick={() => scrollToSection("contact")}
        >
          {t("accueil.contact_btn")}
        </button>
      </motion.div>

      {/* Section Notre équipe */}
      <motion.div
        className="contenu cinquieme-contenu"
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInVariant}
      >
        <h2 className="contenu-titre">{t("accueil.notre_equipe")}</h2>
        <div className="equipe-container">
          {/* Ilir Aliji */}
          <div className="equipe-box">
            <h3 className="equipe-titre">{t("accueil.ilir_nom")}</h3>
            <h4 className="equipe-role">{t("accueil.ilir_role")}</h4>
            <p className="equipe-texte">{t("accueil.ilir_description")}</p>
            <Link
              to="mailto:ilir.aliji@risingmngt.ch"
              className="equipe-bouton"
            >
              {t("accueil.contact_btn")}
            </Link>
          </div>

          {/* Nicolas Gasbarro */}
          <div className="equipe-box">
            <h3 className="equipe-titre">{t("accueil.nicolas_nom")}</h3>
            <h4 className="equipe-role">{t("accueil.nicolas_role")}</h4>
            <p className="equipe-texte">{t("accueil.nicolas_description")}</p>
            <Link
              to="mailto:n.gasbarro@risingmngt.ch"
              className="equipe-bouton"
            >
              {t("accueil.contact_btn")}
            </Link>
          </div>

          {/* Arthur Armand-Ugon */}
          <div className="equipe-box">
            <h3 className="equipe-titre">{t("accueil.arthur_nom")}</h3>
            <h4 className="equipe-role">{t("accueil.arthur_role")}</h4>
            <p className="equipe-texte">{t("accueil.arthur_description")}</p>
            <Link
              to="mailto:a.armandugon@risingmngt.ch"
              className="equipe-bouton"
            >
              {t("accueil.contact_btn")}
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Section Notre mission */}
      <motion.div
        className="contenu sixieme-contenu"
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInVariant}
      >
        <h2 className="contenu-titre">{t("accueil.notre_mission")}</h2>
        <p>{t("accueil.mission_description_1")}</p>

        <br />

        <p>{t("accueil.mission_description_2")}</p>

        <br />

        <ul className="mission-list">
          <li>{t("accueil.mission_objectif")}</li>
        </ul>
        <h3>{t("accueil.comment")}</h3>
        <p>{t("accueil.mission_fonction")}</p>
        <ul className="mission-list">
          <li>
            <u>{t("accueil.joueurs_amateurs")}</u>{" "}
            {t("accueil.joueurs_amateurs_desc")}
          </li>
          <br />
          <li>
            <u>{t("accueil.joueurs_pro")}</u>
            {t("accueil.joueurs_pro_desc")}
          </li>
        </ul>
        <img src="/images/mission2.png" alt="" />
        <h2>{t("accueil.prestations_personnalisees")}</h2>
        <ul className="mission-list">
          <li>{t("accueil.prestation_1")}</li>
          <li>{t("accueil.prestation_2")}</li>
          <li>{t("accueil.prestation_3")}</li>
          <li>{t("accueil.prestation_4")}</li>
          <li>{t("accueil.prestation_5")}</li>
          <li>{t("accueil.prestation_6")}</li>
          <li>{t("accueil.prestation_7")}</li>
          <li>{t("accueil.prestation_8")}</li>
          <li>{t("accueil.prestation_9")}</li>
        </ul>
        <div className="bouton-container">
          <button
            className="btn-decouvrir"
            onClick={() => scrollToSection("nos-prestations")}
          >
            {t("accueil.decouvrir_plus")}
          </button>
        </div>
      </motion.div>

      {/* Section Nos prestations */}
      <motion.div
        className="contenu second-contenu"
        id="nos-prestations"
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInVariant}
      >
        <h2 className="contenu-titre">{t("accueil.nos_prestations")}</h2>

        {prestations.map((prestation, index) => (
          <DeroulantSection
            key={index}
            index={index}
            title={prestation.title}
            image={prestation.image}
            text={prestation.text}
          />
        ))}
      </motion.div>

      {/* Section Autorisations */}
      <motion.div
        className="contenu troisieme-contenu"
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInVariant}
      >
        <h2 className="contenu-titre">{t("accueil.autorisations")}</h2>
        <div className="autorisations-container">
          <div className="autorisation-box">
            <p>{t("accueil.autorisation_etranger")}</p>
            <p className="personalisableRow">{t("accueil.delivree_seco")}</p>
            <a
              href="/pdfs/autorisation.pdf"
              download="Autorisation.pdf"
              className="download-link"
            >
              {t("accueil.telecharger_pdf")}
            </a>
          </div>

          <div className="autorisation-box">
            <p>{t("accueil.autorisation_suisse")}</p>
            <p className="personalisableRow">{t("accueil.delivree_oce")}</p>
            <a
              href="/pdfs/autorisationPlacementPrivé(OCE).pdf"
              download="autorisationPlacementPrivé(OCE)"
              type="application/pdf"
              className="download-link"
            >
              {t("accueil.telecharger_pdf")}
            </a>
          </div>

          <div className="autorisation-box">
            <p>{t("accueil.licence_agent")}</p>
            <p className="personalisableRow">N°202310-4948</p>
            <p>{t("accueil.delivree_fifa")}</p>
          </div>
        </div>
      </motion.div>

      {/* Section Nos partenaires */}
      <motion.div
        className="contenu quatrieme-contenu"
        id="nos-prestations"
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInVariant}
      >
        <h2 className="contenu-titre">{t("accueil.nos_partenaires")}</h2>

        <div className="partenaires-container">
          <div className="partenaire-box">
            <img
              src="/images/allianz.png"
              alt="Allianz"
              className="partenaire-image"
            />
            <h3 className="partenaire-titre">Allianz Suisse</h3>
            <p className="partenaire-texte">{t("accueil.allianz_desc")}</p>
          </div>

          <div className="partenaire-box">
            <img
              src="/images/matteo.png"
              alt="Matteo Rezzonico"
              className="partenaire-image"
            />
            <h3 className="partenaire-titre">Matteo Rezzonico</h3>
            <p className="partenaire-texte">{t("accueil.matteo_desc")}</p>
          </div>

          <div className="partenaire-box">
            <img
              src="/images/physioCentre.png"
              alt="Physio Centre de Terre-Sainte"
              className="partenaire-image"
            />
            <h3 className="partenaire-titre">Physio Centre de Terre-Sainte</h3>
            <p className="partenaire-texte">{t("accueil.physio_desc")}</p>
          </div>
        </div>
      </motion.div>

      {/* Section Contact */}
      <motion.div
        className="contenu septieme-contenu"
        id="contact"
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInVariant}
      >
        <h1>{t("accueil.contactez_nous")}</h1>

        <p>E-mail: admin@risingmngt.ch</p>
        <br />
        <p>Rising Management Sports Agency (SNC)</p>
        <p>148 Route de Suisse</p>
        <p>1290 Versoix</p>
        <p>Suisse</p>
        <div className="map-container">
          <iframe
            title="Rising Management Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2762.653307798308!2d6.153627676473818!3d46.28321807112167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478c65464a046631%3A0xc9f84967ec8d2b79!2s148%20Rte%20de%20Suisse%2C%201290%20Versoix%2C%20Suisse!5e0!3m2!1sfr!2sch!4v1708202923456!5m2!1sfr!2sch"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="contact-form">
          <h3>{t("accueil.envoyer_message")}</h3>
          <br />
          <br />
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>{t("accueil.nom")}</label>
                <input type="text" name="nom" required />
              </div>

              <div className="form-group">
                <label>{t("accueil.email")}</label>
                <input type="email" name="email" required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>{t("accueil.adresse")}</label>
                <input type="text" name="adresse" />
              </div>

              <div className="form-group">
                <label>{t("accueil.telephone")}</label>
                <input type="tel" name="telephone" />
              </div>
            </div>

            <div className="form-group full-width">
              <label>{t("accueil.objet")}</label>
              <input type="text" name="objet" required />
            </div>

            <div className="form-group full-width">
              <label>{t("accueil.message")}</label>
              <textarea name="message" rows="5" required></textarea>
            </div>

            <button type="submit" className="btn-envoyer">
              {t("accueil.envoyer")}
            </button>
          </form>
        </div>
      </motion.div>
      {showScrollTop && (
        <button
          className="scroll-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default Accueil;
