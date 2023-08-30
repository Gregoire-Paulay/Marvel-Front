import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllCharacters = ({ darkMode }) => {
  const [characters, setCharacters] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  //   const [counter, setCounter] = useState(1);

  //   const { page } = useParams();
  //   console.log(page);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/characters`);
        console.log(response.data);

        const foundCharacters = response.data;
        setCharacters(foundCharacters);

        setIsLoading(false);

        // const pageTotal = Math.ceil(characters.count / characters.limit);
        // console.log(pageTotal);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <span>Chargement en cours</span>
  ) : (
    <main className={darkMode ? "dark" : "light"}>
      <div className="container">
        <h1>Je suis sur la Page All Characters</h1>
        <div className="all-hero">
          {characters.results.map((character, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  navigate("/comics/" + character._id);
                }}
              >
                <p>{character.name}</p>
                <p>{character.description}</p>
                <img
                  src={
                    character.thumbnail.path +
                    "." +
                    character.thumbnail.extension
                  }
                  alt={character.title}
                />
              </div>
            );
          })}
        </div>

        {/* <p>{counter}</p>
        <button
          onClick={() => {
            setCounter(counter + 1);
            // navigate("/characters/" + { counter });
          }}
        >
          +
        </button> */}
      </div>
    </main>
  );
};

export default AllCharacters;
