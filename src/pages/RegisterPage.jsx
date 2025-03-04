import { useRef } from "react";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import Layout from "../components/layout/Layout";
import styles from "./RegisterPage.module.css";

const RegisterPage = () => {
  const formRef = useRef(null);

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }
  };

  return (
    <Layout>
      <section className={styles.carDetails}>
        <h2>Crear Cuenta</h2>
        <div className="container">
          <div className={styles.carDetailsContainer}>
            <div className={styles.carDetailsSearch}>
              <RegisterForm onFormReady={formRef} />
            </div>
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.submitButton} type="button" onClick={handleSubmit}>
            Crear Cuenta
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default RegisterPage;