import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./addmissmates.module.css";

function Addmissmate() {
  const [pie, setFoot] = useState("derecho");
  const [talla, setSize] = useState();
  const [modelo, setModel] = useState();
  const [bin, setBin] = useState();

  const newMissmate = {
    pie,
    talla,
    modelo,
    bin,
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log(newMissmate);
  }

  return (
    <>
      <main>
        <section className={styles.addmissmate_container}>
          <Link to="/" className={styles.btn_back}>
            Atras
          </Link>
          <form onSubmit={handleSubmit} className={styles.form}>
            <section>
              <select
                name="pie"
                value={pie}
                onChange={(e) => setFoot(e.target.value)}
              >
                <option value={"derecho"}>Derecho</option>
                <option value={"izquierdo"}>Izquierdo</option>
              </select>
            </section>
            <section className={styles.inputBox}>
              <input
                type="number"
                required
                value={talla}
                onChange={(e) => setSize(e.target.value)}
              />
              <span>Talla</span>
            </section>
            <section className={styles.inputBox}>
              <input
                type="text"
                required
                onChange={(e) => setModel(e.target.value)}
              />
              <span>Modelo</span>
            </section>
            <section>
              <select name="bin" onChange={(e) => setBin(e.target.value)}>
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
