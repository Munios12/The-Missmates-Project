import { Link } from "react-router-dom";
import styles from "./searchmissmate.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { deleteMissmate, loadMissmates } from "./missmatesSlice";
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

    const missmateFinded = missmateListToCheck.filter(
      (item) =>
        item.modelo.toUpperCase() === missmateToFind.modelo.toUpperCase() &&
        item.pie === missmateToFind.pie &&
        Number(item.talla) === Number(missmateToFind.talla)
    );
    console.log(missmateToFind.modelo);
    console.log(missmateFinded);

    return missmateFinded.length > 0
      ? Swal.fire({
          title: `Lo tenemos, se encuentra en ${missmateFinded[0].bin}! 🥳. Deseas eliminarlo ?`,
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
        <section className={styles.inputBox}>
          <input
            name="talla"
            placeholder="Talla"
            type="text"
            required
            onChange={handleChange}
          />
        </section>
        <section className={styles.inputBox}>
          <input
            name="modelo"
            placeholder="Modelo"
            type="text"
            required
            onChange={handleChange}
          />
        </section>
        <section>
          <select
            className={styles.select_box}
            name="pie"
            value={searchForm.pie}
            onChange={handleChange}
          >
            <option value={"derecho"}>Derecho</option>
            <option value={"izquierdo"}>Izquierdo</option>
          </select>
        </section>
        <button className={styles.btn_primary_add}>BUSCAR</button>
      </form>
    </section>
  );
}

export default Searchmissmate;
