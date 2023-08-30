import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

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
  }, []);

  return isLoading ? (
    <span>Chargement ...</span>
  ) : (
    <main className={darkMode ? "dark" : "light"}>
      <div className="container">
        <h1>{comic.title}</h1>
        <div>
          <img
            src={comic.thumbnail.path + "." + comic.thumbnail.extension}
            alt={comic.title}
          />
          <p>{comic.description}</p>
        </div>
      </div>
    </main>
  );
};

export default Comic;
