import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import RingLoader from "react-spinners/RingLoader";

// Image
import notSpiderMan from "../assets/no-spiderman.jpg";

const CharacterInfo = ({ darkMode }) => {
  const [character, setCharacter] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const { characterId } = useParams();
  //   console.log(characterId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-back--hpyqm5px6d9r.code.run/character/${characterId}`
        );
        console.log(response.data);
        setCharacter(response.data);

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
        <section className="character-info">
          <div>
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
                  character.thumbnail.path + "." + character.thumbnail.extension
                }
                alt={character.title}
                onClick={() => {
                  navigate("/comics/" + character._id);
                }}
              />
            )}
          </div>

          <div>
            <h1>{character.name}</h1>
            {character.description === "" ? (
              <div>
                <span>En attente de description :</span>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia
                  cum atque, deleniti accusamus, minima libero culpa voluptates
                  iusto harum ipsa aperiam quibusdam esse inventore officia
                  magni quis temporibus quae aliquam! Nostrum quis excepturi
                  totam exercitationem pariatur rem voluptatem mollitia
                  voluptate, blanditiis dolorum officiis quia facilis, a
                  debitis. Incidunt doloribus repellendus sapiente itaque,
                  necessitatibus vitae placeat!
                </p>
              </div>
            ) : (
              <div>{character.description}</div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default CharacterInfo;
