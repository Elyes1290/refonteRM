import React, { useState } from "react";
import { db } from "../../firebase/firebase";
import { addDoc, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Correct import for getDownloadURL
import "./AddJoueur.css";

const AddJoueur = ({ closeModal, fetchJoueurs }) => {
  const [newJoueur, setNewJoueur] = useState({
    nom: "",
    club: "",
    poste: "",
    pied: "",
    dateNaissance: "",
    taille: "",
    poids: "",
    nationalite: "",
    image: "",
    videos: [],
    transfermarkt: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [videoFiles, setVideoFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // Pour gérer les erreurs

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewJoueur((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleVideoChange = (e) => {
    const files = Array.from(e.target.files);
    setVideoFiles(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Réinitialiser l'erreur à chaque soumission

    try {
      let imageUrl = ""; // URL de l'image dans Firebase Storage
      let imageFileName = ""; // Nom de l'image à enregistrer dans Firestore

      // Vérifier si un fichier image est sélectionné
      if (imageFile) {
        const imageRef = ref(getStorage(), `images/joueurs/${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef); // Récupérer l'URL complète
        imageFileName = imageFile.name; // Garder uniquement le nom du fichier
      }

      // Vérifier si des vidéos sont sélectionnées
      let videoUrls = [];
      if (videoFiles.length > 0) {
        for (let video of videoFiles) {
          const videoRef = ref(getStorage(), `videos/${video.name}`);
          await uploadBytes(videoRef, video);
          const videoUrl = await getDownloadURL(videoRef);
          videoUrls.push(videoUrl);
        }
      }

      // Ajouter le joueur à la base de données Firestore
      const joueurWithDefaults = {
        ...newJoueur,
        image: imageFileName, // Enregistrer le nom du fichier de l'image dans Firestore
        videos: videoUrls.length > 0 ? videoUrls : newJoueur.videos,
      };

      await addDoc(collection(db, "joueurs"), joueurWithDefaults);
      alert("Joueur ajouté avec succès !");
      fetchJoueurs(); // Recharger les joueurs
      closeModal(); // Fermer la modale après l'ajout du joueur
    } catch (error) {
      setError("Erreur lors de l'ajout du joueur : " + error.message); // Afficher l'erreur si elle survient
      console.error("Erreur lors de l'ajout du joueur :", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-joueur-form">
      <h2>Ajouter un Joueur</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}{" "}
        {/* Affichage de l'erreur */}
        <input
          type="text"
          name="nom"
          placeholder="Nom"
          value={newJoueur.nom}
          onChange={handleChange}
        />
        <input
          type="text"
          name="club"
          placeholder="Club"
          value={newJoueur.club}
          onChange={handleChange}
        />
        <input
          type="text"
          name="poste"
          placeholder="Poste"
          value={newJoueur.poste}
          onChange={handleChange}
        />
        <input
          type="text"
          name="pied"
          placeholder="Pied"
          value={newJoueur.pied}
          onChange={handleChange}
        />
        <input
          type="date"
          name="dateNaissance"
          placeholder="Date de naissance"
          value={newJoueur.dateNaissance}
          onChange={handleChange}
        />
        <input
          type="number"
          name="taille"
          placeholder="Taille (cm)"
          value={newJoueur.taille}
          onChange={handleChange}
        />
        <input
          type="number"
          name="poids"
          placeholder="Poids (kg)"
          value={newJoueur.poids}
          onChange={handleChange}
        />
        <input
          type="text"
          name="nationalite"
          placeholder="Nationalité"
          value={newJoueur.nationalite}
          onChange={handleChange}
        />
        <input
          type="text"
          name="transfermarkt"
          placeholder="Lien Transfermarkt"
          value={newJoueur.transfermarkt}
          onChange={handleChange}
        />
        {/* Upload Image */}
        <div>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <p>Image du joueur</p>
        </div>
        {/* Upload Video */}
        <div>
          <input
            type="file"
            accept="video/*"
            multiple
            onChange={handleVideoChange}
          />
          <p>Vidéos du joueur</p>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Ajout en cours..." : "Ajouter"}
        </button>
      </form>
    </div>
  );
};

export default AddJoueur;
