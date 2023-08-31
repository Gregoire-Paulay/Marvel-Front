import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import notSpiderMan from "../assets/no-spiderman.jpg";

const AllCharacters = ({ darkMode }) => {
  const [characters, setCharacters] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  // state pour gérer ma barre de recherche et pages
  const [name, setName] = useState("");
  const [skip, setSkip] = useState(0);
  const [counter, setCounter] = useState(1);
  const [pageTotal, setPageTotal] = useState();

  let limit = 20;

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
        console.log(pageTotal);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [name, skip, limit, pageTotal]);

  return isLoading ? (
    <span>Chargement en cours</span>
  ) : (
    <main className={darkMode ? "dark" : "light"}>
      <div className="container">
        <h1>Je suis sur la Page All Characters</h1>

        <div className="search">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            className="search-character"
            type="text"
            placeholder="Spider-Man"
            onChange={(event) => {
              setName(event.target.value);
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

        <section className="all-hero">
          {characters.results.map((character) => {
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
