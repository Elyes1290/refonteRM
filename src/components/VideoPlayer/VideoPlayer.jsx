import React, { useEffect, useRef } from "react";
import videojs from "video.js"; // Importation de Video.js
import "video.js/dist/video-js.css"; // Importation des styles de Video.js

const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null); // Utilisation de useRef pour référencer le lecteur vidéo

  useEffect(() => {
    // Initialisation du lecteur vidéo avec Video.js
    const player = videojs(videoRef.current, {
      controls: true, // Afficher les contrôles
      autoplay: false, // Ne pas lancer la vidéo automatiquement
      preload: "auto", // Précharger la vidéo
    });

    // Nettoyage du lecteur quand le composant est démonté
    return () => {
      player.dispose();
    };
  }, []);

  return (
    <div data-vjs-player>
      <video
        ref={videoRef} // Référence vers l'élément video
        className="video-js vjs-default-skin" // Classe pour appliquer les styles
        controls
        preload="auto"
      >
        <source src={src} type="video/mp4" /> {/* Source de la vidéo */}
        Votre navigateur ne supporte pas la balise vidéo.
      </video>
    </div>
  );
};

export default VideoPlayer;
