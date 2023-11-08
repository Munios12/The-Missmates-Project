import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./addmissmates.module.css";
import { addMissmate } from "./missmatesSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

function Addmissmate() {
  const [pie, setFoot] = useState("derecho");
  const [talla, setSize] = useState();
  const [modelo, setModel] = useState();
  const [bin, setBin] = useState("MENS 1");
  const [quantity, setQuantity] = useState("1");
  const dispatch = useDispatch();

  const newMissmate = {
    pie,
    talla,
    modelo,
    bin,
  };

  const addMissFunc = function handleAddMissmate() {
    dispatch(addMissmate(newMissmate));
  };

  function handleSubmit(e) {
    e.preventDefault();
    Array.from({ length: quantity }, () => addMissFunc());
    console.log("quantity", quantity);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Has añadido un missmate",
      showConfirmButton: false,
      timer: 1500,
    });
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
                <option value={"MENS 1"}>MENS BIN 1</option>
                <option value={"WOMENS 2"}>WOMENS BIN 2</option>
                <option value={"KIDS 3"}>KIDS BIN 3</option>
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
