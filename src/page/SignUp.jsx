import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = ({ darkMode, handleToken }) => {
  const navigate = useNavigate();

  // State pour gérer mes input
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleChange = (event, setchange) => {
    setchange(event.target.value);
  };

  //   State qui gère le message d'erreur
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };
  const fetchData = async () => {
    try {
      //   Je fais disparaitre le message d'erreur
      setErrorMessage("");

      // const response = await axios.post("http://localhost:3000/user/signup", {
      //   username: username,
      //   email: email,
      //   password: password,
      // });
      const response = await axios.post(
        "https://site--marvel-back--hpyqm5px6d9r.code.run/user/signup",
        {
          username: username,
          email: email,
          password: password,
        }
      );

      console.log(response.data);

      handleToken(response.data.token);
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
      if (
        error.response.data.message === "Cette adresse mail est déjà enregistré"
      ) {
        setErrorMessage(
          "Cet email est déjà utilisé, veuillez en utiliser un autre 🙂"
        );
      } else if (
        error.response.data.message ===
        "Renseignez tout les paramètres pour pouvoir vous inscrire"
      ) {
        setErrorMessage(
          "Tout les champs doivent être remplis pour vous connecter"
        );
      }
    }
  };

  return (
    <main className={darkMode ? "dark" : "light"}>
      <form
        className="sign-log"
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <div>
          <h1>Formulaire d'inscription</h1>
          <div className="sign-log-input">
            <div>
              <label htmlFor="username">Nom d'utilisateur</label>
              <input
                type="text"
                placeholder="Wolverine"
                name="username"
                id="username"
                value={username}
                onChange={(event) => {
                  handleChange(event, setUsername);
                }}
              />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="wolf@mail.com"
                name="email"
                id="email"
                value={email}
                onChange={(event) => {
                  handleChange(event, setEmail);
                }}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="****"
                name="password"
                id="password"
                value={password}
                onChange={(event) => {
                  handleChange(event, setPassword);
                }}
              />
            </div>
          </div>

          {errorMessage && (
            <p style={{ color: "red", margin: "8px" }}> {errorMessage}</p>
          )}
          <button type="submit">S'inscrire</button>
          <p
            onClick={() => {
              navigate("/login");
            }}
          >
            Tu as déjà un compte ? Connecte-toi !
          </p>
        </div>
      </form>
    </main>
  );
};

export default SignUp;
