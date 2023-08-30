const Home = ({ darkMode }) => {
  return (
    <main className={darkMode ? "dark" : "light"}>
      <div className="container">Home</div>
    </main>
  );
};

export default Home;
