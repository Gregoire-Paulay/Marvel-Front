import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import spiderman from "../assets/no-spiderman.jpg";
import spiderComic from "../assets/Comics.jpg";

const Favorite = ({ darkMode, token }) => {
  const favCharCookie = Cookies.get("FavoriteCharacter");
  const favComicsCookie = Cookies.get("FavoriteComics");
  const username = Cookies.get("username");

  const navigate = useNavigate();
  return token ? (
    <main className={darkMode ? "dark" : "light"}>
      <div className="container">
        {username ? <h1>Mes favoris ({username}) </h1> : <h1>Mes favoris </h1>}

        <section className="all-fav">
          <div>
            <h2>Personnages favoris</h2>
            <div className="fav-char">
              {favCharCookie
                ? JSON.parse(favCharCookie).map((myFav) => {
                    // console.log("CHARACTER", myFav);
                    return (
                      <div key={myFav.id}>
                        <p>{myFav.name}</p>
                        {myFav.picture ===
                        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ? (
                          <img
                            src={spiderman}
                            alt="not-spiderman"
                            onClick={() => {
                              navigate("/character/" + myFav.id);
                            }}
                          />
                        ) : (
                          <img
                            src={myFav.picture}
                            alt={myFav.name}
                            onClick={() => {
                              navigate("/character/" + myFav.id);
                            }}
                          />
                        )}
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>

          <div>
            <h2>Comics favoris</h2>
            <div className="fav-comics">
              {favComicsCookie
                ? JSON.parse(favComicsCookie).map((myFav) => {
                    // console.log("COMICS", myFav);
                    return (
                      <div key={myFav.id}>
                        <p>{myFav.title}</p>
                        {myFav.picture ===
                        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ? (
                          <img
                            src={spiderComic}
                            alt="Comics"
                            onClick={() => {
                              navigate("/comic/" + myFav.id);
                            }}
                          />
                        ) : (
                          <img
                            src={myFav.picture}
                            alt={myFav.title}
                            onClick={() => {
                              navigate("/comic/" + myFav.id);
                            }}
                          />
                        )}
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
        </section>
      </div>
    </main>
  ) : (
    <Navigate to="/login" />
  );
};

export default Favorite;
