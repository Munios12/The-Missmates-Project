import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getMissmates } from "../../services/apiMissmates";

function List() {
  // const newMissmate = {
  //   id: 222,
  //   created_at: new Date(),
  //   pie: "derecho",
  //   talla: "25",
  //   modelo: "BV1789-400",
  //   bin: 5,
  // };
  useEffect(() => {
    getMissmates().then((data) => console.log(data));
    // createMissmate(newMissmate);
  }, []);

  return (
    <>
      <Link to="/">Atras</Link>
      <div>List of missmates</div>
    </>
  );
}

export default List;
