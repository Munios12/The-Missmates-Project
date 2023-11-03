import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMissmates } from "../../services/apiMissmates";
import styles from "./list.module.css";

function List() {
  const [listOfMissmates, setListOfMissmates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getMissmates().then((miss) => setListOfMissmates(miss));
    setIsLoading(false);
  }, []);
  console.log(listOfMissmates);
  return (
    <section className={styles.list__container}>
      <div className={styles.move_left_arrow}>
        <Link to="/" className={styles.btn_back}>
          &larr;
        </Link>
      </div>

      <ul className={styles.move_left}>
        {isLoading
          ? "Cargando los missmates..."
          : listOfMissmates.map((missmate) => (
              <li key={missmate.id} className={styles.missmate_container}>
                <div>
                  <p>Pie: {missmate.pie}</p>
                  <p>Talla: {missmate.talla}</p>
                  <p>Modelo: {missmate.modelo}</p>
                  <p>Bin: {missmate.bin}</p>
                </div>
                <div className={styles.center_btn}>
                  <button className={styles.btn_delete}>Borrar</button>
                </div>
              </li>
            ))}
      </ul>
    </section>
  );
}

export default List;
