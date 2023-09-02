import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ darkMode, handleToken }) => {
  const navigate = useNavigate();

  // State qui gère mes input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleChange = (event, setChange) => {
    setChange(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:3000/user/login", {
          email: email,
          password: password,
        });
        console.log(response.data);
        handleToken(response.data.token, response.data.account.username);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  };

  return (
    <main className={darkMode ? "dark" : "light"}>
      <form
        className="login"
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <div>
          <h1>Formulaire de connexion</h1>
          <div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="wolf@mail.com"
                name="email"
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
                id="password"
                placeholder="****"
                name="password"
                value={password}
                onChange={(event) => {
                  handleChange(event, setPassword);
                }}
              />
            </div>
          </div>

          <button type="submit">Se Connecter</button>
          <p
            onClick={() => {
              navigate("/signup");
            }}
          >
            Pas encore de compte ? Inscris-toi !
          </p>
        </div>
      </form>
    </main>
  );
};

export default Login;
