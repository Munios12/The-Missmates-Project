import { useEffect, useState } from "react";
import styles from "./list.module.css";
import { deleteMissmate, loadMissmates } from "./missmatesSlice";
import { getMissmates } from "../../services/apiMissmates";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

function MissmatesFiltered({ sortBy, filteredList, setFilteredList }) {
  const [listOfAllMissmates, setListOfAllMissmates] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMissmates());
    getMissmates().then((miss) => setListOfAllMissmates(miss));
    handlefilteredBin(sortBy);
    console.log("Evitar muchos renders");
  }, [sortBy]);

  function handlefilteredBin(filter) {
    let newFilteredArray;
    if (filter === "FULL") {
      setFilteredList(listOfAllMissmates);
    }
    if (
      filter === "MENS 1" &&
      listOfAllMissmates.some((item) => item.bin === "MENS 1")
    ) {
      newFilteredArray = listOfAllMissmates.filter(
        (item) => item.bin === "MENS 1"
      );
      setFilteredList(newFilteredArray);
    }

    if (
      filter === "WOMENS 2" &&
      listOfAllMissmates.some((item) => item.bin === "WOMENS 2")
    ) {
      newFilteredArray = listOfAllMissmates.filter(
        (item) => item.bin === "WOMENS 2"
      );
      setFilteredList(newFilteredArray);
    }

    if (
      filter === "KIDS 3" &&
      listOfAllMissmates.some((item) => item.bin === "WOMENS 2")
    ) {
      newFilteredArray = listOfAllMissmates.filter(
        (item) => item.bin === "KIDS 3"
      );
      setFilteredList(newFilteredArray);
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

        // REFACTORRRR IFFF ANIDADO

        if (filteredList === null) return;
        setFilteredList((prev) => {
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
                <p className={styles.missmate_params}>
                  Talla: <span>{missmate.talla}</span>
                </p>
                <p className={styles.missmate_params}>
                  Modelo: <span>{missmate.modelo}</span>
                </p>
                <p className={styles.missmate_params}>
                  Pie: <span>{missmate.pie}</span>
                </p>
                <p className={styles.missmate_params}>
                  Bin: <span>{missmate.bin}</span>
                </p>
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
