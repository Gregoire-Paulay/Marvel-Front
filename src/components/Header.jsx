import { useNavigate } from "react-router-dom";

//import d'image
import logo from "../assets/logo-marvel.png";

const Header = ({ darkMode, handleMode, handleToken, token }) => {
  const navigate = useNavigate();

  return (
    <header className="dark">
      <div className="container">
        <div className="header-nav">
          <img
            className="header-logo"
            src={logo}
            alt="Logo Marvel"
            onClick={() => {
              navigate("/");
            }}
          />

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
            <button
              onClick={() => {
                navigate("/favorite");
              }}
            >
              Favoris
            </button>
          </section>

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
            <section className="header-sign-log">
              <button
                onClick={() => {
                  navigate("/signup");
                }}
              >
                S'inscrire
              </button>
              <button
                onClick={() => {
                  navigate("/login");
                }}
              >
                Se connecter
              </button>
            </section>
          )}
        </div>

        <button
          className={darkMode ? "mode-dark" : "mode-light"}
          onClick={() => {
            handleMode(!darkMode);
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
