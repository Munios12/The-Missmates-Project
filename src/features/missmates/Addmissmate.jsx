import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./addmissmates.module.css";
import { addMissmate, deleteMissmate, loadMissmates } from "./missmatesSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

function Addmissmate() {
  const [pie, setFoot] = useState("derecho");
  const [talla, setSize] = useState();
  const [modelo, setModel] = useState();
  const [bin, setBin] = useState("MENS BALDA 1");
  const [quantity, setQuantity] = useState("1");
  const dispatch = useDispatch();

  const data = useSelector((state) => state.missmates);

  const newMissmate = React.useMemo(() => {
    return {
      pie,
      talla,
      modelo,
      bin,
    };
  }, [bin, modelo, talla, pie]);

  const addMissFunc = function handleAddMissmate() {
    dispatch(addMissmate(newMissmate));
  };

  const genderBaldasToAddArr = [1, 2, 3, 4, 5, 6, 7];

  useEffect(() => {
    dispatch(loadMissmates());
    console.log("hi, from addmissmate");
  }, [newMissmate, dispatch]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(loadMissmates());
    //Buscar Missamate
    if (searchMissmate(newMissmate)) {
      dispatch(loadMissmates());
      return searchMissmate(newMissmate);
    } else {
      Array.from({ length: quantity }, () => addMissFunc());

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Has añadido un missmate",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    //Eliminar el missmate si lo encuentra

    //Si no encuentra Missmate lo añade
  }

  function searchMissmate(missmateToFind) {
    const missmateListToCheck = data.missmates;
    console.log(missmateListToCheck);

    const missmateFinded = missmateListToCheck.filter(
      (item) =>
        item.modelo.toUpperCase() === missmateToFind.modelo.toUpperCase() &&
        item.pie !== missmateToFind.pie &&
        Number(item.talla) === Number(missmateToFind.talla)
    );
    console.log("result ----> ", missmateFinded);

    return missmateFinded.length > 0
      ? Swal.fire({
          title: `Se encuentra en ${missmateFinded[0].bin} pero... es probable que no lo hayas encontrado, que quieres hacer ?`,
          subtitle: "Deseas añadirlo o borrar los dos",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Añadir",
          denyButtonText: "Borrar los dos",
          customClass: {
            actions: "my-actions",
            cancelButton: "order-1 right-gap",
            confirmButton: "order-2",
            denyButton: "order-3",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire("Añadido!", "", "success");
            Array.from({ length: quantity }, () => addMissFunc());

            Swal.fire({
              position: "center",
              icon: "success",
              title: "Has añadido un missmate",
              showConfirmButton: false,
              timer: 1500,
            });
          } else if (result.isDenied) {
            //Logica para borrar missmates
            dispatch(deleteMissmate(missmateFinded[0].id));
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Se ha eliminado un missmate encontrado. Buen trabajo !",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
      : null;
  }

  return (
    <>
      <main>
        <section className={styles.addmissmate_container}>
          <div className={styles.move_left_arrow}>
            <Link to="/" className={styles.btn_back}>
              &larr;
            </Link>
          </div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <section className={styles.inputBox}>
              <input
                placeholder="Talla"
                type="number"
                required
                value={talla}
                onChange={(e) => setSize(e.target.value)}
              />
            </section>
            <section className={styles.inputBox}>
              <input
                placeholder="Modelo"
                type="text"
                required
                onChange={(e) => setModel(e.target.value)}
              />
            </section>
            <section className={styles.options}>
              <select
                className={styles.select_box}
                name="pie"
                value={pie}
                onChange={(e) => setFoot(e.target.value)}
              >
                <option value={"derecho"}>Derecho</option>
                <option value={"izquierdo"}>Izquierdo</option>
              </select>
            </section>
            <section className={styles.options}>
              <select
                className={styles.select_box}
                name="bin"
                onChange={(e) => setBin(e.target.value)}
              >
                {/* <option value={"MENS 1"}>MENS BIN 1</option>
                <option value={"WOMENS 2"}>WOMENS BIN 2</option>
                <option value={"KIDS 3"}>KIDS BIN 3</option> */}
                {genderBaldasToAddArr.map((i) => (
                  <option
                    key={i}
                    value={`MENS BALDA ${i}`}
                  >{`MENS BALDA ${i}`}</option>
                ))}
                {genderBaldasToAddArr.map((i) => (
                  <option
                    key={i}
                    value={`WOMENS BALDA ${i}`}
                  >{`WOMENS BALDA ${i}`}</option>
                ))}
                {genderBaldasToAddArr.map((i) => (
                  <option
                    key={i}
                    value={`KIDS BALDA ${i}`}
                  >{`KIDS BALDA ${i}`}</option>
                ))}
              </select>
            </section>
            <div className={styles.btn_add_quantity}>
              <button className={styles.btn_primary_add}>AÑADIR</button>
              <select
                name="quantity"
                className={styles.select_box_quantity}
                onChange={(e) => setQuantity(e.target.value)}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

export default Addmissmate;
