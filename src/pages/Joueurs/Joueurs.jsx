import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import JoueurCard from "../../components/JoueurCard";
import LoginPage from "../Login";
import AddJoueur from "./AddJoueur"; // Import du composant d'ajout
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import "./Joueurs.css";

const Joueurs = () => {
  const [joueurs, setJoueurs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Gérer l'état de la modale d'ajout
  const navigate = useNavigate();

  const fetchJoueurs = async () => {
    try {
      const joueursCollection = collection(db, "joueurs");
      const joueursSnapshot = await getDocs(joueursCollection);
      const joueursList = joueursSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJoueurs(joueursList);
    } catch (error) {
      console.error("Erreur de récupération des joueurs :", error);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    fetchJoueurs();
    return () => unsubscribe();
  }, [isLoggedIn]);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setIsLoggedIn(false);
        console.log("Déconnexion réussie");
      })
      .catch((error) => {
        console.error("Erreur de déconnexion :", error);
      });
  };

  const handleSecretClick = () => {
    if (!isLoggedIn) {
      setClickCount((prevCount) => {
        const newCount = prevCount + 1;
        if (newCount >= 5) {
          setIsLoginOpen(true); // Ouvrir la modale de login après 5 clics
        }
        return newCount;
      });
    }
  };

  const closeLoginModal = () => {
    setIsLoginOpen(false);
    setClickCount(0); // Réinitialiser le compteur lorsque la modale est fermée
  };

  // Ouvrir la modale d'ajout de joueur
  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  // Fermer la modale d'ajout de joueur
  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleUpdateJoueur = async (id) => {
    try {
      const joueurRef = doc(db, "joueurs", id);
      const joueurDoc = await getDoc(joueurRef);
      const joueurData = joueurDoc.data();

      const joueurWithUpdates = {
        ...joueurData,
        ...newJoueur,
      };

      if (imageFile) {
        const imageRef = ref(getStorage(), `images/${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        joueurWithUpdates.image = await getDownloadURL(imageRef);
      }

      if (videoFiles.length > 0) {
        const videoUrls = [];
        for (let video of videoFiles) {
          const videoRef = ref(getStorage(), `videos/${video.name}`);
          await uploadBytes(videoRef, video);
          const videoUrl = await getDownloadURL(videoRef);
          videoUrls.push(videoUrl);
        }
        joueurWithUpdates.videos = videoUrls;
      }

      await updateDoc(joueurRef, joueurWithUpdates);
      alert("Joueur mis à jour avec succès !");
      fetchJoueurs();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du joueur :", error);
    }
  };

  const handleDeleteJoueur = async (id) => {
    try {
      const joueurRef = doc(db, "joueurs", id);
      const joueurDoc = await getDoc(joueurRef);
      const joueurData = joueurDoc.data();

      if (joueurData.image) {
        const imageRef = ref(
          getStorage(),
          `images/joueurs/${joueurData.image}`
        );
        await deleteObject(imageRef);
      }

      if (joueurData.videos && joueurData.videos.length > 0) {
        for (let videoUrl of joueurData.videos) {
          const videoName = videoUrl.split("/").pop();
          const videoRef = ref(getStorage(), `videos/${videoName}`);
          await deleteObject(videoRef);
        }
      }

      await deleteDoc(joueurRef);
      alert("Joueur supprimé avec succès !");
      fetchJoueurs();
    } catch (error) {
      console.error("Erreur lors de la suppression du joueur :", error);
    }
  };

  return (
    <div className="joueurs-container">
      {isLoggedIn ? (
        <button onClick={handleLogout} className="secret-click-area logout-btn">
          Déconnexion
        </button>
      ) : (
        <div className="secret-click-area" onClick={handleSecretClick}></div>
      )}

      {isLoginOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeLoginModal}>
              X
            </span>
            <LoginPage closeModal={closeLoginModal} />
          </div>
        </div>
      )}
      <h2>Nos Joueurs</h2>
      <div className="joueurs-grid">
        {joueurs.length > 0 ? (
          joueurs.map((joueur) => (
            <div key={joueur.id}>
              <JoueurCard joueur={joueur} />
              {isLoggedIn && (
                <div>
                  <button
                    className="add-player-btn"
                    onClick={() => handleDeleteJoueur(joueur.id)}
                  >
                    Supprimer
                  </button>
                  <button
                    className="add-player-btn"
                    onClick={() => handleUpdateJoueur(joueur.id)}
                  >
                    Mettre à jour
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>Aucun joueur disponible</p>
        )}
      </div>

      <div className="secret-click-area" onClick={handleSecretClick}></div>

      {isLoggedIn && (
        <button onClick={handleOpenAddModal} className="add-player-btn">
          Ajouter un joueur
        </button>
      )}

      {isAddModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={handleCloseAddModal}>
              X
            </span>
            <AddJoueur
              closeModal={handleCloseAddModal}
              fetchJoueurs={fetchJoueurs}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Joueurs;
