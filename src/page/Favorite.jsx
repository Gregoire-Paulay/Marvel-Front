import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const Favorite = ({ darkMode, token }) => {
  const favCharCookie = Cookies.get("FavoriteCharacter");

  return token ? (
    <main className={darkMode ? "dark" : "light"}>
      <div className="container">
        <h1>Mes favoris</h1>
        <div>
          {favCharCookie
            ? JSON.parse(favCharCookie).map((myFav, index) => {
                // console.log(myFav);
                return (
                  <div key={index} className="fav-char">
                    <p>{myFav.name}</p>
                    <img src={myFav.picture} alt="Character" />
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </main>
  ) : (
    <Navigate to="/login" />
  );
};

export default Favorite;
