import { useEffect, useState } from "react";
import styles from "./list.module.css";
import { deleteMissmate, loadMissmates } from "./missmatesSlice";
import { getMissmates } from "../../services/apiMissmates";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

function MissmatesFiltered({ sortBy }) {
  const [listOfAllMissmates, setListOfAllMissmates] = useState([]);
  const [filteredList, setFilteredBin] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMissmates());
    getMissmates().then((miss) => setListOfAllMissmates(miss));
    handlefilteredBin(sortBy);
    console.log("Evitar muchos renders");
  }, [sortBy]);

  console.log(sortBy);
  console.log(filteredList);

  function handlefilteredBin(filter) {
    let newFilteredArray;
    if (filter === "FULL") {
      setFilteredBin(listOfAllMissmates);
    }
    if (
      filter === "MENS 1" &&
      listOfAllMissmates.some((item) => item.bin === "MENS 1")
    ) {
      newFilteredArray = listOfAllMissmates.filter(
        (item) => item.bin === "MENS 1"
      );

      setFilteredBin(newFilteredArray);
    }

    if (
      filter === "WOMENS 2" &&
      listOfAllMissmates.some((item) => item.bin === "WOMENS 2")
    ) {
      newFilteredArray = listOfAllMissmates.filter(
        (item) => item.bin === "WOMENS 2"
      );

      console.log(newFilteredArray);
      setFilteredBin(newFilteredArray);
    }

    if (
      filter === "KIDS 3" &&
      listOfAllMissmates.some((item) => item.bin === "WOMENS 2")
    ) {
      newFilteredArray = listOfAllMissmates.filter(
        (item) => item.bin === "KIDS 3"
      );

      setFilteredBin(newFilteredArray);
    }
  }

  function handleDelete(missmateID) {
    Swal.fire({
      title: "Deseas eliminar este missmate?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
      customClass: {
        actions: "my-actions",
        cancelButton: "order-1 right-gap",
        confirmButton: "order-2",
        denyButton: "order-3",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
        dispatch(deleteMissmate(missmateID));
        setListOfAllMissmates((prev) => {
          return prev.filter((item) => item.id !== missmateID);
        });
        setFilteredBin((prev) => {
          return prev.filter((item) => item.id !== missmateID);
        });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

  return (
    <ul className={styles.move_left}>
      {!filteredList
        ? listOfAllMissmates.map((missmate) => (
            <li key={missmate.id} className={styles.missmate_container}>
              <div>
                <p>Talla: {missmate.talla}</p>
                <p>Modelo: {missmate.modelo}</p>
                <p>Pie: {missmate.pie}</p>
                <p>Bin: {missmate.bin}</p>
              </div>
              <div className={styles.center_btn}>
                <button
                  className={styles.btn_delete}
                  onClick={() => handleDelete(missmate.id)}
                >
                  Borrar
                </button>
              </div>
            </li>
          ))
        : filteredList.map((missmate) => (
            <li key={missmate.id} className={styles.missmate_container}>
              <div>
                <p>Talla: {missmate.talla}</p>
                <p>Modelo: {missmate.modelo}</p>
                <p>Pie: {missmate.pie}</p>
                <p>Bin: {missmate.bin}</p>
              </div>
              <div className={styles.center_btn}>
                <button
                  className={styles.btn_delete}
                  onClick={() => handleDelete(missmate.id)}
                >
                  Borrar
                </button>
              </div>
            </li>
          ))}
    </ul>
  );
}

export default MissmatesFiltered;
