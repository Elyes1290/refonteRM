import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase"; // Assurez-vous du chemin d'importation

const LoginPage = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Utilisateur connecté !");
      closeModal(); // Fermer la modale après la connexion réussie
      // Redirige vers la page des joueurs ou une autre page après la connexion
    } catch (err) {
      setError("Erreur lors de la connexion. Essayez à nouveau.");
      console.error("Erreur de connexion :", err);
    }
  };

  return (
    <div className="login-container">
      <h2>Se connecter</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default LoginPage;
