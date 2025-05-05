import React, { useState, useEffect } from "react"; // ajoute useState et useEffect ici
import { Link } from "react-router-dom";
import emailjs from "emailjs-com";
import DeroulantSection from "../components/DeroulantSection/DeroulantSection";
import "./Accueil.css";
import { motion } from "framer-motion";

const prestations = [
  {
    title: "Accompagnement spécifique",
    image: "/images/prestation1.png",
    text: "Après analyse de votre parcours personnel et professionnel, et en fonction de vos qualités, de vos attentes et besoins, nous établissons un plan de carrière personnalisé comprenant la mise en œuvre progressive de moyens adaptés pour atteindre chacun des objectifs visés.",
  },
  {
    title: "Suivi physique complet",
    image: "/images/prestation2.png",
    text: "Un rendez-vous d’entrée est organisé avec notre physiothérapeute pour effectuer un bilan complet et, le cas échéant, des soins si nécessaire. Des tests fonctionnels de force et d’effort sont effectués (coordination, proprioception, explosivité, etc.). Sur cette base, nous établissons des programmes spécifiques pour améliorer les performances physiques de nos sportifs et réduire les risques de blessures. Dans ce cadre, il convient de préciser que nos spécialistes proposent un suivi, tant physique que nutritionnel, sur le long terme.",
  },
  {
    title: "Négociation de contrats",
    image: "/images/prestation3.png",
    text: "Nous négocions – si nécessaire revoyons - l’ensemble des contrats de nos sportifs et nous nous assurons que leurs droits soient respectés tout au long de leurs carrières.",
  },
  {
    title: "Gestion du droit à l'image et management sportif",
    image: "/images/prestation4.png",
    text: "Nous recherchons et négocions aux meilleures conditions les contrats de sponsoring et assurons une couverture média. Nous veillons également au respect de l’image de marque du sportif.",
  },
  {
    title: "Suivi & transfert",
    image: "/images/prestation5.png",
    text: "Grâce à notre réseau fiable, nous assurons tout placement ou transfert vers des clubs en adéquation avec le parcours et le niveau actuel du joueur.",
  },
  {
    title:
      "Conseils juridiques et conseils en matière de gestion du patrimoine",
    image: "/images/prestation6.png",
    text: "Nous sommes à la disposition de nos sportifs pour toutes les démarches auxquelles ils pourraient être confrontés tant dans la sphère professionnelle que privée, notamment en matière de sauvegarde et de gestion des avoirs et du patrimoine.",
  },
];

const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (section) {
    const offset = -100; // Décalage pour que le titre soit bien visible (ajuste selon la hauteur du menu)
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
      "service_4ae3ugo", // Remplace avec ton ID de service
      "template_br7glnr", // Remplace avec ton ID de template
      event.target,
      "5g5sHbl-t-4j-IkBf" // Remplace avec ton ID utilisateur EmailJS
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

  event.target.reset(); // Réinitialise le formulaire après l'envoi
};

const fadeInVariant = {
  hidden: { opacity: 0, y: 50 }, // L'élément commence caché
  visible: { opacity: 1, transition: { duration: 0.8 } }, // Apparition fluide
  exit: { opacity: 0, transition: { duration: 0.8 } }, // Disparition vers le haut
};

