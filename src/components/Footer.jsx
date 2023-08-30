const Footer = ({ darkMode }) => {
  return (
    <footer className={darkMode ? "dark" : "light"}>
      Made with <a href="https://fr.legacy.reactjs.org/"> React</a> at
      <a href="https://www.lereacteur.io"> Le Reacteur</a> by
      <a href="https://github.com/Gregoire-Paulay"> Grégoire Paulay</a> - 2023
    </footer>
  );
};

export default Footer;
