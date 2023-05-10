import { useEffect, useState } from "react";
import axios from "axios";
import Cupcake from "../components/Cupcake";

export default function CupcakeList() {
  // Step 1: get all cupcakes

  const [cupcakes, setCupcakes] = useState([]);

  useEffect(() => {
    axios.get(import.meta.env.VITE_API_URL).then((response) => {
      setCupcakes(response.data);
    });
  }, []);

  // Step 3: get all accessories

  const [accessories, setAccessories] = useState([]);

  useEffect(() => {
    axios.get(import.meta.env.VITE_API_URL_ACCE).then((response) => {
      setAccessories(response.data);
    });
  }, []);

  const [cupcakesFiltered, setCupcakesFiltered] = useState(cupcakes);

  const handleChange = (e) => {
    const filteredAccessory = accessories.find(
      // eslint-disable-next-line eqeqeq
      (accessory) => accessory.id == e.target.value
    );
    // eslint-disable-next-line no-unused-expressions
    filteredAccessory === undefined
      ? setCupcakesFiltered(cupcakes)
      : setCupcakesFiltered(
          cupcakes.filter(
            // eslint-disable-next-line eqeqeq
            (cupcake) => cupcake.accessory_id == filteredAccessory.id
          )
        );
  };

  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          Filter by{" "}
          <select onChange={handleChange} type="text" id="cupcake-select">
            <option value="0">---</option>
            {accessories.map((accessory) => (
              <option key={accessory.id} value={accessory.id}>
                {accessory.name}
              </option>
            ))}
            ;
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {cupcakesFiltered.map((cupcake) => (
          <li className="cupcake-item" key={cupcake.id}>
            <Cupcake cupcake={cupcake} />
          </li>
        ))}
      </ul>
    </>
  );
}
