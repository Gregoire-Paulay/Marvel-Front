import { useNavigate } from "react-router-dom";

//import d'image
import logo from "../assets/logo-marvel.png";

const Header = ({ darkMode, handleMode }) => {
  const navigate = useNavigate();

  return (
    <header className={darkMode ? "dark" : "light"}>
      <div className="container">
        <div>
          <img
            className="header-logo"
            src={logo}
            alt="Logo Marvel"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>

        <div className="navigation">
          <button
            onClick={() => {
              navigate("/allcomics");
            }}
          >
            Comics
          </button>
          <button
            onClick={() => {
              navigate("/characters");
            }}
          >
            Personnages
          </button>
          <button>Favoris</button>
        </div>
        <button
          className={darkMode ? "mode-dark" : "mode-light"}
          onClick={() => {
            handleMode(!darkMode);
            // setDarkMode(!darkMode);
            // Cookies.set("mode", darkMode, { expires: 15 });
          }}
        >
          <i className="fa-solid fa-sun"></i>
        </button>
      </div>
      <div className="divider"></div>
    </header>
  );
};

export default Header;
