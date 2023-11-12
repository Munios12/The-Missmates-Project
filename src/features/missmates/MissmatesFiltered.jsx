import { useEffect, useState } from "react";
import styles from "./list.module.css";
import { deleteMissmate, loadMissmates } from "./missmatesSlice";
import { getMissmates } from "../../services/apiMissmates";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Icon } from "@iconify/react";

function MissmatesFiltered({ sortBy, filteredList, setFilteredList }) {
  const [listOfAllMissmates, setListOfAllMissmates] = useState([]);

  const dispatch = useDispatch();
  const filterArrayNames = [
    "VER TODOS",
    "MENS BALDA 1",
    "MENS BALDA 2",
    "MENS BALDA 3",
    "MENS BALDA 4",
    "MENS BALDA 5",
    "MENS BALDA 6",
    "MENS BALDA 7",
    "WOMENS BALDA 1",
    "WOMENS BALDA 2",
    "WOMENS BALDA 3",
    "WOMENS BALDA 4",
    "WOMENS BALDA 5",
    "WOMENS BALDA 6",
    "WOMENS BALDA 7",
    "KIDS BALDA 1",
    "KIDS BALDA 2",
    "KIDS BALDA 3",
    "KIDS BALDA 4",
    "KIDS BALDA 5",
    "KIDS BALDA 6",
    "KIDS BALDA 7",
  ];

  // const data = useSelector((state) => state.missmates);

  useEffect(() => {
    dispatch(loadMissmates());
    getMissmates().then((miss) => setListOfAllMissmates(miss));
    handlefilteredBin(sortBy, filterArrayNames);
    console.log("Evitar muchos renders");
  }, [sortBy]);
  // function handlefilteredBin(filter) {
  //   let newFilteredArray;

  //   if (filter === "VER TODOS") {
  //     return setFilteredList(data.missmates);
  //   }

  //   if (
  //     filter === "MENS 1" &&
  //     listOfAllMissmates.some((item) => item.bin === "MENS 1")
  //   ) {
  //     newFilteredArray = listOfAllMissmates.filter(
  //       (item) => item.bin === "MENS 1"
  //     );
  //     return setFilteredList(newFilteredArray);
  //   }

  //   if (
  //     filter === "WOMENS 2" &&
  //     listOfAllMissmates.some((item) => item.bin === "WOMENS 2")
  //   ) {
  //     newFilteredArray = listOfAllMissmates.filter(
  //       (item) => item.bin === "WOMENS 2"
  //     );
  //     return setFilteredList(newFilteredArray);
  //   } else if (
  //     filter === "WOMENS 2" &&
  //     !listOfAllMissmates.some((item) => item.bin === "WOMENS 2")
  //   ) {
  //     return setFilteredList([]);
  //   }

  //   if (
  //     filter === "KIDS 3" &&
  //     listOfAllMissmates.some((item) => item.bin === "KIDS 3")
  //   ) {
  //     newFilteredArray = listOfAllMissmates.filter(
  //       (item) => item.bin === "KIDS 3"
  //     );
  //     return setFilteredList(newFilteredArray);
  //   }
  // }

  function handlefilteredBin(filter, filterName) {
    let newFilteredArray;

    if (filter === "VER TODOS") {
      return getMissmates().then((miss) => setFilteredList(miss));
    }

    for (let i = 0; i < filterArrayNames.length; i++) {
      if (
        filter === filterName[i] &&
        listOfAllMissmates.some((item) => item.bin === filterName[i])
      ) {
        newFilteredArray = listOfAllMissmates.filter(
          (item) => item.bin === filterName[i]
        );
        return setFilteredList(newFilteredArray);
      } else if (
        filter === filterName[i] &&
        !listOfAllMissmates.some((item) => item.bin === filterName)
      ) {
        return setFilteredList([]);
      }
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
                  <Icon icon="bi:trash3-fill" />
                </button>
              </div>
            </li>
          ))
        : filteredList.map((missmate) => (
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
                  <Icon icon="bi:trash3-fill" />
                </button>
              </div>
            </li>
          ))}
    </ul>
  );
}

export default MissmatesFiltered;
