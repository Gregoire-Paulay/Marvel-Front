import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// Import de mes Pages
import Home from "./page/Home";
import AllComics from "./page/AllComics";
import Comic from "./page/Comic";
import AllCharacters from "./page/AllCharacters";
import CharacterSpecificComics from "./page/CharacterSpecificComics";
import CharacterInfo from "./page/CharacterInfo";
import SignUp from "./page/SignUp";
import Login from "./page/Login";

// Import de mes Components
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  const [darkMode, setDarkMode] = useState(Cookies.get("mode") || false);

  const handleMode = (mode) => {
    if (mode) {
      Cookies.set("mode", mode, { expires: 15 });
      setDarkMode(mode);
    } else {
      Cookies.remove("mode");
      setDarkMode(false);
    }
  };

  // Gestion du token pour savoir si un utilisateur est connecté
  const [token, setToken] = useState(Cookies.get("token") || null);
  const handleToken = (token, username) => {
    if (token) {
      Cookies.set("token", token, { expires: 15 });
      Cookies.set("username", username, { expires: 15 });
      setToken(token);
    } else {
      Cookies.remove("username");
      Cookies.remove("token");
      setToken(null);
    }
  };

  return (
    <Router>
      <Header
        darkMode={darkMode}
        handleMode={handleMode}
        handleToken={handleToken}
        token={token}
      />

      <Routes>
        <Route path="/" element={<Home darkMode={darkMode} />} />
        <Route path="/allcomics" element={<AllComics darkMode={darkMode} />} />
        <Route path="/comic/:comicId" element={<Comic darkMode={darkMode} />} />
        <Route
          path="/characters"
          element={<AllCharacters darkMode={darkMode} />}
        />
        <Route
          path="/comics/:characterId"
          element={<CharacterSpecificComics darkMode={darkMode} />}
        />
        <Route
          path="/character/:characterId"
          element={<CharacterInfo darkMode={darkMode} />}
        />
        <Route
          path="/signup"
          element={<SignUp darkMode={darkMode} handleToken={handleToken} />}
        />
        <Route
          path="/login"
          element={<Login darkMode={darkMode} handleToken={handleToken} />}
        />
        <Route />
      </Routes>

      <Footer darkMode={darkMode} />
    </Router>
  );
};

export default App;
