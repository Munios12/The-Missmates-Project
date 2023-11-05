import { Link } from "react-router-dom";
import styles from "./searchmissmate.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { loadMissmates } from "./missmatesSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

function Searchmissmate() {
  const dispatch = useDispatch();
  const [searchForm, setSearchForm] = useState({
    pie: "derecho",
    talla: "",
    modelo: "",
  });

  const data = useSelector((state) => state.missmates);

  useEffect(() => {
    dispatch(loadMissmates());
  }, []);

  function searchMissmate(missmateToFind) {
    const missmateListToCheck = data.missmates;

    const result = missmateListToCheck.filter(
      (item) =>
        item.modelo === missmateToFind.modelo &&
        item.pie === missmateToFind.pie &&
        Number(item.talla) === Number(missmateToFind.talla)
    );

    console.log(result);

    return result.length > 0
      ? Swal.fire({
          title: `Lo tenemos, se encuentra en el bin ${result[0].bin}`,
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
        })
      : Swal.fire({
          position: "center",
          icon: "error",
          title: "No se ha encontrado ningun missmate",
          showConfirmButton: false,
          timer: 1500,
        });
  }

  function handleSubmit(e) {
    e.preventDefault();

    return searchMissmate(searchForm);
  }

  function handleChange(e) {
    setSearchForm({
      ...searchForm,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <section className={styles.search_container}>
      <div className={styles.move_left_arrow}>
        <Link to="/" className={styles.btn_back}>
          &larr;
        </Link>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <section>
          <select name="pie" value={searchForm.pie} onChange={handleChange}>
            <option value={"derecho"}>Derecho</option>
            <option value={"izquierdo"}>Izquierdo</option>
          </select>
        </section>
        <section className={styles.inputBox}>
          <input name="talla" type="text" required onChange={handleChange} />
          <span>Talla</span>
        </section>
        <section className={styles.inputBox}>
          <input name="modelo" type="text" required onChange={handleChange} />
          <span>Modelo</span>
        </section>
        <button className={styles.btn_primary_add}>BUSCAR</button>
      </form>
    </section>
  );
}

export default Searchmissmate;
