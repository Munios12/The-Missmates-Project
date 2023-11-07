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
  const [bin, setBin] = useState("1");
  const dispatch = useDispatch();

  const newMissmate = {
    pie,
    talla,
    modelo,
    bin,
  };

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(addMissmate(newMissmate));
    console.log(newMissmate);
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
          <Link to="/" className={styles.btn_back}>
            Atras
          </Link>
          <form onSubmit={handleSubmit} className={styles.form}>
            <section className={styles.inputBox}>
              <input
                placeholder="Talla"
                type="number"
                required
                value={talla}
                onChange={(e) => setSize(e.target.value)}
              />
              {/* <label>Talla</label> */}
            </section>
            <section className={styles.inputBox}>
              <input
                placeholder="Modelo"
                type="text"
                required
                onChange={(e) => setModel(e.target.value)}
              />
              {/* <label>Modelo</label> */}
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
                <option value={"1"}>MENS BIN 1</option>
                <option value={"2"}>WOMENS BIN 2</option>
                <option value={"3"}>KIDS BIN 3</option>
              </select>
            </section>
            <button className={styles.btn_primary_add}>AÑADIR</button>
          </form>
        </section>
      </main>
    </>
  );
}

export default Addmissmate;
