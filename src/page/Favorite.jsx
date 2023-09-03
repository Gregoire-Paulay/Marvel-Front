import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const Favorite = ({ darkMode, token }) => {
  const favCharCookie = Cookies.get("FavoriteCharacter");
  const favComicsCookie = Cookies.get("FavoriteComics");

  return token ? (
    <main className={darkMode ? "dark" : "light"}>
      <div className="container">
        <h1>Mes favoris</h1>
        <section>
          {favCharCookie
            ? JSON.parse(favCharCookie).map((myFav) => {
                // console.log(myFav);
                return (
                  <div key={myFav.id} className="fav-char">
                    <p>{myFav.name}</p>
                    <img src={myFav.picture} alt="Character" />
                  </div>
                );
              })
            : ""}

          {favComicsCookie
            ? JSON.parse(favComicsCookie).map((myFav) => {
                // console.log(myFav);
                return (
                  <div key={myFav.id}>
                    <p>{myFav.title}</p>
                  </div>
                );
              })
            : ""}
        </section>
      </div>
    </main>
  ) : (
    <Navigate to="/login" />
  );
};

export default Favorite;
