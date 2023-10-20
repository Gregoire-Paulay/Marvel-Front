import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import RingLoader from "react-spinners/RingLoader";

// Import image pour remplacer les manquantes
import notSpiderMan from "../assets/no-spiderman.jpg";
import comicImg from "../assets/Comics.jpg";

const CharacterSpecificComics = ({ darkMode }) => {
  const [comicsPerCharacter, setComicsPerCharacter] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const { characterId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-back--hpyqm5px6d9r.code.run/comics/${characterId}`
        );
        console.log(response.data);
        setComicsPerCharacter(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [characterId]);

  if (isLoading)
    return (
      <div className="loading">
        <RingLoader color="#ee171f" size={150} />
      </div>
    );

  return (
    <main className={darkMode ? "dark" : "light"}>
      <div className="container">
        <div className="comics-character">
          <div>
            <h1>Comics ou le personnage {comicsPerCharacter.name} apparaît</h1>

            {comicsPerCharacter.thumbnail.path ===
              "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ||
            comicsPerCharacter.thumbnail.path ===
              "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708" ? (
              <img
                src={notSpiderMan}
                alt="Pas Spider-man"
                onClick={() => {
                  navigate("/character/" + comicsPerCharacter._id);
                }}
              />
            ) : (
              <img
                src={
                  comicsPerCharacter.thumbnail.path +
                  "." +
                  comicsPerCharacter.thumbnail.extension
                }
                alt={comicsPerCharacter.name}
                onClick={() => {
                  navigate("/character/" + comicsPerCharacter._id);
                }}
              />
            )}
          </div>

          <div>
            {comicsPerCharacter.comics.map((comics) => {
              return (
                <div
                  key={comics._id}
                  onClick={() => {
                    navigate("/comic/" + comics._id);
                  }}
                >
                  <p>{comics.title}</p>

                  {comics.thumbnail.path ===
                  "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ? (
                    <img src={comicImg} alt="Spider-Man 2" />
                  ) : (
                    <img
                      src={
                        comics.thumbnail.path + "." + comics.thumbnail.extension
                      }
                      alt={comics.title}
                    />
                  )}

                  {/* <p>{comics.description}</p> */}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default CharacterSpecificComics;
