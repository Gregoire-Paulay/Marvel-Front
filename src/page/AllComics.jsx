import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

// Import image pour remplacer les manquantes
import comicImg from "../assets/Comics.jpg";

const AllComics = ({ darkMode }) => {
  const [comics, setcomics] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // State pour Gérer mes favoris
  const [favorite, setFavorite] = useState(
    Cookies.get("FavoriteComics")
      ? JSON.parse(Cookies.get("FavoriteComics"))
      : []
  );
  const [checkedState, setCheckedState] = useState(
    localStorage.getItem("CheckedComics")
      ? JSON.parse(localStorage.getItem("CheckedComics"))
      : new Array(47397).fill(false)
  );

  // state pour gérer ma barre de recherche et pages
  const [title, setTitle] = useState("");
  const [skip, setSkip] = useState(0);
  const [counter, setCounter] = useState(1);
  const [pageTotal, setPageTotal] = useState();
  let limit = 50;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get(
        //   `http://localhost:3000/comics?title=${title}&skip=${skip}&limit=${limit}`
        // );
        const response = await axios.get(
          `https://site--marvel-back--hpyqm5px6d9r.code.run/comics?title=${title}&skip=${skip}&limit=${limit}`
        );
        const foundComics = response.data;
        console.log(foundComics);
        setcomics(foundComics);

        const NumberOfPage = Math.ceil(foundComics.count / foundComics.limit);
        setPageTotal(NumberOfPage);

        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [title, limit, skip, pageTotal]);

  // Gestion personnage Favori avec Cookie + LocalStorage
  const handleFavorite = (comic, position) => {
    // console.log("comic", comic);
    const favoriteCopy = [...favorite];
    const favoriteInCookie = favoriteCopy.find(
      (element) => element.id === comic._id
    );

    if (!favoriteInCookie) {
      favoriteCopy.push({
        title: comic.title,
        picture: comic.thumbnail.path + "." + comic.thumbnail.extension,
        id: comic._id,
      });
      // console.log("FAVORITECOPY", favoriteCopy);
    } else {
      // console.log("FAVINCOOKIE", favoriteInCookie);
      for (let i = 0; i < favoriteCopy.length; i++) {
        if (favoriteInCookie.id === favoriteCopy[i].id) {
          favoriteCopy.splice(i, 1);
        }
      }
    }

    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    setFavorite(favoriteCopy);
  };

  Cookies.set("FavoriteComics", JSON.stringify(favorite), {
    expires: 15,
  });
  // console.log("FAVORI ===>", favorite);
  localStorage.setItem("CheckedComics", JSON.stringify(checkedState), {
    expires: 15,
  });

  return (
    <div>
      {isLoading ? (
        <span>Chargement en cours</span>
      ) : (
        <main className={darkMode ? "dark" : "light"}>
          <div className="container">
            <h1>Liste des Comics Marvel</h1>

            <section className="search">
              <div>
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                  type="text"
                  placeholder="X-men"
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                />
              </div>
            </section>

            <section className="all-comics">
              {comics.results.map((comic, index) => {
                return (
                  <div key={comic._id}>
                    {comic.thumbnail.path ===
                    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ? (
                      <img
                        src={comicImg}
                        alt="Spider-Man 2"
                        onClick={() => {
                          navigate("/comic/" + comic._id);
                        }}
                      />
                    ) : (
                      <img
                        src={
                          comic.thumbnail.path + "." + comic.thumbnail.extension
                        }
                        alt={comic.title}
                        onClick={() => {
                          navigate("/comic/" + comic._id);
                        }}
                      />
                    )}

                    <h2>{comic.title}</h2>

                    <input
                      type="checkbox"
                      className="favorite"
                      checked={checkedState[index]}
                      onChange={() => {
                        handleFavorite(comic, index);
                      }}
                    ></input>
                  </div>
                );
              })}
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
                    if (
                      event.target.value > 0 &&
                      event.target.value <= pageTotal
                    ) {
                      setCounter(Number(event.target.value));
                      setSkip((event.target.value - 1) * limit);
                    }
                  }}
                />
              </div>
            </section>
          </div>
        </main>
      )}
    </div>
  );
};

export default AllComics;
