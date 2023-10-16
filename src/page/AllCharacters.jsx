import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import RingLoader from "react-spinners/RingLoader";

// Images
import notSpiderMan from "../assets/no-spiderman.jpg";

// Components
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";

const AllCharacters = ({ darkMode }) => {
  const [characters, setCharacters] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // State pour Gérer mes favoris
  const [favorite, setFavorite] = useState(
    Cookies.get("FavoriteCharacter")
      ? JSON.parse(Cookies.get("FavoriteCharacter"))
      : []
  );

  // Gestion barre de recherche et pages
  const [name, setName] = useState("");
  const [skip, setSkip] = useState(0);
  const [counter, setCounter] = useState(1);
  const [pageTotal, setPageTotal] = useState();
  let limit = 20; // nombre de personnages par pages

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-back--hpyqm5px6d9r.code.run/characters?name=${name}&skip=${skip}&limit=${limit}`
        );
        console.log(response.data);
        const foundCharacters = response.data;
        setCharacters(foundCharacters);
        setIsLoading(false);

        const NumberOfPage = Math.ceil(
          foundCharacters.count / foundCharacters.limit
        );
        setPageTotal(NumberOfPage);
        // console.log(pageTotal);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [name, skip, limit, pageTotal]);

  // Gestion personnage Favori avec Cookie + LocalStorage
  const handleFavorite = (character) => {
    // console.log(character);
    const favoriteCopy = [...favorite];
    const favoriteInCookie = favoriteCopy.find(
      (element) => element.id === character._id
    );
    if (!favoriteInCookie) {
      favoriteCopy.push({
        name: character.name,
        picture: character.thumbnail.path + "." + character.thumbnail.extension,
        id: character._id,
      });
      // console.log(favoriteCopy);
    } else {
      for (let i = 0; i < favoriteCopy.length; i++) {
        if (favoriteInCookie.id === favoriteCopy[i].id) {
          favoriteCopy.splice(i, 1);
        }
      }
    }

    setFavorite(favoriteCopy);
  };

  const isFavorite = (characterId) => {
    console.log(characterId);
    const favoriteCopy = [...favorite];
    const favoriteInCookie = favoriteCopy.find(
      (element) => element.id === characterId
    );
    return favoriteInCookie;
  };

  Cookies.set("FavoriteCharacter", JSON.stringify(favorite), {
    expires: 15,
  });
  // console.log("FAVORI ===>", favorite);

  if (isLoading)
    return (
      <div className="loading">
        <RingLoader color="#ee171f" size={150} />
      </div>
    );
  return (
    <main className={darkMode ? "dark" : "light"}>
      <div className="container">
        <h1>Liste des personnages Marvel</h1>

        <SearchBar
          setName={setName}
          setCounter={setCounter}
          setSkip={setSkip}
        />

        <section className="all-hero">
          {characters.results.map((character, index) => {
            return (
              <div key={character._id}>
                {character.thumbnail.path ===
                  "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ||
                character.thumbnail.path ===
                  "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708" ? (
                  <img
                    src={notSpiderMan}
                    alt="Pas Spider-man"
                    onClick={() => {
                      navigate("/comics/" + character._id);
                    }}
                  />
                ) : (
                  <img
                    src={
                      character.thumbnail.path +
                      "." +
                      character.thumbnail.extension
                    }
                    alt={character.title}
                    onClick={() => {
                      navigate("/comics/" + character._id);
                    }}
                  />
                )}

                <p>{character.name}</p>
                <button
                  onClick={() => {
                    navigate("/character/" + character._id);
                  }}
                >
                  Click for more info on character
                </button>

                {/* <button
                  className="favorite"
                  onClick={() => {
                    handleFavorite(character, index);
                  }}
                >
                  {isFavorite(character._id)
                    ? "Supprimer des favoris"
                    : "Ajouter aux favoris"}
                </button> */}
                <button
                  className="favorite"
                  onClick={() => {
                    handleFavorite(character, index);
                  }}
                >
                  {isFavorite(character._id) ? (
                    <i className="fa-solid fa-heart"></i>
                  ) : (
                    <i className="fa-regular fa-heart"></i>
                  )}
                </button>
              </div>
            );
          })}
        </section>

        <Pagination
          counter={counter}
          setCounter={setCounter}
          limit={limit}
          skip={skip}
          setSkip={setSkip}
          pageTotal={pageTotal}
        />
      </div>
    </main>
  );
};

export default AllCharacters;