const Accueil = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300); // affiche après 300px
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
        <h2 className="contenu-titre">Notre passion, notre métier</h2>

        <p className="contenu-texte">
          Constituée par trois associés provenant d'horizons professionnels
          différents, Rising Management est une agence de management sportif
          suisse active dans le domaine du football.
          <br />
          <br />
          Les compétences propres de chaque associé permettent à Rising
          Management de fournir un encadrement complet aux sportifs qu'elle
          accompagne. L’agence suit et conseille ses joueurs sur tous les
          aspects essentiels à la construction d'une carrière réussie.
          <br />
          <br />
          Leurs profils spécialisés dans les métiers du management sportif, de
          la santé et de la communication, comme du droit du sport, offrent
          toutes les compétences et l’expertise nécessaires à l’accompagnement
          professionnel de sportifs de haut niveau.
          <br />
          <br />
          Convaincue que la réussite dépend aussi bien du talent que du travail,
          notre agence s’est en outre adjoint les conseils de partenaires
          externes, pointus dans leur domaine d’expertise, pour encore augmenter
          les chances de ses joueurs d’atteindre leurs objectifs.
        </p>

        <button
          className="contenu-bouton"
          onClick={() => scrollToSection("contact")}
        >
          Contact
        </button>
      </motion.div>

      {/* Cinquième bloc de contenu */}

      <motion.div
        className="contenu cinquieme-contenu"
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInVariant}
      >
        <h2 className="contenu-titre">Notre équipe</h2>
        <div className="equipe-container">
          {/* Ilir Aliji */}
          <div className="equipe-box">
            <h3 className="equipe-titre">Ilir Aliji</h3>
            <h4 className="equipe-role">RECRUTEUR & GESTION DES MÉDIAS</h4>
            <p className="equipe-texte">
              En possession d’un Baccalauréat en Sciences de l’Éducation délivré
              par l’Université de Genève, Ilir a suivi une formation d’agent
              sportif, en parallèle de son cursus universitaire, à l’École des
              Agents de Joueurs de Football (EAJF). Issu d’un milieu de
              passionnés, l’engouement d’Ilir pour le football fait partie de
              son ADN. En effet, à son parcours académique s’ajoute son
              expérience footballistique de plus de 20 ans, au cours de laquelle
              Ilir a foulé les pelouses vertes en tant que joueur, entraîneur et
              arbitre. Co-fondateur de Rising Management, il est responsable du
              recrutement et de la gestion des médias. ​ De par sa formation
              d’agent sportif et sa pratique du football, il a l’expérience
              nécessaire pour détecter le haut potentiel des joueurs qui
              évoluent dans un environnement exigeant et souvent ambitieux. Les
              aider à fixer des objectifs réalistes et réalisables, à mettre en
              place des mesures de progression, à négocier des tournants
              personnels parfois difficiles en toute confiance et sécurité, tels
              sont les objectifs qu’Ilir s’est fixés.
            </p>
            <Link
              to="mailto:ilir.aliji@risingmngt.ch"
              className="equipe-bouton"
            >
              Contact
            </Link>
          </div>

          {/* Nicolas Gasbarro */}
          <div className="equipe-box">
            <h3 className="equipe-titre">Nicolas Gasbarro</h3>
            <h4 className="equipe-role">RÉPONDANT LÉGAL & MANAGÉRIAL</h4>
            <p className="equipe-texte">
              Juriste de formation, Nicolas est titulaire d’un Bachelor et d’un
              Master en droit du sport, délivrés par les Universités de Genève
              et de Neuchâtel. Grand passionné de football, il a pratiqué ce
              sport en club depuis sa plus jeune enfance. ​ Il lui est ainsi
              apparu comme une évidence de co-fonder Rising Management.
              Valablement habilité à pratiquer le placement de sportifs au
              niveau national et international pour le compte de Rising
              Management (OCE & SECO), Nicolas en est le répondant légal et
              managérial. ​ Intéressé par l’environnement professionnel et
              personnel dans lequel évoluent les sportifs, attentif à leurs
              conditions physiques et psychologiques comme de leurs besoins
              nécessitant un accompagnement sérieux, Nicolas est en mesure de
              conseiller/représenter les sportifs sur tous les aspects
              essentiels entourant leur carrière, tout en prenant en compte leur
              brièveté. Nicolas intervient autant dans le cadre de négociations
              contractuelles et conditions de transferts que sur des questions
              de sponsoring et d’assurance.
            </p>
            <Link
              to="mailto:n.gasbarro@risingmngt.ch"
              className="equipe-bouton"
            >
              Contact
            </Link>
          </div>

          {/* Arthur Armand-Ugon */}
          <div className="equipe-box">
            <h3 className="equipe-titre">Arthur Armand-Ugon</h3>
            <h4 className="equipe-role">PHYSIOTHÉRAPEUTE & PERSONAL TRAINER</h4>
            <p className="equipe-texte">
              Depuis l'obtention de son diplôme de Physiothérapie à la Haute
              Ecole de Santé de Genève, Arthur travaille principalement avec des
              sportifs, tant amateurs que professionnels. Il exerce son métier
              depuis plusieurs années au Physio-Centre de Terre-Sainte, centre
              dans lequel Arthur propose également des séances de coaching
              sportif privé. Co-fondateur de RM Sports, il est responsable du
              secteur santé. À son expérience professionnelle s’ajoutent les
              divers postes qu’il a occupés en dehors du cabinet, notamment dans
              des clubs de football suisse (semi-professionnel et professionnel)
              et au niveau national dans le rugby féminin. Sportif et grand fan
              de football, il a fait de sa passion son métier. Bienveillant, il
              assure un suivi physique des joueurs de l'agence, notamment, par
              le biais de bilans complets et tests fonctionnels. Cela permet à
              Arthur de proposer des programmes personnalisés pour optimiser
              leurs performances, prévenir les blessures et ainsi suivre leur
              évolution. ​ Arthur dispose de toutes les compétences requises
              pour permettre aux joueurs - quels que soient leurs niveaux -
              d’améliorer leur progression physique générale.
            </p>
            <Link
              to="mailto:a.armandugon@risingmngt.ch"
              className="equipe-bouton"
            >
              Contact
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Sixième bloc de contenu */}
      <motion.div
        className="contenu sixieme-contenu"
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInVariant}
      >
        <h2 className="contenu-titre">Notre mission</h2>
        <p>
          Rising Management est une agence de management sportif créée à
          l’initiative de passionnés de sports, qui partagent des valeurs
          communes telles que l’engagement, le respect, la solidarité, l'éthique
          et la bienveillance.
        </p>

        <br />

        <p>
          Inscrite dans une démarche dynamique, notre agence repose sur la
          conjonction des talents et des compétences : en constante mobilisation
          de ses ressources, de ses expertises et de son réseau de partenaires
          externes, elle s’est fixé pour objectifs :
        </p>

        <br />

        <ul className="mission-list">
          <li>
            de conduire les meilleurs potentiels – aussi bien en termes de
            détermination que d’organisation - vers la réussite en les
            accompagnant, les conseillant et les orientant vers des choix
            cohérents et garants d’un déroulement harmonieux d’une carrière
            sportive.
          </li>
        </ul>
        <h3>Comment?</h3>
        <p>
          En fonction des profils, des attentes et des besoins, notre agence
          offre aux :
        </p>
        <ul className="mission-list">
          <li>
            <u>Joueurs amateurs</u> (mineurs ou non qui projettent de faire
            carrière dans le football) : un accompagnement, un suivi
            personnalisé tant sur le plan physique que sportif ainsi que des
            conseils extra-sportifs avisés (juridique, scolaire, etc.), tout en
            assurant une parfaite adéquation avec leurs obligations scolaires et
            professionnelles. ​
          </li>
          <br />
          <li>
            <u>Joueurs professionnel</u> : une aide pratique et significative
            visant à améliorer et développer leur potentiel et leurs
            performances, un soutien intégral, une entière assistance tant au
            niveau juridique, médical, psychologique que physique ainsi qu’une
            prise en charge de tous les aspects de leur carrière (gestion des
            contrats, du sponsoring, du droit à l’image, de toutes les démarches
            administratives privées ou professionnelles) comme de leur
            réorientation au terme de leur parcours sportif. ​
          </li>
        </ul>
        <img src="/images/mission2.png" alt="" />
        <h2>Des prestations personnalisées :</h2>
        <ul className="mission-list">
          <li>
            Élaboration d’un plan de carrière individuel & mise en place de
            mesures permettant d’atteindre les objectifs fixés.
          </li>
          <li>
            Élaboration d’un bilan de santé personnel & conseils de nutrition.
          </li>
          <li>
            Accompagnement sur le terrain par notre équipe utile à chaque joueur
            tant au niveau des conseils techniques que du suivi pédagogique.
          </li>
          <li>
            Organisation de séances particulières de coaching sportif visant à
            améliorer les performances globales et à prévenir les blessures.
          </li>
          <li>Négociation de contrats & optimisation des conditions.</li>
          <li>
            Gestion du droit à l’image & communications (sponsors, réseaux
            sociaux, etc.).
          </li>
          <li>Suivi et analyse des performances sportives.</li>
          <li>
            Mise en relation avec des clubs/sélections en adéquation avec les
            objectifs et niveau du sportif.
          </li>
          <li>Conseils juridiques & gestion des avoirs comme du patrimoine.</li>
        </ul>
        <div className="bouton-container">
          <button
            className="btn-decouvrir"
            onClick={() => scrollToSection("nos-prestations")}
          >
            En découvrir plus
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
        <h2 className="contenu-titre">Nos prestations</h2>

        {/* Sections déroulantes avec alternance de l'image */}
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
      {/* Troisième bloc de contenu */}
      <motion.div
        className="contenu troisieme-contenu"
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInVariant}
      >
        {" "}
        <h2 className="contenu-titre">Autorisations</h2>
        <div className="autorisations-container">
          {/* Premier carré avec un PDF */}
          <div className="autorisation-box">
            <p>
              Autorisation d'exercer le placement privé intéressant l'étranger
            </p>
            <p className="personalisableRow">
              Délivrée par le Secrétariat d'Etat à l'économie (SECO)
            </p>
            <a
              href="/pdfs/autorisation.pdf"
              download="Autorisation.pdf"
              className="download-link"
            >
              Télécharger le PDF
            </a>
          </div>

          {/* Deuxième carré avec un PDF */}
          <div className="autorisation-box">
            <p>Autorisation de pratiquer le placement privé en Suisse</p>
            <p className="personalisableRow">
              Délivrée par l'office cantonal de l'emploi de Genève (OCE)
            </p>
            <a
              href="/pdfs/autorisationPlacementPrivé(OCE).pdf"
              download="autorisationPlacementPrivé(OCE)"
              type="application/pdf"
              className="download-link"
            >
              Télécharger le PDF
            </a>
          </div>

          {/* Troisième carré sans PDF */}
          <div className="autorisation-box">
            <p>Licence d'Agent</p>
            <p className="personalisableRow">N°202310-4948</p>
            <p>Délivrée par la FIFA</p>
          </div>
        </div>
      </motion.div>
      {/* Quatrième bloc de contenu */}
      <motion.div
        className="contenu quatrieme-contenu"
        id="nos-prestations"
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInVariant}
      >
        <h2 className="contenu-titre">Nos partenaires</h2>

        <div className="partenaires-container">
          {/* Allianz */}
          <div className="partenaire-box">
            <img
              src="/images/allianz.png"
              alt="Allianz"
              className="partenaire-image"
            />
            <h3 className="partenaire-titre">Allianz Suisse</h3>
            <p className="partenaire-texte">
              Nous sommes ravis de vous annoncer notre partenariat avec Allianz,
              leader mondial de l'assurance. Ensemble, nous ouvrons de nouvelles
              opportunités à nos athlètes, offrant une gestion de carrière et
              une protection de qualité.
            </p>
          </div>

          {/* Matteo */}
          <div className="partenaire-box">
            <img
              src="/images/matteo.png"
              alt="Matteo Rezzonico"
              className="partenaire-image"
            />
            <h3 className="partenaire-titre">Matteo Rezzonico</h3>
            <p className="partenaire-texte">
              Préparateur mental agrée par la Fédération Suisse de psychologie
              du sport ​ Titulaire d'un CAS en préparation mentale (Université
              de Lausanne).
            </p>
          </div>

          {/* Partenaire 3 */}
          <div className="partenaire-box">
            <img
              src="/images/physioCentre.png"
              alt="Physio Centre de Terre-Sainte"
              className="partenaire-image"
            />
            <h3 className="partenaire-titre">Physio Centre de Terre-Sainte</h3>
            <p className="partenaire-texte">
              Suivi médical, conseils de santé, alimentaires, etc.
            </p>
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
        <h1>Contactez-nous !</h1>

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
          <h3>Envoyez-nous un message</h3>
          <br />
          <br />
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Nom :</label>
                <input type="text" name="nom" required />
              </div>

              <div className="form-group">
                <label>Email :</label>
                <input type="email" name="email" required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Adresse :</label>
                <input type="text" name="adresse" />
              </div>

              <div className="form-group">
                <label>Téléphone :</label>
                <input type="tel" name="telephone" />
              </div>
            </div>

            <div className="form-group full-width">
              <label>Objet :</label>
              <input type="text" name="objet" required />
            </div>

            <div className="form-group full-width">
              <label>Message :</label>
              <textarea name="message" rows="5" required></textarea>
            </div>

            <button type="submit" className="btn-envoyer">
              Envoyer
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
