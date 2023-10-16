const Home = ({ darkMode }) => {
  return (
    <main className={darkMode ? "dark" : "light"}>
      <div className="home">
        <div className="bg"></div>
        <div className="paper"></div>
      </div>
    </main>
  );
};

export default Home;
