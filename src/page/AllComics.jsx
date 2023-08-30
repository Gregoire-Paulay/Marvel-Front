import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AllComics = ({ darkMode }) => {
  const [comics, setcomics] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/comics");
        const foundComics = response.data;
        setcomics(foundComics);

        console.log(foundComics);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <span>Chargement en cours</span>
      ) : (
        <main className={darkMode ? "dark" : "light"}>
          <div className="container">
            <h1>Je suis sur la page Comics</h1>
            {comics.results.map((comic, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    navigate("/comic/" + comic._id);
                  }}
                >
                  <p>{comic.title}</p>
                </div>
              );
            })}
          </div>
        </main>
      )}
    </div>
  );
};

export default AllComics;
