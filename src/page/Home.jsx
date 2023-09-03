// Import de mes images pour mon slider
import avengers from "../assets/Avengers-endgame.jpg";
import spiderman from "../assets/spiderman-film.jpg";
import loki from "../assets/Loki.jpg";
import capMarvel from "../assets/Captain-Marvel.jpg";
import marvelSnap from "../assets/marvel-snap.jpg";

const Home = ({ darkMode }) => {
  return (
    <main className={darkMode ? "dark" : "light"}>
      <section className="slider">
        <div className="slider-viewport">
          <div id="img1">
            <div id="img3">
              <div id="img5">
                <div className="slider-content">
                  <a href="https://www.marvel.com/movies/avengers-endgame">
                    <img src={avengers} alt="Avengers-Endgame" />
                  </a>
                  <a href="https://www.marvel.com/characters/captain-marvel-carol-danvers">
                    <img src={capMarvel} alt="Captain Marvel" />
                  </a>
                  <a href="https://www.marvel.com/tv-shows/loki">
                    <img src={loki} alt="Série loki" />
                  </a>
                  <a href="https://www.marvel.com/games/marvel-snap">
                    <img src={marvelSnap} alt="Marvel Snap" />
                  </a>
                  <a href="https://www.marvel.com/movies/spider-man">
                    <img src={spiderman} alt="Spider-Man 1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="slider-nav">
          <a href="#img1"></a>
          <a href="#img3"></a>
          <a href="#img5"></a>
        </div>
      </section>

      <div className="container">
        <section className="home">
          <div className="bg"></div>
          <div className="paper"></div>
        </section>
      </div>
    </main>
  );
};

export default Home;
