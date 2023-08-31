import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
        console.log(pageTotal);

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
            <h1>Je suis sur la page tout les Comics</h1>

            <div className="search">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder="X-men"
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>

            <section className="pagination">
              <div>
                <p>
                  Page : {counter} / {pageTotal}
                </p>
                <div>
                  <button
                    onClick={() => {
                      setCounter(counter - 1);
                      setSkip(skip - limit);
                    }}
                  >
                    -
                  </button>
                  <button
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
                    setCounter(event.target.value);
                    setSkip((event.target.value - 1) * limit);
                  }}
                />
              </div>
            </section>

            <section className="all-comics">
              {comics.results.map((comic) => {
                return (
                  <div
                    key={comic._id}
                    onClick={() => {
                      navigate("/comic/" + comic._id);
                    }}
                  >
                    {comic.thumbnail.path ===
                    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ? (
                      <img src={comicImg} alt="Spider-Man 2" />
                    ) : (
                      <img
                        src={
                          comic.thumbnail.path + "." + comic.thumbnail.extension
                        }
                        alt={comic.title}
                      />
                    )}

                    <h2>{comic.title}</h2>
                  </div>
                );
              })}
            </section>
          </div>
        </main>
      )}
    </div>
  );
};

export default AllComics;
