const Pagination = ({
  setCounter,
  counter,
  limit,
  skip,
  setSkip,
  pageTotal,
}) => {
  return (
    <section className="pagination">
      <div>
        <button
          className={counter === 1 ? "hidden" : ""}
          onClick={() => {
            setCounter(counter - 1);
            setSkip(skip - limit);
          }}
        >
          -
        </button>
        <p>
          Page : {counter} / {pageTotal}
        </p>
        <div>
          <button
            className={counter === pageTotal ? "hidden" : ""}
            onClick={() => {
              setCounter(counter + 1);
              setSkip(skip + limit);
            }}
          >
            +
          </button>
        </div>
      </div>
      <div>
        <label htmlFor="number">Go to page</label>
        <input
          type="number"
          id="number"
          onChange={(event) => {
            if (event.target.value > 0 && event.target.value <= pageTotal) {
              setCounter(Number(event.target.value));
              setSkip((event.target.value - 1) * limit);
            }
          }}
        />
      </div>
    </section>
  );
};

export default Pagination;
