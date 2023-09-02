import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import notSpiderMan from "../assets/no-spiderman.jpg";

const AllCharacters = ({ darkMode }) => {
  const [characters, setCharacters] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [favorite, setFavorite] = useState(
    Cookies.get("FavoriteCharacter")
      ? JSON.parse(Cookies.get("FavoriteCharacter"))
      : []
  );

  const [checkedState, setCheckedState] = useState(
    localStorage.getItem("CheckedChar")
      ? JSON.parse(localStorage.getItem("CheckedChar"))
      : new Array(1493).fill(false)
  );

  const navigate = useNavigate();

  // state pour gérer ma barre de recherche et pages
  const [name, setName] = useState("");
  const [skip, setSkip] = useState(0);
  const [counter, setCounter] = useState(1);
  const [pageTotal, setPageTotal] = useState();
  let limit = 20; // nombre de personnages par pages

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/characters?name=${name}&skip=${skip}&limit=${limit}`
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

  // Gestion personnage Favori avec Cookie
  const handleFavorite = (character, position) => {
    const favoriteCopy = [...favorite];
    const favoriteInCookie = favoriteCopy.find(
      (element) => element.name === character.name
    );
    if (!favoriteInCookie) {
      favoriteCopy.push({
        name: character.name,
        picture: character.thumbnail.path + "." + character.thumbnail.extension,
      });
    } else {
      for (let i = 0; i < favoriteCopy.length; i++) {
        if (favoriteInCookie.name === favoriteCopy[i].name) {
          favoriteCopy.splice(i, 1);
        }
      }
    }

    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);

    setFavorite(favoriteCopy);
    // console.log("FAVORI ===>", favorite);
  };

  Cookies.set("FavoriteCharacter", JSON.stringify(favorite), {
    expires: 15,
  });
  const favCharCookie = Cookies.get("FavoriteCharacter");

  localStorage.setItem("CheckedChar", JSON.stringify(checkedState), {
    expires: 15,
  });

  return isLoading ? (
    <span>Chargement en cours</span>
  ) : (
    <main className={darkMode ? "dark" : "light"}>
      <div className="container">
        <h1>Je suis sur la Page All Characters</h1>

        {/* Test renvoi du cookie */}
        <p>Test favori cookie</p>
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
        {/* Test renvoi du cookie */}

        <section className="search">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            className="search-character"
            type="text"
            placeholder="Spider-Man"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </section>

        <section className="pagination">
          <div>
            <button
              className={counter === 1 ? "hidden" : ""}
              onClick={() => {
                setCounter(counter - 1);
                setSkip(skip - limit);
              }}
            >
              -
            </button>
            <p>
              Page : {counter} / {pageTotal}
            </p>
            <div>
              <button
                className={counter === pageTotal ? "hidden" : ""}
                onClick={() => {
                  setCounter(counter + 1);
                  setSkip(skip + limit);
                }}
              >
                +
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="number">Go to page</label>
            <input
              type="number"
              id="number"
              onChange={(event) => {
                if (event.target.value > 0) {
                  setCounter(Number(event.target.value));
                  setSkip((event.target.value - 1) * limit);
                }
              }}
            />
          </div>
        </section>

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

                <input
                  type="checkbox"
                  className="favorite"
                  checked={checkedState[index]}
                  onChange={() => {
                    handleFavorite(character, index);
                  }}
                ></input>
                {/* <p>{character.description}</p> */}
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
};

export default AllCharacters;
