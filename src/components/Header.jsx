import { useNavigate } from "react-router-dom";

//import d'image
import logo from "../assets/logo-marvel.png";
import Banner from "../assets/Heroes.jpg";

const Header = ({ darkMode, handleMode, handleToken, token }) => {
  const navigate = useNavigate();

  return (
    <header className={darkMode ? "dark" : "light"}>
      <div className="container">
        <img src={Banner} alt="Header-Banner" className="banner" />
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
        {token ? (
          <section className="disconnect">
            <button
              onClick={() => {
                handleToken(null);
              }}
            >
              Se déconnecter
            </button>
          </section>
        ) : (
          <section className="sign-log">
            <button
              onClick={() => {
                navigate("/signup");
              }}
            >
              signup
            </button>
            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              login
            </button>
          </section>
        )}

        <section className="navigation">
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
        </section>
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
