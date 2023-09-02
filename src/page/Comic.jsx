import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import comicImg from "../assets/Comics.jpg";

const Comic = ({ darkMode }) => {
  const [comic, setComic] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { comicId } = useParams();
  //   console.log(comicId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/comic/${comicId}`
        );
        console.log(response.data);
        setComic(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [comicId]);

  return isLoading ? (
    <span>Chargement ...</span>
  ) : (
    <main className={darkMode ? "dark" : "light"}>
      <div className="container">
        <section className="comic-info">
          {comic.thumbnail.path ===
          "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ? (
            <img src={comicImg} alt="Spider-Man 2" />
          ) : (
            <img
              src={comic.thumbnail.path + "." + comic.thumbnail.extension}
              alt={comic.title}
            />
          )}
          <div>
            <h1>{comic.title}</h1>
            {comic.description === null ? (
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum,
                adipisci? Voluptas incidunt officia tempore nisi nam voluptatem
                nobis corporis natus dolore provident sint quibusdam, libero
                distinctio repellat? Maxime.
              </p>
            ) : (
              <p>{comic.description}</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Comic;
