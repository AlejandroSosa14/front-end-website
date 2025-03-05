import { useRef } from "react";
import LoginForm from "../components/UserForm/LoginForm";
import Layout from "../components/layout/Layout";
import styles from "./Login.module.css";

const Login = () => {
    const formRef = useRef(null);

    const handleSubmit = () => {
        if (formRef.current) {
            formRef.current.requestSubmit();  // requestSubmit() es mejor que dispatchEvent("submit")
        }
    };

    return (
        <Layout>
            <section className={styles.loginContainer}>
                <h2>Iniciar Sesión</h2>
                <div className="container">
                    <div className={styles.loginBox}>
                        <div className={styles.loginFormContainer}>
                            <LoginForm formRef={formRef} />
                        </div>
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <button className={styles.submitButton} type="button" onClick={handleSubmit}>
                        Iniciar sesión
                    </button>
                </div>
            </section>
        </Layout>
    );
};

export default Login;
