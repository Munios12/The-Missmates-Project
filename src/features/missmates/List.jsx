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

  const genderBaldasArr = [1, 2, 3, 4, 5, 6, 7];

  return (
    <section className={styles.list__container}>
      <div className={styles.move_left_arrow}>
        <Link to="/" className={styles.btn_back}>
          &larr;
        </Link>
      </div>
      <div className={styles.filter_actions}>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="VER TODOS">VER TODOS</option>
          {/* <option value="MENS BALDA 1">MENS BALDA 1</option>
          <option value="MENS BALDA 2">MENS BALDA 2</option>
          <option value="MENS BALDA 3">MENS BALDA 3</option>
          <option value="MENS BALDA 4">MENS BALDA 4</option>
          <option value="MENS BALDA 5">MENS BALDA 5</option>
          <option value="MENS BALDA 6">MENS BALDA 6</option>
          <option value="MENS BALDA 7">MENS BALDA 7</option> */}
          {genderBaldasArr.map((i) => (
            <option
              key={i}
              value={`MENS BALDA ${i}`}
            >{`MENS BALDA ${i}`}</option>
          ))}
          {genderBaldasArr.map((i) => (
            <option
              key={i}
              value={`WOMENS BALDA ${i}`}
            >{`WOMENS BALDA ${i}`}</option>
          ))}
          {genderBaldasArr.map((i) => (
            <option
              key={i}
              value={`KIDS BALDA ${i}`}
            >{`KIDS BALDA ${i}`}</option>
          ))}
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
