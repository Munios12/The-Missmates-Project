import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./list.module.css";

import MissmatesFiltered from "./MissmatesFiltered";
import { useSelector } from "react-redux";

function List() {
  const [sortBy, setSortBy] = useState("VER TODOS");
  const [filteredList, setFilteredList] = useState(null);

  const data = useSelector((state) => state.missmates);

  const filteredNumberMissmates = !filteredList
    ? data.missmates.length
    : filteredList?.length;

  return (
    <section className={styles.list__container}>
      <div className={styles.move_left_arrow}>
        <Link to="/" className={styles.btn_back}>
          &larr;
        </Link>
      </div>
      <div className={styles.filter_actions}>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="FULL">VER TODOS</option>
          <option value="MENS 1">MENS 1</option>
          <option value="WOMENS 2">WOMENS 2</option>
          <option value="KIDS 3">KIDS 3</option>
        </select>

        <p className={styles.missmates_units}>
          Nº: {filteredNumberMissmates} unit/s
        </p>
      </div>
      <MissmatesFiltered
        sortBy={sortBy}
        filteredList={filteredList}
        setFilteredList={setFilteredList}
      />
    </section>
  );
}

export default List;
