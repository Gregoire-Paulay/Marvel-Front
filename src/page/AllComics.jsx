import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Import image pour remplacer les manquantes
import comicImg from "../assets/Comics.jpg";

const AllComics = ({ darkMode }) => {
  const [comics, setcomics] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  // state pour gérer ma barre de recherche et pages
  const [title, setTitle] = useState("");
  const [skip, setSkip] = useState(0);
  const [counter, setCounter] = useState(1);
  const [pageTotal, setPageTotal] = useState();

  let limit = 50;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/comics?title=${title}&skip=${skip}&limit=${limit}`
        );
        const foundComics = response.data;
        console.log(foundComics);
        setcomics(foundComics);

        const NumberOfPage = Math.ceil(foundComics.count / foundComics.limit);
        setPageTotal(NumberOfPage);
        // console.log(pageTotal);

        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [title, limit, skip, pageTotal]);

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
              {comics.results.map((comic) => {
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
                      // checked={checkedState[index]}
                      // onChange={() => {
                      //   handleFavorite(character, index);
                      // }}
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
                    // className={counter === pageTotal && "hidden"}
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
