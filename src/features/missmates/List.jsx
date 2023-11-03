import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadMissmates } from "./missmatesSlice";

function List() {
  const [listOfMissmates, setListOfMissmates] = useState([]);
  const dispatch = useDispatch();
  const { missmates } = useSelector((store) => store.missmates);

  useEffect(() => {
    dispatch(loadMissmates());
    setListOfMissmates(missmates);
    console.log(listOfMissmates);
  }, []);

  return (
    <>
      <Link to="/">Atras</Link>

      <div>List of missmates</div>

      {listOfMissmates.map((missmate) => (
        <p key={missmate.id}>{missmate.modelo}</p>
      ))}
    </>
  );
}

export default List;
