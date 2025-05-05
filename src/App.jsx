import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import Accueil from "./pages/Accueil";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Menu />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Accueil />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
