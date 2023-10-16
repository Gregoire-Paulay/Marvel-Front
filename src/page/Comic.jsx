import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import RingLoader from "react-spinners/RingLoader";

// Image
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
          `https://site--marvel-back--hpyqm5px6d9r.code.run/comic/${comicId}`
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

  if (isLoading)
    return (
      <div className="loading">
        <RingLoader color="#ee171f" size={150} />
      </div>
    );

  return (
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
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo
                maxime, libero debitis repudiandae error quisquam fuga provident
                natus, praesentium, dolor sapiente sit quaerat rem ea nisi totam
                quod. Voluptate, dignissimos! Odio in doloremque, modi eaque cum
                ea nam numquam error repellendus. Voluptatem dolorum eius
                recusandae ullam ab necessitatibus, nobis modi praesentium
                dignissimos perferendis, cumque est repellendus rem? Voluptas,
                accusamus cumque! Accusamus magni, qui, dolorum blanditiis
                perferendis illo corporis eius debitis laboriosam deserunt
                fugiat laborum quae assumenda? Ex ea perferendis corrupti
                distinctio! Libero esse quas totam reiciendis soluta beatae quod
                suscipit.
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
