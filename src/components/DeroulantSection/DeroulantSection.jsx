import React, { useState } from "react";
import "./DeroulantSection.css";

const DeroulantSection = ({ title, image, text, text1, text2, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="deroulant" onClick={() => setIsOpen(!isOpen)}>
      <div className="deroulant-header">
        <span>{title}</span>
      </div>

      {/* Contenu déroulant */}
      <div
        className={`deroulant-content ${isOpen ? "open" : ""} ${
          index % 2 === 0 ? "image-left" : "image-right"
        }`}
      >
        <img src={image} alt={title} className="deroulant-image" />
        <p className="deroulant-texte">{text}</p>
        <br />
        {/* Affichage des textes text1 et text2 */}
        <br />
        <p className="deroulant-texte">{text1}</p>
        <br />
        <br />
        <p className="deroulant-texte">{text2}</p>
      </div>
    </div>
  );
};

export default DeroulantSection;
