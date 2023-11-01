import { Link } from "react-router-dom";
import styles from "./homepage.module.css";

function Homepage() {
  return (
    <>
      <main className={styles.main}>
        <section className={styles.homepage_section}>
          <Link to="/missmate/list" className={styles.btn_primary}>
            LISTADO
          </Link>

          <Link to="/missmate/add" className={styles.btn_primary}>
            AÑADIR
          </Link>

          <Link to="/missmate/search" className={styles.btn_primary}>
            BUSCAR
          </Link>
        </section>
      </main>
    </>
  );
}

export default Homepage;
