import React, { useState, useEffect } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage"; // Correct import
import Slider from "react-slick"; // Import de react-slick pour le carousel
import PropTypes from "prop-types"; // Importation de PropTypes
import "./JoueurCard.css";

const JoueurCard = ({ joueur }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoUrls, setVideoUrls] = useState([]); // État pour stocker les URLs des vidéos
  const [imageUrl, setImageUrl] = useState(""); // État pour stocker l'URL de l'image

  // Fonction pour ouvrir la modale
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Fonction pour fermer la modale
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Récupérer l'image depuis Firebase Storage
  useEffect(() => {
    const fetchImage = async () => {
      if (joueur.image) {
        try {
          const storage = getStorage();
          // Utiliser le nom de l'image dans Firebase Storage sous le dossier images/joueurs/
          const imageRef = ref(storage, `images/joueurs/${joueur.image}`);
          const imageUrl = await getDownloadURL(imageRef);
          setImageUrl(imageUrl); // Met à jour l'état avec l'URL de l'image
        } catch (error) {
          console.log("Erreur de récupération de l'image :", error);
        }
      }
    };

    fetchImage(); // Appeler la fonction pour récupérer l'image à chaque fois que le joueur est mis à jour
  }, [joueur.image]);

  // Paramètres du carousel
  const sliderSettings = {
    dots: true, // Affiche les points de navigation
    infinite: true, // Permet un carousel infini
    speed: 500, // Vitesse de transition
    slidesToShow: 1, // Affiche une seule vidéo à la fois
    slidesToScroll: 1, // Passe à la vidéo suivante à chaque clic
    autoplay: true, // Active l'auto play
    autoplaySpeed: 3000, // Délai entre chaque slide (en ms)
  };

  // Récupérer les vidéos depuis Firebase Storage
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const storage = getStorage();
        const videoUrls = await Promise.all(
          joueur.videos.map(async (video) => {
            const videoRef = ref(storage, `videos/${video}`); // Assurez-vous que le chemin est correct
            const videoUrl = await getDownloadURL(videoRef);
            return videoUrl;
          })
        );
        console.log("Vidéo URLs récupérées :", videoUrls);
        setVideoUrls(videoUrls); // Met à jour l'état avec les URLs
      } catch (error) {
        console.log("Erreur de récupération des vidéos :", error);
      }
    };

    if (joueur.videos && joueur.videos.length > 0) {
      fetchVideos();
    }
  }, [joueur.videos]);

  return (
    <div>
      <div className="joueur-card" onClick={openModal}>
        {/* Si l'image n'est pas disponible, afficher une image par défaut */}
        <img
          src={imageUrl || "/images/default-image.jpg"}
          alt={joueur.nom}
          className="joueur-image"
        />
        <h3 className="joueur-nom">{joueur.nom}</h3>
        <h4 className="joueur-club">{joueur.club}</h4>

        <div className="joueur-infos">
          <p>
            <strong>Poste :</strong> {joueur.poste}
          </p>
          <p>
            <strong>Pied :</strong> {joueur.pied}
          </p>
          <p>
            <strong>Date de naissance :</strong> {joueur.dateNaissance}
          </p>
          <p>
            <strong>Taille :</strong> {joueur.taille} cm
          </p>
          <p>
            <strong>Poids :</strong> {joueur.poids} kg
          </p>
          <p>
            <strong>Nationalité :</strong> {joueur.nationalite}
          </p>
        </div>
      </div>

      {/* Modale */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeModal}>
              X
            </span>
            <h2>{joueur.nom}</h2>

            {/* Carousel des vidéos */}
            <div className="video-container">
              <Slider {...sliderSettings}>
                {videoUrls.length > 0 ? (
                  videoUrls.map((videoUrl, index) => (
                    <div key={index}>
                      <video controls>
                        <source src={videoUrl} type="video/mp4" />
                        Votre navigateur ne supporte pas la balise vidéo.
                      </video>
                    </div>
                  ))
                ) : (
                  <p>Aucune vidéo disponible</p>
                )}
              </Slider>
            </div>

            <h3>Transfermarkt Profile</h3>
            <a
              href={joueur.transfermarkt}
              target="_blank"
              rel="noopener noreferrer"
              className="transfermarkt-link"
            >
              {joueur.transfermarkt}
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

// Validation des props
JoueurCard.propTypes = {
  joueur: PropTypes.shape({
    nom: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    club: PropTypes.string.isRequired,
    poste: PropTypes.string.isRequired,
    pied: PropTypes.string.isRequired,
    dateNaissance: PropTypes.string.isRequired,
    taille: PropTypes.number.isRequired,
    poids: PropTypes.number.isRequired,
    nationalite: PropTypes.string.isRequired,
    transfermarkt: PropTypes.string.isRequired,
    videos: PropTypes.arrayOf(PropTypes.string), // Validation des vidéos
  }).isRequired,
};

export default JoueurCard;
