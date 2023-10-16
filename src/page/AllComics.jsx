import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import RingLoader from "react-spinners/RingLoader";

// Image / Icones
import comicImg from "../assets/Comics.jpg";

// Components
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";

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
  const handleFavorite = (comic) => {
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

    setFavorite(favoriteCopy);
  };

  const isFavorite = (comicId) => {
    const favoriteCopy = [...favorite];
    const favoriteInCookie = favoriteCopy.find(
      (element) => element.id === comicId
    );
    return favoriteInCookie;
  };

  Cookies.set("FavoriteComics", JSON.stringify(favorite), {
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
        <h1>Liste des Comics Marvel</h1>

        <SearchBar
          setName={setTitle}
          setCounter={setCounter}
          setSkip={setSkip}
        />

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
                    src={comic.thumbnail.path + "." + comic.thumbnail.extension}
                    alt={comic.title}
                    onClick={() => {
                      navigate("/comic/" + comic._id);
                    }}
                  />
                )}

                <h2>{comic.title}</h2>

                <button
                  className="favorite"
                  onClick={() => {
                    handleFavorite(comic, index);
                    console.log(comic._id);
                  }}
                >
                  {isFavorite(comic._id) ? (
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

export default AllComics;
