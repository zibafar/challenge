import Action from "./Components/Action";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [numbers, setNumbers] = useState([]);
  const [addNumber, setAddNumber] = useState();
  const [multiplyNumber, setMultiplyNumber] = useState();
  // states

  const [haveError, setHaveError] = useState(false);
  // handle error

  // async function for fetch data
  const handleFetchNumbers = async () => {
    await axios
      .get("http://localhost:5000/numbers")
      .then((res) => setNumbers(res.data))
      .catch((err) => setHaveError(true));
  };

  const handleFetchAddNumber = async () => {
    await axios
      .get("http://localhost:5000/add")
      .then((res) => setAddNumber(res.data));
  };

  const handleFetchMultiplyNumber = async () => {
    await axios
      .get("http://localhost:5000/multiply")
      .then((res) => setMultiplyNumber(res.data));
  };
  // -------------

  useEffect(() => {
    const ac = new AbortController();

    handleFetchAddNumber();
    handleFetchMultiplyNumber();
    handleFetchNumbers();

    return () => {
      ac.abort();
      setNumbers([]);
      setAddNumber();
      setMultiplyNumber();
    };
  }, []);
  // fetch data from api

  return (
    <div className="container mt-5">
      {!haveError ? (
        numbers.map((number, index) => (
          <div
            key={index}
            data-testid={"list-item"}
            className="mb-3 alert alert-primary result-card"
            data-testid="result-card"
          >
            <Action
              number={number.value}
              action={number.action}
              add={addNumber}
              multiply={multiplyNumber}
            />
          </div>
        ))
      ) : (
        // handle undifind numbers
        <div className="alert alert-danger text-center">«Server Error»</div>
      )}
    </div>
  );
}

export default App;
