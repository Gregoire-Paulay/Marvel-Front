const Home = ({ darkMode }) => {
  return (
    <main className={darkMode ? "dark" : "light"}>
      <div className="container">
        <section className="home">
          <div className="bg"></div>
          <div className="paper"></div>
        </section>
      </div>
    </main>
  );
};

export default Home;
